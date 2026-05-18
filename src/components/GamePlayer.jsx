import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, Maximize2, ExternalLink, Gamepad2, ShieldCheck, EyeOff } from 'lucide-react';

export default function GamePlayer({ game, onClose }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    
    // Original metadata backup
    const originalTitle = document.title;
    const originalIcon = document.querySelector('link[rel="icon"]')?.href;

    // Optional: Auto-cloak tab when playing
    document.title = "World History - Digital Textbook";

    return () => {
      document.title = originalTitle;
    };
  }, [game.id]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const launchPrivacyMode = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.body.style.margin = '0';
      win.document.body.style.height = '100vh';
      const iframe = win.document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.margin = '0';
      iframe.src = game.url;
      win.document.body.appendChild(iframe);
      win.document.title = "World History Source Material";
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-7xl mx-auto p-4 w-full h-[calc(100vh-80px)] min-h-[500px]"
    >
      <div 
        ref={containerRef}
        className="w-full h-full flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
      >
        {/* Game Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all p-2 rounded-xl hover:bg-white/5"
              aria-label="Back to Library"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold hidden sm:inline">Back to Curriculum</span>
            </button>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <h2 className="font-bold text-slate-100 truncate text-base leading-none">
                {game.title}
              </h2>
              <span className="text-[10px] text-indigo-400 font-bold uppercase mt-1">Section 4.12: Interactive Simulation</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={launchPrivacyMode}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors p-2.5 rounded-xl hover:bg-white/5"
              title="Launch in Stealth Mode"
            >
              <EyeOff className="w-5 h-5" />
            </button>

            <button 
              onClick={handleReload}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors p-2.5 rounded-xl hover:bg-white/5"
              title="Refresh Module"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button 
              onClick={toggleFullscreen}
              className="ml-2 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white transition-all px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/20 font-semibold text-sm"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden md:inline">Full View</span>
            </button>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 w-full relative bg-black">
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 bg-slate-950"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <ShieldCheck className="w-6 h-6 text-indigo-500 absolute inset-0 m-auto" />
                </div>
                <div className="text-center">
                  <p className="text-slate-100 font-bold text-xl mb-1">Deciphering History...</p>
                  <p className="text-slate-500 text-sm">Verifying secure curriculum connection</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <iframe 
            key={iframeKey}
            src={game.url}
            title={game.title}
            className="absolute inset-0 w-full h-full border-none z-0"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            allowFullScreen
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Bottom Bar Info */}
        <div className="px-6 py-3 bg-slate-900/50 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-medium tracking-wider uppercase">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              Curriculum Node {Math.floor(Math.random() * 100)} - ONLINE
            </span>
          </div>
          <span className="opacity-50">World History Learning Alliance © 2024</span>
        </div>
      </div>
    </motion.div>
  );
}
