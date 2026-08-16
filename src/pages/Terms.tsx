import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions — YUGARK" description="YUGARK Terms & Conditions and Service Agreements." />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-neutral-300">
          <Link to="/" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline">
            ← Back to Home
          </Link>

          <h1 className="font-serif text-4xl sm:text-5xl text-white">Terms & Conditions</h1>
          <p className="text-xs text-neutral-500">Last updated: August 10, 2026</p>

          <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-6">
            <p>
              Welcome to YUGARK. By accessing our website or retaining our digital agency services, you agree to comply with and be bound by the following Terms and Conditions.
            </p>

            <h3 className="font-serif text-xl text-white pt-4">1. Scope of Services</h3>
            <p>
              YUGARK provides custom website development, social media management, AI video content, social media advertising, content strategy, and digital growth consulting as defined in executed client Master Service Agreements (MSA).
            </p>

            <h3 className="font-serif text-xl text-white pt-4">2. Intellectual Property Ownership</h3>
            <p>
              Upon full settlement of agreed project fees, all final custom source code, graphic designs, AI video assets, and content strategies created specifically for the client become 100% the property of the client.
            </p>

            <h3 className="font-serif text-xl text-white pt-4">3. Limitation of Liability</h3>
            <p>
              YUGARK executes all work to the highest professional standards, but guarantees no specific financial or revenue outcomes beyond defined technical SLAs.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
