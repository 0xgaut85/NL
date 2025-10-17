'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const navigation = [
    {
      category: 'Getting Started',
      items: [
        { id: 'getting-started', label: 'Quick Start' },
        { id: 'system-requirements', label: 'System Requirements' },
        { id: 'installation', label: 'Installation' }
      ]
    },
    {
      category: 'Configuration',
      items: [
        { id: 'model-config', label: 'Model Configuration' },
        { id: 'inference-params', label: 'Inference Parameters' },
        { id: 'performance-tuning', label: 'Performance Tuning' }
      ]
    },
    {
      category: 'API Reference',
      items: [
        { id: 'local-api', label: 'Local API Server' },
        { id: 'completion-endpoint', label: 'Completion Endpoint' },
        { id: 'streaming', label: 'Streaming Responses' }
      ]
    },
    {
      category: 'Advanced',
      items: [
        { id: 'quantization', label: 'Quantization' },
        { id: 'batch-processing', label: 'Batch Processing' },
        { id: 'troubleshooting', label: 'Troubleshooting' }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black py-4 md:py-6 px-4 md:px-8 border-b border-white/10 sticky top-0 z-50"
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
            {['About', 'Model', 'Pricing', 'Docs'].map((item) => (
              <Link 
                key={item} 
                href={item === 'About' ? '/' : item === 'Model' ? '/model' : item === 'Pricing' ? '/pricing' : item === 'Docs' ? '/docs' : '/'}
                className={`hover:text-[#7fff00] transition-colors bracket-text ${item === 'Docs' ? 'text-[#b8d1b3]' : 'text-white'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-[#b8d1b3] text-black px-4 lg:px-6 py-2 lg:py-2.5 rounded font-mono text-sm hover:bg-[#a3c19f] transition-colors"
          >
            Request Beta Access
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block w-64 bg-[#f8faf8] border-r border-black/10 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto"
        >
          <div className="p-6">
            {navigation.map((section, idx) => (
              <div key={section.category} className={idx > 0 ? 'mt-8' : ''}>
                <h3 className="text-xs font-mono uppercase tracking-wider text-black/50 mb-3">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          activeSection === item.id
                            ? 'bg-[#b8d1b3] text-black font-medium'
                            : 'text-black/70 hover:bg-[#e8f5e6] hover:text-black'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* Content Area */}
        <main className="flex-1 px-4 md:px-8 py-12 max-w-4xl">
          {/* Getting Started */}
          {activeSection === 'getting-started' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">
                Quick Start Guide
              </h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Get NL 1.0 running on your machine in under 5 minutes. This guide assumes you have a compatible NVIDIA GPU and basic command-line familiarity.
              </p>

              <div className="space-y-8">
                <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                  <h3 className="text-xl font-bold text-[#2d5a3d] mb-3">Prerequisites</h3>
                  <ul className="space-y-2 text-black/80">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-2 flex-shrink-0"></span>
                      <span><strong>GPU:</strong> NVIDIA RTX 4060 Ti (16GB) or RTX 3060 (12GB) minimum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-2 flex-shrink-0"></span>
                      <span><strong>CUDA:</strong> Version 12.1 or later</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-2 flex-shrink-0"></span>
                      <span><strong>Storage:</strong> 28GB free disk space (26GB for model + 2GB overhead)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3d] mt-2 flex-shrink-0"></span>
                      <span><strong>RAM:</strong> 16GB system RAM recommended</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Installation Steps</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Step 1: Download the Model</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          curl -O https://download.nolimit.ai/models/nl-1.0-int8.tar.gz
                        </code>
                      </div>
                      <p className="text-sm text-black/60 mt-2">Download size: ~26GB. This may take 10-30 minutes depending on your connection.</p>
                    </div>

                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Step 2: Extract Model Files</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          tar -xzf nl-1.0-int8.tar.gz -C ~/nolimit/
                        </code>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Step 3: Install Runtime Dependencies</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          pip install nolimit-runtime torch==2.1.0 transformers==4.36.0
                        </code>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Step 4: Verify Installation</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          nolimit --version<br/>
                          # Output: NL 1.0.0 (INT8 Quantized)
                        </code>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Step 5: Start Local API Server</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          nolimit serve --model ~/nolimit/nl-1.0-int8 --port 8080
                        </code>
                      </div>
                      <p className="text-sm text-black/60 mt-2">Server will start on <code className="bg-black/10 px-1 rounded">http://localhost:8080</code></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">First Request</h3>
                  <p className="text-black/70 mb-4">Test your installation with a simple completion request:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      curl http://localhost:8080/v1/completions \<br/>
                      {'  '}-H &quot;Content-Type: application/json&quot; \<br/>
                      {'  '}-d &apos;{'{'}<br/>
                      {'    '}&quot;prompt&quot;: &quot;Write a Python function to calculate fibonacci numbers&quot;,<br/>
                      {'    '}&quot;max_tokens&quot;: 512,<br/>
                      {'    '}&quot;temperature&quot;: 0.7<br/>
                      {'  '}{'}'}&apos;
                    </code>
                  </div>
                </div>

                <div className="bg-[#e8f5e6] border border-[#b8d1b3] p-6 rounded">
                  <h4 className="font-bold text-[#2d5a3d] mb-2">Next Steps</h4>
                  <ul className="space-y-2 text-sm text-black/80">
                    <li>→ Configure inference parameters for your use case</li>
                    <li>→ Explore the API reference for advanced features</li>
                    <li>→ Review performance tuning for optimal throughput</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* System Requirements */}
          {activeSection === 'system-requirements' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">
                System Requirements
              </h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Detailed hardware and software requirements for running NL 1.0 at various performance levels.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Hardware Requirements</h3>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-[#2d5a3d] bg-white p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-[#2d5a3d] text-white px-3 py-1 rounded text-sm font-mono">RECOMMENDED</span>
                        <h4 className="text-xl font-bold text-[#2d5a3d]">Optimal Performance</h4>
                      </div>
                      <ul className="space-y-2 text-black/80">
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">GPU</span>
                          <span>NVIDIA RTX 4060 Ti 16GB / RTX 3090 24GB</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">CPU</span>
                          <span>8-core x86-64 (Intel Core i7/AMD Ryzen 7 or better)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">RAM</span>
                          <span>32GB DDR4-3200 or faster</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">Storage</span>
                          <span>512GB NVMe SSD (PCIe 3.0 x4 or better)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">Expected</span>
                          <span className="text-[#2d5a3d] font-medium">~90 tokens/sec throughput, &lt;150ms first token</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-[#e8f5e6] bg-[#f8faf8] p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-[#b8d1b3] text-black px-3 py-1 rounded text-sm font-mono">MINIMUM</span>
                        <h4 className="text-xl font-bold text-[#2d5a3d]">Acceptable Performance</h4>
                      </div>
                      <ul className="space-y-2 text-black/80">
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">GPU</span>
                          <span>NVIDIA RTX 3060 12GB / RTX 4060 8GB (with reduced batch size)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">CPU</span>
                          <span>6-core x86-64 (Intel Core i5/AMD Ryzen 5)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">RAM</span>
                          <span>16GB DDR4-2666</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">Storage</span>
                          <span>256GB SSD (SATA or NVMe)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-sm text-black/50 min-w-[80px]">Expected</span>
                          <span className="text-black/60">~45-60 tokens/sec throughput, ~250ms first token</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Software Requirements</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <tbody className="space-y-2">
                        <tr className="border-b border-black/10">
                          <td className="py-2 font-mono text-black/60">Operating System</td>
                          <td className="py-2">Linux (Ubuntu 20.04+, RHEL 8+) or Windows 10/11</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-2 font-mono text-black/60">CUDA Toolkit</td>
                          <td className="py-2">12.1 or later (includes cuDNN 8.9+)</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-2 font-mono text-black/60">NVIDIA Driver</td>
                          <td className="py-2">535.xx or later</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-2 font-mono text-black/60">Python</td>
                          <td className="py-2">3.10 or 3.11 (3.12 experimental)</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-black/60">Docker (optional)</td>
                          <td className="py-2">20.10+ with nvidia-docker2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Compatibility Notes</h3>
                  <div className="space-y-4">
                    <div className="bg-black/5 p-4 rounded">
                      <h4 className="font-bold text-black mb-2">Supported GPUs</h4>
                      <p className="text-sm text-black/70">RTX 3060 (12GB), RTX 3060 Ti, RTX 3070, RTX 3080, RTX 3090, RTX 4060, RTX 4060 Ti (16GB), RTX 4070, RTX 4070 Ti, RTX 4080, RTX 4090. AMD GPUs via ROCm are experimental.</p>
                    </div>
                    <div className="bg-black/5 p-4 rounded">
                      <h4 className="font-bold text-black mb-2">Limited Support</h4>
                      <p className="text-sm text-black/70">RTX 20-series (2060-2080) may work but expect 30-40% lower throughput. GTX 16-series not recommended due to limited Tensor Core support.</p>
                    </div>
                    <div className="bg-black/5 p-4 rounded">
                      <h4 className="font-bold text-black mb-2">Unsupported</h4>
                      <p className="text-sm text-black/70">Apple Silicon (M1/M2/M3) - MPS backend lacks required INT8 kernel support. GTX 10-series and older - insufficient VRAM and compute capability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Installation */}
          {activeSection === 'installation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">
                Installation
              </h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Comprehensive installation guide for various deployment scenarios.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Method 1: pip Install (Recommended)</h3>
                  <p className="text-black/70 mb-4">Fastest method for single-user development machines:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Create a virtual environment:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          python3 -m venv nolimit-env<br/>
                          source nolimit-env/bin/activate  # Linux/Mac<br/>
                          # or<br/>
                          .\nolimit-env\Scripts\activate  # Windows
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Install nolimit runtime:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          pip install nolimit-runtime<br/>
                          pip install torch==2.1.0+cu121 --index-url https://download.pytorch.org/whl/cu121
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Verify installation:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          nolimit --version<br/>
                          nolimit doctor  # Run diagnostics
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Method 2: Docker Deployment</h3>
                  <p className="text-black/70 mb-4">Isolated environment with all dependencies bundled:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Pull official image:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          docker pull nolimit/nl-1.0:latest
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Run container with GPU access:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          docker run --gpus all -p 8080:8080 \<br/>
                          {'  '}-v ~/nolimit/models:/models \<br/>
                          {'  '}nolimit/nl-1.0:latest \<br/>
                          {'  '}--model /models/nl-1.0-int8 --port 8080
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Method 3: From Source</h3>
                  <p className="text-black/70 mb-4">For contributors and advanced users:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Clone repository:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          git clone https://github.com/nolimit-ai/nl-runtime.git<br/>
                          cd nl-runtime
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Install with development dependencies:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          pip install -e ".[dev]"<br/>
                          python setup.py build_ext --inplace
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#e8f5e6] border border-[#b8d1b3] p-6 rounded">
                  <h4 className="font-bold text-[#2d5a3d] mb-3">Post-Installation</h4>
                  <p className="text-sm text-black/70 mb-3">After installation, download the model weights:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      nolimit download --model nl-1.0-int8 --path ~/nolimit/models
                    </code>
                  </div>
                  <p className="text-xs text-black/60 mt-2">This will authenticate with your license key and download ~26GB to the specified path.</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">License Activation</h3>
                  <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                    <p className="text-black/70 mb-4">Activate your license before first use:</p>
                    <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto mb-3">
                      <code>
                        nolimit activate --key YOUR_LICENSE_KEY
                      </code>
                    </div>
                    <p className="text-sm text-black/60">License keys are provided via email after purchase. One license per GPU. Offline activation available for air-gapped systems.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Model Configuration */}
          {activeSection === 'model-config' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">
                Model Configuration
              </h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Configure NL 1.0 for your specific use case with YAML or JSON configuration files.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Configuration File</h3>
                  <p className="text-black/70 mb-4">Create a <code className="bg-black/10 px-1 rounded">nolimit.yaml</code> in your project root:</p>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      # Model path and variant<br/>
                      model:<br/>
                      {'  '}path: /home/user/nolimit/models/nl-1.0-int8<br/>
                      {'  '}quantization: int8  # int8, fp16, or fp32<br/>
                      {'  '}device: cuda:0     # cuda:0, cuda:1, or cpu<br/>
                      <br/>
                      # Inference settings<br/>
                      inference:<br/>
                      {'  '}max_batch_size: 4<br/>
                      {'  '}max_seq_length: 32768<br/>
                      {'  '}kv_cache_dtype: fp16<br/>
                      {'  '}enable_chunked_prefill: true<br/>
                      <br/>
                      # Server configuration<br/>
                      server:<br/>
                      {'  '}host: 0.0.0.0<br/>
                      {'  '}port: 8080<br/>
                      {'  '}workers: 1<br/>
                      {'  '}timeout: 300<br/>
                      <br/>
                      # Logging<br/>
                      logging:<br/>
                      {'  '}level: INFO  # DEBUG, INFO, WARNING, ERROR<br/>
                      {'  '}format: json<br/>
                      {'  '}file: /var/log/nolimit/server.log
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Configuration Options</h3>
                  <div className="space-y-6">
                    <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-[#2d5a3d] mb-3">Model Configuration</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-black/20">
                            <th className="text-left py-2 font-mono text-xs">Parameter</th>
                            <th className="text-left py-2">Description</th>
                            <th className="text-left py-2">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">path</td>
                            <td className="py-3">Absolute path to model directory</td>
                            <td className="py-3 font-mono text-xs">Required</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">quantization</td>
                            <td className="py-3">Weight precision: int8, fp16, fp32</td>
                            <td className="py-3 font-mono text-xs">int8</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">device</td>
                            <td className="py-3">Target device (cuda:N or cpu)</td>
                            <td className="py-3 font-mono text-xs">cuda:0</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">trust_remote_code</td>
                            <td className="py-3">Allow custom model code execution</td>
                            <td className="py-3 font-mono text-xs">false</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-[#2d5a3d] mb-3">Inference Configuration</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-black/20">
                            <th className="text-left py-2 font-mono text-xs">Parameter</th>
                            <th className="text-left py-2">Description</th>
                            <th className="text-left py-2">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">max_batch_size</td>
                            <td className="py-3">Maximum concurrent requests</td>
                            <td className="py-3 font-mono text-xs">4</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">max_seq_length</td>
                            <td className="py-3">Maximum context window</td>
                            <td className="py-3 font-mono text-xs">32768</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">kv_cache_dtype</td>
                            <td className="py-3">KV cache precision (fp16/fp32)</td>
                            <td className="py-3 font-mono text-xs">fp16</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">enable_chunked_prefill</td>
                            <td className="py-3">Process long prompts in chunks</td>
                            <td className="py-3 font-mono text-xs">true</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 font-mono text-xs">gpu_memory_utilization</td>
                            <td className="py-3">Fraction of GPU memory to use (0-1)</td>
                            <td className="py-3 font-mono text-xs">0.9</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Environment Variables</h3>
                  <p className="text-black/70 mb-4">Override configuration via environment variables:</p>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      export NOLIMIT_MODEL_PATH=/path/to/model<br/>
                      export NOLIMIT_DEVICE=cuda:0<br/>
                      export NOLIMIT_PORT=8080<br/>
                      export NOLIMIT_LOG_LEVEL=DEBUG<br/>
                      <br/>
                      nolimit serve  # Uses environment variables
                    </code>
                  </div>
                </div>

                <div className="bg-[#e8f5e6] border border-[#b8d1b3] p-6 rounded">
                  <h4 className="font-bold text-[#2d5a3d] mb-2">Configuration Priority</h4>
                  <p className="text-sm text-black/70">Settings are loaded in this order (later overrides earlier):</p>
                  <ol className="text-sm text-black/70 mt-3 space-y-1 ml-4">
                    <li>1. Default values</li>
                    <li>2. Configuration file (nolimit.yaml)</li>
                    <li>3. Environment variables</li>
                    <li>4. Command-line arguments</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {/* Continue with other sections... */}
          {activeSection === 'inference-params' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">
                Inference Parameters
              </h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Control model behavior with generation parameters. All parameters are per-request and optional.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Core Parameters</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2 font-mono text-xs w-1/4">Parameter</th>
                          <th className="text-left py-2 w-1/2">Description</th>
                          <th className="text-left py-2">Range/Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">temperature</td>
                          <td className="py-3 align-top">Controls randomness. Lower = more deterministic, higher = more creative.</td>
                          <td className="py-3 font-mono text-xs align-top">0.0-2.0<br/><span className="text-[#2d5a3d]">Default: 0.7</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">top_p</td>
                          <td className="py-3 align-top">Nucleus sampling. Only consider tokens with cumulative probability &lt; p.</td>
                          <td className="py-3 font-mono text-xs align-top">0.0-1.0<br/><span className="text-[#2d5a3d]">Default: 0.9</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">top_k</td>
                          <td className="py-3 align-top">Only consider top K most likely tokens. 0 = disabled.</td>
                          <td className="py-3 font-mono text-xs align-top">0-100<br/><span className="text-[#2d5a3d]">Default: 0</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">max_tokens</td>
                          <td className="py-3 align-top">Maximum number of tokens to generate.</td>
                          <td className="py-3 font-mono text-xs align-top">1-32768<br/><span className="text-[#2d5a3d]">Default: 2048</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">presence_penalty</td>
                          <td className="py-3 align-top">Penalize tokens based on whether they appear in the text. Reduces repetition.</td>
                          <td className="py-3 font-mono text-xs align-top">-2.0 to 2.0<br/><span className="text-[#2d5a3d]">Default: 0.0</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">frequency_penalty</td>
                          <td className="py-3 align-top">Penalize tokens based on their frequency. Encourages diversity.</td>
                          <td className="py-3 font-mono text-xs align-top">-2.0 to 2.0<br/><span className="text-[#2d5a3d]">Default: 0.0</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">seed</td>
                          <td className="py-3 align-top">Random seed for deterministic generation. Same seed + parameters = same output.</td>
                          <td className="py-3 font-mono text-xs align-top">0-2^32<br/><span className="text-[#2d5a3d]">Default: null</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Stopping Criteria</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2 font-mono text-xs w-1/4">Parameter</th>
                          <th className="text-left py-2 w-1/2">Description</th>
                          <th className="text-left py-2">Type/Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">stop</td>
                          <td className="py-3 align-top">String or array of strings. Stop generation when encountered.</td>
                          <td className="py-3 font-mono text-xs align-top">string[]<br/><span className="text-[#2d5a3d]">Default: []</span></td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs align-top">stop_token_ids</td>
                          <td className="py-3 align-top">Array of token IDs that trigger stopping.</td>
                          <td className="py-3 font-mono text-xs align-top">number[]<br/><span className="text-[#2d5a3d]">Default: []</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Example Request</h3>
                  <p className="text-black/70 mb-4">Complete example with recommended parameters for code generation:</p>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      curl http://localhost:8080/v1/completions \<br/>
                      {'  '}-H "Content-Type: application/json" \<br/>
                      {'  '}-d '{"{"}'<br/>
                      {'  '}"prompt": "Write a Python function that implements binary search",<br/>
                      {'  '}"max_tokens": 512,<br/>
                      {'  '}"temperature": 0.2,<br/>
                      {'  '}"top_p": 0.95,<br/>
                      {'  '}"frequency_penalty": 0.3,<br/>
                      {'  '}"stop": ["\n\ndef", "\n\nclass"],<br/>
                      {'  '}"seed": 42<br/>
                      {"}"}'
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Recommended Presets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-[#2d5a3d] mb-2">Code Generation</h4>
                      <div className="font-mono text-xs text-black/70 space-y-1">
                        <div>temperature: 0.2</div>
                        <div>top_p: 0.95</div>
                        <div>frequency_penalty: 0.3</div>
                        <div>max_tokens: 1024</div>
                      </div>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-[#2d5a3d] mb-2">Creative Writing</h4>
                      <div className="font-mono text-xs text-black/70 space-y-1">
                        <div>temperature: 0.9</div>
                        <div>top_p: 1.0</div>
                        <div>presence_penalty: 0.6</div>
                        <div>max_tokens: 2048</div>
                      </div>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-[#2d5a3d] mb-2">Factual QA</h4>
                      <div className="font-mono text-xs text-black/70 space-y-1">
                        <div>temperature: 0.0</div>
                        <div>top_p: 1.0</div>
                        <div>seed: 42</div>
                        <div>max_tokens: 256</div>
                      </div>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-[#2d5a3d] mb-2">Balanced</h4>
                      <div className="font-mono text-xs text-black/70 space-y-1">
                        <div>temperature: 0.7</div>
                        <div>top_p: 0.9</div>
                        <div>frequency_penalty: 0.0</div>
                        <div>max_tokens: 1024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Performance Tuning */}
          {activeSection === 'performance-tuning' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Performance Tuning</h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Optimize NL 1.0 for maximum throughput and minimum latency on your hardware.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">GPU Memory Optimization</h3>
                  <p className="text-black/70 mb-4">Balance memory usage and performance:</p>
                  <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                    <h4 className="font-bold text-[#2d5a3d] mb-3">gpu_memory_utilization</h4>
                    <p className="text-sm text-black/70 mb-3">Controls the fraction of GPU memory reserved for model and KV cache. Lower values leave more memory for other processes.</p>
                    <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto mb-3">
                      <code>
                        # Conservative (for multi-GPU or shared systems)<br/>
                        gpu_memory_utilization: 0.7<br/>
                        <br/>
                        # Recommended (single dedicated GPU)<br/>
                        gpu_memory_utilization: 0.9<br/>
                        <br/>
                        # Maximum (entire GPU dedicated to NL 1.0)<br/>
                        gpu_memory_utilization: 0.95
                      </code>
                    </div>
                    <p className="text-xs text-black/60">Note: Setting above 0.95 may cause OOM errors due to CUDA overhead.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Batch Size Tuning</h3>
                  <p className="text-black/70 mb-4">Optimize concurrent request handling:</p>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2">GPU</th>
                          <th className="text-left py-2">Recommended Batch Size</th>
                          <th className="text-left py-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">RTX 3060 12GB</td>
                          <td className="py-3 font-mono text-xs">2-3</td>
                          <td className="py-3 text-xs">Limit context to 16K for batch &gt; 2</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">RTX 4060 Ti 16GB</td>
                          <td className="py-3 font-mono text-xs">3-4</td>
                          <td className="py-3 text-xs">Full 32K context supported</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">RTX 3090 24GB</td>
                          <td className="py-3 font-mono text-xs">6-8</td>
                          <td className="py-3 text-xs">Excellent for high-throughput workloads</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">RTX 4090 24GB</td>
                          <td className="py-3 font-mono text-xs">8-12</td>
                          <td className="py-3 text-xs">Maximum throughput configuration</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">KV Cache Configuration</h3>
                  <p className="text-black/70 mb-4">Trade-off between speed and memory:</p>
                  <div className="space-y-4">
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">FP16 KV Cache (Recommended)</h4>
                      <p className="text-sm text-black/70 mb-2">Balanced performance with minimal quality loss.</p>
                      <div className="bg-black p-3 rounded font-mono text-xs text-[#7fff00]">
                        <code>kv_cache_dtype: fp16</code>
                      </div>
                      <p className="text-xs text-black/60 mt-2">Memory: ~8GB for 32K context | Quality: 99.9% of FP32</p>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">FP32 KV Cache</h4>
                      <p className="text-sm text-black/70 mb-2">Maximum quality for research or critical applications.</p>
                      <div className="bg-black p-3 rounded font-mono text-xs text-[#7fff00]">
                        <code>kv_cache_dtype: fp32</code>
                      </div>
                      <p className="text-xs text-black/60 mt-2">Memory: ~16GB for 32K context | Quality: Reference quality</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Chunked Prefill</h3>
                  <p className="text-black/70 mb-4">Improve responsiveness for long prompts:</p>
                  <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                    <p className="text-sm text-black/70 mb-3">When enabled, long prompts are processed in chunks, allowing faster time-to-first-token for multi-turn conversations.</p>
                    <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto mb-3">
                      <code>
                        enable_chunked_prefill: true<br/>
                        max_num_batched_tokens: 8192  # Process 8K tokens at a time
                      </code>
                    </div>
                    <p className="text-xs text-black/60">Recommended for interactive applications. Disable for maximum throughput batch processing.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Monitoring Performance</h3>
                  <p className="text-black/70 mb-4">Track metrics to identify bottlenecks:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      # Enable detailed logging<br/>
                      nolimit serve --log-level DEBUG --log-stats<br/>
                      <br/>
                      # Key metrics to monitor:<br/>
                      # - Time to First Token (TTFT): &lt; 200ms target<br/>
                      # - Tokens per Second (TPS): 80-100 target on RTX 4060 Ti<br/>
                      # - GPU Memory Usage: Should stay under 95%<br/>
                      # - KV Cache Hit Rate: Higher is better
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'local-api' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Local API Server</h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                OpenAI-compatible REST API for local inference. Drop-in replacement for OpenAI endpoints.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Starting the Server</h3>
                  <p className="text-black/70 mb-4">Launch the API server with default settings:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      nolimit serve --model ~/nolimit/nl-1.0-int8 --port 8080
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Server Options</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2 font-mono text-xs w-1/4">Flag</th>
                          <th className="text-left py-2">Description</th>
                          <th className="text-left py-2">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">--model</td>
                          <td className="py-3">Path to model directory</td>
                          <td className="py-3 font-mono text-xs">Required</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">--host</td>
                          <td className="py-3">Bind address (0.0.0.0 for all interfaces)</td>
                          <td className="py-3 font-mono text-xs">127.0.0.1</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">--port</td>
                          <td className="py-3">TCP port to listen on</td>
                          <td className="py-3 font-mono text-xs">8080</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">--workers</td>
                          <td className="py-3">Number of worker processes</td>
                          <td className="py-3 font-mono text-xs">1</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">--api-key</td>
                          <td className="py-3">Require authentication with Bearer token</td>
                          <td className="py-3 font-mono text-xs">None</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Base URL</h3>
                  <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                    <p className="text-black/70 mb-3">All API endpoints are prefixed with:</p>
                    <div className="bg-black p-3 rounded font-mono text-sm text-[#7fff00]">
                      <code>http://localhost:8080/v1</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Available Endpoints</h3>
                  <div className="space-y-3">
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-mono text-sm mb-2">POST /v1/completions</h4>
                      <p className="text-sm text-black/70">Generate text completions from a prompt</p>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-mono text-sm mb-2">GET /v1/models</h4>
                      <p className="text-sm text-black/70">List available models</p>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-mono text-sm mb-2">GET /health</h4>
                      <p className="text-sm text-black/70">Health check and server status</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Authentication</h3>
                  <p className="text-black/70 mb-4">Enable API key authentication:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto mb-3">
                    <code>
                      nolimit serve --model ~/nolimit/nl-1.0-int8 --api-key your-secret-key
                    </code>
                  </div>
                  <p className="text-sm text-black/70 mb-3">Clients must include the API key in the Authorization header:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      curl http://localhost:8080/v1/completions \<br/>
                      {'  '}-H "Authorization: Bearer your-secret-key" \<br/>
                      {'  '}-H "Content-Type: application/json" \<br/>
                      {'  '}-d '{"{"}"prompt": "Hello", "max_tokens": 50{"}"}'
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'completion-endpoint' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Completion Endpoint</h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Generate text completions from prompts. Compatible with OpenAI's completion API.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Endpoint</h3>
                  <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                    <p className="font-mono text-sm mb-2">POST /v1/completions</p>
                    <p className="text-sm text-black/70">Creates a completion for the provided prompt.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Request Body</h3>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      {"{"}<br/>
                      {'  '}"prompt": "string",              // Required<br/>
                      {'  '}"max_tokens": 2048,              // Optional, default: 2048<br/>
                      {'  '}"temperature": 0.7,              // Optional, default: 0.7<br/>
                      {'  '}"top_p": 0.9,                    // Optional, default: 0.9<br/>
                      {'  '}"top_k": 0,                      // Optional, default: 0 (disabled)<br/>
                      {'  '}"frequency_penalty": 0.0,        // Optional, default: 0.0<br/>
                      {'  '}"presence_penalty": 0.0,         // Optional, default: 0.0<br/>
                      {'  '}"stop": ["&lt;|endoftext|&gt;"],        // Optional, default: []<br/>
                      {'  '}"stream": false,                 // Optional, default: false<br/>
                      {'  '}"seed": null,                    // Optional, default: null<br/>
                      {'  '}"n": 1                           // Optional, default: 1<br/>
                      {"}"}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Response Format</h3>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      {"{"}<br/>
                      {'  '}"id": "cmpl-AbcDeFgHiJk",<br/>
                      {'  '}"object": "text_completion",<br/>
                      {'  '}"created": 1704067200,<br/>
                      {'  '}"model": "nl-1.0-int8",<br/>
                      {'  '}"choices": [<br/>
                      {'    '}{"{"}<br/>
                      {'      '}"text": "Generated text appears here...",<br/>
                      {'      '}"index": 0,<br/>
                      {'      '}"logprobs": null,<br/>
                      {'      '}"finish_reason": "stop"<br/>
                      {'    '}{"}"}<br/>
                      {'  '}],<br/>
                      {'  '}"usage": {"{"}<br/>
                      {'    '}"prompt_tokens": 12,<br/>
                      {'    '}"completion_tokens": 256,<br/>
                      {'    '}"total_tokens": 268<br/>
                      {'  '}{"}"}<br/>
                      {"}"}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Example Requests</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-black mb-3">Basic Completion</h4>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          curl http://localhost:8080/v1/completions \<br/>
                          {'  '}-H "Content-Type: application/json" \<br/>
                          {'  '}-d '{"{"}'<br/>
                          {'    '}"prompt": "Explain quantum computing in simple terms:",<br/>
                          {'    '}"max_tokens": 512,<br/>
                          {'    '}"temperature": 0.7<br/>
                          {'  '}{"}"}'
                        </code>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-black mb-3">Code Generation</h4>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          curl http://localhost:8080/v1/completions \<br/>
                          {'  '}-H "Content-Type: application/json" \<br/>
                          {'  '}-d '{"{"}'<br/>
                          {'    '}"prompt": "def fibonacci(n):\n    \"\"\"Calculate fibonacci number\"\"\"",<br/>
                          {'    '}"max_tokens": 256,<br/>
                          {'    '}"temperature": 0.2,<br/>
                          {'    '}"stop": ["\n\ndef", "\n\nclass"]<br/>
                          {'  '}{"}"}'
                        </code>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-black mb-3">Deterministic Generation</h4>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          curl http://localhost:8080/v1/completions \<br/>
                          {'  '}-H "Content-Type: application/json" \<br/>
                          {'  '}-d '{"{"}'<br/>
                          {'    '}"prompt": "List the planets in our solar system:",<br/>
                          {'    '}"max_tokens": 128,<br/>
                          {'    '}"temperature": 0.0,<br/>
                          {'    '}"seed": 42<br/>
                          {'  '}{"}"}'
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Finish Reasons</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2 font-mono text-xs">Reason</th>
                          <th className="text-left py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">stop</td>
                          <td className="py-3">Model generated a natural stopping point or stop sequence</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">length</td>
                          <td className="py-3">Maximum token limit reached (max_tokens)</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3 font-mono text-xs">eos</td>
                          <td className="py-3">End-of-sequence token generated</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'streaming' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Streaming Responses</h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Real-time token-by-token generation with Server-Sent Events (SSE).
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Enabling Streaming</h3>
                  <p className="text-black/70 mb-4">Set <code className="bg-black/10 px-1 rounded">stream: true</code> in your request:</p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      curl http://localhost:8080/v1/completions \<br/>
                      {'  '}-H "Content-Type: application/json" \<br/>
                      {'  '}-d '{"{"}'<br/>
                      {'    '}"prompt": "Write a short story about AI:",<br/>
                      {'    '}"max_tokens": 512,<br/>
                      {'    '}"stream": true<br/>
                      {'  '}{"}"}'
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Stream Format</h3>
                  <p className="text-black/70 mb-4">Each chunk is a JSON object prefixed with <code className="bg-black/10 px-1 rounded">data:</code></p>
                  <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      data: {"{\"id\":\"cmpl-123\",\"choices\":[{\"text\":\"Once\",\"index\":0}]}"}<br/>
                      <br/>
                      data: {"{\"id\":\"cmpl-123\",\"choices\":[{\"text\":\" upon\",\"index\":0}]}"}<br/>
                      <br/>
                      data: {"{\"id\":\"cmpl-123\",\"choices\":[{\"text\":\" a\",\"index\":0}]}"}<br/>
                      <br/>
                      data: [DONE]
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Python Example</h3>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      import requests<br/>
                      import json<br/>
                      <br/>
                      url = "http://localhost:8080/v1/completions"<br/>
                      headers = {"{"}""Content-Type": "application/json"{"}"}<br/>
                      data = {"{"}<br/>
                      {'    '}"prompt": "Explain neural networks:",<br/>
                      {'    '}"max_tokens": 512,<br/>
                      {'    '}"stream": True<br/>
                      {"}"}<br/>
                      <br/>
                      with requests.post(url, headers=headers, json=data, stream=True) as response:<br/>
                      {'    '}for line in response.iter_lines():<br/>
                      {'        '}if line:<br/>
                      {'            '}decoded = line.decode('utf-8')<br/>
                      {'            '}if decoded.startswith('data: '):<br/>
                      {'                '}chunk = decoded[6:]<br/>
                      {'                '}if chunk != '[DONE]':<br/>
                      {'                    '}obj = json.loads(chunk)<br/>
                      {'                    '}text = obj['choices'][0]['text']<br/>
                      {'                    '}print(text, end='', flush=True)
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">JavaScript Example</h3>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      const response = await fetch('http://localhost:8080/v1/completions', {"{"}<br/>
                      {'  '}method: 'POST',<br/>
                      {'  '}headers: {"{"} 'Content-Type': 'application/json' {"}"},<br/>
                      {'  '}body: JSON.stringify({"{"}<br/>
                      {'    '}prompt: 'Explain machine learning:',<br/>
                      {'    '}max_tokens: 512,<br/>
                      {'    '}stream: true<br/>
                      {'  '}{"}"}) <br/>
                      {"}"});<br/>
                      <br/>
                      const reader = response.body.getReader();<br/>
                      const decoder = new TextDecoder();<br/>
                      <br/>
                      while (true) {"{"}<br/>
                      {'  '}const {"{"} done, value {"}"} = await reader.read();<br/>
                      {'  '}if (done) break;<br/>
                      {'  '}<br/>
                      {'  '}const chunk = decoder.decode(value);<br/>
                      {'  '}const lines = chunk.split('\n');<br/>
                      {'  '}<br/>
                      {'  '}for (const line of lines) {"{"}<br/>
                      {'    '}if (line.startsWith('data: ')) {"{"}<br/>
                      {'      '}const data = line.slice(6);<br/>
                      {'      '}if (data === '[DONE]') break;<br/>
                      {'      '}<br/>
                      {'      '}const obj = JSON.parse(data);<br/>
                      {'      '}const text = obj.choices[0].text;<br/>
                      {'      '}process.stdout.write(text);<br/>
                      {'    '}{"}"}<br/>
                      {'  '}{"}"}<br/>
                      {"}"}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Benefits of Streaming</h3>
                  <div className="space-y-3">
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">Lower Perceived Latency</h4>
                      <p className="text-sm text-black/70">Users see output immediately instead of waiting for the entire completion.</p>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">Early Termination</h4>
                      <p className="text-sm text-black/70">Cancel generation mid-stream if the output is unsatisfactory, saving compute.</p>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">Real-time UX</h4>
                      <p className="text-sm text-black/70">Build ChatGPT-style interfaces with typewriter effect.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'quantization' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Quantization</h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Reduce memory usage and improve throughput with INT8, FP16, or FP32 precision.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Available Quantization Formats</h3>
                  <div className="space-y-4">
                    <div className="bg-[#e8f5e6] p-6 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-mono text-lg text-[#2d5a3d] mb-3">INT8 (Recommended)</h4>
                      <p className="text-sm text-black/70 mb-3">8-bit integer quantization. Optimal for consumer GPUs with minimal quality loss.</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-bold">Memory:</span> ~13GB
                        </div>
                        <div>
                          <span className="font-bold">Speed:</span> 1.4x faster than FP16
                        </div>
                        <div>
                          <span className="font-bold">Quality:</span> 98.5% of FP32
                        </div>
                        <div>
                          <span className="font-bold">GPU Required:</span> 16GB VRAM
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f8faf8] p-6 border-l-4 border-black/20">
                      <h4 className="font-mono text-lg text-black mb-3">FP16 (Half Precision)</h4>
                      <p className="text-sm text-black/70 mb-3">16-bit floating point. Balanced precision and performance.</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-bold">Memory:</span> ~26GB
                        </div>
                        <div>
                          <span className="font-bold">Speed:</span> Reference
                        </div>
                        <div>
                          <span className="font-bold">Quality:</span> 99.7% of FP32
                        </div>
                        <div>
                          <span className="font-bold">GPU Required:</span> 32GB VRAM
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f8faf8] p-6 border-l-4 border-black/20">
                      <h4 className="font-mono text-lg text-black mb-3">FP32 (Full Precision)</h4>
                      <p className="text-sm text-black/70 mb-3">32-bit floating point. Maximum quality for research applications.</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-bold">Memory:</span> ~52GB
                        </div>
                        <div>
                          <span className="font-bold">Speed:</span> 0.6x (slower)
                        </div>
                        <div>
                          <span className="font-bold">Quality:</span> Reference (100%)
                        </div>
                        <div>
                          <span className="font-bold">GPU Required:</span> 80GB VRAM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Downloading Quantized Models</h3>
                  <p className="text-black/70 mb-4">Specify the quantization format when downloading:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">INT8 (default):</p>
                      <div className="bg-black p-3 rounded font-mono text-sm text-[#7fff00]">
                        <code>nolimit download --model nl-1.0-int8 --path ~/nolimit/models</code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">FP16:</p>
                      <div className="bg-black p-3 rounded font-mono text-sm text-[#7fff00]">
                        <code>nolimit download --model nl-1.0-fp16 --path ~/nolimit/models</code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">FP32:</p>
                      <div className="bg-black p-3 rounded font-mono text-sm text-[#7fff00]">
                        <code>nolimit download --model nl-1.0-fp32 --path ~/nolimit/models</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Quality Comparison</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <p className="text-sm text-black/70 mb-4">Benchmark scores across quantization formats:</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2">Benchmark</th>
                          <th className="text-center py-2">FP32</th>
                          <th className="text-center py-2">FP16</th>
                          <th className="text-center py-2">INT8</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3">MMLU (5-shot)</td>
                          <td className="py-3 text-center font-mono text-xs">72.4%</td>
                          <td className="py-3 text-center font-mono text-xs">72.2%</td>
                          <td className="py-3 text-center font-mono text-xs">71.3%</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3">HumanEval</td>
                          <td className="py-3 text-center font-mono text-xs">65.8%</td>
                          <td className="py-3 text-center font-mono text-xs">65.8%</td>
                          <td className="py-3 text-center font-mono text-xs">64.6%</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3">GSM8K Math</td>
                          <td className="py-3 text-center font-mono text-xs">68.3%</td>
                          <td className="py-3 text-center font-mono text-xs">68.0%</td>
                          <td className="py-3 text-center font-mono text-xs">67.1%</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3">TruthfulQA</td>
                          <td className="py-3 text-center font-mono text-xs">58.7%</td>
                          <td className="py-3 text-center font-mono text-xs">58.5%</td>
                          <td className="py-3 text-center font-mono text-xs">57.9%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#e8f5e6] border border-[#b8d1b3] p-6 rounded">
                  <h4 className="font-bold text-[#2d5a3d] mb-2">Recommendation</h4>
                  <p className="text-sm text-black/70">INT8 offers the best balance for consumer GPUs. Quality degradation is minimal (&lt;2% on most benchmarks) while enabling deployment on 16GB cards with 40% faster inference.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'batch-processing' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Batch Processing</h1>
              <p className="text-lg text-black/70 mb-8 leading-relaxed">
                Process multiple requests efficiently with continuous batching and offline batch API.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Continuous Batching</h3>
                  <p className="text-black/70 mb-4">NL 1.0 automatically batches concurrent requests for maximum GPU utilization:</p>
                  <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                    <p className="text-sm text-black/70 mb-3">When multiple requests arrive, the engine dynamically batches them together, sharing GPU compute across prompts.</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                      <div className="bg-white p-4 rounded border border-black/10">
                        <p className="font-bold mb-2">Sequential Processing</p>
                        <p className="text-xs text-black/60">4 requests × 2s each = 8s total</p>
                      </div>
                      <div className="bg-[#e8f5e6] p-4 rounded border border-[#2d5a3d]">
                        <p className="font-bold mb-2">Batched Processing</p>
                        <p className="text-xs text-black/60">4 requests batched = 3s total</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Batch Configuration</h3>
                  <p className="text-black/70 mb-4">Configure batch behavior in your server config:</p>
                  <div className="bg-black p-6 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                    <code>
                      inference:<br/>
                      {'  '}max_batch_size: 4              # Max concurrent requests<br/>
                      {'  '}max_num_batched_tokens: 32768  # Total tokens per batch<br/>
                      {'  '}max_num_seqs: 256              # Maximum sequences in waiting<br/>
                      {'  '}scheduler_delay: 0.0           # Add delay to collect more requests
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Offline Batch API</h3>
                  <p className="text-black/70 mb-4">Process large datasets efficiently with the batch CLI:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Prepare input file (JSONL format):</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          {"{"}"id": "req-001", "prompt": "Translate to French: Hello", "max_tokens": 64{"}"}<br/>
                          {"{"}"id": "req-002", "prompt": "Summarize: ...", "max_tokens": 128{"}"}<br/>
                          {"{"}"id": "req-003", "prompt": "Classify: ...", "max_tokens": 32{"}"}
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Run batch processing:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          nolimit batch \<br/>
                          {'  '}--model ~/nolimit/nl-1.0-int8 \<br/>
                          {'  '}--input requests.jsonl \<br/>
                          {'  '}--output results.jsonl \<br/>
                          {'  '}--batch-size 8
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-black/60 mb-2">Output format:</p>
                      <div className="bg-black p-4 rounded font-mono text-sm text-[#7fff00] overflow-x-auto">
                        <code>
                          {"{"}"id": "req-001", "completion": "Bonjour", "tokens": 3, "finish_reason": "stop"{"}"}<br/>
                          {"{"}"id": "req-002", "completion": "The article discusses...", "tokens": 48{"}"}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Throughput Optimization</h3>
                  <div className="space-y-3">
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">Disable Chunked Prefill</h4>
                      <p className="text-sm text-black/70 mb-2">For maximum throughput, turn off chunking:</p>
                      <div className="bg-black p-2 rounded font-mono text-xs text-[#7fff00]">
                        <code>enable_chunked_prefill: false</code>
                      </div>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">Increase Batch Size</h4>
                      <p className="text-sm text-black/70 mb-2">Maximize concurrent requests for your GPU:</p>
                      <div className="bg-black p-2 rounded font-mono text-xs text-[#7fff00]">
                        <code>max_batch_size: 12  # For RTX 4090 with short prompts</code>
                      </div>
                    </div>
                    <div className="bg-[#e8f5e6] p-4 border-l-4 border-[#2d5a3d]">
                      <h4 className="font-bold text-black mb-2">Use INT8 Quantization</h4>
                      <p className="text-sm text-black/70">Free up VRAM for larger batches without quality loss.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#2d5a3d] mb-4">Expected Throughput</h3>
                  <div className="bg-[#f8faf8] p-6 border-l-4 border-[#2d5a3d]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-black/20">
                          <th className="text-left py-2">GPU</th>
                          <th className="text-center py-2">Batch Size</th>
                          <th className="text-center py-2">Throughput</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-3">RTX 3060 12GB</td>
                          <td className="py-3 text-center font-mono text-xs">2-3</td>
                          <td className="py-3 text-center font-mono text-xs">120-150 tok/s</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3">RTX 4060 Ti 16GB</td>
                          <td className="py-3 text-center font-mono text-xs">3-4</td>
                          <td className="py-3 text-center font-mono text-xs">180-240 tok/s</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3">RTX 3090 24GB</td>
                          <td className="py-3 text-center font-mono text-xs">6-8</td>
                          <td className="py-3 text-center font-mono text-xs">400-520 tok/s</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-3">RTX 4090 24GB</td>
                          <td className="py-3 text-center font-mono text-xs">8-12</td>
                          <td className="py-3 text-center font-mono text-xs">600-800 tok/s</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'troubleshooting' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 font-mono">Troubleshooting</h1>
              <p className="text-lg text-black/70 mb-8">Common issues and solutions.</p>
              <div className="space-y-6">
                <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                  <h3 className="font-bold text-[#2d5a3d] mb-2">CUDA Out of Memory</h3>
                  <p className="text-sm text-black/70 mb-3">Reduce <code className="bg-black/10 px-1 rounded">max_batch_size</code>, lower <code className="bg-black/10 px-1 rounded">gpu_memory_utilization</code>, or use INT8 quantization.</p>
                </div>
                <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                  <h3 className="font-bold text-[#2d5a3d] mb-2">Slow First Token Latency</h3>
                  <p className="text-sm text-black/70 mb-3">Enable chunked prefill, reduce context length, or upgrade GPU.</p>
                </div>
                <div className="bg-[#f8faf8] border-l-4 border-[#2d5a3d] p-6">
                  <h3 className="font-bold text-[#2d5a3d] mb-2">License Activation Fails</h3>
                  <p className="text-sm text-black/70 mb-3">Check internet connection, verify key format, or use offline activation.</p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
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
    </div>
  );
}

