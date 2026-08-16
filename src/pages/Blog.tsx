import { useState } from 'react';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { Search, ArrowUpRight, X, Clock, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CTASection from '../components/CTASection';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Websites', 'AI', 'Growth', 'Social Media', 'SEO', 'Content'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <SEO 
        title="Blog & Insights — YUGARK" 
        description="Strategic insights on luxury website development, AI video production, social media algorithms, and digital growth." 
      />

      <main className="pt-32 pb-24 bg-[#050505]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#D4B06A]">
            EDITORIAL & INSIGHTS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            Digital growth intelligence.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Deep dives into modern web engineering, promotional video production, and business growth written by Founder Mr. Radha Krishna.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="max-w-xl mx-auto pt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles on websites, AI, growth..." 
                className="w-full pl-11 pr-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4B06A] transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#181818] text-[#F0D28F] border border-[#D4B06A]'
                      : 'bg-[#0E0E0E] text-neutral-400 border border-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Post Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#D4B06A]/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#F0D28F] border border-[#D4B06A]/30">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-4 text-[10px] text-neutral-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#D4B06A]" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#D4B06A]" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#F0D28F] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#D4B06A] group-hover:text-[#F0D28F] font-semibold pt-4 border-t border-white/5 w-full justify-between cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-[#D4B06A]/40 shadow-2xl gold-glow-subtle my-8"
              >
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-widest text-[#F0D28F] font-semibold">
                    {activeArticle.category} / YUGARK Insights
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                    {activeArticle.title}
                  </h2>

                  <div className="flex items-center space-x-4 text-xs text-neutral-400 pb-4 border-b border-white/10">
                    <span className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4B06A]" />
                      <span>{activeArticle.author}</span>
                    </span>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-64">
                    <img 
                      src={activeArticle.coverImage} 
                      alt={activeArticle.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="text-sm text-neutral-300 leading-relaxed space-y-4 font-sans font-light whitespace-pre-line">
                    {activeArticle.content}
                  </div>

                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Written by Founder Mr. Radha Krishna</span>
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        window.location.href = '/contact';
                      }}
                      className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider"
                    >
                      Discuss Growth Strategy
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <CTASection />
      </main>
    </>
  );
}
