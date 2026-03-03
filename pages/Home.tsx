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
  isAudioOn: boolean;
  onPlaySound: (type: string) => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart, onToggleWishlist, wishlist, onOpenModal, onFindEgg, isAudioOn, onPlaySound }) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);

  return (
    <div className="space-y-16 md:space-y-32 pb-24 md:pb-40 w-full max-w-full overflow-hidden">
      {/* Anime Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-screen flex items-center overflow-hidden bg-black px-4 w-full">
        <div className="absolute inset-0 opacity-40">
          <video autoPlay muted={!isAudioOn} loop playsInline className="w-full h-full object-cover grayscale brightness-50">
            <source src={SAMPLE_VIDEOS[0]} type="video/mp4" />
          </video>
        </div>
        
        <div className="absolute inset-0 manga-halftone text-white opacity-[0.03] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 md:via-black/60 to-transparent z-10"></div>
        
        <div className="container mx-auto relative z-20 pt-6 md:pt-20">
          <div className="max-w-5xl space-y-6 md:space-y-12 animate-fade-in">
            <div className="flex items-center gap-4">
               <div className="speech-bubble text-[9px] md:text-sm">MISSION: COLLECT EM ALL!</div>
               <div className="h-px flex-grow bg-white/10 hidden xs:block"></div>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-[120px] xl:text-[160px] font-anime leading-[0.9] md:leading-[0.8] text-white tracking-normal uppercase italic break-words overflow-hidden">
              UNLEASH THE <br/>
              <span className="text-[var(--neon-primary)] drop-shadow-[2px_2px_0px_#fff] md:drop-shadow-[8px_8px_0px_#fff] whitespace-pre-wrap break-all">ARTIFACTS</span>
            </h1>
            
            <p className="text-zinc-300 text-base md:text-2xl max-w-2xl font-header font-bold uppercase tracking-tight italic leading-tight">
              Premium grade collectibles forged in the heart of Tokyo. 100% Official. 100% Elite.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 pt-4 md:pt-6">
              <Link to="/shop" onClick={() => onPlaySound('powerup')} className="group relative px-6 md:px-12 py-4 md:py-6 bg-white text-black font-anime text-xl md:text-2xl uppercase italic tracking-wider shadow-[4px_4px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-center flex items-center justify-center">
                ACCESS THE VAULT
                <span className="absolute -top-3 -right-1 p-1 bg-[var(--neon-tertiary)] text-black text-[7px] md:text-[10px] font-black uppercase tracking-tighter shadow-sm">NEW DROP</span>
              </Link>
              <Link to="/categories" onClick={() => onPlaySound('teleport')} className="px-6 md:px-12 py-4 md:py-6 border-2 border-white text-white font-anime text-xl md:text-2xl uppercase italic tracking-wider hover:bg-white hover:text-black transition-all text-center flex items-center justify-center">
                BROWSE CORES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="container mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-20 gap-6">
          <div className="space-y-1 md:space-y-4 relative w-full">
            <p className="text-[var(--neon-primary)] text-[10px] md:text-sm font-header font-black uppercase tracking-[0.3em] italic">Top Tier Archives</p>
            <h2 className="text-4xl md:text-8xl font-anime text-white uppercase italic drop-shadow-[1px_1px_0px_var(--neon-secondary)] md:drop-shadow-[4px_4px_0px_var(--neon-secondary)] break-words">FEATURED GEAR</h2>
          </div>
          <Link to="/shop" onClick={() => onPlaySound('teleport')} className="anime-border bg-white text-black px-6 md:px-8 py-3 md:py-4 font-anime text-base md:text-xl uppercase italic tracking-widest flex items-center gap-3 group w-full md:w-auto justify-center">
            SEE EVERYTHING <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 gap-y-12 md:gap-y-20">
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

      {/* Action Panels */}
      <section className="container mx-auto px-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 shadow-[8px_8px_0_var(--neon-tertiary)] bg-white p-1">
           <div className="bg-black p-6 md:p-12 space-y-4 md:space-y-8 flex flex-col justify-center border-2 border-white/10 relative overflow-hidden">
              <Globe size={28} className="text-[var(--neon-primary)]" />
              <h3 className="text-xl md:text-3xl font-anime text-white italic uppercase tracking-wider">WORLDWIDE <br className="hidden md:block"/> LOGISTICS</h3>
              <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest leading-tight">Secure transit from Akihabara to your grid sector.</p>
           </div>
           <div className="bg-black p-6 md:p-12 space-y-4 md:space-y-8 flex flex-col justify-center border-2 border-white/10 relative overflow-hidden">
              <ShieldCheck size={28} className="text-[var(--neon-secondary)]" />
              <h3 className="text-xl md:text-3xl font-anime text-white italic uppercase tracking-wider">OFFICIAL <br className="hidden md:block"/> LICENSING</h3>
              <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest leading-tight">100% Authentic gear validated by creators.</p>
           </div>
           <div className="bg-black p-6 md:p-12 space-y-4 md:space-y-8 flex flex-col justify-center border-2 border-white/10 relative overflow-hidden sm:col-span-2 md:col-span-1">
              <Cpu size={28} className="text-[var(--neon-tertiary)]" />
              <h3 className="text-xl md:text-3xl font-anime text-white italic uppercase tracking-wider">ELITE <br className="hidden md:block"/> SUPPORT</h3>
              <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest leading-tight">Operatives standing by for mission guidance.</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;