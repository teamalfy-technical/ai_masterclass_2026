import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="site-shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', minHeight: '100vh' }}>
      <div className="hero-brand-block" style={{ maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
        <div className="brand-mark-wrap" style={{ justifyContent: 'center' }}>
          <Image src="/brand/ananseum-wordmark-dark.svg" alt="Ananseum" width={320} height={88} className="brand-wordmark" />
        </div>
        <h2>Page Not Found</h2>
        <p className="muted">The requested course module or resource could not be found.</p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <Link href="/" className="primary-action">Return Home</Link>
          <Link href="/downloads" className="secondary-action">Go to Downloads</Link>
        </div>
      </div>
    </div>
  );
}
