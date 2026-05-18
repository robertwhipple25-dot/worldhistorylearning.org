import { motion } from 'motion/react';
import { Gamepad2, Search, Bell, User, Zap } from 'lucide-react';

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="bg-[#0B0F19]/80 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        <motion.div 
          className="flex items-center gap-3 group cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.location.reload()}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-indigo-500 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 fill-current" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-xl italic leading-none tracking-tighter uppercase">World History</span>
            <span className="text-indigo-400 font-bold text-[10px] tracking-widest uppercase leading-none mt-1">Learning Resource</span>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 max-w-2xl relative group"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="w-full bg-slate-800/40 border border-white/5 text-white text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all placeholder:text-slate-500 font-medium"
            placeholder="Search academic simulations and modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="text-[10px] font-mono text-slate-600 bg-slate-800 px-2 py-1 rounded-md border border-white/5">
              ALT + K
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hidden lg:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Latency: 12ms
          </div>
          
          <button className="p-3 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0B0F19]"></div>
          </button>
          
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          
          <button className="flex items-center gap-3 py-2 pl-2 pr-4 bg-slate-800/40 border border-white/5 rounded-2xl hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xs">
              G
            </div>
            <div className="text-left hidden xl:block">
              <p className="text-white text-xs font-bold leading-none">Guest User</p>
              <p className="text-slate-500 text-[10px] mt-1 leading-none">Standard Access</p>
            </div>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
