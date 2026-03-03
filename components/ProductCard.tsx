import React, { useState } from 'react';
import { Heart, ShoppingBag, CreditCard, AlertTriangle, CheckCircle2, XCircle, Zap, Star, Sparkles, Tag } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, q: number) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  onOpenModal: (p: Product) => void;
  onFindEgg: (id: string, name: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isWishlisted, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'VOID', color: 'bg-red-500 text-white' };
    if (product.stock <= 5) return { label: `LIMITED`, color: 'bg-[var(--neon-tertiary)] text-black' };
    return { label: 'READY', color: 'bg-white text-black' };
  };

  const stockStatus = getStockStatus();
  const powerLevel = Math.floor(product.price / 100) + 9000;

  const getCategoryConfig = () => {
    const category = product.category.toLowerCase();
    
    if (category.includes('figure')) {
      return {
        accent: 'text-[var(--neon-secondary)]',
        hoverEffect: (
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute left-0 w-full h-[3px] bg-[var(--neon-secondary)] shadow-[0_0_15px_var(--neon-secondary)] animate-scanner-beam"></div>
            <div className="absolute inset-0 bg-[var(--neon-secondary)]/10 animate-pulse"></div>
          </div>
        )
      };
    }
    if (category === 'apparel') {
      return {
        accent: 'text-[var(--neon-primary)]',
        hoverEffect: (
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
            <div className="absolute inset-[-50%] bg-gradient-to-br from-transparent via-white/40 to-transparent animate-aura-shine"></div>
          </div>
        )
      };
    }
    if (category === 'accessories') {
      return {
        accent: 'text-[var(--neon-tertiary)]',
        hoverEffect: (
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 manga-halftone text-[var(--neon-tertiary)] opacity-20 animate-jitter-high"></div>
          </div>
        )
      };
    }
    if (category === 'collectibles') {
      return {
        accent: 'text-[#FFD700]',
        hoverEffect: (
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 animate-royal-pulse border-4 border-[#FFD700]"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFD700] opacity-50 animate-pulse" size={100} />
          </div>
        )
      };
    }
    return { accent: 'text-white', hoverEffect: null };
  };

  const theme = getCategoryConfig();
  const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const savingsAmount = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col bg-black border-4 border-white transition-all duration-300 glow-neon-primary-hover hover:-translate-y-2`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black cursor-pointer border-b-4 border-white" onClick={() => onOpenModal(product)}>
        {theme.hoverEffect}

        <div className="absolute inset-0 manga-halftone text-white opacity-[0.05] z-10 pointer-events-none"></div>
        
        <img 
          src={product.image} 
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isHovered && product.image2 ? 'opacity-0 scale-90' : 'opacity-100 group-hover:scale-110'}`}
        />
        
        {product.image2 && (
          <img 
            src={product.image2} 
            alt={`${product.name} alternate`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
          />
        )}
        
        <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-4 py-1 sm:py-1.5 ${stockStatus.color} text-[8px] sm:text-[10px] font-anime uppercase italic tracking-widest z-30 border-2 border-black shadow-[2px_2px_0px_black] sm:shadow-[4px_4px_0px_black]`}>
          {stockStatus.label}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className={`absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 border-2 border-black transition-all duration-300 z-40 ${
            isWishlisted ? 'bg-[var(--neon-primary)] text-white shadow-[2px_2px_0px_black] sm:shadow-[4px_4px_0px_black]' : 'bg-white text-black hover:bg-[var(--neon-primary)] hover:text-white'
          }`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-30 flex flex-col gap-1 pointer-events-none">
           <p className={`${theme.accent} text-[8px] sm:text-[9px] font-header font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] italic leading-none`}>
            {product.series}
          </p>
          <h3 className="text-xl sm:text-2xl font-anime text-white transition-colors line-clamp-2 uppercase italic tracking-wider leading-[0.85] h-[40px] sm:h-[48px] overflow-hidden drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
             {product.name}
          </h3>
          <div className="flex items-center gap-2">
             <Zap size={8} className={`${theme.accent} fill-current`} />
             <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">LVL_{powerLevel}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col justify-between bg-black relative min-h-[120px] sm:h-[145px]">
        <div className="flex items-end justify-between">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-[8px] sm:text-[10px] font-header font-black text-zinc-500 uppercase italic tracking-widest leading-none">
              <Tag size={10} /> VALUATION
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3">
              <p className={`text-2xl sm:text-4xl font-anime text-white italic tracking-widest drop-shadow-[2px_2px_0px_black] sm:drop-shadow-[4px_4px_0px_black]`}>
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[14px] font-header font-black text-white/20 line-through italic decoration-[var(--neon-primary)] decoration-2 leading-none relative">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}
            className="p-3 sm:p-4 bg-white text-black border-2 sm:border-4 border-black shadow-[4px_4px_0px_var(--neon-secondary)] sm:shadow-[6px_6px_0px_var(--neon-secondary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none glitch-hover"
          >
            {/* Fix: Lucide icons do not support responsive props like sm:size */}
            <ShoppingBag size={24} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 lg:group-hover:translate-y-0 transition-transform duration-300 bg-white border-t-2 sm:border-t-4 border-black flex flex-col gap-2 z-50">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); navigate('/checkout'); }}
            className="w-full py-2 sm:py-4 bg-black text-white text-lg sm:text-2xl font-anime uppercase italic tracking-widest transition-all hover:bg-zinc-900 flex items-center justify-center gap-2 sm:gap-4"
          >
            {/* Fix: Lucide icons do not support responsive props like sm:size */}
            LOOT NOW <Zap size={20} className="text-[var(--neon-tertiary)]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;