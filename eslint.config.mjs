import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "ai_masterclass_2026/**"],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default config;
