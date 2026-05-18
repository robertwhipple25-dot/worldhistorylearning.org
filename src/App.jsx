import { useState, useMemo } from 'react';
import modulesData from './data/modules.json';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const modules = modulesData;

  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || module.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [modules, search, category]);

  const categories = ['All', ...Array.from(new Set(modules.map(m => m.category)))];

  const featuredModules = useMemo(() => {
    return modules.slice(0, 3);
  }, [modules]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans overflow-x-hidden">
      <Navbar search={search} setSearch={setSearch} />
      
      <main className="flex-1 w-full bg-[#0B0F19]">
        <AnimatePresence mode="wait">
          {selectedModule ? (
            <GamePlayer 
              key="player" 
              game={selectedModule} 
              onClose={() => setSelectedModule(null)} 
            />
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
            >
              {/* Hero Section */}
              {!search && category === 'All' && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Curriculum Spotlight</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredModules.map((module, idx) => (
                      <motion.div 
                        key={`featured-${module.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative aspect-[21/9] md:aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-white/5 shadow-2xl"
                        onClick={() => setSelectedModule(module)}
                      >
                        <img 
                          src={module.image} 
                          alt={module.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <p className="text-indigo-400 font-bold text-[10px] mb-1 uppercase tracking-wider">Unit {idx + 1}: {module.category}</p>
                          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-indigo-300 transition-colors">{module.title}</h3>
                          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
                            <span className="text-xs font-bold uppercase tracking-tighter">Enter Module</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Academic Modules</h2>
                    <p className="text-slate-500 text-sm font-medium">{filteredModules.length} interactive resources</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                        category === cat 
                          ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105' 
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              {filteredModules.length > 0 ? (
                <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
                  {filteredModules.map((module, idx) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                    >
                      <GameCard 
                        game={module} 
                        onClick={setSelectedModule} 
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center text-slate-500 flex flex-col items-center justify-center bg-slate-900/20 rounded-3xl border border-dashed border-white/5">
                  <div className="bg-slate-800/50 p-8 rounded-full mb-6 relative">
                    <Sparkles className="w-12 h-12 text-slate-700" />
                    <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-300 mb-2">Resource Unavailable</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">None of our {modules.length} educational units match your search. Try adjusting your curriculum filters.</p>
                  <button 
                    onClick={() => {setSearch(''); setCategory('All');}}
                    className="mt-6 text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {!selectedModule && (
        <footer className="mt-auto border-t border-white/5 bg-slate-950/50 py-12 px-4 text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-indigo-400 font-black text-xl italic uppercase">
                <Zap className="w-6 h-6 fill-current" />
                World History Learning Alliance
              </div>
              <p className="text-slate-500 text-sm">Certified interactive history modules for higher education enrichment. Educational Use Only.</p>
            </div>
            
            <div className="flex items-center gap-6 text-slate-500 text-sm font-bold">
              <span className="hover:text-slate-300 cursor-pointer">Curriculum</span>
              <span className="hover:text-slate-300 cursor-pointer">Compliance</span>
              <span className="hover:text-slate-300 cursor-pointer">Support</span>
            </div>
            
            <div className="text-slate-600 text-[10px] font-mono">
              VER. 2.4.0-STABLE // BUILD_ID_{new Date().getTime().toString(16)}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
