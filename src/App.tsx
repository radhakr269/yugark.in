import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

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
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#050505] text-[#EAEAEA] selection:bg-[#D4B06A]/30 selection:text-[#F0D28F]">
          <Navbar />
          
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Services Routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/website-development" element={<WebsiteDev />} />
              <Route path="/services/social-media-management" element={<SocialMedia />} />
              <Route path="/services/ai-content-video" element={<AiContent />} />
              <Route path="/services/social-media-advertising" element={<Advertising />} />
              <Route path="/services/content-strategy" element={<ContentStrategy />} />
              <Route path="/services/digital-growth-strategy" element={<GrowthStrategy />} />
              
              {/* Work / Portfolio / Case Studies */}
              <Route path="/work" element={<Work />} />
              <Route path="/portfolio" element={<Work />} />
              <Route path="/case-studies" element={<Work />} />
              
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
          </div>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
