import SEO from '../components/SEO';
import ProcessTimeline from '../components/ProcessTimeline';
import CTASection from '../components/CTASection';
import { PROCESS_STEPS } from '../data';
import { ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Process() {
  const deliveryDays = [
    {
      day: 'DAY 1',
      title: 'Discovery & Strategy',
      items: [
        'Project kickoff & requirement deep dive',
        'Business goals alignment',
        'Competitor & market research',
        'Project roadmap'
      ]
    },
    {
      day: 'DAY 2',
      title: 'Planning & Wireframing',
      items: [
        'Information architecture',
        'User flow',
        'Website structure',
        'Wireframes',
        'Content structure planning'
      ]
    },
    {
      day: 'DAY 3',
      title: 'Design & Prototyping',
      items: [
        'UI/UX design',
        'Visual direction',
        'Interactive prototype',
        'Client review & approval'
      ]
    },
    {
      day: 'DAY 4',
      title: 'Front-End Development',
      items: [
        'Responsive front-end development',
        'Core website functionality',
        'CMS integration where required',
        'Cross-browser/device compatibility'
      ]
    },
    {
      day: 'DAY 5',
      title: 'Back-End & Integrations',
      items: [
        'Backend development',
        'Database integration',
        'API integrations',
        'Forms, CRM and third-party integrations',
        'Security configuration'
      ]
    },
    {
      day: 'DAY 6',
      title: 'Testing & Optimization',
      items: [
        'Functional testing',
        'Mobile responsiveness testing',
        'Bug fixing',
        'Speed optimization',
        'Basic technical SEO',
        'Final quality assurance'
      ]
    },
    {
      day: 'DAY 7',
      title: 'Launch & Handover',
      items: [
        'Website deployment',
        'Domain/hosting configuration where applicable',
        'Analytics/tracking setup',
        'Final review',
        'Client handover',
        'Post-launch support'
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Our Process — YUGARK Digital Methodology" 
        description="A clear five-step path from idea to growth. Discover how YUGARK executes digital transformations with speed and precision." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            METHODOLOGY & EXECUTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            A clear path from vision to market dominance.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            We eliminate chaos and delays with a structured five-stage delivery model honed across multi-million dollar projects.
          </p>
        </section>

        {/* 5 Step Timeline Section */}
        <ProcessTimeline />

        {/* 7-Day Delivery Timeline Breakdown */}
        <section className="py-24 bg-[#050505] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
                DELIVERY TIMELINE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                How we execute in 7 days or less.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
              {deliveryDays.map((dayPlan, idx) => (
                <motion.div
                  key={dayPlan.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className={`p-3.5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#D4B06A]/40 transition-all space-y-2.5 sm:space-y-4 flex flex-col justify-between group gold-border-glow ${
                    idx === 6 ? 'col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-1' : ''
                  }`}
                >
                  <div className="space-y-1.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#F0D28F] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#D4B06A]/10 border border-[#D4B06A]/30">
                        {dayPlan.day}
                      </span>
                    </div>
                    <h3 className="font-serif text-xs sm:text-xl font-medium text-white group-hover:text-[#F0D28F] transition-colors leading-snug">
                      {dayPlan.title}
                    </h3>
                  </div>

                  <ul className="space-y-1 sm:space-y-2 pt-2 sm:pt-3 border-t border-neutral-900/80">
                    {dayPlan.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-400 font-sans font-light leading-relaxed">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4B06A] mt-0.5 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Guarantees */}
        <section className="py-20 bg-[#080808] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-semibold">
                QUALITY GUARANTEES
              </span>
              <h2 className="font-serif text-3xl text-white">The YUGARK Execution Benchmark</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 space-y-4 text-center">
                <Clock className="w-8 h-8 text-[#D4B06A] mx-auto" />
                <h3 className="font-serif text-xl text-white">On-Time Delivery SLA</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every milestone is backed by a strict delivery timeline. No missed launch dates or endless revisions.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 space-y-4 text-center">
                <Award className="w-8 h-8 text-[#D4B06A] mx-auto" />
                <h3 className="font-serif text-xl text-white">95+ Lighthouse Score</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We write clean, zero-bloat code to ensure mobile site load times stay under 1.2 seconds.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/5 space-y-4 text-center">
                <ShieldCheck className="w-8 h-8 text-[#D4B06A] mx-auto" />
                <h3 className="font-serif text-xl text-white">Strict IP & Confidentiality</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All custom code, AI models, and strategic assets belong 100% to your company from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
