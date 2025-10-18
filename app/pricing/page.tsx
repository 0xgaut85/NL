'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const HeroInfinityPricing = dynamic(() => import('@/components/HeroInfinityPricing'), { ssr: false })

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black border-b border-white/10 px-4 md:px-8 py-4 md:py-6 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Image 
                src="/logo3.svg" 
                alt="no limit Logo" 
                width={240} 
                height={240}
                className="object-contain w-[120px] md:w-[180px] lg:w-[240px]"
              />
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex gap-8 font-mono text-sm">
            {['About', 'Model', 'Pricing', 'Roadmap', 'Docs'].map((item, i) => (
              <motion.a
                key={item}
                href={item === 'About' ? '/' : item === 'Pricing' ? '/pricing' : item === 'Model' ? '/model' : item === 'Roadmap' ? '/roadmap' : item === 'Docs' ? '/docs' : '/'}
                className={`hover:text-[#7fff00] transition-colors bracket-text ${item === 'Pricing' ? 'text-[#7fff00]' : ''}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          
          <div className="hidden md:flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-4 py-2 md:px-6 font-mono text-xs md:text-sm font-bold hover:bg-[#7fff00] transition-colors whitespace-nowrap"
            >
              Request Beta Access
            </motion.button>
            <Link href="/swap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7fff00] text-black px-4 py-2 md:px-6 font-mono text-xs md:text-sm font-bold hover:bg-[#2d5a3d] hover:text-white transition-colors whitespace-nowrap"
              >
                nolimit Swap
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero */}
        <HeroInfinityPricing />

        {/* Pricing Cards */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-gradient-to-b from-white to-[#f8faf8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
              
              {/* Starter */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                className="bg-white border-2 border-[#e8f5e6] shadow-lg hover:shadow-2xl transition-shadow duration-500 p-10 md:p-12 flex flex-col h-full relative overflow-hidden group"
              >
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f8faf8] to-transparent opacity-50 -z-10" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#b8d1b3]/10 rounded-full blur-2xl group-hover:bg-[#b8d1b3]/20 transition-all duration-500" />
              
                <div className="mb-10 relative z-10">
                  <motion.div 
                    className="text-xs font-mono text-[#98ad95] mb-4 uppercase tracking-widest"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Trial
                  </motion.div>
                  <motion.h3 
                    className="text-5xl md:text-6xl font-bold text-[#2d5a3d] mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Free
                  </motion.h3>
                  <p className="text-black/60 text-base">30-day evaluation period</p>
                </div>

                <div className="mb-10 flex-1 relative z-10">
                  <ul className="space-y-4">
                    {[
                      '30-day full access',
                      'Complete model download',
                      'Zero content filters',
                      '32K context window',
                      'Community support'
                    ].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (i * 0.05) }}
                        className="flex items-start gap-3 text-black/80 text-base"
                      >
                        <span className="text-[#b8d1b3] mt-0.5 text-xl">✓</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative z-10 border-2 border-[#2d5a3d] text-[#2d5a3d] px-10 py-5 font-mono font-bold text-lg hover:bg-[#2d5a3d] hover:text-white transition-all w-full shadow-md hover:shadow-lg"
                >
                  Download Trial
                </motion.button>
              </motion.div>

              {/* no limit */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-[#2d5a3d] via-[#2d5a3d] to-[#1a3d28] border-2 border-[#7fff00]/60 shadow-2xl hover:shadow-[#7fff00]/20 hover:shadow-[0_0_40px_rgba(127,255,0,0.3)] transition-all duration-500 p-10 md:p-12 flex flex-col h-full text-white relative"
              >
                <div className="mb-10 relative z-10">
                  <motion.div 
                    className="text-xs font-mono text-[#b8d1b3] mb-4 uppercase tracking-widest"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                  >
                    no limit
                  </motion.div>
                  <motion.h3 
                    className="text-5xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                  >
                    $150<span className="text-2xl text-white/50 font-normal">/mo</span>
                  </motion.h3>
                  <p className="text-white/80 text-base">Total freedom & privacy</p>
                </div>

                <div className="mb-10 flex-1 relative z-10">
                  <ul className="space-y-5">
                    {[
                      { text: 'Lifetime license', highlight: false },
                      { text: 'Runs on your hardware', highlight: true },
                      { text: 'Complete data privacy & control', highlight: true },
                      'Free updates for 1 year',
                      'Priority support & technical assistance'
                    ].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 + (i * 0.08) }}
                        className={`flex items-start gap-3 text-base md:text-lg ${typeof feature === 'object' && feature.highlight ? 'text-[#7fff00] font-bold' : 'text-white/90'}`}
                      >
                        <span className="text-[#7fff00] mt-0.5 text-xl font-bold">✓</span>
                        <span>{typeof feature === 'object' ? feature.text : feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative z-10 bg-white text-[#2d5a3d] px-10 py-5 font-mono font-bold text-lg hover:bg-[#7fff00] transition-all w-full shadow-md hover:shadow-lg"
                >
                  Purchase License
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ/Features */}
        <section className="py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 md:mb-20 text-center px-4 md:px-8 relative"
            >
              {/* Radar Illustration Behind Title */}
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] opacity-100 pointer-events-none -z-10">
                <Image 
                  src="/illustration/radar.png"
                  alt="Privacy Radar"
                  fill
                  className="object-contain"
                />
              </div>

              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d5a3d] mb-6 font-mono bracket-text relative z-10"
              >
                Why choose no limit?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-black/60 max-w-3xl mx-auto relative z-10"
              >
                Self-hosting gives you control, privacy, and freedom that cloud solutions can&apos;t match
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2">
              {/* Left Side - Green Background */}
              <motion.div 
                className="bg-[#b3ceb0] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                    {
                      title: 'Ultimate Privacy',
                      desc: 'Your data never leaves your infrastructure. Perfect for sensitive applications, medical data, legal work, or classified information.'
                    },
                    {
                      title: 'Zero Latency',
                      desc: 'Run models on your own hardware for instant responses. No network overhead, no external API calls, no waiting.'
                    },
                    {
                      title: 'Compliance Ready',
                      desc: 'Meet GDPR, HIPAA, SOC2, and other regulatory requirements by keeping all data on-premise and under your control.'
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-12 last:mb-0"
                    >
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">{item.title}</h3>
                      <p className="text-black/80 text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
              </motion.div>

              {/* Right Side - White Background */}
              <motion.div 
                className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                  {
                    title: 'Cost Savings at Scale',
                    desc: 'For high-volume use cases, self-hosting eliminates per-request costs. Process millions of queries without incremental fees.'
                  },
                  {
                    title: 'Air-Gapped Deployment',
                    desc: 'Deploy in secure, offline environments. Military, government, and enterprise applications that require complete isolation.'
                  },
                  {
                    title: 'Full Customization',
                    desc: 'Modify, fine-tune, and optimize the model for your specific use case. Your environment, your rules, your optimizations.'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.2 + (i * 0.15), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 last:mb-0"
                  >
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">{item.title}</h3>
                    <p className="text-black/80 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black py-8 md:py-12 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <Link href="/">
                <div className="flex items-center gap-2 mb-4">
                  <Image 
                    src="/logo3.svg" 
                    alt="no limit Logo" 
                    width={180} 
                    height={180}
                    className="object-contain w-[120px] md:w-[150px] lg:w-[180px]"
                  />
                </div>
              </Link>
              <p className="text-sm opacity-70 leading-relaxed">
                Redefining what AI can and should be.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Model', 'Pricing', 'Roadmap', 'Status']
              },
              {
                title: 'Developers',
                links: ['Documentation', 'Setup Guide', 'Quickstart', 'Examples']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Contact', 'Careers']
              }
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-sm mb-4 bracket-text">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-sm opacity-70 hover:opacity-100 hover:text-[#7fff00] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm opacity-50 font-mono text-center md:text-left">
              © 2025 no limit. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm opacity-50 flex-wrap justify-center">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

