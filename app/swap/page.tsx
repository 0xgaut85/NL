"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { formatUnits } from 'viem';
import WalletModal from '@/components/WalletModal';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Token price interface
interface TokenPrice {
  usd: number;
  usd_24h_change: number;
}

interface TokenPrices {
  [key: string]: TokenPrice;
}

export default function SwapPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({});
  const [pricesLoading, setPricesLoading] = useState(true);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [solanaBalance, setSolanaBalance] = useState<string>("0.0000");
  const [sendToDifferentWallet, setSendToDifferentWallet] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [fromChain, setFromChain] = useState("Ethereum");
  const [toChain, setToChain] = useState("Ethereum");
  const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
  const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
  const [showFromChainDropdown, setShowFromChainDropdown] = useState(false);
  const [showToChainDropdown, setShowToChainDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  // Refs for dropdown positioning
  const fromChainButtonRef = useRef<HTMLButtonElement>(null);
  const fromTokenButtonRef = useRef<HTMLButtonElement>(null);
  const toChainButtonRef = useRef<HTMLButtonElement>(null);
  const toTokenButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Track previous chain to detect chain changes
  const prevFromChainRef = useRef(fromChain);
  const prevToChainRef = useRef(toChain);
  
  // Privacy settings state
  const [useRelayer, setUseRelayer] = useState(true);
  const [enableStealth, setEnableStealth] = useState(false);
  const [useMixer, setUseMixer] = useState(false);
  const [hideFromExplorer, setHideFromExplorer] = useState(true);
  
  // Coming soon modal state
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Available chains for cross-chain swaps
  const chains = [
    { name: "Ethereum", logo: "/logos/ethereum.jpg" },
    { name: "Arbitrum", logo: "/logos/arbitrum.jpg" },
    { name: "Optimism", logo: "/logos/optimism.jpg" },
    { name: "BSC", logo: "/logos/BSC.jpg" },
    { name: "Avalanche", logo: "/logos/avalanche.jpg" },
    { name: "Solana", logo: "/logos/solana.jpg" },
    { name: "Base", logo: "/logos/base.jpg" },
  ];

  // Wagmi hooks for wallet connection (Ethereum)
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Chain name to chain ID mapping (for EVM chains)
  const chainNameToId: { [key: string]: number } = {
    "Ethereum": 1,      // Ethereum Mainnet
    "Arbitrum": 42161,  // Arbitrum One
    "Optimism": 10,     // Optimism Mainnet
    "Base": 8453,       // Base Mainnet
    "BSC": 56,          // Binance Smart Chain
    "Avalanche": 43114, // Avalanche C-Chain
  };

  // Token contract addresses for each chain
  const tokenAddresses: { [chain: string]: { [token: string]: string } } = {
    "Ethereum": {
      "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "WBTC": "0x2260FAC5E5542a773Aa44fBCfEDf7C193bc2C599",
    },
    "Arbitrum": {
      "USDT": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      "USDC": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      "WBTC": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    },
    "Optimism": {
      "USDT": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      "USDC": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      "WBTC": "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
    },
    "Base": {
      "USDC": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    },
    "BSC": {
      "USDT": "0x55d398326f99059fF775485246999027B3197955",
      "USDC": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      "WBTC": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    },
    "Avalanche": {
      "USDT": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      "USDC": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      "WBTC": "0x50b7545627a5162F82A992c33b87aDc75187B218",
    }
  };

  // Get current chain name from chainId
  const getCurrentChainName = () => {
    const chainName = Object.keys(chainNameToId).find(k => chainNameToId[k] === chainId);
    return chainName || "Ethereum";
  };

  const currentChainName = getCurrentChainName();

  // Get native balance (ETH, BNB, AVAX)
  const { data: nativeBalance } = useBalance({
    address: address,
    chainId: chainId,
  });

  // Get token addresses for current chain
  const currentTokenAddresses = tokenAddresses[currentChainName] || {};

  // Get USDT balance on current chain (only if address exists for this chain)
  const { data: usdtBalance } = useBalance({
    address: address,
    token: currentTokenAddresses["USDT"] as `0x${string}` | undefined,
    chainId: chainId,
    query: {
      enabled: !!currentTokenAddresses["USDT"] && !!address
    }
  });

  // Get USDC balance on current chain
  const { data: usdcBalance } = useBalance({
    address: address,
    token: currentTokenAddresses["USDC"] as `0x${string}` | undefined,
    chainId: chainId,
    query: {
      enabled: !!currentTokenAddresses["USDC"] && !!address
    }
  });

  // Get WBTC balance on current chain
  const { data: wbtcBalance } = useBalance({
    address: address,
    token: currentTokenAddresses["WBTC"] as `0x${string}` | undefined,
    chainId: chainId,
    query: {
      enabled: !!currentTokenAddresses["WBTC"] && !!address
    }
  });

  // Check for Phantom wallet (Solana)
  useEffect(() => {
    // Helper to get Phantom provider
    const getPhantom = () => {
      if (typeof window === 'undefined') return null;
      if ((window as any).phantom?.solana?.isPhantom) {
        return (window as any).phantom.solana;
      }
      if ((window as any).solana?.isPhantom) {
        return (window as any).solana;
      }
      return null;
    };

    const fetchSolanaBalance = async (address: string) => {
      try {
        console.log('Getting SOL balance for:', address);
        
        // Try to get balance directly from Phantom first (it already knows the balance!)
        const phantom = getPhantom();
        if (phantom && phantom.publicKey && phantom.publicKey.toString() === address) {
          try {
            // Phantom has a connection object we can use
            if ((phantom as any).connection) {
              const phantomConnection = (phantom as any).connection;
              const balance = await phantomConnection.getBalance(phantom.publicKey);
              const solBalance = (balance / LAMPORTS_PER_SOL).toFixed(4);
              console.log('✅ Got balance directly from Phantom:', solBalance);
              setSolanaBalance(solBalance);
              return;
            }
          } catch (phantomErr) {
            console.log('Could not get balance from Phantom connection, trying RPCs...');
          }
        }
        
        // Fallback: Try public RPCs (but they're rate-limited)
        const mainnetEndpoints = [
          'https://api.mainnet-beta.solana.com',
          'https://rpc.ankr.com/solana',
        ];
        
        for (const endpoint of mainnetEndpoints) {
          try {
            console.log('Trying RPC:', endpoint);
            const connection = new Connection(endpoint, 'confirmed');
            const balanceResponse = await connection.getBalance(new PublicKey(address));
            const solBalance = (balanceResponse / LAMPORTS_PER_SOL).toFixed(4);
            console.log('✅ Got balance from RPC:', solBalance);
            setSolanaBalance(solBalance);
            return;
          } catch (err: any) {
            console.error(`RPC ${endpoint} failed:`, err.message);
            continue;
          }
        }
        
        // All methods failed
        console.error('❌ Could not fetch SOL balance - all RPCs are rate-limited');
        console.error('Your address:', address);
        console.error('Solution: Get a free RPC key from https://www.helius.dev or https://www.alchemy.com');
        setSolanaBalance('-.----');  // Show that we tried but failed
        
      } catch (error) {
        console.error('Error fetching SOL balance:', error);
        setSolanaBalance('0.0000');
      }
    };

    const phantom = getPhantom();
    
    if (phantom) {
      // Listen for Phantom account changes
      phantom.on('accountChanged', async (publicKey: any) => {
        if (publicKey) {
          const address = publicKey.toString();
          setSolanaAddress(address);
          await fetchSolanaBalance(address);
        } else {
          setSolanaAddress(null);
          setSolanaBalance("0.0000");
        }
      });

      // Listen for disconnect
      phantom.on('disconnect', () => {
        setSolanaAddress(null);
        setSolanaBalance("0.0000");
      });

      // Check if already connected on page load
      if (phantom.isConnected && phantom.publicKey) {
        const address = phantom.publicKey.toString();
        console.log('Phantom already connected on page load');
        console.log('Phantom address:', address);
        console.log('Phantom network:', phantom.isPhantom ? 'Solana' : 'Unknown');
        setSolanaAddress(address);
        fetchSolanaBalance(address);
      }

      // Listen for custom connection event from modal
      const handlePhantomConnected = (event: any) => {
        const address = event.detail.publicKey;
        console.log('Phantom connected event received:', address);
        setSolanaAddress(address);
        // Wait a bit for state to update, then fetch balance
        setTimeout(() => {
          fetchSolanaBalance(address);
        }, 500);
      };

      window.addEventListener('phantomConnected', handlePhantomConnected);

      return () => {
        window.removeEventListener('phantomConnected', handlePhantomConnected);
      };
    }
  }, []);

  // Fetch real token prices from CoinGecko API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setPricesLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,tether,usd-coin,wrapped-bitcoin,solana,binancecoin,avalanche-2&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        
        setTokenPrices({
          ETH: { usd: data.ethereum?.usd || 0, usd_24h_change: data.ethereum?.usd_24h_change || 0 },
          USDT: { usd: data.tether?.usd || 0, usd_24h_change: data.tether?.usd_24h_change || 0 },
          USDC: { usd: data['usd-coin']?.usd || 0, usd_24h_change: data['usd-coin']?.usd_24h_change || 0 },
          WBTC: { usd: data['wrapped-bitcoin']?.usd || 0, usd_24h_change: data['wrapped-bitcoin']?.usd_24h_change || 0 },
          SOL: { usd: data.solana?.usd || 0, usd_24h_change: data.solana?.usd_24h_change || 0 },
          BNB: { usd: data.binancecoin?.usd || 0, usd_24h_change: data.binancecoin?.usd_24h_change || 0 },
          AVAX: { usd: data['avalanche-2']?.usd || 0, usd_24h_change: data['avalanche-2']?.usd_24h_change || 0 },
          NL: { usd: 1.0, usd_24h_change: 0 }, // Placeholder for NL token
        });
        setPricesLoading(false);
      } catch (error) {
        console.error('Failed to fetch token prices:', error);
        setPricesLoading(false);
      }
    };

    fetchPrices();
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleDisconnectWallet = () => {
    // Disconnect Ethereum wallets
    if (isConnected) {
      disconnect();
    }
    
    // Disconnect Phantom (Solana)
    if (solanaAddress && (window as any).phantom?.solana) {
      (window as any).phantom.solana.disconnect();
      setSolanaAddress(null);
      setSolanaBalance("0.0000");
    }
  };

  // Format address for display
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : solanaAddress 
    ? `${solanaAddress.slice(0, 6)}...${solanaAddress.slice(-4)}`
    : '';

  // Format balance for display
  const displayBalance = nativeBalance 
    ? `${parseFloat(formatUnits(nativeBalance.value, nativeBalance.decimals)).toFixed(4)}`
    : '0.0000';

  // Format token balances
  const formatTokenBalance = (balance: any) => {
    if (!balance || !balance.value) return "0.00";
    return parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4);
  };

  // Chain to native token mapping
  const chainToNativeToken: { [key: string]: string } = {
    "Ethereum": "ETH",
    "Arbitrum": "ETH",
    "Optimism": "ETH",
    "Base": "ETH",
    "BSC": "BNB",
    "Avalanche": "AVAX",
    "Solana": "SOL"
  };

  // Get balance for a specific token based on current chain
  const getTokenBalance = (tokenSymbol: string) => {
    // For native tokens (ETH, BNB, AVAX), check if it matches current chain's native token
    const currentNativeToken = chainToNativeToken[currentChainName];
    
    if (tokenSymbol === "ETH" && (currentChainName === "Ethereum" || currentChainName === "Arbitrum" || currentChainName === "Optimism" || currentChainName === "Base")) {
      return displayBalance;
    }
    if (tokenSymbol === "BNB" && currentChainName === "BSC") {
      return displayBalance;
    }
    if (tokenSymbol === "AVAX" && currentChainName === "Avalanche") {
      return displayBalance;
    }
    if (tokenSymbol === "SOL") {
      return solanaBalance;
    }
    
    // For ERC20 tokens, first check if the token address exists on current chain
    const tokenAddress = currentTokenAddresses[tokenSymbol];
    
    // If token doesn't exist on this chain, return 0.00
    if (!tokenAddress) {
      return "0.00";
    }
    
    // For ERC20 tokens, use fetched balances
    if (tokenSymbol === "USDT") {
      return formatTokenBalance(usdtBalance);
    }
    if (tokenSymbol === "USDC") {
      return formatTokenBalance(usdcBalance);
    }
    if (tokenSymbol === "WBTC") {
      return formatTokenBalance(wbtcBalance);
    }
    
    // Default to 0.00 if token not available on current chain
    return "0.00";
  };

  // Debug logging
  useEffect(() => {
    if (isConnected && address) {
      console.log('=== Balance Debug ===');
      console.log('EVM Wallet connected:', address);
      console.log('Chain ID:', chainId);
      console.log('Current Chain Name:', currentChainName);
      console.log('Native Balance:', nativeBalance);
      console.log('USDT Balance Object:', usdtBalance);
      console.log('USDC Balance Object:', usdcBalance);
      console.log('WBTC Balance Object:', wbtcBalance);
      console.log('Current Token Addresses:', currentTokenAddresses);
      console.log('===================');
    }
    if (solanaAddress) {
      console.log('Solana Wallet connected:', solanaAddress);
      console.log('SOL Balance:', solanaBalance);
    }
  }, [isConnected, address, chainId, currentChainName, nativeBalance, usdtBalance, usdcBalance, wbtcBalance, solanaAddress, solanaBalance, currentTokenAddresses]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is inside any button or dropdown
      const isInsideButton = target.closest('button');
      const isInsideDropdown = target.closest('[data-dropdown]');
      
      // If clicking outside both button and dropdown, close all dropdowns
      if (!isInsideButton && !isInsideDropdown) {
        setShowFromTokenDropdown(false);
        setShowToTokenDropdown(false);
        setShowFromChainDropdown(false);
        setShowToChainDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-switch token when chain changes (only when chain actually changes, not when user manually selects token)
  useEffect(() => {
    // Only auto-switch if the chain has changed
    if (prevFromChainRef.current !== fromChain) {
      const nativeToken = chainToNativeToken[fromChain];
      if (nativeToken) {
        setFromToken(nativeToken);
      }
      prevFromChainRef.current = fromChain;
    }
  }, [fromChain, chainToNativeToken]);

  // Auto-switch wallet network when fromChain changes
  useEffect(() => {
    // Only switch if wallet is connected and it's an EVM chain
    if (isConnected && switchChain && fromChain !== "Solana") {
      const targetChainId = chainNameToId[fromChain];
      if (targetChainId && chainId !== targetChainId) {
        try {
          switchChain({ chainId: targetChainId });
          console.log(`Switching to ${fromChain} (Chain ID: ${targetChainId})`);
        } catch (error) {
          console.error(`Failed to switch to ${fromChain}:`, error);
        }
      }
    }
    // Note: Solana network switching would need to be handled through Phantom wallet
    // which doesn't support programmatic network switching the same way
  }, [fromChain, isConnected, chainId, switchChain, chainNameToId]);

  useEffect(() => {
    // Only auto-switch if the chain has changed
    if (prevToChainRef.current !== toChain) {
      const nativeToken = chainToNativeToken[toChain];
      if (nativeToken) {
        setToToken(nativeToken);
      }
      prevToChainRef.current = toChain;
    }
  }, [toChain, chainToNativeToken]);

  // Recalculate exchange when token selection or prices change
  useEffect(() => {
    if (fromAmount && tokenPrices[fromToken] && tokenPrices[toToken]) {
      const fromPrice = tokenPrices[fromToken].usd;
      const toPrice = tokenPrices[toToken].usd;
      const rate = fromPrice / toPrice;
      setToAmount((Number(fromAmount) * rate).toFixed(6));
    }
  }, [fromToken, toToken, tokenPrices, fromAmount]);

  const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: getTokenBalance("ETH"), id: "ethereum" },
    { symbol: "SOL", name: "Solana", balance: getTokenBalance("SOL"), id: "solana" },
    { symbol: "BNB", name: "BNB", balance: getTokenBalance("BNB"), id: "bnb" },
    { symbol: "AVAX", name: "Avalanche", balance: getTokenBalance("AVAX"), id: "avax" },
    { symbol: "USDT", name: "Tether", balance: getTokenBalance("USDT"), id: "tether" },
    { symbol: "USDC", name: "USD Coin", balance: getTokenBalance("USDC"), id: "usd-coin" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", balance: getTokenBalance("WBTC"), id: "wrapped-bitcoin" },
    { symbol: "NL", name: "NoLimit Token", balance: "0.00", id: "nolimit" }
  ];

  // Get balance for selected chain's native token
  const getChainBalance = (chain: string) => {
    const nativeToken = chainToNativeToken[chain];
    if ((nativeToken === "ETH" || nativeToken === "BNB" || nativeToken === "AVAX") && nativeBalance) {
      return parseFloat(formatUnits(nativeBalance.value, nativeBalance.decimals)).toFixed(4);
    } else if (nativeToken === "SOL") {
      return solanaBalance;
    }
    return "0.00";
  };

  // Get token logo - use local logos only
  const getTokenLogo = (tokenId: string) => {
    // Use local logos from public/logos folder
    const localLogos: { [key: string]: string } = {
      'nolimit': '/illustration/logox.jpg',
      'ethereum': '/logos/ethereum.jpg',
      'solana': '/logos/solana.jpg',
      'tether': '/logos/usdt.png',
      'usd-coin': '/logos/usdc.png',
      'wrapped-bitcoin': '/logos/wbtc.jpeg',
      'bnb': '/logos/BSC.jpg',
      'avax': '/logos/avalanche.jpg',
    };

    // Return local logo or default to nolimit logo
    return localLogos[tokenId] || '/illustration/logox.jpg';
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Calculate exchange rate based on real prices
    if (value && !isNaN(Number(value)) && tokenPrices[fromToken] && tokenPrices[toToken]) {
      const fromPrice = tokenPrices[fromToken].usd;
      const toPrice = tokenPrices[toToken].usd;
      const rate = fromPrice / toPrice;
      setToAmount((Number(value) * rate).toFixed(6));
    } else {
      setToAmount("");
    }
  };

  // Helper to render dropdown in portal
  const renderDropdownPortal = (isVisible: boolean, buttonRef: React.RefObject<HTMLButtonElement>, content: React.ReactNode): React.ReactPortal | null => {
    if (!mounted || !isVisible || !buttonRef.current) return null;
    
    const rect = buttonRef.current.getBoundingClientRect();
    
    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: `${rect.bottom + 8}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        }}
      >
        {content}
      </div>,
      document.body
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Wallet Modal */}
      <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
      
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowComingSoonModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full rounded-3xl p-8 border border-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(184, 209, 179, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px 0 rgba(184, 209, 179, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logo3.svg"
                alt="no limit Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold font-mono text-white uppercase tracking-wider">
                Coming Soon
              </h3>

              <p className="text-white/70 font-mono text-sm leading-relaxed">
                Our decentralized exchange is currently in development. We're building a revolutionary privacy-focused multi-chain swap protocol.
              </p>

              <div className="pt-4 space-y-2">
                <p className="text-xs font-mono text-white/50 uppercase tracking-wider">What to expect:</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#b8d1b3] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-xs font-mono text-white/60">Cross-chain swaps & bridges</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#b8d1b3] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-xs font-mono text-white/60">Zero-knowledge privacy features</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#b8d1b3] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-xs font-mono text-white/60">$NL rewards for every swap</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#b8d1b3] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-xs font-mono text-white/60">Institutional-grade execution</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowComingSoonModal(false)}
              className="w-full mt-6 bg-[#b8d1b3] text-black py-3 px-6 font-mono text-sm font-bold hover:bg-[#a8c1a3] transition-colors rounded-xl uppercase tracking-wider"
            >
              Got it
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black/60 border-b border-white/10 px-4 md:px-8 py-4 md:py-6 backdrop-blur-xl"
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
            {["About", "Model", "Pricing", "Roadmap", "Docs"].map((item, i) => (
              <motion.a
                key={item}
                href={item === "Pricing" ? "/pricing" : item === "Model" ? "/model" : item === "Roadmap" ? "/roadmap" : item === "Docs" ? "/docs" : `/#${item.toLowerCase()}`}
                className="hover:text-[#b8d1b3] transition-colors bracket-text"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <div className="hidden md:flex gap-3 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 md:px-6 font-mono text-xs md:text-sm font-bold hover:bg-white/20 transition-colors whitespace-nowrap border border-white/20"
            >
              Request Beta Access
            </motion.button>
            <Link href="/swap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#b8d1b3] text-black px-4 py-2 md:px-6 font-mono text-xs md:text-sm font-bold hover:bg-[#a8c1a3] transition-colors whitespace-nowrap"
              >
                nolimit Swap
              </motion.button>
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 mt-4 pt-4"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm text-white">
              {["About", "Model", "Pricing", "Docs"].map((item) => (
                <a
                  key={item}
                  href={item === "Pricing" ? "/pricing" : item === "Model" ? "/model" : item === "Roadmap" ? "/roadmap" : item === "Docs" ? "/docs" : `/#${item.toLowerCase()}`}
                  className="hover:text-[#b8d1b3] transition-colors bracket-text"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 font-mono text-xs font-bold hover:bg-white/20 transition-colors w-full text-left border border-white/20">
                Request Beta Access
              </button>
              <Link href="/swap">
                <button className="bg-[#b8d1b3] text-black px-4 py-2 font-mono text-xs font-bold hover:bg-[#a8c1a3] transition-colors w-full text-left">
                  nolimit Swap
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </motion.header>

      <main className="flex-1 bg-black">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black border-b border-white/5">
          <div className="max-w-7xl mx-auto text-center px-4 md:px-8 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-mono bracket-text">Token Swap</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Multi-chain decentralized trading with institutional-grade execution
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Swap Interface */}
        <div className="relative">
          {/* Vault Background Decoration - Full Width */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'url(/illustration/vault.png)',
              backgroundSize: 'auto 56%',
              backgroundPosition: '0% 0%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 relative z-10 lg:pl-28 xl:pl-32">
            {/* Left Column - Swap Interface */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative rounded-3xl overflow-visible"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.005) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
            {/* Settings Bar with Connect Wallet */}
            <div className="bg-white/5 backdrop-blur-xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10">
              <h2 className="text-white font-mono text-base md:text-lg font-bold uppercase tracking-wider">Exchange Tokens</h2>
              <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-white/70 font-mono text-xs md:text-sm uppercase tracking-wider whitespace-nowrap">Slippage Tolerance</span>
                  <div className="flex items-center gap-2">
                    {/* Preset buttons */}
                    {['0.1', '0.5', '1.0'].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSlippage(preset)}
                        className={`px-2 py-1 font-mono text-xs rounded-lg transition-colors ${
                          slippage === preset 
                            ? 'bg-[#b8d1b3] text-black' 
                            : 'bg-black border border-white/20 text-white hover:border-[#b8d1b3]'
                        }`}
                      >
                        {preset}%
                      </button>
                    ))}
                    {/* Custom input */}
                    <div className="relative">
                      <input
                        type="number"
                        value={slippage}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow empty string while typing
                          if (value === '') {
                            setSlippage('');
                            return;
                          }
                          const num = parseFloat(value);
                          // Validate between 0.1 and 49
                          if (!isNaN(num) && num >= 0.1 && num <= 49) {
                            setSlippage(value);
                          } else if (!isNaN(num) && num > 49) {
                            setSlippage('49');
                          } else if (!isNaN(num) && num < 0.1) {
                            setSlippage('0.1');
                          }
                        }}
                        onBlur={() => {
                          // Set to default if empty on blur
                          if (slippage === '') {
                            setSlippage('0.5');
                          }
                        }}
                        placeholder="0.5"
                        step="0.1"
                        min="0.1"
                        max="49"
                        className="w-16 bg-black border border-white/20 text-white px-2 py-1 pr-6 font-mono text-xs focus:outline-none focus:border-[#b8d1b3] rounded-lg text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 font-mono text-xs pointer-events-none">%</span>
                    </div>
                  </div>
                </div>
                {/* Connect Wallet Button - Top Right Corner */}
                {!isConnected && !solanaAddress ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleConnectWallet}
                    className="bg-[#b8d1b3] text-black px-5 py-2 font-mono text-xs md:text-sm font-bold hover:bg-[#a8c1a3] transition-colors whitespace-nowrap rounded-lg"
                  >
                    Connect Wallet
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDisconnectWallet}
                    className="bg-white/10 backdrop-blur-sm text-white px-5 py-2 font-mono text-xs md:text-sm font-bold hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap rounded-lg"
                  >
                    {displayAddress}
                  </motion.button>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-2 overflow-visible">
              {/* From Token */}
              <div className="space-y-3 overflow-visible">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider font-bold">You Pay</label>
                  <span className="text-xs font-mono text-white/50">
                    Balance: {getChainBalance(fromChain)}
                  </span>
                </div>
                
                 {/* From Chain Selector */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl relative z-[60]">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-2">From Chain</label>
                  <div className="relative">
                    <button
                      ref={fromChainButtonRef}
                      onClick={() => {
                        setShowFromChainDropdown(!showFromChainDropdown);
                        setShowToChainDropdown(false);
                        setShowFromTokenDropdown(false);
                        setShowToTokenDropdown(false);
                      }}
                      className="w-full bg-black border border-white/20 text-white pl-10 pr-8 py-2 font-mono text-sm focus:outline-none focus:border-[#b8d1b3] cursor-pointer rounded-lg hover:border-white/30 transition-colors text-left"
                    >
                      {fromChain}
                    </button>
                    {/* Logo display */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
                      <Image
                        src={chains.find(c => c.name === fromChain)?.logo || '/logos/ethereum.jpg'}
                        alt={fromChain}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                    {/* Dropdown arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Portal Dropdown for From Chain */}
                {renderDropdownPortal(
                  showFromChainDropdown,
                  fromChainButtonRef,
                  <div className="bg-black border border-white/20 rounded-lg shadow-2xl" data-dropdown>
                    {chains.map((chain) => (
                      <button
                        key={chain.name}
                        onClick={() => {
                          setFromChain(chain.name);
                          setShowFromChainDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                      >
                        <Image
                          src={chain.logo}
                          alt={chain.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-mono text-sm text-white">{chain.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 hover:border-[#b8d1b3]/50 transition-colors rounded-xl relative z-[50]">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button
                        ref={fromTokenButtonRef}
                        onClick={() => {
                          setShowFromTokenDropdown(!showFromTokenDropdown);
                          setShowToTokenDropdown(false);
                          setShowFromChainDropdown(false);
                          setShowToChainDropdown(false);
                        }}
                        className="bg-black border border-white/20 text-white pl-12 pr-4 py-2.5 font-mono font-bold text-base md:text-lg focus:outline-none focus:border-[#b8d1b3] cursor-pointer hover:border-[#b8d1b3]/50 transition-colors rounded-lg"
                      >
                        {fromToken}
                      </button>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
                        <Image
                          src={getTokenLogo(tokens.find(t => t.symbol === fromToken)?.id || 'ethereum')}
                          alt={fromToken}
                          width={24}
                          height={24}
                          className="rounded-full"
                          unoptimized
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-right text-2xl md:text-3xl font-bold focus:outline-none font-mono text-white"
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-xs font-mono text-white/40">
                      {tokens.find(t => t.symbol === fromToken)?.name}
                    </span>
                    {tokenPrices[fromToken] && (
                      <div className="mt-1">
                        <span className="text-xs font-mono text-white/60 font-bold">
                          ${tokenPrices[fromToken].usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`text-xs font-mono ml-2 ${tokenPrices[fromToken].usd_24h_change >= 0 ? 'text-[#b8d1b3]' : 'text-red-400'}`}>
                          {tokenPrices[fromToken].usd_24h_change >= 0 ? '▲' : '▼'}
                          {Math.abs(tokenPrices[fromToken].usd_24h_change).toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Portal Dropdown for From Token */}
              {renderDropdownPortal(
                showFromTokenDropdown,
                fromTokenButtonRef,
                <div className="bg-black border border-white/20 rounded-lg shadow-2xl" style={{ width: '256px' }} data-dropdown>
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setFromToken(token.symbol);
                        setShowFromTokenDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Image
                        src={getTokenLogo(token.id)}
                        alt={token.symbol}
                        width={32}
                        height={32}
                        className="rounded-full"
                        unoptimized
                      />
                      <div className="flex-1">
                        <div className="font-mono text-sm font-bold text-white">{token.symbol}</div>
                        <div className="font-mono text-xs text-white/50">{token.name}</div>
                      </div>
                      <div className="font-mono text-xs text-white/60">{token.balance}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Swap Button */}
              <div className="flex justify-center py-1 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSwapTokens}
                  className="bg-[#b8d1b3] p-2.5 border-4 border-white/10 shadow-lg hover:bg-[#a8c1a3] transition-all duration-300 rounded-xl"
                  aria-label="Swap tokens"
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </motion.button>
              </div>

              {/* To Token */}
              <div className="space-y-3 overflow-visible">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider font-bold">You Receive</label>
                  <span className="text-xs font-mono text-white/50">
                    Balance: {getChainBalance(toChain)}
                  </span>
                </div>
                
                {/* To Chain Selector */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl relative z-[80]">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-2">To Chain</label>
                  <div className="relative">
                    <button
                      ref={toChainButtonRef}
                      onClick={() => {
                        setShowToChainDropdown(!showToChainDropdown);
                        setShowFromChainDropdown(false);
                        setShowFromTokenDropdown(false);
                        setShowToTokenDropdown(false);
                      }}
                      className="w-full bg-black border border-white/20 text-white pl-10 pr-8 py-2 font-mono text-sm focus:outline-none focus:border-[#b8d1b3] cursor-pointer rounded-lg hover:border-white/30 transition-colors text-left"
                    >
                      {toChain}
                    </button>
                    {/* Logo display */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
                      <Image
                        src={chains.find(c => c.name === toChain)?.logo || '/logos/ethereum.jpg'}
                        alt={toChain}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                    {/* Dropdown arrow */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {fromChain !== toChain && (
                    <p className="text-xs font-mono text-[#b8d1b3] mt-2">
                      Cross-chain bridge: {fromChain} → {toChain}
                    </p>
                  )}
                </div>
                
                {/* Portal Dropdown for To Chain */}
                {renderDropdownPortal(
                  showToChainDropdown,
                  toChainButtonRef,
                  <div className="bg-black border border-white/20 rounded-lg shadow-2xl" data-dropdown>
                    {chains.map((chain) => (
                      <button
                        key={chain.name}
                        onClick={() => {
                          setToChain(chain.name);
                          setShowToChainDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                      >
                        <Image
                          src={chain.logo}
                          alt={chain.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-mono text-sm text-white">{chain.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 hover:border-[#b8d1b3]/50 transition-colors rounded-xl relative z-[90]">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button
                        ref={toTokenButtonRef}
                        onClick={() => {
                          setShowToTokenDropdown(!showToTokenDropdown);
                          setShowFromTokenDropdown(false);
                          setShowFromChainDropdown(false);
                          setShowToChainDropdown(false);
                        }}
                        className="bg-black border border-white/20 text-white pl-12 pr-4 py-2.5 font-mono font-bold text-base md:text-lg focus:outline-none focus:border-[#b8d1b3] cursor-pointer hover:border-[#b8d1b3]/50 transition-colors rounded-lg"
                      >
                        {toToken}
                      </button>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
                        <Image
                          src={getTokenLogo(tokens.find(t => t.symbol === toToken)?.id || 'ethereum')}
                          alt={toToken}
                          width={24}
                          height={24}
                          className="rounded-full"
                          unoptimized
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={toAmount}
                      readOnly
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-right text-2xl md:text-3xl font-bold focus:outline-none font-mono text-white/70"
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-xs font-mono text-white/40">
                      {tokens.find(t => t.symbol === toToken)?.name}
                    </span>
                    {tokenPrices[toToken] && (
                      <div className="mt-1">
                        <span className="text-xs font-mono text-white/60 font-bold">
                          ${tokenPrices[toToken].usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`text-xs font-mono ml-2 ${tokenPrices[toToken].usd_24h_change >= 0 ? 'text-[#b8d1b3]' : 'text-red-400'}`}>
                          {tokenPrices[toToken].usd_24h_change >= 0 ? '▲' : '▼'}
                          {Math.abs(tokenPrices[toToken].usd_24h_change).toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Portal Dropdown for To Token */}
              {renderDropdownPortal(
                showToTokenDropdown,
                toTokenButtonRef,
                <div className="bg-black border border-white/20 rounded-lg shadow-2xl" style={{ width: '256px' }} data-dropdown>
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setToToken(token.symbol);
                        setShowToTokenDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Image
                        src={getTokenLogo(token.id)}
                        alt={token.symbol}
                        width={32}
                        height={32}
                        className="rounded-full"
                        unoptimized
                      />
                      <div className="flex-1">
                        <div className="font-mono text-sm font-bold text-white">{token.symbol}</div>
                        <div className="font-mono text-xs text-white/50">{token.name}</div>
                      </div>
                      <div className="font-mono text-xs text-white/60">{token.balance}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Send to Different Wallet Option */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={sendToDifferentWallet}
                    onChange={(e) => {
                      setSendToDifferentWallet(e.target.checked);
                      if (!e.target.checked) {
                        setRecipientAddress('');
                      }
                    }}
                    className="w-5 h-5 accent-[#b8d1b3] cursor-pointer"
                  />
                  <span className="text-sm font-mono text-white/70 group-hover:text-white transition-colors">
                    Send to a different wallet
                  </span>
                </label>

                {sendToDifferentWallet && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <label className="text-xs font-mono text-white/60 uppercase tracking-wider font-bold block mb-2">
                      Recipient Wallet Address
                    </label>
                    <input
                      type="text"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      placeholder="Enter wallet address (0x... or Solana address)"
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white p-4 font-mono text-sm focus:outline-none focus:border-[#b8d1b3] hover:border-white/30 transition-colors rounded-lg placeholder:text-white/30"
                    />
                    <p className="text-xs font-mono text-white/40 mt-2">
                      ⚠️ Double-check the address. Transactions cannot be reversed.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Exchange Rate Info */}
              {fromAmount && toAmount && !pricesLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 space-y-3 mt-4 rounded-xl"
                >
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-white/50 uppercase tracking-wider text-xs">Exchange Rate</span>
                    <span className="font-bold text-white">1 {fromToken} = {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono border-t border-white/10 pt-3">
                    <span className="text-white/50 uppercase tracking-wider text-xs">Network Fee</span>
                    <span className="font-bold text-white">{(Number(fromAmount) * 0.003).toFixed(6)} {fromToken}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono border-t border-white/10 pt-3">
                    <span className="text-white/50 uppercase tracking-wider text-xs">Max Slippage</span>
                    <span className="font-bold text-[#b8d1b3]">{slippage}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono border-t border-white/10 pt-3">
                    <span className="text-white/50 uppercase tracking-wider text-xs">Minimum Received</span>
                    <span className="font-bold text-[#b8d1b3]">{(Number(toAmount) * (1 - Number(slippage) / 100)).toFixed(6)} {toToken}</span>
                  </div>
                </motion.div>
              )}

              {/* Swap Button */}
              <motion.button
                whileHover={{ scale: (!isConnected && !solanaAddress) || (!fromAmount || !toAmount) || (sendToDifferentWallet && !recipientAddress) ? 1 : 1.02 }}
                whileTap={{ scale: (!isConnected && !solanaAddress) || (!fromAmount || !toAmount) || (sendToDifferentWallet && !recipientAddress) ? 1 : 0.98 }}
                disabled={(!isConnected && !solanaAddress) || !fromAmount || !toAmount || (sendToDifferentWallet && !recipientAddress)}
                onClick={() => {
                  if ((isConnected || solanaAddress) && fromAmount && toAmount) {
                    setShowComingSoonModal(true);
                  }
                }}
                className="w-full bg-[#b8d1b3] text-black py-4 md:py-5 font-mono text-base md:text-lg font-bold hover:bg-[#a8c1a3] hover:shadow-lg hover:shadow-[#b8d1b3]/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#b8d1b3] disabled:hover:text-black uppercase tracking-wider mt-6 rounded-xl"
              >
                {!isConnected && !solanaAddress 
                  ? "Connect Wallet to Swap" 
                  : !fromAmount || !toAmount 
                  ? "Enter Amount" 
                  : sendToDifferentWallet && !recipientAddress
                  ? "Enter Recipient Address"
                  : sendToDifferentWallet
                  ? "Swap & Send"
                  : "Execute Swap"}
              </motion.button>

              {/* Info Message */}
              {!isConnected && !solanaAddress && (
                <div className="text-center pt-4 border-t border-white/10 mt-6">
                  <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    Connect your wallet to begin trading
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Transaction History & Rewards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:flex flex-col gap-6"
          >
            {/* $NL Rewards Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative rounded-3xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(184,209,179,0.02) 0%, rgba(184,209,179,0.01) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/illustration/logox.jpg"
                  alt="NL Token"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h3 className="text-white font-mono text-lg font-bold uppercase tracking-wider">$NL Rewards</h3>
              </div>
              
              {isConnected || solanaAddress ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">Total Earned</p>
                    <p className="text-3xl font-bold font-mono text-[#b8d1b3]">
                      0.00 <span className="text-xl text-white/50">$NL</span>
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/30 p-3 rounded-xl">
                      <p className="text-xs font-mono text-white/50 mb-1">This Week</p>
                      <p className="text-lg font-bold font-mono text-white">0.0</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl">
                      <p className="text-xs font-mono text-white/50 mb-1">Last Swap</p>
                      <p className="text-lg font-bold font-mono text-white">0.0</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-mono text-white/60 leading-relaxed">
                      Earn <span className="text-[#b8d1b3] font-bold">$NL tokens</span> with every swap or bridge transaction. Higher volumes = more rewards!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-mono text-white/50 mb-2">Connect Wallet</p>
                  <p className="text-xs font-mono text-white/30">to view your $NL rewards</p>
                </div>
              )}
            </div>

            {/* Transaction History Card - Smaller */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative rounded-3xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.005) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-white font-mono text-base font-bold uppercase tracking-wider mb-3">Recent Activity</h3>
              
              {isConnected || solanaAddress ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-xs font-mono text-white/50 mb-1">No transactions yet</p>
                  <p className="text-[10px] font-mono text-white/30 max-w-[180px]">Your swap history will appear here</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs font-mono text-white/50 mb-1">Connect Wallet</p>
                  <p className="text-[10px] font-mono text-white/30">to view your history</p>
                </div>
              )}
            </div>

            {/* Privacy Settings Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative rounded-3xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.005) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#b8d1b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-white font-mono text-base font-bold uppercase tracking-wider">Privacy</h3>
              </div>
              
              <div className="space-y-3">
                {/* Use Relayer */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={useRelayer}
                      onChange={(e) => setUseRelayer(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b8d1b3]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-white/90 font-bold">Use Relayer Network</p>
                    <p className="text-[10px] font-mono text-white/50 mt-0.5">Submit transactions through relayers to hide your IP address</p>
                  </div>
                </label>

                {/* Stealth Addresses */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={enableStealth}
                      onChange={(e) => setEnableStealth(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b8d1b3]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-white/90 font-bold">Stealth Addresses</p>
                    <p className="text-[10px] font-mono text-white/50 mt-0.5">Generate one-time addresses to break transaction links</p>
                  </div>
                </label>

                {/* Privacy Pool Mixer */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={useMixer}
                      onChange={(e) => setUseMixer(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b8d1b3]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-white/90 font-bold">Privacy Pool Mixer</p>
                    <p className="text-[10px] font-mono text-white/50 mt-0.5">Route through privacy pools to obfuscate transaction origin</p>
                  </div>
                </label>

                {/* Zero-Knowledge Proofs */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={hideFromExplorer}
                      onChange={(e) => setHideFromExplorer(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b8d1b3]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-white/90 font-bold">Zero-Knowledge Proofs</p>
                    <p className="text-[10px] font-mono text-white/50 mt-0.5">Prove transaction validity without revealing details (zk-SNARKs)</p>
                  </div>
                </label>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] font-mono text-white/40 leading-relaxed">
                  Privacy features use cutting-edge cryptography. Some options may increase gas costs.
                </p>
              </div>
            </div>
          </motion.div>
          </div>

          {/* Protocol Features */}
          <div className="grid md:grid-cols-3 gap-1 mt-12 border border-white/10 overflow-hidden rounded-2xl">
            {[
              {
                title: "Minimal Fees",
                desc: "Competitive 0.3% trading fee with optimized gas efficiency for cost-effective transactions",
                number: "01"
              },
              {
                title: "Instant Execution",
                desc: "High-performance routing engine delivers sub-second trade execution across multiple liquidity pools",
                number: "02"
              },
              {
                title: "Non-Custodial",
                desc: "Fully decentralized architecture ensures complete asset custody and transaction sovereignty",
                number: "03"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="bg-white/5 backdrop-blur-sm border-r border-white/10 last:border-r-0 p-6 md:p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-white/10 font-mono group-hover:text-[#b8d1b3]/20 transition-colors">
                    {feature.number}
                  </span>
                </div>
                <h3 className="font-mono font-bold text-lg md:text-xl text-white mb-3 uppercase tracking-wider">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

        {/* Multi-Chain Support - Full Width, No Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20 mb-20 w-full"
        >
          <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left Side - Big Text */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 bg-gradient-to-br from-white/5 to-transparent">
              <motion.h3 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 font-mono uppercase tracking-wider leading-tight"
              >
                Multi-Chain<br />Protocol
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="text-white/80 text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl font-light"
              >
                Privacy-focused decentralized exchange enabling fully anonymous cross-chain swaps and bridges. 
                No KYC. No tracking. No data collection. Trade freely across multiple chains with complete anonymity.
              </motion.p>
            </div>

            {/* Right Side - Bigger Scrolling Carousel */}
            <div className="relative flex items-center justify-center py-16 overflow-hidden bg-gradient-to-bl from-white/5 to-transparent">
              <div className="scroll-container w-full h-full">
                <div className="scroll-content">
                  {[
                    { name: "Ethereum", logo: "/logos/ethereum.jpg" },
                    { name: "Arbitrum", logo: "/logos/arbitrum.jpg" },
                    { name: "Optimism", logo: "/logos/optimism.jpg" },
                    { name: "BSC", logo: "/logos/BSC.jpg" },
                    { name: "Avalanche", logo: "/logos/avalanche.jpg" },
                    { name: "Solana", logo: "/logos/solana.jpg" },
                    { name: "Base", logo: "/logos/base.jpg" }
                  ].map((chain, index) => (
                    <motion.div
                      key={`${chain.name}-1-${index}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + (index * 0.1) }}
                      className="scroll-item backdrop-blur-2xl px-12 py-8 border border-white/10 hover:border-[#b8d1b3]/30 transition-all duration-500 rounded-3xl mx-4 group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(184,209,179,0.03) 100%)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-white font-mono text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider group-hover:text-[#b8d1b3] transition-colors duration-500">
                          {chain.name}
                        </span>
                        <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 rounded-full overflow-hidden border-2 border-white/20 shadow-xl group-hover:border-[#b8d1b3]/50 group-hover:scale-110 transition-all duration-500"
                          style={{
                            boxShadow: '0 10px 30px rgba(184, 209, 179, 0.2)'
                          }}
                        >
                          <Image
                            src={chain.logo}
                            alt={chain.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[
                    { name: "Ethereum", logo: "/logos/ethereum.jpg" },
                    { name: "Arbitrum", logo: "/logos/arbitrum.jpg" },
                    { name: "Optimism", logo: "/logos/optimism.jpg" },
                    { name: "BSC", logo: "/logos/BSC.jpg" },
                    { name: "Avalanche", logo: "/logos/avalanche.jpg" },
                    { name: "Solana", logo: "/logos/solana.jpg" },
                    { name: "Base", logo: "/logos/base.jpg" }
                  ].map((chain, index) => (
                    <div
                      key={`${chain.name}-2-${index}`}
                      className="scroll-item backdrop-blur-2xl px-12 py-8 border border-white/10 hover:border-[#b8d1b3]/30 transition-all duration-500 rounded-3xl mx-4 group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(184,209,179,0.03) 100%)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-white font-mono text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider group-hover:text-[#b8d1b3] transition-colors duration-500">
                          {chain.name}
                        </span>
                        <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 rounded-full overflow-hidden border-2 border-white/20 shadow-xl group-hover:border-[#b8d1b3]/50 group-hover:scale-110 transition-all duration-500"
                          style={{
                            boxShadow: '0 10px 30px rgba(184, 209, 179, 0.2)'
                          }}
                        >
                          <Image
                            src={chain.logo}
                            alt={chain.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .scroll-container {
              height: 600px;
              overflow: hidden;
              position: relative;
              display: flex;
              align-items: center;
              padding: 0 2rem;
            }

            .scroll-content {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              animation: scrollVertical 25s linear infinite;
            }

            .scroll-item {
              flex-shrink: 0;
            }

            @keyframes scrollVertical {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(-50%);
              }
            }

            .scroll-container:hover .scroll-content {
              animation-play-state: paused;
            }
          `}</style>
        </motion.div>
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
                        className="text-sm opacity-70 hover:opacity-100 hover:text-[#b8d1b3] transition-colors"
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

