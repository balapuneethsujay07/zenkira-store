
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Sparkles, Zap, Trash2, Search } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface WishlistProps {
  products: Product[];
  onAddToCart: (p: Product, q: number) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
  onOpenModal: (p: Product) => void;
  onFindEgg: (id: string, name: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  products, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist, 
  onOpenModal, 
  onFindEgg 
}) => {
  const wishlistedItems = useMemo(() => {
    return products.filter(p => wishlist.includes(p.id));
  }, [products, wishlist]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] speed-lines pb-40">
      <div className="container mx-auto px-6 py-20 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-16 border-b-4 border-white mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="speech-bubble">MISSION: GUARD THE SAVED GEAR!</div>
            </div>
            <h1 className="text-7xl md:text-9xl font-header font-black text-white uppercase italic drop-shadow-[8px_8px_0px_var(--neon-primary)] tracking-tight">
              WISHLIST_HUB
            </h1>
            <div className="flex items-center gap-6">
              <p className="text-zinc-500 font-header font-black uppercase text-sm tracking-[0.4em] italic flex items-center gap-3">
                <Heart size={18} className="text-[var(--neon-primary)] fill-[var(--neon-primary)]" /> SAVED_ARTIFACTS: {wishlistedItems.length}
              </p>
              <div className="h-px flex-grow bg-white/10"></div>
            </div>
          </div>
        </div>

        {wishlistedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-24 animate-fade-in">
            {wishlistedItems.map((product) => (
              <div key={product.id} className="skew-panel">
                <div className="skew-content h-full relative">
                  <ProductCard 
                    product={product} 
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={true}
                    onOpenModal={onOpenModal}
                    onFindEgg={onFindEgg}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-60 anime-panel max-w-4xl mx-auto space-y-12 bg-white/5 border-4 border-dashed border-white/10">
            <div className="relative inline-block">
              <Heart className="mx-auto text-zinc-900 opacity-20" size={160} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Search size={80} className="text-white/20 animate-pulse" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-6xl font-anime text-white uppercase italic tracking-widest">ARCHIVE_EMPTY</h2>
              <p className="text-zinc-500 font-header font-black uppercase text-sm tracking-[0.3em] italic">No neural signatures detected in your saved archives.</p>
            </div>
            <Link 
              to="/shop"
              className="inline-block bg-white text-black px-16 py-6 font-anime text-3xl uppercase italic tracking-widest shadow-[12px_12px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              LOOT_SOME_GEAR!
            </Link>
          </div>
        )}
      </div>

      {/* Decorative Sidebar Background Text */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] hidden xl:block select-none">
        <p className="text-[200px] font-header font-black uppercase [writing-mode:vertical-rl] leading-none tracking-tighter">
          ZENKIRA_WISHLIST_01
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
