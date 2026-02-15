
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Search, LayoutGrid, X, Zap, Box, Shirt, Smartphone, Package, Filter, Target, Crosshair } from 'lucide-react';
import ProductCard from '../components/ProductCard.tsx';
import { Product, Category } from '../types.ts';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
  onOpenModal: (p: Product) => void;
  onFindEgg: (id: string, name: string) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart, onToggleWishlist, wishlist, onOpenModal, onFindEgg }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeSeries, setActiveSeries] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const location = useLocation();

  const allSeries = useMemo(() => {
    const s = new Set(products.map(p => p.series));
    return ['All', ...Array.from(s).sort()];
  }, [products]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const cat = params.get('category');
    const ser = params.get('series');

    if (q) setSearchQuery(q);
    if (cat) setActiveCategory(cat as Category);
    if (ser) setActiveSeries(ser);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSeries = activeSeries === 'All' || p.series === activeSeries;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.series.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSeries && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0;
    });
  }, [products, activeCategory, activeSeries, searchQuery, sortBy]);

  const clearFilters = () => {
    setActiveCategory('All');
    setActiveSeries('All');
    setSearchQuery('');
  };

  const categories = [
    { id: 'All', icon: <Box size={20} /> },
    { id: 'Figures', icon: <Target size={20} /> },
    { id: 'Apparel', icon: <Shirt size={20} /> },
    { id: 'Accessories', icon: <Smartphone size={20} /> },
    { id: 'Collectibles', icon: <Package size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] speed-lines">
      {/* SIDEBAR CATEGORIES - FIXED POSITION ANCHOR */}
      <aside className="hidden lg:block fixed left-0 top-[112px] bottom-0 w-80 bg-black border-r-4 border-white z-40 overflow-y-auto custom-scrollbar p-10 space-y-12 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 manga-halftone opacity-[0.03] pointer-events-none"></div>
        
        <div className="relative space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white font-anime text-3xl uppercase italic tracking-wider pb-2 border-b-4 border-white">
              <Filter size={24} className="text-[var(--neon-primary)]" /> CATEGORIES
            </div>
            <div className="flex flex-col gap-4">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as Category)}
                  className={`group flex items-center gap-5 px-6 py-5 rounded-none font-anime text-2xl uppercase italic tracking-widest border-2 transition-all ${activeCategory === cat.id ? 'bg-white text-black border-black shadow-[6px_6px_0px_var(--neon-primary)]' : 'bg-transparent border-white/10 text-zinc-500 hover:border-white hover:text-white'}`}
                >
                  <span className={activeCategory === cat.id ? 'text-black' : 'group-hover:text-[var(--neon-primary)] transition-colors'}>{cat.icon}</span>
                  {cat.id}
                  {activeCategory === cat.id && <Zap size={18} className="ml-auto text-[var(--neon-primary)] animate-pulse" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8 pt-6">
            <div className="flex items-center gap-3 text-white font-anime text-3xl uppercase italic tracking-wider pb-2 border-b-4 border-white">
              <Crosshair size={24} className="text-[var(--neon-secondary)]" /> NEURAL_CORES
            </div>
            <div className="flex flex-wrap gap-2">
              {allSeries.map(ser => (
                <button 
                  key={ser}
                  onClick={() => setActiveSeries(ser)}
                  className={`px-4 py-2 text-xs font-header font-black uppercase italic tracking-widest border-2 transition-all ${activeSeries === ser ? 'bg-[var(--neon-secondary)] border-white text-black shadow-[4px_4px_0px_white]' : 'bg-black border-white/10 text-zinc-500 hover:text-white hover:border-white/30'}`}
                >
                  {ser}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-[var(--neon-primary)] border-4 border-black relative overflow-hidden group shadow-[8px_8px_0px_white]">
            <div className="absolute inset-0 manga-halftone text-white opacity-[0.1] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
            <p className="text-[12px] font-anime text-white uppercase italic tracking-widest mb-1">ELITE_DROP</p>
            <p className="text-[10px] font-mono text-white/80 uppercase leading-none">FREE TRANSIT FOR ORDERS &gt; ₹5K</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - ADJUSTED FOR FIXED SIDEBAR */}
      <main className="lg:ml-80 transition-all duration-300">
        <div className="container mx-auto px-6 py-20 md:px-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-16 border-b-4 border-white mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="speech-bubble">MISSION: LOOT THE VAULT!</div>
              </div>
              <h1 className="text-7xl md:text-9xl font-anime text-white uppercase italic drop-shadow-[8px_8px_0px_var(--neon-primary)] tracking-tight">
                ACCESS_MARKET
              </h1>
              <div className="flex items-center gap-6">
                <p className="text-zinc-500 font-header font-black uppercase text-sm tracking-[0.4em] italic flex items-center gap-3">
                  <Search size={18} className="text-[var(--neon-secondary)]" /> ACQUISITION_TARGETS: {filteredProducts.length}
                </p>
                <div className="h-px flex-grow bg-white/10"></div>
              </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto">
              <div className="relative group w-full md:w-auto">
                <button className="w-full md:w-auto flex items-center justify-center gap-4 bg-white text-black px-10 py-5 font-anime text-2xl uppercase italic tracking-widest shadow-[8px_8px_0px_var(--neon-secondary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                  SORT: {sortBy} <ChevronDown size={24} />
                </button>
                <div className="absolute top-full right-0 mt-6 w-full md:w-72 glass border-4 border-white overflow-hidden hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
                  {['Featured', 'Price: Low to High', 'Price: High to Low'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`w-full text-left px-8 py-6 text-xl font-anime uppercase italic tracking-widest transition-colors hover:bg-white/10 ${sortBy === opt ? 'text-[var(--neon-primary)] bg-white/5' : 'text-zinc-400'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-24 animate-fade-in pb-40">
              {filteredProducts.map((product) => (
                <div key={product.id} className="skew-panel">
                  <div className="skew-content h-full">
                    <ProductCard 
                      product={product} 
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlist.includes(product.id)}
                      onOpenModal={onOpenModal}
                      onFindEgg={onFindEgg}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-60 anime-panel max-w-4xl mx-auto space-y-12">
              <div className="relative inline-block">
                <Search className="mx-auto text-zinc-900" size={160} />
                <div className="absolute -top-10 -right-10 p-4 bg-[var(--neon-primary)] text-white font-anime text-5xl uppercase italic animate-bounce border-4 border-white shadow-[8px_8px_0px_black]">
                  FAIL!
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-6xl font-anime text-white uppercase italic tracking-widest">SIGNAL_LOST</h2>
                <p className="text-zinc-500 font-header font-black uppercase text-sm tracking-[0.3em] italic">No compatible artifacts detected in this grid sector.</p>
              </div>
              <button 
                onClick={clearFilters}
                className="bg-white text-black px-16 py-6 font-anime text-3xl uppercase italic tracking-widest shadow-[12px_12px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                RE-INITIALIZE_SCAN
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
