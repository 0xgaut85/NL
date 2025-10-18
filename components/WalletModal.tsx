'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useConnect } from 'wagmi';
import Image from 'next/image';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, connectors, isPending } = useConnect();

  const handleConnect = async (connector: any) => {
    try {
      // Special handling for Phantom - connect to Solana network
      if (connector.name.toLowerCase().includes('phantom')) {
        if (typeof window !== 'undefined') {
          // Wait for Phantom to be available (it might load after page)
          const waitForPhantom = async (maxAttempts = 10) => {
            for (let i = 0; i < maxAttempts; i++) {
              if ((window as any).phantom?.solana?.isPhantom) {
                return (window as any).phantom.solana;
              }
              if ((window as any).solana?.isPhantom) {
                return (window as any).solana;
              }
              // Wait 100ms before trying again
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            return null;
          };

          const phantom = await waitForPhantom();
          
          if (phantom) {
            try {
              console.log('Phantom found! Attempting to connect...');
              
              // First, disconnect if already connected to force a fresh connection
              if (phantom.isConnected) {
                console.log('Phantom was already connected, disconnecting first...');
                await phantom.disconnect();
                // Wait a moment for disconnect to complete
                await new Promise(resolve => setTimeout(resolve, 300));
              }
              
              // Now connect with popup - this will ALWAYS show the Phantom popup
              const resp = await phantom.connect({ onlyIfTrusted: false });
              console.log('Connected to Phantom (Solana):', resp.publicKey.toString());
              
              // Request signature to verify wallet ownership
              try {
                const message = `Sign this message to verify you own this wallet.\n\nWallet: ${resp.publicKey.toString()}\nTimestamp: ${new Date().toISOString()}\nApp: NoLimit Swap`;
                const encodedMessage = new TextEncoder().encode(message);
                
                const signedMessage = await phantom.signMessage(encodedMessage, 'utf8');
                console.log('Signature verified:', signedMessage.signature);
                
                // Verify the signature
                const nacl = await import('tweetnacl');
                const verified = nacl.default.sign.detached.verify(
                  encodedMessage,
                  signedMessage.signature,
                  resp.publicKey.toBytes()
                );
                
                if (!verified) {
                  alert('Signature verification failed. Connection cancelled.');
                  await phantom.disconnect();
                  return;
                }
                
                console.log('✅ Wallet ownership verified!');
              } catch (sigError: any) {
                console.error('Signature verification failed:', sigError);
                if (sigError?.message?.includes('User rejected')) {
                  alert('Signature rejected. You must sign the message to verify wallet ownership.');
                } else {
                  alert('Failed to verify wallet ownership. Connection cancelled.');
                }
                await phantom.disconnect();
                return;
              }
              
              // Dispatch custom event to notify the app
              window.dispatchEvent(new CustomEvent('phantomConnected', { 
                detail: { publicKey: resp.publicKey.toString() } 
              }));
              
              onClose();
              return;
            } catch (error: any) {
              console.error('Failed to connect to Phantom:', error);
              if (error?.message?.includes('User rejected')) {
                alert('Connection cancelled. Please approve the connection in Phantom wallet.');
              } else {
                alert('Failed to connect to Phantom. Please make sure Phantom wallet is unlocked and try again.');
              }
              return;
            }
          } else {
            console.error('Phantom not detected after waiting');
            console.log('window.phantom:', (window as any).phantom);
            console.log('window.solana:', (window as any).solana);
            console.log('Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('phantom') || k.toLowerCase().includes('solana')));
            
            alert('Phantom wallet not detected. Please:\n1. Make sure Phantom extension is installed\n2. Refresh the page after installing\n3. Check that Phantom is enabled in your browser extensions');
            return;
          }
        } else {
          alert('Window object not available. Please refresh the page and try again.');
          return;
        }
      }

      // For other wallets, use Wagmi connector
      const result = await connect({ connector });
      console.log('Successfully connected:', result);
      onClose();
    } catch (error: any) {
      console.error('Failed to connect:', error);
      
      // Show user-friendly error messages
      if (error?.message?.includes('Connector not found') || error?.message?.includes('User rejected')) {
        alert(`Failed to connect to ${connector.name}. Please make sure the wallet is installed and try again.`);
      } else {
        alert(`Failed to connect to ${connector.name}. Error: ${error?.message || 'Unknown error'}`);
      }
    }
  };

  const getWalletLogo = (connectorName: string) => {
    const name = connectorName.toLowerCase();
    if (name.includes('metamask')) return '/wallets/metamask.jpg';
    if (name.includes('phantom')) return '/wallets/phantom.jpg';
    if (name.includes('trust')) return '/wallets/trustwallet.jpg';
    if (name.includes('rabby')) return '/wallets/rabby.jpg';
    if (name.includes('coinbase')) return '/wallets/coinbase.png';
    if (name.includes('walletconnect')) return '/wallets/walletconnect.jpg';
    return null; // Fallback
  };

  // Filter out duplicate wallets
  const uniqueConnectors = connectors.reduce((acc: any[], connector) => {
    const isDuplicate = acc.some(c => c.name === connector.name);
    if (!isDuplicate) {
      acc.push(connector);
    }
    return acc;
  }, []);

  // Add Phantom and other wallets manually (not from Wagmi)
  const customWallets = [
    { id: 'phantom', name: 'Phantom', isCustom: true },
    { id: 'rabby', name: 'Rabby Wallet', isCustom: true },
    { id: 'trust', name: 'Trust Wallet', isCustom: true },
  ];

  // Combine Wagmi connectors with custom wallets, ensuring no duplicates
  const wagmiWalletNames = uniqueConnectors.map(c => c.name.toLowerCase());
  const filteredCustomWallets = customWallets.filter(
    wallet => !wagmiWalletNames.includes(wallet.name.toLowerCase())
  );
  
  const allWallets = [...uniqueConnectors, ...filteredCustomWallets];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white border-2 border-[#e8f5e6] shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2d5a3d] px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-mono text-lg font-bold uppercase tracking-wider">
                Connect Wallet
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-[#7fff00] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Wallet List */}
            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-black/60 mb-4 font-mono">
                Choose your preferred wallet to connect
              </p>
              
              {allWallets.map((wallet) => {
                const isCustom = (wallet as any).isCustom;
                const walletName = isCustom ? wallet.name : wallet.name;
                const walletId = isCustom ? wallet.id : wallet.id;
                const logoPath = getWalletLogo(walletName);
                
                return (
                  <motion.button
                    key={walletId}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isCustom ? handleConnect({ name: walletName, id: walletId } as any) : handleConnect(wallet)}
                    disabled={isPending}
                    className="w-full bg-[#f8faf8] hover:bg-[#e8f5e6] border-2 border-[#e8f5e6] hover:border-[#7fff00] p-4 flex items-center justify-between transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-4">
                      {logoPath ? (
                        <div className="w-12 h-12 relative flex-shrink-0 rounded-lg overflow-hidden border border-[#e8f5e6]">
                          <Image
                            src={logoPath}
                            alt={walletName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#e8f5e6] rounded-lg">
                          <span className="text-2xl">🔐</span>
                        </div>
                      )}
                      <div className="text-left">
                        <p className="font-mono font-bold text-[#2d5a3d]">
                          {walletName}
                        </p>
                        <p className="text-xs text-black/50 font-mono">
                          {walletId === 'walletConnect' ? 'Scan QR Code' : 'Browser Extension'}
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                );
              })}

              {/* Info Message */}
              <div className="mt-6 pt-6 border-t border-[#e8f5e6]">
                <p className="text-xs text-black/40 text-center font-mono">
                  By connecting, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

