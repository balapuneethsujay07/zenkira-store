
import React, { useState, useRef, useEffect } from 'react';
import { X, Heart, Star, ShoppingBag, CreditCard, Zap, Target, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Play, Pause, Volume2, VolumeX, Sparkles, MessageSquare, Send, User } from 'lucide-react';
import { Product, Review, UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';
import { EASTER_EGGS } from '../constants';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, q: number) => void;
  onBuyNow: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
  onFindEgg: (id: string, name: string) => void;
  onAddReview: (productId: string, review: Review) => void;
  currentUser: UserProfile | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, onBuyNow, onToggleWishlist, isWishlisted, onFindEgg, onAddReview, currentUser }) => {
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'image' | 'video'>('image');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeout = useRef<number | null>(null);
  const navigate = useNavigate();

  const images = [
    product.image, 
    product.image2, 
    ...(product.images || [])
  ].filter(Boolean) as string[];

  const associatedEgg = Object.values(EASTER_EGGS).find(egg => egg.anime === product.series);

  useEffect(() => {
    if (viewMode === 'video' && videoRef.current) {
      const video = videoRef.current;
      const updateProgress = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', updateDuration);
      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [viewMode]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) window.clearTimeout(controlsTimeout.current);
    controlsTimeout.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  const seek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const handleAddToCart = () => {
    if (product.stock > 0) {
      onAddToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product.stock > 0) {
      onBuyNow(product);
      onClose();
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!newReview.comment.trim()) return;

    setIsSubmittingReview(true);
    const review: Review = {
      id: `REV-${Date.now()}`,
      userName: currentUser.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };

    setTimeout(() => {
      onAddReview(product.id, review);
      setNewReview({ rating: 5, comment: '' });
      setIsSubmittingReview(false);
    }, 1000);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'VOID', color: 'text-red-500', icon: <XCircle size={12} /> };
    if (product.stock <= 5) return { label: `LIMIT (${product.stock})`, color: 'text-orange-500', icon: <AlertTriangle size={12} /> };
    return { label: 'READY', color: 'text-emerald-500', icon: <CheckCircle2 size={12} /> };
  };

  const stockStatus = getStockStatus();

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
    : 5;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl bg-[#0B0E1A] border-2 border-[#7B5CFF]/30 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(123,92,255,0.3)] flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-[110] p-2 bg-black/50 text-white rounded-full hover:bg-[#FF2E88] transition-colors border border-white/10 btn-primary-scale">
          <X size={20} />
        </button>

        {/* Left: Media Section */}
        <div className="md:w-3/5 relative bg-[#050505] flex flex-col h-[450px] md:h-auto overflow-hidden border-r border-white/5" onMouseMove={handleMouseMove}>
           <div className="flex-grow relative overflow-hidden group/media">
              {viewMode === 'video' && product.videoUrl ? (
                <div className="w-full h-full relative">
                  <video ref={videoRef} src={product.videoUrl} autoPlay loop muted={isMuted} playsInline className="w-full h-full object-cover animate-in fade-in duration-500" onClick={(e) => { e.stopPropagation(); togglePlay(); }} />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end transition-opacity duration-500 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="p-6 space-y-4">
                        <div className="relative h-1 bg-white/10 rounded-full cursor-pointer" onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const pos = (e.clientX - rect.left) / rect.width;
                          seek(pos * duration);
                        }}>
                          <div className="absolute top-0 left-0 h-full bg-[var(--neon-primary)] rounded-full shadow-[0_0_8px_var(--neon-primary)]" style={{ width: `${(currentTime / duration) * 100}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white hover:text-[var(--neon-primary)] transition-colors btn-primary-scale">
                              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-white hover:text-[var(--neon-secondary)] transition-colors btn-primary-scale">
                              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                          </div>
                          <span className="text-[9px] font-mono text-white/50">{Math.floor(currentTime)}s / {Math.floor(duration)}s</span>
                        </div>
                      </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <img src={images[activeImageIndex]} alt={product.name} className="w-full h-full object-contain transition-all duration-700 animate-in fade-in zoom-in-95" />
                    {images.length > 1 && (
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-auto">
                         <button onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length); }} className="w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[var(--neon-primary)] transition-all">
                            <X size={16} className="rotate-90" />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev + 1) % images.length); }} className="w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[var(--neon-primary)] transition-all">
                            <X size={16} className="-rotate-90" />
                         </button>
                      </div>
                    )}
                </div>
              )}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                <div className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-bold rounded-sm shadow-lg font-header uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} /> AUTHENTIC_UNIT
                </div>
              </div>
           </div>
           <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                 {images.map((img, idx) => (
                   <button key={idx} onClick={() => { setViewMode('image'); setActiveImageIndex(idx); }} className={`w-12 h-16 rounded-sm border-2 overflow-hidden transition-all ${viewMode === 'image' && activeImageIndex === idx ? 'border-[var(--neon-primary)] scale-105 shadow-[0_0_10px_var(--neon-primary)]' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
                     <img src={img} className="w-full h-full object-cover" alt={`View ${idx + 1}`} />
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Info Section */}
        <div className="md:w-2/5 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-black/40 relative">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[var(--neon-primary)]/10 text-[var(--neon-primary)] text-[8px] font-header font-black tracking-[0.2em] uppercase border border-[var(--neon-primary)]/20 italic">{product.category}</span>
                <span className="text-[var(--text-muted)] text-[8px] font-header font-black uppercase tracking-widest flex items-center gap-1.5 italic">
                  <Zap size={10} className="text-[var(--neon-secondary)]" /> {product.series}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-header font-black text-white italic uppercase tracking-tighter leading-tight">{product.name}</h2>
              
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${stockStatus.color} text-[10px] font-header font-black uppercase tracking-widest`}>
                  {stockStatus.icon} {stockStatus.label}
                </div>
                <div className="flex gap-1 items-center">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.round(averageRating) ? "text-[var(--neon-tertiary)] fill-[var(--neon-tertiary)]" : "text-white/20"} />
                    ))}
                  <span className="text-[8px] font-header font-black text-white/40 ml-2">({product.reviews?.length || 0})</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-[var(--neon-secondary)]">
                <Target size={16} />
                <h3 className="text-[10px] font-header font-black uppercase tracking-[0.2em] italic">Tactical_Manifest</h3>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed font-mono text-[11px] italic opacity-90 border-l-2 border-white/10 pl-4">
                {product.description}
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <p className="text-[8px] font-header font-black text-[var(--text-muted)] uppercase italic opacity-60">Sample_Price_Protocol</p>
              <div className="flex items-baseline gap-4">
                {product.originalPrice && (
                  <span className="text-xl font-header font-black text-white/20 line-through italic decoration-[var(--neon-primary)]">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-5xl font-header font-black text-[var(--neon-secondary)] italic drop-shadow-[0_0_10px_var(--neon-secondary)]">₹{product.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/5">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-widest italic">Unit_Qty:</label>
                <div className="flex items-center bg-black/40 border border-white/10 rounded-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:text-[var(--neon-primary)] font-black transition-colors">-</button>
                  <span className="px-6 py-2 font-header font-black text-white text-[11px]">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-2 hover:text-[var(--neon-secondary)] font-black transition-colors">+</button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <button disabled={product.stock === 0} onClick={handleAddToCart} className={`flex-grow py-4 bg-[var(--neon-primary)] text-white font-header font-black uppercase italic rounded-sm transition-all flex items-center justify-center gap-3 text-[10px] tracking-widest shadow-[0_0_15px_rgba(255,46,136,0.2)] hover:shadow-[0_0_25px_var(--neon-primary)] active:scale-95 btn-primary-scale ${product.stock === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>
                    <ShoppingBag size={18} /> ADD TO CART
                  </button>
                  <button onClick={() => onToggleWishlist(product.id)} className={`px-5 py-4 border transition-all rounded-sm flex items-center justify-center ${isWishlisted ? 'bg-[var(--neon-primary)]/10 border-[var(--neon-primary)] text-[var(--neon-primary)]' : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:text-[var(--neon-primary)] hover:border-[var(--neon-primary)]'} btn-primary-scale`}>
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>
                <button disabled={product.stock === 0} onClick={handleBuyNow} className={`w-full py-4 bg-[var(--neon-secondary)] text-black font-header font-black uppercase italic rounded-sm transition-all flex items-center justify-center gap-3 text-[10px] tracking-widest hover:brightness-110 active:scale-95 btn-primary-scale ${product.stock === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>
                  <CreditCard size={18} /> BUY IT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
