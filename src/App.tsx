import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import AmbientBackground from './components/AmbientBackground';

import Home from './pages/Home';
import Services from './pages/Services';
import WebsiteDev from './pages/services/WebsiteDev';
import SocialMedia from './pages/services/SocialMedia';
import AiContent from './pages/services/AiContent';
import Advertising from './pages/services/Advertising';
import ContentStrategy from './pages/services/ContentStrategy';
import GrowthStrategy from './pages/services/GrowthStrategy';
import Work from './pages/Work';
import Process from './pages/Process';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Admin from './pages/Admin';
import TemplateDetail from './pages/TemplateDetail';
import NotFound from './pages/NotFound';

function PageRoutes() {
  const location = useLocation();

  // Smooth cinematic page entrance & exit transition
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ 
          duration: 0.42, 
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          
          {/* Services Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/website-development" element={<WebsiteDev />} />
          <Route path="/services/social-media-management" element={<SocialMedia />} />
          <Route path="/services/individual-post" element={<SocialMedia />} />
          <Route path="/services/monthly-posts" element={<SocialMedia />} />
          <Route path="/services/monthly-reels" element={<AiContent />} />
          <Route path="/services/youtube-content" element={<AiContent />} />
          <Route path="/services/ai-content-video" element={<AiContent />} />
          <Route path="/services/ai-creative-strategy" element={<AiContent />} />
          <Route path="/services/social-media-advertising" element={<Advertising />} />
          <Route path="/services/content-strategy" element={<ContentStrategy />} />
          <Route path="/services/digital-growth-strategy" element={<GrowthStrategy />} />
          
          {/* Work / Portfolio / Case Studies */}
          <Route path="/work" element={<Work />} />
          <Route path="/portfolio" element={<Work />} />
          <Route path="/case-studies" element={<Work />} />
          
          {/* Templates Dedicated Routes */}
          <Route path="/templates" element={<TemplateDetail />} />
          <Route path="/templates/:id" element={<TemplateDetail />} />
          <Route path="/template/:id" element={<TemplateDetail />} />

          {/* Core Pages */}
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Admin Enquiry Management */}
          <Route path="/admin" element={<Admin />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <AmbientBackground />
        <div className="relative z-10 min-h-screen flex flex-col bg-[#050505]/40 text-[#EAEAEA] selection:bg-[#D4B06A]/30 selection:text-[#F0D28F]">
          <Navbar />
          
          <div className="flex-grow">
            <PageRoutes />
          </div>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

