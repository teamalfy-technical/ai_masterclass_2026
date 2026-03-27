from __future__ import annotations

import re
import shutil
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Iterable
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, StyleSheet1, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas as pdf_canvas
from reportlab.platypus import (
    Flowable,
    Image,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content" / "learner"
OUTPUT_DIR = ROOT / "output" / "pdf" / "learner"
PUBLIC_DIR = ROOT / "public" / "downloads" / "learner"
LOGO_PATH = ROOT / "public" / "brand" / "logo-black.jpg"
TODAY = date.today().strftime("%B %d, %Y")

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 18 * mm
MARGIN_TOP = 20 * mm
MARGIN_BOTTOM = 16 * mm
CONTENT_WIDTH = PAGE_WIDTH - (2 * MARGIN_X)

INK = colors.HexColor("#050505")
CANVAS = colors.HexColor("#f6f4f3")
SURFACE = colors.white
LINE = colors.HexColor("#e6e0dd")
MUTED = colors.HexColor("#373331")
ACCENT = colors.HexColor("#fa51a4")
ACCENT_SOFT = colors.HexColor("#fde4f1")


@dataclass
class Block:
    kind: str
    items: list[str]


@dataclass
class Subsection:
    title: str
    blocks: list[Block]


@dataclass
class Section:
    title: str
    blocks: list[Block] = field(default_factory=list)
    subsections: list[Subsection] = field(default_factory=list)


@dataclass
class Outline:
    title: str
    intro: list[Block]
    sections: list[Section]


class RuledBox(Flowable):
    def __init__(self, width: float, height: float, lines: int = 6, title: str | None = None):
        self.width = width
        self.height = height
        self.lines = lines
        self.title = title
        self.spaceBefore = 0
        self.spaceAfter = 0

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        canvas = self.canv
        canvas.saveState()
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(1)
        canvas.roundRect(0, 0, self.width, self.height, 8, stroke=1, fill=0)

        if self.title:
            canvas.setFillColor(MUTED)
            canvas.setFont("Helvetica-Bold", 8.5)
            canvas.drawString(12, self.height - 14, self.title)

        top_offset = self.height - 24 if self.title else self.height - 14
        usable_height = max(top_offset - 10, 10)
        step = usable_height / max(self.lines, 1)
        canvas.setLineWidth(0.5)
        for index in range(self.lines):
            y = top_offset - (index * step)
            canvas.line(12, y, self.width - 12, y)
        canvas.restoreState()


def safe_text(text: str) -> str:
    replacements = {
        "\u2019": "'",
        "\u2018": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u2015": "-",
        "\u2212": "-",
        "\u2022": "-",
        "\u00a0": " ",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


def read_markdown(path: Path) -> str:
    return safe_text(path.read_text(encoding="utf-8"))


def parse_blocks(lines: Iterable[str]) -> list[Block]:
    blocks: list[Block] = []
    paragraph: list[str] = []
    bullets: list[str] = []
    numbers: list[str] = []

    def flush_paragraph():
        if paragraph:
            blocks.append(Block("paragraph", [" ".join(paragraph).strip()]))
            paragraph.clear()

    def flush_bullets():
        if bullets:
            blocks.append(Block("bullet", bullets.copy()))
            bullets.clear()

    def flush_numbers():
        if numbers:
            blocks.append(Block("number", numbers.copy()))
            numbers.clear()

    for raw in list(lines) + [""]:
        line = raw.rstrip()
        stripped = line.strip()
        bullet_match = re.match(r"^\s*-\s+(.*)$", line)
        number_match = re.match(r"^\s*\d+\.\s+(.*)$", line)

        if bullet_match:
            flush_paragraph()
            flush_numbers()
            bullets.append(bullet_match.group(1).strip())
            continue

        if number_match:
            flush_paragraph()
            flush_bullets()
            numbers.append(number_match.group(1).strip())
            continue

        if not stripped:
            flush_paragraph()
            flush_bullets()
            flush_numbers()
            continue

        flush_bullets()
        flush_numbers()
        paragraph.append(stripped)

    return blocks


def parse_outline(text: str) -> Outline:
    title = ""
    intro_lines: list[str] = []
    sections: list[Section] = []
    current_section: Section | None = None
    current_subsection: dict[str, object] | None = None

    def flush_subsection():
        nonlocal current_subsection
        if current_section and current_subsection:
            current_section.subsections.append(
                Subsection(
                    title=current_subsection["title"],  # type: ignore[index]
                    blocks=parse_blocks(current_subsection["lines"]),  # type: ignore[index]
                )
            )
            current_subsection = None

    def flush_section():
        nonlocal current_section
        if current_section:
            flush_subsection()
            current_section.blocks = parse_blocks(current_section.blocks)  # type: ignore[arg-type]
            sections.append(current_section)
            current_section = None

    for raw_line in text.splitlines():
        if raw_line.startswith("# "):
            title = raw_line[2:].strip()
        elif raw_line.startswith("## "):
            flush_section()
            current_section = Section(title=raw_line[3:].strip(), blocks=[])
        elif raw_line.startswith("### "):
            flush_subsection()
            current_subsection = {"title": raw_line[4:].strip(), "lines": []}
        elif current_subsection is not None:
            current_subsection["lines"].append(raw_line)
        elif current_section is not None:
            current_section.blocks.append(raw_line)  # type: ignore[arg-type]
        else:
            intro_lines.append(raw_line)

    flush_section()
    return Outline(title=title, intro=parse_blocks(intro_lines), sections=sections)


def section_map(outline: Outline) -> dict[str, Section]:
    return {section.title: section for section in outline.sections}


def subsection_map(section: Section) -> dict[str, Subsection]:
    return {subsection.title: subsection for subsection in section.subsections}


def block_items_as_text(blocks: list[Block]) -> list[str]:
    items: list[str] = []
    for block in blocks:
        items.extend(block.items)
    return items


def parse_label_values(blocks: list[Block]) -> dict[str, str]:
    result: dict[str, str] = {}
    for block in blocks:
        if block.kind not in {"bullet", "number"}:
            continue
        for item in block.items:
            if ":" not in item:
                continue
            label, value = item.split(":", 1)
            result[label.strip().lower()] = value.strip()
    return result


def image_width_height(path: Path, width: float) -> tuple[float, float]:
    reader = ImageReader(str(path))
    original_width, original_height = reader.getSize()
    scale = width / float(original_width)
    return width, original_height * scale


def styles() -> StyleSheet1:
    sheet = getSampleStyleSheet()
    sheet.add(ParagraphStyle(name="CoverKicker", parent=sheet["Normal"], fontName="Helvetica-Bold", fontSize=9, leading=11, textColor=ACCENT, spaceAfter=8))
    sheet.add(ParagraphStyle(name="CoverTitle", parent=sheet["Heading1"], fontName="Helvetica-Bold", fontSize=28, leading=31, textColor=INK, spaceAfter=10))
    sheet.add(ParagraphStyle(name="CoverSub", parent=sheet["BodyText"], fontName="Helvetica", fontSize=11.5, leading=16, textColor=MUTED, spaceAfter=18))
    sheet.add(ParagraphStyle(name="Meta", parent=sheet["BodyText"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=MUTED))
    sheet.add(ParagraphStyle(name="H1Compact", parent=sheet["Heading1"], fontName="Helvetica-Bold", fontSize=19, leading=23, textColor=INK, spaceAfter=7))
    sheet.add(ParagraphStyle(name="H2Compact", parent=sheet["Heading2"], fontName="Helvetica-Bold", fontSize=14.5, leading=18, textColor=INK, spaceBefore=6, spaceAfter=6))
    sheet.add(ParagraphStyle(name="H3Compact", parent=sheet["Heading3"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=INK, spaceBefore=2, spaceAfter=4))
    sheet.add(ParagraphStyle(name="BodyCompact", parent=sheet["BodyText"], fontName="Helvetica", fontSize=10.2, leading=14, textColor=MUTED, spaceAfter=6))
    sheet.add(ParagraphStyle(name="Chip", parent=sheet["BodyText"], fontName="Helvetica-Bold", fontSize=8.4, leading=10, textColor=INK, alignment=1))
    return sheet


STYLES = styles()


def paragraph(text: str, style_name: str, linkify: bool = False) -> Paragraph:
    text = safe_text(text)
    if linkify and re.match(r"^https?://", text):
        markup = f'<link href="{escape(text)}">{escape(text)}</link>'
    elif linkify and ": https://" in text:
        label, url = text.split(": ", 1)
        markup = f"{escape(label)}: <link href=\"{escape(url)}\">{escape(url)}</link>"
    else:
        markup = escape(text)
    return Paragraph(markup, STYLES[style_name])


def blocks_to_flowables(blocks: list[Block], style_name: str = "BodyCompact", linkify: bool = False):
    flowables = []
    for block in blocks:
        if block.kind == "paragraph":
            for item in block.items:
                flowables.append(paragraph(item, style_name, linkify=linkify))
        elif block.kind == "bullet":
            for item in block.items:
                flowables.append(paragraph(f"- {item}", style_name, linkify=linkify))
            flowables.append(Spacer(1, 4))
        elif block.kind == "number":
            for index, item in enumerate(block.items, start=1):
                flowables.append(paragraph(f"{index}. {item}", style_name, linkify=linkify))
            flowables.append(Spacer(1, 4))
    return flowables


def card(flowables, width: float, background=CANVAS, border=LINE):
    return Table(
        [[flowables]],
        colWidths=[width],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 1, border),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        ),
    )


def chip_row(items: list[str], total_width: float):
    col_width = total_width / max(len(items), 1)
    return Table(
        [[paragraph(item, "Chip") for item in items]],
        colWidths=[col_width] * len(items),
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), ACCENT_SOFT),
                ("BOX", (0, 0), (-1, -1), 1, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 1, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        ),
    )


def cover_story(doc_title: str, subtitle: str, descriptor: str, meta_items: list[str]):
    story = []
    if LOGO_PATH.exists():
        width, height = image_width_height(LOGO_PATH, 56 * mm)
        story.append(Image(str(LOGO_PATH), width=width, height=height))
        story.append(Spacer(1, 12))
    story.append(paragraph(descriptor.upper(), "CoverKicker"))
    story.append(paragraph(doc_title, "CoverTitle"))
    story.append(paragraph(subtitle, "CoverSub"))
    story.append(chip_row(meta_items, CONTENT_WIDTH))
    story.append(Spacer(1, 16))
    story.append(card([paragraph("Ananseum learner pack", "H3Compact"), paragraph("Participant-facing materials built from the latest course branch and formatted for before, during, and after the session.", "BodyCompact")], CONTENT_WIDTH, background=SURFACE))
    story.append(PageBreak())
    return story


def draw_page(canvas, doc, label: str):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.2)
    canvas.line(doc.leftMargin, PAGE_HEIGHT - 24, PAGE_WIDTH - doc.rightMargin, PAGE_HEIGHT - 24)
    canvas.drawString(doc.leftMargin, PAGE_HEIGHT - 18, label)
    canvas.line(doc.leftMargin, 20, PAGE_WIDTH - doc.rightMargin, 20)
    canvas.drawString(doc.leftMargin, 11, "Ananseum")
    canvas.drawRightString(PAGE_WIDTH - doc.rightMargin, 11, f"Page {doc.page}")
    canvas.restoreState()


def build_doc(path: Path, title: str, story):
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM, title=title, author="OpenAI Codex", subject="Ananseum learner pack")
    doc.build(story, onFirstPage=lambda canvas, d: draw_page(canvas, d, title), onLaterPages=lambda canvas, d: draw_page(canvas, d, title))


def build_course_guide():
    outline = parse_outline(read_markdown(CONTENT_DIR / "course-guide.md"))
    sections = section_map(outline)
    story = cover_story(
        "Course Guide",
        block_items_as_text(sections["Course"].blocks)[0],
        "Learner pack",
        ["2 days", "Approx. 8 contact hours", TODAY],
    )

    half_width = (CONTENT_WIDTH - 8) / 2
    audience_card = card([paragraph("Audience", "H3Compact"), *blocks_to_flowables(sections["Audience"].blocks)], half_width, background=CANVAS)
    prerequisites_card = card([paragraph("Prerequisites", "H3Compact"), *blocks_to_flowables(sections["Prerequisites"].blocks)], half_width, background=CANVAS)
    delivery_card = card([paragraph("Delivery mode", "H3Compact"), *blocks_to_flowables(sections["Delivery Mode"].blocks)], half_width, background=SURFACE)
    outputs_card = card([paragraph("Participant outputs", "H3Compact"), *blocks_to_flowables(sections["Participant Outputs"].blocks)], half_width, background=SURFACE)

    story.append(paragraph("At a glance", "H1Compact"))
    story.append(
        Table(
            [[audience_card, prerequisites_card], [delivery_card, outputs_card]],
            colWidths=[half_width, half_width],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            ),
        )
    )

    story.append(paragraph("What this course is", "H2Compact"))
    story.extend(blocks_to_flowables(sections["What This Course Is"].blocks))
    story.append(paragraph("What this course is not", "H2Compact"))
    story.extend(blocks_to_flowables(sections["What This Course Is Not"].blocks))

    course_arc = sections["Course Arc"]
    day_cards = [
        card([paragraph(subsection.title, "H3Compact"), *blocks_to_flowables(subsection.blocks)], half_width, background=CANVAS)
        for subsection in course_arc.subsections
    ]
    story.append(Spacer(1, 10))
    story.append(paragraph("Two-day pacing", "H1Compact"))
    story.append(
        Table(
            [[day_cards[0], day_cards[1]]],
            colWidths=[half_width, half_width],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]),
        )
    )

    story.append(Spacer(1, 10))
    story.append(card([paragraph("Learning outcomes", "H3Compact"), *blocks_to_flowables(sections["Learning Outcomes"].blocks)], CONTENT_WIDTH, background=SURFACE))
    story.append(Spacer(1, 8))
    story.append(card([paragraph("Governance thread", "H3Compact"), *blocks_to_flowables(sections["Governance Thread"].blocks)], CONTENT_WIDTH, background=ACCENT_SOFT))
    story.append(Spacer(1, 8))
    story.append(card([paragraph("How to use this learner pack", "H3Compact"), *blocks_to_flowables(sections["How To Use This Learner Pack"].blocks)], CONTENT_WIDTH, background=CANVAS))

    build_doc(OUTPUT_DIR / "course-guide.pdf", "Course Guide", story)


def build_module_summaries():
    outline = parse_outline(read_markdown(CONTENT_DIR / "module-summaries.md"))
    story = cover_story(
        "Module Summaries",
        "Compact review pages for the seven core course chapters.",
        "Learner pack",
        ["7 chapter summaries", "Post-session reference", TODAY],
    )
    story.extend(blocks_to_flowables(outline.intro))

    for index, section in enumerate(outline.sections):
        if index:
            story.append(PageBreak())
        subs = subsection_map(section)
        day_duration = block_items_as_text(subs["Day and duration"].blocks)
        focus_text = " ".join(block_items_as_text(subs["Focus"].blocks))
        practice_text = " ".join(block_items_as_text(subs["Learner practice"].blocks))
        takeaway_text = " ".join(block_items_as_text(subs["Takeaway"].blocks))

        story.append(paragraph(section.title, "H1Compact"))
        story.append(chip_row(day_duration, CONTENT_WIDTH))
        story.append(Spacer(1, 10))
        story.append(card([paragraph("Focus", "H3Compact"), paragraph(focus_text, "BodyCompact")], CONTENT_WIDTH, background=SURFACE))
        story.append(Spacer(1, 8))
        story.append(card([paragraph("Key ideas", "H3Compact"), *blocks_to_flowables(subs["Key ideas"].blocks)], CONTENT_WIDTH, background=CANVAS))
        story.append(Spacer(1, 8))
        story.append(card([paragraph("Learner practice", "H3Compact"), paragraph(practice_text, "BodyCompact")], CONTENT_WIDTH, background=SURFACE))
        story.append(Spacer(1, 8))
        story.append(card([paragraph("Takeaway", "H3Compact"), paragraph(takeaway_text, "BodyCompact")], CONTENT_WIDTH, background=ACCENT_SOFT))

    build_doc(OUTPUT_DIR / "module-summaries.pdf", "Module Summaries", story)


def review_rubric_table():
    rows = [
        ["Dimension", "1", "2", "3", "Notes"],
        ["Task clarity", "", "", "", ""],
        ["Plan quality", "", "", "", ""],
        ["Validation evidence", "", "", "", ""],
        ["Diff reviewability", "", "", "", ""],
        ["Approval posture", "", "", "", ""],
    ]
    return Table(
        rows,
        colWidths=[CONTENT_WIDTH * 0.34, CONTENT_WIDTH * 0.08, CONTENT_WIDTH * 0.08, CONTENT_WIDTH * 0.08, CONTENT_WIDTH * 0.42],
        rowHeights=[20, 24, 24, 24, 24, 24],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), CANVAS),
                ("BOX", (0, 0), (-1, -1), 1, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 1, LINE),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
                ("TEXTCOLOR", (0, 0), (-1, -1), MUTED),
                ("FONTSIZE", (0, 0), (-1, -1), 8.7),
                ("LEADING", (0, 0), (-1, -1), 11),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        ),
    )


def build_exercise_workbook():
    outline = parse_outline(read_markdown(CONTENT_DIR / "exercise-workbook.md"))
    sections = section_map(outline)
    story = cover_story(
        "Exercise Workbook",
        "Discussion prompts, review rubrics, and space to capture group outputs.",
        "Worksheet",
        ["7 activities", "Workshop use", TODAY],
    )
    story.append(paragraph("How to use this workbook", "H1Compact"))
    story.extend(blocks_to_flowables(sections["How To Use This Workbook"].blocks))
    story.append(Spacer(1, 6))
    story.append(card([paragraph("Completion standard", "H3Compact"), *blocks_to_flowables(sections["Completion Standard"].blocks)], CONTENT_WIDTH, background=CANVAS))

    activity_sections = [section for section in outline.sections if section.title.startswith("Activity ")]
    for activity in activity_sections:
        story.append(PageBreak())
        meta = parse_label_values(activity.blocks)
        subs = subsection_map(activity)
        meta_items = [meta.get("module", "Module"), meta.get("time", "Time"), meta.get("format", "Format")]
        story.append(paragraph(activity.title, "H1Compact"))
        story.append(chip_row(meta_items, CONTENT_WIDTH))
        story.append(Spacer(1, 10))
        story.append(card([paragraph("Prompt", "H3Compact"), *blocks_to_flowables(subs["Prompt"].blocks)], CONTENT_WIDTH, background=SURFACE))
        story.append(Spacer(1, 8))
        story.append(card([paragraph("Expected output", "H3Compact"), *blocks_to_flowables(subs["Expected output"].blocks)], CONTENT_WIDTH, background=CANVAS))
        story.append(Spacer(1, 8))
        story.append(card([paragraph("Success criteria", "H3Compact"), *blocks_to_flowables(subs["Success criteria"].blocks)], CONTENT_WIDTH, background=SURFACE))
        story.append(Spacer(1, 8))
        story.append(card([paragraph("Debrief questions", "H3Compact"), *blocks_to_flowables(subs["Debrief questions"].blocks)], CONTENT_WIDTH, background=CANVAS))
        if "Codex Review Loop" in activity.title:
            story.append(Spacer(1, 8))
            story.append(paragraph("Review rubric", "H2Compact"))
            story.append(review_rubric_table())
        story.append(Spacer(1, 10))
        story.append(RuledBox(CONTENT_WIDTH, 92 * mm, lines=7, title="Group notes"))

    build_doc(OUTPUT_DIR / "exercise-workbook.pdf", "Exercise Workbook", story)


def labeled_field(canvas: pdf_canvas.Canvas, form, x: float, y: float, width: float, height: float, label: str, name: str, multiline: bool = False):
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 9.2)
    canvas.drawString(x, y + height + 6, label)
    flags = "multiline" if multiline else ""
    form.textfield(
        name=name,
        tooltip=label,
        x=x,
        y=y,
        width=width,
        height=height,
        borderStyle="solid",
        borderColor=LINE,
        fillColor=CANVAS,
        textColor=INK,
        forceBorder=True,
        fontName="Helvetica",
        fontSize=10,
        fieldFlags=flags,
    )


def draw_checkboxes(canvas: pdf_canvas.Canvas, form, title: str, options: list[str], x: float, y: float, spacing: float, prefix: str):
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 9.2)
    canvas.drawString(x, y + 22, title)
    current_x = x
    for option in options:
        form.checkbox(
            name=f"{prefix}_{option.lower()}",
            tooltip=option,
            x=current_x,
            y=y,
            size=12,
            borderColor=LINE,
            fillColor=CANVAS,
            textColor=INK,
            buttonStyle="check",
        )
        canvas.setFont("Helvetica", 9)
        canvas.setFillColor(MUTED)
        canvas.drawString(current_x + 18, y + 2, option)
        current_x += spacing


def draw_blueprint_page_header(canvas: pdf_canvas.Canvas, title: str, subtitle: str):
    canvas.saveState()
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_HEIGHT - 18, PAGE_WIDTH, 18, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 24)
    canvas.drawString(MARGIN_X, PAGE_HEIGHT - 48, title)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 10.5)
    canvas.drawString(MARGIN_X, PAGE_HEIGHT - 64, subtitle)
    canvas.setStrokeColor(LINE)
    canvas.line(MARGIN_X, PAGE_HEIGHT - 76, PAGE_WIDTH - MARGIN_X, PAGE_HEIGHT - 76)
    canvas.restoreState()


def build_pilot_blueprint():
    output_path = OUTPUT_DIR / "pilot-blueprint-template.pdf"
    canvas = pdf_canvas.Canvas(str(output_path), pagesize=A4)
    canvas.setTitle("Pilot Blueprint Template")
    canvas.setAuthor("OpenAI Codex")
    form = canvas.acroForm

    left_x = MARGIN_X
    right_x = PAGE_WIDTH / 2 + 6
    half_width = CONTENT_WIDTH / 2 - 6

    draw_blueprint_page_header(canvas, "Pilot Blueprint Template", "Fill in one practical AI pilot that is narrow, governable, and measurable.")
    canvas.setFont("Helvetica", 9.3)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_X, PAGE_HEIGHT - 92, "Use this template to define a pilot that is useful enough to matter and small enough to stop safely.")

    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 146, half_width, 22, "Pilot name", "pilot_name")
    labeled_field(canvas, form, right_x, PAGE_HEIGHT - 146, half_width, 22, "Business owner or sponsor", "business_owner")
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 238, CONTENT_WIDTH, 62, "Problem statement", "problem_statement", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 330, CONTENT_WIDTH, 62, "Current workflow", "current_workflow", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 422, CONTENT_WIDTH, 62, "Proposed AI role", "ai_role", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 482, half_width, 22, "Primary users", "primary_users")
    draw_checkboxes(canvas, form, "Data sensitivity classification", ["Public", "Internal", "Confidential", "Regulated"], right_x, PAGE_HEIGHT - 490, 84, "data_class")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.3)
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 11, "Page 1")
    canvas.showPage()

    draw_blueprint_page_header(canvas, "Pilot Blueprint Template", "Document the context, controls, and measures before the workflow expands.")
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 160, CONTENT_WIDTH, 68, "Inputs and context sources", "context_sources", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 256, CONTENT_WIDTH, 68, "Tools, platforms, and integrations", "tools_platforms", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 352, CONTENT_WIDTH, 68, "Human review and approvals", "approvals", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 458, CONTENT_WIDTH, 76, "Risks and controls", "risks_controls", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 564, CONTENT_WIDTH, 54, "Success metrics", "success_metrics", multiline=True)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.3)
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 11, "Page 2")
    canvas.showPage()

    draw_blueprint_page_header(canvas, "Pilot Blueprint Template", "Define the decision rule, fallback, and near-term next steps.")
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 168, CONTENT_WIDTH, 60, "Go or no-go threshold", "go_no_go", multiline=True)
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 268, CONTENT_WIDTH, 60, "Rollback or containment plan", "rollback_plan", multiline=True)
    draw_checkboxes(canvas, form, "Budget and effort estimate", ["Low", "Medium", "High"], left_x, PAGE_HEIGHT - 326, 96, "budget")
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 414, CONTENT_WIDTH, 60, "Adoption and change management", "change_management", multiline=True)
    third_width = CONTENT_WIDTH / 3 - 6
    labeled_field(canvas, form, left_x, PAGE_HEIGHT - 496, third_width, 72, "30 days", "next_30", multiline=True)
    labeled_field(canvas, form, left_x + CONTENT_WIDTH / 3, PAGE_HEIGHT - 496, third_width, 72, "60 days", "next_60", multiline=True)
    labeled_field(canvas, form, left_x + (2 * CONTENT_WIDTH / 3), PAGE_HEIGHT - 496, third_width, 72, "90 days", "next_90", multiline=True)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.3)
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 11, "Page 3")
    canvas.save()


def build_resource_sheet():
    outline = parse_outline(read_markdown(CONTENT_DIR / "resource-sheet.md"))
    sections = section_map(outline)
    story = cover_story(
        "Resource Sheet",
        "Official docs, implementation references, and practical follow-up material.",
        "Resource",
        ["Official links", "Post-course follow-up", TODAY],
    )

    if outline.intro:
        story.append(card([paragraph(outline.intro[0].items[0], "BodyCompact")], CONTENT_WIDTH, background=ACCENT_SOFT))
        story.append(Spacer(1, 8))

    half_width = (CONTENT_WIDTH - 8) / 2
    openai_card = card([paragraph("OpenAI and Codex docs", "H3Compact"), *blocks_to_flowables(sections["OpenAI and Codex Docs"].blocks, linkify=True)], half_width, background=SURFACE)
    openclaw_card = card([paragraph("OpenClaw docs", "H3Compact"), *blocks_to_flowables(sections["OpenClaw Docs"].blocks, linkify=True)], half_width, background=CANVAS)
    story.append(
        Table(
            [[openai_card, openclaw_card]],
            colWidths=[half_width, half_width],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]),
        )
    )
    story.append(Spacer(1, 8))

    for section_title in [
        "What To Review After The Course",
        "Suggested Implementation Artifacts",
        "Practical Follow-Up References",
        "First 30 Days After The Course",
    ]:
        background = SURFACE if section_title in {"What To Review After The Course", "First 30 Days After The Course"} else CANVAS
        story.append(card([paragraph(section_title, "H3Compact"), *blocks_to_flowables(sections[section_title].blocks)], CONTENT_WIDTH, background=background))
        story.append(Spacer(1, 8))

    build_doc(OUTPUT_DIR / "resource-sheet.pdf", "Resource Sheet", story)


def copy_outputs():
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    for pdf_file in OUTPUT_DIR.glob("*.pdf"):
        shutil.copy2(pdf_file, PUBLIC_DIR / pdf_file.name)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    build_course_guide()
    build_module_summaries()
    build_exercise_workbook()
    build_pilot_blueprint()
    build_resource_sheet()
    copy_outputs()
    for pdf_file in sorted(OUTPUT_DIR.glob("*.pdf")):
        print(f"Generated {pdf_file.name}")


if __name__ == "__main__":
    main()
