"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="site-shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', minHeight: '100vh' }}>
      <div className="hero-brand-block" style={{ maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
        <div className="brand-mark-wrap" style={{ justifyContent: 'center' }}>
          <Image src="/brand/ananseum-wordmark-dark.svg" alt="Ananseum" width={320} height={88} className="brand-wordmark" />
        </div>
        <h2>Something went wrong!</h2>
        <p className="muted">We encountered an unexpected error while loading this page.</p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <button className="primary-action" onClick={() => reset()}>Try again</button>
          <Link href="/" className="secondary-action">Return Home</Link>
        </div>
      </div>
    </div>
  );
}
