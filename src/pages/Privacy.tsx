import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy | YUGARK Digital Studio" description="YUGARK Digital Studio Privacy Policy and Data Protection Standards." />

      <main className="pt-32 pb-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-neutral-300">
          <Link to="/" className="text-xs uppercase tracking-widest text-[#D4B06A] hover:underline font-semibold">
            ← Back to Home
          </Link>

          <h1 className="font-serif text-4xl sm:text-5xl text-white">Privacy Policy</h1>
          <p className="text-xs text-neutral-500">Last updated: August 2026</p>

          <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-6">
            <p>
              At YUGARK ("we", "our", "us"), respecting your privacy and protecting client data is fundamental to our corporate principles. This Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our web platform or engage our digital growth services.
            </p>

            <h3 className="font-serif text-xl text-white pt-4">1. Information We Collect</h3>
            <p>
              When you submit a project inquiry or schedule a consultation, we collect information including your name, corporate email address, phone number, company name, industry, budget range, and project requirements.
            </p>

            <h3 className="font-serif text-xl text-white pt-4">2. Use of Information</h3>
            <p>
              We use your information exclusively to evaluate project feasibility, prepare custom growth proposals, communicate regarding active deliverables, and improve our web performance.
            </p>

            <h3 className="font-serif text-xl text-white pt-4">3. Data Security & Confidentiality</h3>
            <p>
              We implement industry-standard encryption protocols. We do not sell, rent, or trade your personal or business data to third parties under any circumstances.
            </p>

            <h3 className="font-serif text-xl text-white pt-4">4. Founder Contact</h3>
            <p>
              For privacy-related inquiries, please contact Founder Mr. Radha Krishna directly at <a href="mailto:business@yugark.in" className="text-[#D4B06A] hover:underline font-semibold">business@yugark.in</a> or via WhatsApp at <a href="https://wa.me/919125205132" className="text-[#25D366] hover:underline font-semibold">+91 9125205132</a>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
