
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ArrowLeft, 
  Zap, 
  CreditCard, 
  ImageIcon,
  Play,
  Pause,
  Layers,
  Box,
  Cpu,
  Target,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Send,
  User,
  Tag
} from 'lucide-react';
import { Product, Review, UserProfile } from '../types';

interface ProductDetailProps {
  products: Product[];
  onAddToCart: (p: Product, q: number) => void;
  onBuyNow: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  wishlist: string[];
  onAddReview: (productId: string, review: Review) => void;
  currentUser: UserProfile | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, onAddToCart, onBuyNow, onToggleWishlist, wishlist, onAddReview, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const product = products.find(p => p.id === id);
  const images = product ? [
    product.image, 
    product.image2, 
    ...(product.images || [])
  ].filter(Boolean) as string[] : [];

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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !currentUser) {
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

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-4xl font-header font-black text-white italic uppercase tracking-tighter">DATA_LOST: NOT_FOUND</h2>
        <Link to="/shop" className="text-[var(--neon-primary)] font-black hover:underline font-header uppercase tracking-widest text-xs">Return to Marketplace</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleBuyNow = () => {
    if (product.stock > 0) {
      onBuyNow(product);
      navigate('/checkout');
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'OUT_OF_STOCK', color: 'text-red-500', icon: <XCircle size={14} />, bar: 'bg-red-500/20' };
    if (product.stock <= 5) return { label: `LOW_STOCK: ONLY ${product.stock} REMAINING`, color: 'text-orange-500', icon: <AlertTriangle size={14} />, bar: 'bg-orange-500/20' };
    return { label: 'IN_STOCK // READY', color: 'text-emerald-500', icon: <CheckCircle2 size={14} />, bar: 'bg-emerald-500/20' };
  };

  const stockStatus = getStockStatus();

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
    : 5;

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice ? Math.round((discountAmount / product.originalPrice) * 100) : 0;

  return (
    <div className="container mx-auto px-4 pb-40">
      <Link to="/shop" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--neon-primary)] transition-colors mb-12 group font-header text-[10px] uppercase tracking-widest font-black italic">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO ARCHIVE
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <div 
              className="aspect-[4/5] rounded-sm overflow-hidden bg-black border-2 border-white/5 relative group shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onMouseMove={handleMouseMove}
            >
              {viewMode === 'video' && product.videoUrl ? (
                <div className="w-full h-full relative bg-black animate-in fade-in duration-500">
                  <video 
                    ref={videoRef}
                    src={product.videoUrl} 
                    autoPlay 
                    loop 
                    muted={isMuted}
                    playsInline 
                    className="w-full h-full object-contain"
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  />
                  
                  {/* Custom Video Controls Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end transition-opacity duration-500 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="p-8 space-y-4">
                      
                      {/* Key Moments */}
                      {product.videoMoments && (
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                          {product.videoMoments.map((moment, idx) => (
                            <button 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); seek(moment.time); }}
                              className="px-3 py-1.5 bg-white/5 border border-white/10 text-[8px] font-header font-black text-white uppercase italic hover:bg-[var(--neon-primary)] hover:border-[var(--neon-primary)] transition-all flex items-center gap-2 rounded-sm"
                            >
                              <Zap size={10} /> {moment.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="relative h-1.5 bg-white/10 rounded-full cursor-pointer overflow-visible" onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pos = (e.clientX - rect.left) / rect.width;
                        seek(pos * duration);
                      }}>
                        <div 
                          className="absolute top-0 left-0 h-full bg-[var(--neon-primary)] rounded-full shadow-[0_0_10px_var(--neon-primary)]" 
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white hover:text-[var(--neon-primary)] transition-colors">
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                          </button>
                          <div className="flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-white hover:text-[var(--neon-secondary)] transition-colors">
                              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <span className="text-[10px] font-mono text-white/60">
                              {Math.floor(currentTime)}s / {Math.floor(duration)}s
                            </span>
                          </div>
                        </div>
                        <button className="text-white/40 hover:text-white transition-colors" onClick={(e) => {
                          e.stopPropagation();
                          if (videoRef.current) videoRef.current.requestFullscreen();
                        }}>
                          <Maximize2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img src={images[activeImageIndex]} alt={product.name} className="w-full h-full object-contain transition-all duration-700 animate-in fade-in scale-100" />
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/40 border border-white/10 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--neon-primary)] btn-primary-scale"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/40 border border-white/10 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--neon-primary)] btn-primary-scale"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {product.videoUrl && viewMode === 'image' && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors cursor-pointer"
                      onClick={() => setViewMode('video')}
                    >
                      <div className="w-24 h-24 rounded-full bg-[var(--neon-secondary)]/20 border-2 border-[var(--neon-secondary)] flex items-center justify-center animate-pulse shadow-[0_0_30px_var(--neon-secondary)]">
                        <Play size={40} className="text-[var(--neon-secondary)] fill-[var(--neon-secondary)] ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--neon-primary)] opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[var(--neon-secondary)] opacity-50"></div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-4 p-4 glass border border-white/5 rounded-sm bg-black/20 overflow-x-auto custom-scrollbar">
               {images.map((img, idx) => (
                 <button 
                  key={idx}
                  onClick={() => { setViewMode('image'); setActiveImageIndex(idx); }}
                  className={`w-20 h-24 shrink-0 rounded-sm border-2 overflow-hidden transition-all ${viewMode === 'image' && activeImageIndex === idx ? 'border-[var(--neon-primary)] shadow-[0_0_15px_var(--neon-primary)] scale-105' : 'border-white/10 opacity-50 hover:opacity-100'} btn-primary-scale`}
                 >
                   <img src={img} className="w-full h-full object-cover" />
                 </button>
               ))}
               {product.videoUrl && (
                 <button 
                  onClick={() => setViewMode('video')}
                  className={`w-20 h-24 shrink-0 rounded-sm border-2 overflow-hidden bg-black flex items-center justify-center transition-all ${viewMode === 'video' ? 'border-[var(--neon-secondary)] shadow-[0_0_15px_var(--neon-secondary)] scale-105' : 'border-white/10 opacity-50 hover:opacity-100'} btn-primary-scale`}
                 >
                   <Play size={24} className={viewMode === 'video' ? 'text-[var(--neon-secondary)]' : 'text-white'} />
                 </button>
               )}
            </div>
          </div>

          {/* Feedback Area on Detail Page */}
          <div className="space-y-12 pt-12 border-t border-white/5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-[var(--neon-tertiary)]">
                   <MessageSquare size={32} />
                   <h2 className="text-3xl font-header font-black uppercase italic tracking-tighter">NEURAL_FEEDBACK</h2>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.round(averageRating) ? "text-[var(--neon-tertiary)] fill-[var(--neon-tertiary)] shadow-[0_0_10px_var(--neon-tertiary)]" : "text-white/10"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-header font-black text-white/40 ml-4">({product.reviews?.length || 0}) RECORDS</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Submit Feedback */}
                <div className="space-y-6">
                   <div className="glass p-8 border border-white/10 rounded-sm space-y-6">
                      <h3 className="text-xs font-header font-black text-white uppercase tracking-widest italic">TRANSMIT_NEW_DATA</h3>
                      <form onSubmit={handleReviewSubmit} className="space-y-6">
                         <div className="flex items-center justify-between bg-black/40 p-4 border border-white/5 rounded-sm">
                            <span className="text-[10px] font-header font-black text-white/60 uppercase italic">RATING_SYNC:</span>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                  key={star} 
                                  type="button" 
                                  onClick={() => setNewReview({...newReview, rating: star})}
                                  className="transition-all hover:scale-125"
                                >
                                  <Star size={20} className={star <= newReview.rating ? "text-[var(--neon-tertiary)] fill-[var(--neon-tertiary)]" : "text-white/10"} />
                                </button>
                              ))}
                            </div>
                         </div>
                         <div className="relative">
                            <textarea 
                              value={newReview.comment}
                              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                              placeholder={currentUser ? "ENTER NEURAL FEEDBACK..." : "IDENTITY SYNC REQUIRED TO POST..."}
                              disabled={!currentUser || isSubmittingReview}
                              rows={5}
                              className="w-full bg-black/40 border border-white/10 p-6 text-xs text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase resize-none disabled:opacity-30"
                            />
                            <button 
                              type="submit" 
                              disabled={!currentUser || isSubmittingReview || !newReview.comment.trim()}
                              className="absolute bottom-6 right-6 p-4 bg-[var(--neon-tertiary)] text-black rounded-sm shadow-[0_0_15px_var(--neon-tertiary)] hover:brightness-125 disabled:opacity-0 transition-all btn-primary-scale"
                            >
                              <Send size={20} />
                            </button>
                         </div>
                      </form>
                   </div>
                </div>

                {/* Feedback Stream */}
                <div className="space-y-8 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
                   {product.reviews && product.reviews.length > 0 ? product.reviews.map((rev) => (
                     <div key={rev.id} className="glass p-6 border border-white/5 space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-sm bg-[var(--neon-primary)]/10 border border-[var(--neon-primary)]/30 flex items-center justify-center">
                                <User size={18} className="text-[var(--neon-primary)]" />
                              </div>
                              <div>
                                <p className="text-xs font-header font-black text-white uppercase italic">{rev.userName}</p>
                                <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{rev.date}</p>
                              </div>
                           </div>
                           <div className="flex gap-1">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} size={10} className={i < rev.rating ? "text-[var(--neon-tertiary)] fill-[var(--neon-tertiary)]" : "text-white/10"} />
                             ))}
                           </div>
                        </div>
                        <p className="text-xs font-mono text-[var(--text-muted)] italic leading-relaxed border-l-2 border-white/10 pl-6">
                          {rev.comment}
                        </p>
                     </div>
                   )) : (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-30 border border-dashed border-white/10 rounded-sm py-20">
                        <MessageSquare size={48} className="mb-4" />
                        <p className="text-[10px] font-header font-black uppercase tracking-[0.5em] italic">AWAITING_NEURAL_SIGNALS</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="px-4 py-1.5 bg-[var(--neon-primary)]/10 text-[var(--neon-primary)] text-[9px] font-header font-black tracking-[0.3em] uppercase border border-[var(--neon-primary)]/30 italic">ARCHIVE_{product.category.toUpperCase()}</span>
               <span className="text-[var(--text-muted)] text-[10px] font-header font-black uppercase tracking-widest flex items-center gap-2 italic">
                  <Zap size={14} className="text-[var(--neon-secondary)]" /> {product.series}
               </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-header font-black text-white leading-[0.9] italic uppercase tracking-tighter">{product.name}</h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.round(averageRating) ? "text-[var(--neon-tertiary)] fill-[var(--neon-tertiary)] shadow-[0_0_5px_var(--neon-tertiary)]" : "text-white/20"} 
                  />
                ))}
              </div>
              <span className="text-[var(--text-muted)] text-[10px] font-header font-black uppercase tracking-[0.3em] italic border-l border-white/10 pl-6">AUTHENTICITY: S-TIER</span>
            </div>
          </div>

          <div className="glass p-10 border border-white/10 rounded-sm space-y-10 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[var(--neon-tertiary)] font-header font-black text-[10px] uppercase italic tracking-[0.3em]">
                    <Tag size={12} /> SAMPLE_PRICE_PROTOCOL
                 </div>
                 <div className="flex items-baseline gap-6">
                    <span className="text-6xl font-header font-black text-[var(--neon-secondary)] italic tracking-tighter drop-shadow-[0_0_10px_var(--neon-secondary)]">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                       <div className="flex flex-col">
                          <span className="text-2xl font-header font-black text-white/20 line-through italic decoration-[var(--neon-primary)] decoration-4">₹{product.originalPrice.toLocaleString()}</span>
                          <span className="text-[10px] font-header font-black text-[var(--neon-primary)] uppercase tracking-widest">-{discountPercent}% OFF</span>
                       </div>
                    )}
                 </div>
              </div>
              
              <div className={`flex flex-col gap-2 p-3 ${stockStatus.bar} border border-white/5 rounded-sm`}>
                <div className={`flex items-center gap-2 ${stockStatus.color} font-header text-[9px] uppercase font-black tracking-[0.3em] italic`}>
                  {stockStatus.icon} {stockStatus.label}
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3 text-[var(--neon-tertiary)]">
                  <Target size={18} />
                  <h3 className="text-xs font-header font-black uppercase tracking-[0.3em] italic">Tactical_Manifest</h3>
               </div>
               
               <p className="text-[var(--text-muted)] leading-relaxed font-mono text-xs border-l-4 border-white/10 pl-8 italic opacity-80">
                  {product.description}
               </p>

               <div className="grid grid-cols-2 gap-6 pt-4">
                  {[
                    { label: 'Base', val: product.specs?.material, icon: <Layers size={14} /> },
                    { label: 'Rarity', val: product.specs?.rarity, icon: <Zap size={14} />, color: 'text-[var(--neon-tertiary)]' },
                    { label: 'Mass', val: product.specs?.weight, icon: <Box size={14} /> },
                    { label: 'Origin', val: product.specs?.origin, icon: <Cpu size={14} /> },
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col gap-1.5 p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                       <div className="flex items-center gap-2 text-[var(--text-muted)] text-[8px] font-header font-black uppercase tracking-widest italic">
                          {spec.icon} {spec.label}
                       </div>
                       <div className={`text-[11px] font-header font-black uppercase italic ${spec.color || 'text-white'}`}>
                          {spec.val || 'Unidentified'}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-6 pt-10 border-t border-white/5">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-[0.3em] italic">Unit_Qty:</label>
                <div className="flex items-center bg-black/40 border border-white/10 rounded-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-2 hover:text-[var(--neon-primary)] font-black transition-colors">-</button>
                  <span className="px-8 py-2 font-header font-black text-white text-xs">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-5 py-2 hover:text-[var(--neon-secondary)] font-black transition-colors">+</button>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <button 
                    disabled={product.stock === 0}
                    onClick={() => onAddToCart(product, quantity)}
                    className={`flex-grow py-5 ${product.stock === 0 ? 'bg-white/10 text-white/40 cursor-not-allowed opacity-50' : 'bg-[var(--neon-primary)] hover:bg-[var(--neon-primary)]/80'} text-white rounded-sm font-header font-black flex items-center justify-center gap-4 transition-all uppercase italic text-[11px] tracking-widest shadow-[0_0_20px_rgba(255,46,136,0.3)] btn-primary-scale`}
                  >
                    <ShoppingBag size={20} /> ADD TO CART
                  </button>
                  <button onClick={() => onToggleWishlist(product.id)} className={`px-8 py-5 border transition-all rounded-sm flex items-center justify-center ${isWishlisted ? 'bg-[var(--neon-primary)]/10 border-[var(--neon-primary)] text-[var(--neon-primary)]' : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:text-[var(--neon-primary)] hover:border-[var(--neon-primary)]'} btn-primary-scale`}>
                    <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>
                <button 
                  disabled={product.stock === 0}
                  onClick={handleBuyNow}
                  className={`w-full py-5 ${product.stock === 0 ? 'bg-white/10 text-white/40 cursor-not-allowed opacity-50' : 'bg-[var(--neon-secondary)] hover:bg-[var(--neon-secondary)]/80'} text-black rounded-sm font-header font-black flex items-center justify-center gap-4 transition-all uppercase italic text-[11px] tracking-widest btn-primary-scale`}
                >
                  <CreditCard size={20} /> BUY IT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
