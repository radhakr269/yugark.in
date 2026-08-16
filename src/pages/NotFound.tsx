import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <SEO title="404 Page Not Found — YUGARK" description="The page you are looking for does not exist on YUGARK." />

      <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-24 bg-[#050505]">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#121212] border border-[#D4B06A]/30 flex items-center justify-center text-[#F0D28F]">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
          </div>

          <span className="font-serif text-6xl font-bold gold-gradient-text">404</span>

          <h1 className="font-serif text-3xl text-white">Page Not Found</h1>

          <p className="text-xs text-neutral-400 leading-relaxed">
            The page or digital path you are seeking does not exist or has been relocated within the YUGARK ecosystem.
          </p>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
