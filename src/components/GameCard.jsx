import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function GameCard({ game, onClick }) {
  return (
    <motion.button
      id={`game-card-${game.id}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full rounded-2xl overflow-hidden bg-slate-800 border border-white/5 shadow-lg flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onClick={() => onClick(game)}
    >
      <div className="aspect-video relative w-full overflow-hidden bg-slate-900">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x225/1e293b/indigo?text=${encodeURIComponent(game.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <div className="bg-indigo-500 text-white rounded-full p-3 shadow-[0_0_20px_rgba(99,102,241,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1 z-10 w-full bg-slate-800">
        <h3 className="font-medium text-slate-100 truncate text-sm sm:text-base leading-tight">
          {game.title}
        </h3>
        <p className="text-xs text-indigo-400 font-medium tracking-wide uppercase">
          {game.category}
        </p>
      </div>
    </motion.button>
  );
}
