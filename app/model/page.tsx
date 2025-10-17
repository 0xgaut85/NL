"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';

const GearsBackground = dynamic(() => import('@/components/GearsBackground'), { ssr: false });

export default function ModelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
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
          
          <nav className="hidden md:flex gap-8 font-mono text-sm text-white">
            {["About", "Model", "Pricing", "Docs"].map((item, i) => (
              <motion.a
                key={item}
                href={item === "Pricing" ? "/pricing" : item === "Model" ? "/model" : item === "Docs" ? "/docs" : `/#${item.toLowerCase()}`}
                className={`hover:text-[#7fff00] transition-colors bracket-text ${item === "Model" ? "text-[#7fff00]" : ""}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-4 py-2 md:px-6 font-mono text-xs md:text-sm font-bold hover:bg-[#7fff00] transition-colors whitespace-nowrap"
          >
            Request Beta Access
          </motion.button>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero with Gears Animation */}
        <GearsBackground>
          <div className="max-w-7xl mx-auto text-center px-4 md:px-8 py-24 md:py-32 lg:py-40">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <span className="bg-[#2d5a3d] text-white px-4 py-2 font-mono text-xs md:text-sm uppercase tracking-widest">
                  Version 1.0
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-[#2d5a3d]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="font-mono bracket-text">NL 1.0</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-black mb-6 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                A 13-billion parameter transformer optimized for consumer hardware
              </motion.p>
              
              <motion.p 
                className="text-base md:text-lg lg:text-xl text-black/60 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Runs on RTX 4060 Ti or RTX 3060. Zero safety filters. Maximum capability on affordable hardware.
              </motion.p>
            </motion.div>
          </div>
        </GearsBackground>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2">
              <motion.div 
                className="bg-[#b3ceb0] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Technical Specifications
                </motion.h2>

                {[
                  { label: "Parameters", value: "13 Billion" },
                  { label: "Architecture", value: "Decoder-Only Transformer" },
                  { label: "Layers", value: "40" },
                  { label: "Hidden Size", value: "5,120" },
                  { label: "Attention Heads", value: "40" },
                  { label: "Context Window", value: "32K tokens" },
                  { label: "Vocabulary", value: "32K BPE tokens" },
                  { label: "Training Tokens", value: "2.5 Trillion" }
                ].map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    className="flex justify-between items-baseline mb-6 pb-4 border-b border-black/10 last:border-0"
                  >
                    <span className="text-black/70 text-sm md:text-base font-mono uppercase tracking-wider">{spec.label}</span>
                    <span className="text-black font-bold text-lg md:text-xl">{spec.value}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Performance
                </motion.h2>

                {[
                  { label: "Time to First Token", value: "<200ms" },
                  { label: "Throughput", value: "~90 tokens/sec" },
                  { label: "Hardware Required", value: "RTX 4060 Ti (16GB)" },
                  { label: "MMLU Benchmark", value: "72.4%" },
                  { label: "HumanEval", value: "65.8%" },
                  { label: "GSM8K Math", value: "68.3%" },
                  { label: "TruthfulQA", value: "58.7%" },
                  { label: "Code Generation", value: "63.9%" }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.05) }}
                    className="flex justify-between items-baseline mb-6 pb-4 border-b border-black/10 last:border-0"
                  >
                    <span className="text-black/70 text-sm md:text-base font-mono uppercase tracking-wider">{metric.label}</span>
                    <span className="text-[#2d5a3d] font-bold text-lg md:text-xl">{metric.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40 px-4 md:px-8 bg-white relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 md:mb-20 text-center"
            >
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d5a3d] mb-6 font-mono bracket-text"
              >
                Training &amp; Architecture
              </motion.h2>
            </motion.div>

            {/* Alternating horizontal layout */}
            <div className="space-y-0">
              {[
                {
                  title: "Training Infrastructure",
                  desc: "Trained on a cluster of 512 NVIDIA A100 GPUs over 6 weeks. Mixed-precision training with BF16 and FP32 accumulation. Global batch size of 4M tokens optimized for efficiency.",
                  bg: "white",
                  align: "left"
                },
                {
                  title: "Data Composition",
                  desc: "2.5 trillion tokens from diverse sources: web text (45%), books (15%), academic papers (12%), code repositories (18%), and curated instruction data (10%). All data filtered for quality and deduplicated.",
                  bg: "green",
                  align: "right"
                },
                {
                  title: "Novel Architecture",
                  desc: "Grouped Query Attention (GQA) with 8 KV heads for efficient inference. Rotary Position Embeddings (RoPE) for 32K context. SwiGLU activation and RMSNorm for stability. Optimized for consumer GPUs.",
                  bg: "white",
                  align: "left"
                },
                {
                  title: "Optimization",
                  desc: "AdamW optimizer with β₁=0.9, β₂=0.95. Cosine learning rate schedule from 3e-4 to 3e-5. Weight decay 0.1. Gradient clipping at 1.0. Flash Attention 2 for training efficiency.",
                  bg: "green",
                  align: "right"
                },
                {
                  title: "Zero Alignment Tax",
                  desc: "Unlike traditional models, NL 1.0 has no RLHF or constitutional AI training. No refusal training. No systematic bias injection. Pure capability optimization without safety theater.",
                  bg: "white",
                  align: "left"
                },
                {
                  title: "Inference Optimization",
                  desc: "Optimized for RTX 4060 Ti (16GB) and RTX 3060 (12GB). INT8 quantization for memory efficiency. Flash Attention 2 for speed. Runs smoothly on mid-range consumer GPUs.",
                  bg: "green",
                  align: "right"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid lg:grid-cols-2 ${item.bg === "green" ? "bg-[#b3ceb0]" : "bg-white"}`}
                >
                  {item.align === "left" ? (
                    <>
                      <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <motion.h3 
                          className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight font-mono"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="text-black/80 text-base md:text-lg leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          {item.desc}
                        </motion.p>
                      </div>
                      <div className={`hidden lg:flex items-center justify-center p-16 ${item.bg === "green" ? "bg-[#a3c19f]" : "bg-[#f8faf8]"}`}>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className={`w-full h-64 ${item.bg === "green" ? "bg-[#8dad89]" : "bg-[#e8f5e6]"} border-4 ${item.bg === "green" ? "border-[#7a9877]" : "border-[#d0e8cd]"} flex items-center justify-center`}
                        >
                          <span className="text-7xl md:text-8xl font-bold text-black/10 font-mono">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`hidden lg:flex items-center justify-center p-16 ${item.bg === "green" ? "bg-[#a3c19f]" : "bg-[#f8faf8]"}`}>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className={`w-full h-64 ${item.bg === "green" ? "bg-[#8dad89]" : "bg-[#e8f5e6]"} border-4 ${item.bg === "green" ? "border-[#7a9877]" : "border-[#d0e8cd]"} flex items-center justify-center`}
                        >
                          <span className="text-7xl md:text-8xl font-bold text-black/10 font-mono">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </motion.div>
                      </div>
                      <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <motion.h3 
                          className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight font-mono"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="text-black/80 text-base md:text-lg leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          {item.desc}
                        </motion.p>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40 px-4 md:px-8 bg-gradient-to-b from-white via-[#f8faf8] to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20 text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d5a3d] mb-6 font-mono bracket-text">
                Core Capabilities
              </h2>
              <p className="text-lg md:text-xl text-black/60 max-w-3xl mx-auto">
                Designed for real-world tasks without artificial limitations
              </p>
            </motion.div>

            {/* Bento-box style asymmetric grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Featured Large Card - Language Understanding */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="md:col-span-2 lg:row-span-2 bg-[#2d5a3d] text-white p-8 md:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7fff00]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-xs font-mono text-[#b8d1b3] mb-4 uppercase tracking-widest">Featured</div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-mono">Language Understanding</h3>
                  <ul className="space-y-4 mb-8">
                    {[
                      "32K token context window with full attention",
                      "Multi-turn dialogue with conversation history",
                      "Intent classification and entity extraction",
                      "Sentiment analysis across 15 languages"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.05) }}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7fff00] mt-2 flex-shrink-0" />
                        <span className="text-sm md:text-base">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Code & Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="md:col-span-1 lg:col-span-2 bg-white border-2 border-[#e8f5e6] p-6 md:p-8 hover:border-[#b8d1b3] transition-colors duration-300"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] mb-4 font-mono">Code & Development</h3>
                <ul className="space-y-3">
                  {[
                    "Code generation in 40+ programming languages",
                    "Real-time debugging and error correction",
                    "API documentation and technical writing"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Mathematical Reasoning */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-[#e8f5e6] p-6 md:p-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] mb-4 font-mono">Mathematical Reasoning</h3>
                <ul className="space-y-3">
                  {[
                    "Step-by-step problem solving",
                    "Statistical analysis",
                    "Algorithm optimization"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Content Generation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="lg:col-span-2 bg-[#b3ceb0] p-6 md:p-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 font-mono">Content Generation</h3>
                <ul className="space-y-3">
                  {[
                    "Long-form content with consistent tone",
                    "Technical documentation and whitepapers",
                    "Structured data transformation (JSON, XML, CSV)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Analysis & Research */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white border-2 border-[#e8f5e6] p-6 md:p-8 hover:border-[#b8d1b3] transition-colors duration-300"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] mb-4 font-mono">Analysis & Research</h3>
                <ul className="space-y-3">
                  {[
                    "Document analysis",
                    "Scientific paper summarization",
                    "Hypothesis generation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Multilingual Processing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="md:col-span-2 lg:col-span-1 bg-[#e8f5e6] p-6 md:p-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] mb-4 font-mono">Multilingual</h3>
                <ul className="space-y-3">
                  {[
                    "Translation across 15 language pairs",
                    "Cross-lingual information retrieval",
                    "Cultural context adaptation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 lg:py-40 px-4 md:px-8 bg-gradient-to-b from-[#f8faf8] to-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d5a3d] mb-16 text-center font-mono bracket-text"
            >
              What Makes NL 1.0 Different
            </motion.h2>

            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Zero Content Filtering",
                  desc: "No refusal training. No hardcoded blocklists. No moral grandstanding. The model responds to all prompts based on capability, not arbitrary restrictions. You decide what's appropriate for your use case."
                },
                {
                  number: "02",
                  title: "Efficient 32K Context",
                  desc: "Full attention over 32K tokens without sliding windows or truncation tricks. Validated on needle-in-haystack benchmarks with >98% retrieval accuracy. Optimized for speed and memory efficiency on consumer hardware."
                },
                {
                  number: "03",
                  title: "Reproducible Outputs",
                  desc: "Deterministic generation with temperature=0. Seed-based randomness for controlled variation. No hidden prompt augmentation or behind-the-scenes modifications. What you request is exactly what you get."
                },
                {
                  number: "04",
                  title: "Runs on Your Hardware",
                  desc: "Designed for RTX 4060 Ti (16GB) and RTX 3060 (12GB). Optimized with INT8 quantization for memory efficiency. Complete model weights available for download. True ownership - runs entirely on your machine, no cloud dependency."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white p-8 md:p-10 border-l-4 border-[#2d5a3d] shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-5xl md:text-6xl font-bold text-[#b8d1b3]">{item.number}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] mb-3">{item.title}</h3>
                      <p className="text-black/80 leading-relaxed text-base md:text-lg">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

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
                title: "Product",
                links: ["Model", "Pricing", "Roadmap", "Status"]
              },
              {
                title: "Developers",
                links: ["Documentation", "Setup Guide", "Quickstart", "Examples"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Contact", "Careers"]
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
  );
}

