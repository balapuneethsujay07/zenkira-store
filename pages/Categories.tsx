
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Shirt, Box, Package, ArrowRight, Zap, Ghost } from 'lucide-react';
import { Product } from '../types';

interface CategoriesProps {
  products: Product[];
}

const CATEGORY_METADATA = [
  { name: 'Figures', icon: <Box size={40} />, desc: 'Scale figures, Nendoroids, and Statues.', color: 'from-[#FF2E88] to-[#7B5CFF]', id: 'Figures' },
  { name: 'Apparel', icon: <Shirt size={40} />, desc: 'Hoodies, Tees, and official gear.', color: 'from-[#7B5CFF] to-[#00F5FF]', id: 'Apparel' },
  { name: 'Accessories', icon: <Layers size={40} />, desc: 'Keychains, Pins, and daily-use items.', color: 'from-[#00F5FF] to-[#FF2E88]', id: 'Accessories' },
  { name: 'Collectibles', icon: <Package size={40} />, desc: 'Wall scrolls, flags, and limited eds.', color: 'from-[#FF2E88] via-[#7B5CFF] to-[#00F5FF]', id: 'Collectibles' },
];

const Categories: React.FC<CategoriesProps> = ({ products }) => {
  // Dynamically extract unique series from available products
  const activeSeries = useMemo(() => {
    const seriesSet = new Set(products.map(p => p.series));
    return Array.from(seriesSet).sort();
  }, [products]);

  // Helper function to get count for a specific category
  const getCategoryCount = (categoryId: string) => {
    return products.filter(p => p.category === categoryId).length;
  };

  const getSeriesColor = (series: string) => {
    const colors = [
      'from-[#FF2E88] to-[#7B5CFF]',
      'from-[#00F5FF] to-[#FF2E88]',
      'from-[#CCFF00] to-[#00F5FF]',
      'from-[#7B5CFF] to-[#CCFF00]'
    ];
    let hash = 0;
    for (let i = 0; i < series.length; i++) {
      hash = series.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="container mx-auto px-4 pb-40 space-y-40 pt-20">
      {/* Product Categories Section */}
      <div className="space-y-8 border-l-8 border-[#FF2E88] pl-12">
        <h1 className="text-5xl md:text-8xl font-header font-black text-[#EAEAFF] italic tracking-tighter uppercase leading-none">DATA <span className="text-[#00F5FF]">CLASSES</span></h1>
        <p className="text-[#9CA3AF] max-w-2xl font-header text-xs uppercase tracking-[0.5em] font-bold opacity-60 italic">Select your equipment category for optimal target acquisition.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {CATEGORY_METADATA.map((cat) => {
          const count = getCategoryCount(cat.id);
          return (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.id}`}
              className="group relative h-96 flex flex-col items-center justify-center text-center p-12 rounded-sm overflow-hidden border border-white/5 bg-black/40 hover:border-[#00F5FF]/50 transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF2E88] group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="mb-8 text-[#9CA3AF] group-hover:text-[#00F5FF] transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_currentColor]">
                {cat.icon}
              </div>
              <h3 className="text-3xl font-header font-black text-[#EAEAFF] mb-4 italic uppercase tracking-tighter group-hover:text-[#FF2E88] transition-colors">{cat.name}</h3>
              <p className="text-[#9CA3AF] text-[11px] font-header font-medium mb-10 leading-relaxed uppercase opacity-60 tracking-[0.2em] italic">{cat.desc}</p>
              <div className="text-[10px] font-header font-black text-white/20 group-hover:text-[#00F5FF] flex items-center gap-3 uppercase tracking-[0.4em] transition-colors">
                <span className="text-[var(--neon-secondary)] group-hover:animate-pulse">{count}</span> ARCHIVES <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Anime Series Section (Neural Cores) */}
      <div className="space-y-24">
        <div className="space-y-6 text-right border-r-8 border-[#7B5CFF] pr-12">
          <h2 className="text-4xl md:text-7xl font-header font-black text-[#EAEAFF] italic tracking-tighter uppercase leading-none">NEURAL <span className="text-[#7B5CFF]">CORES</span></h2>
          <p className="text-[#9CA3AF] font-header text-xs uppercase tracking-[0.6em] font-bold opacity-60 italic">Access data archives by current series neural signature.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeSeries.map((series) => {
            const seriesProducts = products.filter(p => p.series === series);
            const previewImage = seriesProducts[0]?.image;
            
            return (
              <Link 
                key={series} 
                to={`/shop?series=${encodeURIComponent(series)}`}
                className="group relative h-64 glass border border-white/10 rounded-sm overflow-hidden flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:border-[var(--neon-primary)]"
              >
                {/* Background series preview */}
                <img src={previewImage} alt={series} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${getSeriesColor(series)} opacity-40 group-hover:opacity-60 transition-opacity duration-700`}></div>
                
                <div className="relative z-10 text-center space-y-4">
                  <Zap size={32} className="mx-auto text-white drop-shadow-[0_0_10px_white] group-hover:scale-125 transition-transform" />
                  <h3 className="text-2xl font-header font-black text-white uppercase italic tracking-tighter drop-shadow-lg">{series}</h3>
                  <div className="text-[10px] font-mono text-white/80 uppercase tracking-widest">{seriesProducts.length} ARTIFACTS</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
