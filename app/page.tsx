'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

// Dynamically import Three.js component to avoid SSR issues
const HeroAurora = dynamic(() => import('../components/HeroInfinity'), {
  ssr: false,
})

export default function Home() {
  const carouselControls = useAnimation()
  
  useEffect(() => {
    carouselControls.start({
      x: [0, -1600],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    })
  }, [carouselControls])

  const handleMouseEnter = () => {
    carouselControls.stop()
  }

  const handleMouseLeave = () => {
    carouselControls.start({
      x: [0, -1600],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    })
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black py-4 md:py-6 px-4 md:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Image 
              src="/logo3.svg" 
              alt="NoLimit Logo" 
              width={240} 
              height={240}
              className="object-contain w-[120px] md:w-[180px] lg:w-[240px]"
            />
          </motion.div>
          
          <nav className="hidden md:flex gap-8 font-mono text-sm">
            {['About', 'Model', 'Pricing', 'Roadmap', 'Docs'].map((item, i) => (
              <motion.a
                key={item}
                href={item === 'About' ? '/' : item === 'Pricing' ? '/pricing' : item === 'Model' ? '/model' : item === 'Roadmap' ? '/roadmap' : item === 'Docs' ? '/docs' : '/'}
                className="hover:text-[#7fff00] transition-colors bracket-text"
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

      {/* Hero Section */}
      <main className="flex-1">
        {/* Three.js Aurora Hero */}
        <HeroAurora />

        {/* Stats Bar - Full Width Dark */}
        <section className="bg-black py-12 md:py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { number: '32K', label: 'Token Context Window', desc: 'Handle complex, long-form content' },
                { number: '0', label: 'Content Filters', desc: 'Truly unrestricted AI access' },
                { number: '<2s', label: 'Average Response', desc: 'Fast inference for any query' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    delay: i * 0.15,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="text-center cursor-default"
                >
                  <motion.div 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-mono text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs md:text-sm opacity-90 uppercase tracking-wider font-mono mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs md:text-sm opacity-50">
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why no limit - Asymmetric Layout */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 md:mb-16"
            >
              <motion.h2 
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#2d5a3d]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="font-mono bracket-text">Why no limit</span>
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-black max-w-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                The only AI platform that refuses to compromise between freedom and reliability.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-12 gap-6">
              {/* Large featured card */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="md:col-span-7 bg-[#e8f5e6] border border-[#d0e8cd] p-6 md:p-10"
              >
                <div className="text-3xl md:text-4xl font-mono mb-4 md:mb-6 text-[#b8d1b3]">[01]</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-[#2d5a3d]">Truly Uncensored</h3>
                <p className="text-base md:text-lg text-black leading-relaxed mb-4 md:mb-6">
                  No content filters, no topic restrictions, no arbitrary limitations. Ask anything, create anything, explore any use case.
                </p>
                <div className="font-mono text-sm text-[#4a7c59]">
                  → Complete creative freedom
                </div>
              </motion.div>

              {/* Smaller card */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="md:col-span-5 bg-[#e8f5e6] border border-[#d0e8cd] p-6 md:p-10"
              >
                <div className="text-3xl md:text-4xl font-mono mb-4 md:mb-6 text-[#b8d1b3]">[02]</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#2d5a3d]">Enterprise Reliability</h3>
                <p className="text-black leading-relaxed">
                  Production-grade infrastructure with 99.9% uptime. Built for mission-critical applications.
                </p>
              </motion.div>

              {/* Flipped layout */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="md:col-span-5 bg-[#e8f5e6] border border-[#d0e8cd] p-6 md:p-10"
              >
                <div className="text-3xl md:text-4xl font-mono mb-4 md:mb-6 text-[#b8d1b3]">[03]</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#2d5a3d]">Multimodal Future</h3>
                <p className="text-black leading-relaxed">
                  Starting with text, expanding to image and video generation. One platform for all your AI needs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="md:col-span-7 bg-[#e8f5e6] border border-[#d0e8cd] p-6 md:p-10"
              >
                <div className="text-3xl md:text-4xl font-mono mb-4 md:mb-6 text-[#b8d1b3]">[04]</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-[#2d5a3d]">Developer First</h3>
                <p className="text-base md:text-lg text-black leading-relaxed mb-4 md:mb-6">
                  Simple integration, comprehensive documentation, and transparent pricing. Download once, run forever on your hardware.
                </p>
                <div className="font-mono text-sm text-[#4a7c59]">
                  → Ship faster with confidence
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases - Carousel Section */}
        <section className="bg-black py-16 md:py-24 border-y border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono bracket-text">Built for real use cases</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl opacity-70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              From research to production, no limit powers applications that demand total freedom.
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={carouselControls}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* First set of cards */}
              {[
                { title: 'Research & Analysis', desc: 'Unrestricted exploration of any topic or domain', tag: 'academia' },
                { title: 'Creative Content', desc: 'Generate stories, scripts, and ideas without boundaries', tag: 'media' },
                { title: 'Data Processing', desc: 'Process sensitive information with complete privacy', tag: 'enterprise' },
                { title: 'Code Generation', desc: 'Build anything without artificial limitations', tag: 'developers' },
                { title: 'Custom Training', desc: 'Fine-tune models on your proprietary data', tag: 'ml teams' }
              ].map((useCase, i) => (
                <motion.div
                  key={`first-${i}`}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="min-w-[280px] md:min-w-[320px] bg-white/5 backdrop-blur-sm border border-white/20 p-6 md:p-8 flex-shrink-0"
                >
                  <div className="text-xs font-mono opacity-50 uppercase tracking-wider mb-3 md:mb-4">
                    {useCase.tag}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{useCase.title}</h3>
                  <p className="opacity-70 text-xs md:text-sm leading-relaxed">{useCase.desc}</p>
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { title: 'Research & Analysis', desc: 'Unrestricted exploration of any topic or domain', tag: 'academia' },
                { title: 'Creative Content', desc: 'Generate stories, scripts, and ideas without boundaries', tag: 'media' },
                { title: 'Data Processing', desc: 'Process sensitive information with complete privacy', tag: 'enterprise' },
                { title: 'Code Generation', desc: 'Build anything without artificial limitations', tag: 'developers' },
                { title: 'Custom Training', desc: 'Fine-tune models on your proprietary data', tag: 'ml teams' }
              ].map((useCase, i) => (
                <motion.div
                  key={`second-${i}`}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="min-w-[280px] md:min-w-[320px] bg-white/5 backdrop-blur-sm border border-white/20 p-6 md:p-8 flex-shrink-0"
                >
                  <div className="text-xs font-mono opacity-50 uppercase tracking-wider mb-3 md:mb-4">
                    {useCase.tag}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{useCase.title}</h3>
                  <p className="opacity-70 text-xs md:text-sm leading-relaxed">{useCase.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA - Full Width */}
        <section className="relative py-16 md:py-32 px-4 md:px-8 overflow-hidden bg-white">
          {/* Chains Background */}
          <div className="absolute -top-32 -right-40 w-[1200px] h-[1200px] opacity-70 pointer-events-none" style={{ transform: 'rotate(-20deg)', zIndex: 1 }}>
            <Image 
              src="/illustration/chains.png"
              alt="Breaking chains"
              width={1200}
              height={1200}
              className="object-contain"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative" style={{ zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-[#2d5a3d]">
                Ready to break free from{' '}
                <span className="inline-block">
                  {'limitations'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.05,
                        delay: 0.3 + (i * 0.03)
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                ?
              </h2>
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-black font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Join forward-thinking developers and enterprises building with AI
                <br className="hidden md:block" />
                that doesn&apos;t compromise on freedom or reliability.
              </motion.p>
              <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#2d5a3d] text-white px-6 py-3 md:px-10 md:py-5 font-mono font-bold text-base md:text-lg hover:bg-[#4a7c59] transition-colors"
                >
                  Request Beta Access
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#2d5a3d] text-[#2d5a3d] px-6 py-3 md:px-10 md:py-5 font-mono font-bold text-base md:text-lg hover:bg-[#2d5a3d] hover:text-white transition-colors"
                >
                  Read Documentation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 md:py-12 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo3.svg" 
                  alt="NoLimit Logo" 
                  width={180} 
                  height={180}
                  className="object-contain w-[120px] md:w-[150px] lg:w-[180px]"
                />
              </div>
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

