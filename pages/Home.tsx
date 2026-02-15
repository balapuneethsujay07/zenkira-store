
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Cpu, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { SAMPLE_VIDEOS } from '../constants';
import ProductCard from '../components/ProductCard.tsx';
import { Product } from '../types.ts';

interface HomeProps {
  products: Product[];
  onAddToCart: (p: Product, q: number) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
  onOpenModal: (p: Product) => void;
  onFindEgg: (id: string, name: string) => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart, onToggleWishlist, wishlist, onOpenModal, onFindEgg }) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);

  return (
    <div className="space-y-32 pb-40">
      {/* Anime Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-50">
            <source src={SAMPLE_VIDEOS[0]} type="video/mp4" />
          </video>
        </div>
        
        {/* Manga Halftone Overlay */}
        <div className="absolute inset-0 manga-halftone text-white opacity-[0.03] pointer-events-none"></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <div className="max-w-5xl space-y-12 animate-fade-in">
            <div className="flex items-center gap-4">
               <div className="speech-bubble">MISSION: COLLECT EM ALL!</div>
               <div className="h-px flex-grow bg-white/10"></div>
            </div>

            <h1 className="text-7xl md:text-[160px] font-anime leading-[0.8] text-white tracking-normal uppercase italic">
              UNLEASH THE <br/>
              <span className="text-[var(--neon-primary)] drop-shadow-[8px_8px_0px_#fff]">ARTIFACTS</span>
            </h1>
            
            <p className="text-zinc-300 text-xl md:text-2xl max-w-2xl font-header font-bold uppercase tracking-tight italic">
              Premium grade collectibles forged in the heart of Tokyo. 100% Official. 100% Elite.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-6">
              <Link to="/shop" className="group relative px-12 py-6 bg-white text-black font-anime text-2xl uppercase italic tracking-wider shadow-[8px_8px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                ACCESS THE VAULT
                <span className="absolute -top-3 -right-3 p-1 bg-[var(--neon-tertiary)] text-black text-[10px] font-black uppercase tracking-tighter shadow-sm">NEW DROP</span>
              </Link>
              <Link to="/categories" className="px-12 py-6 border-2 border-white text-white font-anime text-2xl uppercase italic tracking-wider hover:bg-white hover:text-black transition-all">
                BROWSE CORES
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical Text Sidebar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-10 z-20">
           <div className="h-32 w-px bg-white/20"></div>
           <p className="text-white/20 font-header font-black text-xs uppercase tracking-[1em] [writing-mode:vertical-rl] animate-pulse">ZENKIRA_ARCHIVE_EST_2026</p>
           <div className="h-32 w-px bg-white/20"></div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <div className="bg-[var(--neon-primary)] py-4 overflow-hidden -rotate-1 border-y-4 border-white shadow-[0_0_30px_var(--neon-primary)]">
         <div className="flex animate-slide-infinite whitespace-nowrap gap-20">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-white font-anime text-4xl italic uppercase tracking-widest flex items-center gap-6">
                <Star size={32} fill="white" /> LIMITED DROPS // GEAR 5 SPECIAL // DEMON SLAYER CORES // JJK VAULT
              </span>
            ))}
         </div>
      </div>

      {/* Featured Grid with Manga Styling */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 relative">
            <div className="absolute -top-12 -left-6 opacity-10">
               <Sparkles size={80} className="text-[var(--neon-secondary)]" />
            </div>
            <p className="text-[var(--neon-primary)] text-sm font-header font-black uppercase tracking-[0.5em] italic">Top Tier Archives</p>
            <h2 className="text-6xl md:text-8xl font-anime text-white uppercase italic drop-shadow-[4px_4px_0px_var(--neon-secondary)]">FEATURED GEAR</h2>
          </div>
          <Link to="/shop" className="anime-border bg-white text-black px-8 py-4 font-anime text-xl uppercase italic tracking-widest flex items-center gap-4 group">
            SEE EVERYTHING <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
              onOpenModal={onOpenModal}
              onFindEgg={onFindEgg}
            />
          ))}
        </div>
      </section>

      {/* Manga Action Panel Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 shadow-[20px_20px_0px_var(--neon-tertiary)] bg-white p-1">
           <div className="bg-black p-12 space-y-8 flex flex-col justify-center border-2 border-white/10 group overflow-hidden relative">
              <div className="absolute inset-0 manga-halftone text-white opacity-[0.05] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
              <Globe size={48} className="text-[var(--neon-primary)] drop-shadow-[0_0_10px_var(--neon-primary)]" />
              <h3 className="text-3xl font-anime text-white italic uppercase tracking-wider">WORLDWIDE <br/> LOGISTICS</h3>
              <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest leading-relaxed">Secure transit from Akihabara to your grid sector. Track every micro-step.</p>
           </div>
           <div className="bg-black p-12 space-y-8 flex flex-col justify-center border-2 border-white/10 group overflow-hidden relative">
              <div className="absolute inset-0 manga-halftone text-white opacity-[0.05] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
              <ShieldCheck size={48} className="text-[var(--neon-secondary)] drop-shadow-[0_0_10px_var(--neon-secondary)]" />
              <h3 className="text-3xl font-anime text-white italic uppercase tracking-wider">OFFICIAL <br/> LICENSING</h3>
              <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest leading-relaxed">No fakes. Ever. Each artifact is authenticated by its original creator studio.</p>
           </div>
           <div className="bg-black p-12 space-y-8 flex flex-col justify-center border-2 border-white/10 group overflow-hidden relative">
              <div className="absolute inset-0 manga-halftone text-white opacity-[0.05] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
              <Cpu size={48} className="text-[var(--neon-tertiary)] drop-shadow-[0_0_10px_var(--neon-tertiary)]" />
              <h3 className="text-3xl font-anime text-white italic uppercase tracking-wider">ELITE <br/> SUPPORT</h3>
              <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest leading-relaxed">Operatives standing by 24/7. Your satisfaction is our primary mission directive.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
