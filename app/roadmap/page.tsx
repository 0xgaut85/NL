'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function RoadmapPage() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const roadmapData = [
    {
      quarter: 'Q4 2025',
      phase: 'Foundation',
      items: [
        {
          id: 'llm-beta',
          title: 'NL 1.0 Open Beta',
          date: 'October 2025',
          description: 'Public beta of 13B local language model with zero telemetry',
          status: 'Active'
        },
        {
          id: 'token-launch',
          title: 'NL Token Launch',
          date: 'November 2025',
          description: 'Launch of NL utility token with privacy-preserving features',
          status: 'Planned'
        },
        {
          id: 'liquidity-pools',
          title: 'Initial Liquidity Provision',
          date: 'November 2025',
          description: 'Launch of NL token liquidity pools across major DEXs',
          status: 'Planned'
        },
        {
          id: 'swap-beta',
          title: 'nolimit Swap Beta',
          date: 'December 2025',
          description: 'Multi-chain DEX aggregator beta. Non-custodial, no KYC.',
          status: 'Testing'
        },
        {
          id: 'api-docs',
          title: 'Self-Hosted API Release',
          date: 'December 2025',
          description: 'Open-source API and SDK for local NL 1.0 deployment',
          status: 'Planned'
        },
        {
          id: 'community',
          title: 'Developer Community Launch',
          date: 'December 2025',
          description: 'Launch of community hub, documentation, and support channels',
          status: 'Planned'
        }
      ]
    },
    {
      quarter: 'Q1 2026',
      phase: 'Production',
      items: [
        {
          id: 'llm-release',
          title: 'NL 1.0 Production Release',
          date: 'January 2026',
          description: 'Stable release with enterprise licensing and commercial support',
          status: 'Planned'
        },
        {
          id: 'bridge',
          title: 'Cross-Chain Bridge',
          date: 'January 2026',
          description: 'Native bridge protocol with privacy options for cross-chain transfers',
          status: 'Planned'
        },
        {
          id: 'privacy-swap',
          title: 'Private Swap Module',
          date: 'February 2026',
          description: 'Optional privacy layer for anonymous swaps using zero-knowledge proofs',
          status: 'Planned'
        },
        {
          id: 'swap-release',
          title: 'nolimit Swap V1.0',
          date: 'February 2026',
          description: 'Production release with audited contracts and advanced routing',
          status: 'Planned'
        },
        {
          id: 'api-marketplace',
          title: 'API Marketplace',
          date: 'March 2026',
          description: 'Marketplace for NL 1.0 API access with NL token payments',
          status: 'Planned'
        },
        {
          id: 'audits',
          title: 'Security Audits Complete',
          date: 'March 2026',
          description: 'Full audits by CertiK and Trail of Bits with public reports',
          status: 'Planned'
        }
      ]
    },
    {
      quarter: 'Q2 2026',
      phase: 'Ecosystem Growth',
      items: [
        {
          id: 'nl-2',
          title: 'NL 2.0 Development Begins',
          date: 'April 2026',
          description: '70B parameter model development with enhanced reasoning capabilities',
          status: 'Planned'
        },
        {
          id: 'limit-orders',
          title: 'Advanced Trading Features',
          date: 'April 2026',
          description: 'Limit orders, stop-loss, and DCA strategies for nolimit Swap',
          status: 'Planned'
        },
        {
          id: 'mobile',
          title: 'Mobile Applications',
          date: 'May 2026',
          description: 'iOS and Android apps with biometric security and local key storage',
          status: 'Planned'
        },
        {
          id: 'ai-agents',
          title: 'AI Trading Strategies',
          date: 'May 2026',
          description: 'NL 1.0 powered trading strategy recommendations and portfolio analysis',
          status: 'Planned'
        },
        {
          id: 'partnerships',
          title: 'DeFi Protocol Integrations',
          date: 'June 2026',
          description: 'Direct integrations with major lending, yield, and derivatives protocols',
          status: 'Planned'
        },
        {
          id: 'fiat-onramp',
          title: 'Fiat On-Ramp Integration',
          date: 'June 2026',
          description: 'Privacy-respecting fiat gateway with minimal KYC requirements',
          status: 'Planned'
        }
      ]
    },
    {
      quarter: 'Q3 2026',
      phase: 'Layer 2 Development',
      items: [
        {
          id: 'l2-testnet',
          title: 'nolimit L2 Testnet Launch',
          date: 'July 2026',
          description: 'zkEVM Layer 2 testnet with optional privacy features',
          status: 'Planned'
        },
        {
          id: 'staking',
          title: 'NL Staking Program',
          date: 'July 2026',
          description: 'Multi-tier staking with governance rights and yield rewards',
          status: 'Planned'
        },
        {
          id: 'nl-2-alpha',
          title: 'NL 2.0 Internal Testing',
          date: 'August 2026',
          description: '70B model alpha testing with select partners and early adopters',
          status: 'Planned'
        },
        {
          id: 'portfolio-manager',
          title: 'Portfolio Management Suite',
          date: 'August 2026',
          description: 'Advanced portfolio tracking, rebalancing, and risk management tools',
          status: 'Planned'
        },
        {
          id: 'analytics',
          title: 'Analytics Dashboard',
          date: 'September 2026',
          description: 'Privacy-preserving analytics with PnL tracking and tax reporting',
          status: 'Planned'
        },
        {
          id: 'l2-incentives',
          title: 'L2 Testnet Incentives',
          date: 'September 2026',
          description: 'Reward program for early testnet users and validators',
          status: 'Planned'
        }
      ]
    },
    {
      quarter: 'Q4 2026',
      phase: 'Full Stack Launch',
      items: [
        {
          id: 'l2-mainnet',
          title: 'nolimit L2 Mainnet Launch',
          date: 'October 2026',
          description: 'Production zkEVM Layer 2 with native privacy options',
          status: 'Planned'
        },
        {
          id: 'nl-2-release',
          title: 'NL 2.0 Public Beta',
          date: 'October 2026',
          description: '70B parameter model public beta with breakthrough performance',
          status: 'Planned'
        },
        {
          id: 'private-defi',
          title: 'Private DeFi Primitives',
          date: 'November 2026',
          description: 'Anonymous lending, borrowing, and yield farming with shielded pools',
          status: 'Planned'
        },
        {
          id: 'perpetuals',
          title: 'Perpetual Swaps',
          date: 'November 2026',
          description: 'Decentralized perpetual futures trading on nolimit L2',
          status: 'Planned'
        },
        {
          id: 'global',
          title: 'Global Expansion',
          date: 'December 2026',
          description: 'Multi-language support and regional compliance frameworks',
          status: 'Planned'
        },
        {
          id: 'grants',
          title: 'Ecosystem Grants Program',
          date: 'December 2026',
          description: '$10M fund for privacy tech, AI research, and ecosystem development',
          status: 'Planned'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black py-4 md:py-6 px-4 md:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <Image 
                src="/logo3.svg" 
                alt="no limit Logo" 
                width={180} 
                height={180}
                className="object-contain w-[120px] md:w-[150px] lg:w-[180px]"
              />
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-sm">
            {['About', 'Model', 'Pricing', 'Roadmap', 'Docs'].map((item) => (
              <Link 
                key={item} 
                href={item === 'About' ? '/' : `/${item.toLowerCase()}`}
                className={`hover:text-[#7fff00] transition-colors bracket-text ${item === 'Roadmap' ? 'text-[#b8d1b3]' : 'text-white'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#b8d1b3] text-black px-4 lg:px-6 py-2 lg:py-2.5 font-mono text-sm hover:bg-[#a3c19f] transition-colors"
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

      {/* Hero */}
      <div className="py-20 md:py-32 px-4 md:px-8 bg-black text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="text-sm font-mono text-white/40 uppercase tracking-wider">
                Product Timeline
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-mono mb-8 bracket-text">
              Roadmap
            </h1>
            <div className="flex items-baseline gap-6 md:gap-8 flex-wrap">
              <p className="text-2xl md:text-3xl text-white/60 font-mono">
                Q4 2025
              </p>
              <span className="text-white/20">—</span>
              <p className="text-2xl md:text-3xl text-white/60 font-mono">
                Q4 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="flex-1 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {roadmapData.map((quarter, qIndex) => {
            const startProgress = qIndex / roadmapData.length;
            const endProgress = (qIndex + 1) / roadmapData.length;
            
            // Pre-calculate transforms outside the render
            const opacity = useTransform(
              scrollYProgress,
              [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
              [0, 1, 1, 0.3]
            );
            const scale = useTransform(
              scrollYProgress,
              [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
              [0.8, 1, 1, 0.95]
            );
            
            return (
              <motion.div
                key={quarter.quarter}
                style={{ opacity, scale }}
                className="min-h-[80vh] flex flex-col justify-center mb-32 md:mb-48"
              >
                {/* Quarter Header */}
                <motion.div 
                  className="mb-16 md:mb-24"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: false, margin: "-10%" }}
                >
                  <div className="flex items-center gap-6 md:gap-8 mb-8">
                    <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-bold font-mono bracket-text leading-none">
                      {quarter.quarter}
                    </h2>
                    <motion.div 
                      className="flex-1 h-px bg-black/5"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      viewport={{ once: false, margin: "-10%" }}
                      style={{ transformOrigin: "left" }}
                    ></motion.div>
                  </div>
                  <motion.p 
                    className="text-2xl md:text-3xl lg:text-4xl text-black/30 font-mono uppercase tracking-wider"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    viewport={{ once: false, margin: "-10%" }}
                  >
                    {quarter.phase}
                  </motion.p>
                </motion.div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
                  {quarter.items.map((item, index) => {
                    // Les 2 premiers items (index 0 et 1) sont les plus importants
                    const isKeyItem = index === 0 || index === 1;
                    
                    // Pre-calculate scale transform for key items
                    const itemScale = isKeyItem ? useTransform(
                      scrollYProgress,
                      [
                        startProgress + (index * 0.05),
                        startProgress + 0.15 + (index * 0.05),
                        startProgress + 0.35 + (index * 0.05),
                        startProgress + 0.5 + (index * 0.05)
                      ],
                      [1, 1.15, 1.15, 1]
                    ) : undefined;
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.7,
                          delay: index * 0.15,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        viewport={{ once: false, margin: "-15%" }}
                        style={isKeyItem ? { scale: itemScale } : {}}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className={`group ${isKeyItem ? 'relative z-10' : ''}`}
                      >
                        <div className="relative">
                          {/* Hover indicator line */}
                          <motion.div 
                            className={`absolute left-0 top-0 bottom-0 ${isKeyItem ? 'w-1.5' : 'w-1'} bg-[#2d5a3d]`}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: hoveredItem === item.id ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: "top" }}
                          ></motion.div>
                          
                          <div className={`${isKeyItem ? 'pl-12' : 'pl-10'} py-4`}>
                            {/* Status & Date */}
                            <motion.div 
                              className="flex items-center justify-between mb-6"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                              viewport={{ once: false, margin: "-15%" }}
                            >
                              <span className={`${isKeyItem ? 'text-base' : 'text-sm'} font-mono text-black/30 uppercase tracking-widest`}>
                                {item.date}
                              </span>
                              <motion.span 
                                className={`text-xs font-mono ${isKeyItem ? 'px-5 py-2.5' : 'px-4 py-2'} transition-colors ${
                                  item.status === 'In Progress' ? 'bg-[#2d5a3d] text-white' :
                                  item.status === 'Active' ? 'bg-[#7fff00] text-black' :
                                  item.status === 'Testing' ? 'bg-[#b8d1b3] text-black' :
                                  item.status === 'Development' ? 'bg-black/5 text-black/60 border border-black/10' :
                                  'bg-black/5 text-black/40'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.status}
                              </motion.span>
                            </motion.div>

                            {/* Title */}
                            <motion.h3 
                              className={`${isKeyItem ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold font-mono mb-6 group-hover:text-[#2d5a3d] transition-colors leading-tight`}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                              viewport={{ once: false, margin: "-15%" }}
                            >
                              {item.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p 
                              className={`${isKeyItem ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} text-black/50 leading-relaxed`}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                              viewport={{ once: false, margin: "-15%" }}
                            >
                              {item.description}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 md:py-32 px-4 md:px-8 bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-8">
              <span className="text-sm font-mono text-white/40 uppercase tracking-wider">
                Join Early
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-6 bracket-text">
              Be Part of the Journey
            </h2>
            <p className="text-lg md:text-xl text-white/50 mb-12 font-mono max-w-2xl mx-auto">
              Get early access to private AI and decentralized infrastructure
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7fff00] text-black px-8 py-4 font-mono font-bold hover:bg-white transition-colors"
              >
                Request Beta Access
              </motion.button>
              <Link href="/docs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white text-white px-8 py-4 font-mono font-bold hover:bg-white hover:text-black transition-colors"
                >
                  Documentation
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 md:py-12 px-4 md:px-8 border-t border-white/10 text-white">
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

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-snap-type: y proximity;
          }
        }
      `}</style>
    </div>
  );
}
