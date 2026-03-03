import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User, Palette, Volume2, VolumeX, ShieldCheck, ChevronRight, Zap, Sparkles, Target } from 'lucide-react';
import { Logo } from '../constants';
import { CartItem, UserRole } from '../types';
import { Theme } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  wishlist: string[];
  onUpdateCart: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  isLoggedIn: boolean;
  role?: UserRole | null;
  onFindEgg: (id: string, name: string) => void;
  onLogoSecret?: () => void;
  onLogoDoubleClick?: () => void;
  onThemeChange?: (theme: Theme) => void;
  currentTheme?: Theme;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

const Layout = forwardRef<((type: string) => void), LayoutProps>(({ 
  children, cart, wishlist, onUpdateCart, onRemoveFromCart, onToggleWishlist, isLoggedIn, role, onFindEgg, onLogoSecret, onLogoDoubleClick, 
  currentTheme = 'neon', onThemeChange, isAudioOn, onToggleAudio
}, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  
  const audioContext = useRef<AudioContext | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (audioContext.current) {
      if (isAudioOn) audioContext.current.resume();
      else audioContext.current.suspend();
    }
  }, [isAudioOn]);

  const playSound = (type: string) => {
    if (!isAudioOn) return;
    if (!audioContext.current) audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const ctx = audioContext.current;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    switch (type) {
      case 'click': {
        // Tactical HUD blip
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        masterGain.gain.setValueAtTime(0.05, now);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(masterGain);
        osc.start();
        osc.stop(now + 0.05);
        break;
      }
      case 'hover': {
        // Light aura shimmer
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        masterGain.gain.setValueAtTime(0.02, now);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(masterGain);
        osc.start();
        osc.stop(now + 0.1);
        break;
      }
      case 'success': {
        // Triumphant "Beli Loot" Chime (One Piece style)
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.1);
          g.gain.setValueAtTime(0.08, now + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + i * 0.1);
          o.stop(now + i * 0.1 + 0.5);
        });
        break;
      }
      case 'powerup': {
        // "Saiya-jin" Ki Aura Charge (DBZ style)
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        
        osc.type = 'sawtooth';
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(20, now);
        lfoGain.gain.setValueAtTime(50, now);
        
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 1.5);
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.06, now + 0.2);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        
        osc.connect(masterGain);
        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 1.5);
        osc.stop(now + 1.5);
        break;
      }
      case 'teleport': {
        // "Body Flicker / Shunshin" Zip (Naruto style)
        const noise = ctx.createBufferSource();
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(5000, now + 0.2);
        filter.Q.setValueAtTime(10, now);

        masterGain.gain.setValueAtTime(0.15, now);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        noise.connect(filter);
        filter.connect(masterGain);
        noise.start(now);
        noise.stop(now + 0.3);
        break;
      }
      case 'shutter': {
        // "Nichirin" Blade Draw (Demon Slayer style)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(3000, now);
        osc.frequency.exponentialRampToValueAtTime(12000, now + 0.1);
        masterGain.gain.setValueAtTime(0.05, now);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(masterGain);
        osc.start();
        osc.stop(now + 0.1);
        break;
      }
    }
  };

  useImperativeHandle(ref, () => playSound);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-dark)] text-white transition-colors duration-500 overflow-x-hidden w-full max-w-full">
      <div className="bg-white text-black text-[9px] md:text-[11px] py-2 px-4 md:px-6 text-center font-header font-black tracking-[0.1em] md:tracking-[0.4em] uppercase z-[60] relative transition-colors border-b-4 border-black shadow-[0_4px_0_var(--neon-primary)] break-words w-full">
        NEW DROP ALERT: <span className="text-[var(--neon-primary)] animate-pulse">GEAR 5 // LIMITED STOCK</span> AVAILABLE WORLDWIDE
      </div>

      <header className="bg-black border-b-4 border-white z-50 sticky top-0 transition-colors h-16 md:h-28 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.8)] w-full overflow-hidden">
        <div className="container mx-auto px-2 md:px-6">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            <div className="flex items-center gap-1.5 md:gap-8 shrink-0">
              <button 
                onClick={() => { setIsMenuOpen(true); playSound('teleport'); }} 
                className="lg:hidden text-white p-2 border-2 border-white rounded-sm hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                <Menu size={18} />
              </button>
              <Logo size="sm" onSecretClick={onLogoSecret} onDoubleClick={() => { onLogoDoubleClick?.(); playSound('teleport'); }} />
            </div>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-14">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      onMouseEnter={() => playSound('hover')}
                      onClick={() => playSound('teleport')}
                      className={`font-anime text-xl xl:text-3xl uppercase italic tracking-widest transition-all relative group ${location.pathname === link.path ? 'text-[var(--neon-primary)]' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {link.name}
                      <span className={`absolute -bottom-2 left-0 h-1 bg-[var(--neon-primary)] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 md:gap-8 shrink-0">
              <button onClick={() => { onToggleAudio(); playSound('click'); }} className="text-zinc-500 hover:text-white transition-colors">
                {isAudioOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>

              <div className="relative">
                <button onClick={() => { setIsThemeMenuOpen(!isThemeMenuOpen); playSound('click'); }} className="text-zinc-500 hover:text-white transition-colors p-1">
                  <Palette size={18} />
                </button>
                {isThemeMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-40 md:w-64 glass border-4 border-white rounded-none z-[100] animate-in fade-in slide-in-from-top-4 duration-200 shadow-[8px_8px_0px_var(--neon-primary)] overflow-hidden">
                    <div className="p-2 md:p-4 bg-white text-black font-anime text-base md:text-xl italic uppercase">Visual_Tuner</div>
                    <div className="flex flex-col">
                      {[
                        { id: 'neon', name: 'NEON', color: '#FF2E88' },
                        { id: 'solar', name: 'SOLAR', color: '#FF6600' },
                        { id: 'void', name: 'VOID', color: '#B026FF' }
                      ].map(t => (
                        <button 
                          key={t.id}
                          onClick={() => { onThemeChange?.(t.id as Theme); setIsThemeMenuOpen(false); playSound('success'); }}
                          className={`flex items-center justify-between p-3 md:p-6 text-[10px] md:text-xs font-header font-black uppercase italic tracking-widest transition-all hover:bg-white/10 ${currentTheme === t.id ? 'text-white' : 'text-zinc-500'}`}
                        >
                          {t.name}
                          <div className="w-3 h-3 md:w-4 md:h-4 rounded-none border-2 border-white" style={{ backgroundColor: t.color }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/wishlist" 
                className={`relative text-zinc-500 hover:text-[var(--neon-primary)] transition-all p-1.5 ${location.pathname === '/wishlist' ? 'text-[var(--neon-primary)]' : ''}`}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('teleport')}
              >
                <Heart size={18} fill={location.pathname === '/wishlist' || wishlistCount > 0 ? "currentColor" : "none"} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--neon-primary)] text-white text-[8px] font-header font-black w-4 h-4 flex items-center justify-center border border-black rounded-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to={isLoggedIn ? "/profile" : "/login"} onClick={() => playSound('teleport')} className="text-zinc-500 hover:text-white transition-colors p-1">
                {role === 'admin' ? <ShieldCheck size={18} className="text-[var(--neon-tertiary)]" /> : <User size={18} />}
              </Link>
              
              <button onClick={() => { setIsCartOpen(true); playSound('teleport'); }} className="relative group p-1.5 bg-white text-black border-2 border-black shadow-[2px_2px_0px_var(--neon-primary)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] font-header font-black w-5 h-5 flex items-center justify-center rounded-none border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[80%] max-w-xs bg-black border-r-8 border-[var(--neon-primary)] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b-4 border-white flex items-center justify-between">
            <Logo size="sm" onSecretClick={onLogoSecret} />
            <button onClick={() => setIsMenuOpen(false)} className="text-white p-2 border-2 border-white rounded-none hover:bg-white hover:text-black transition-all"><X size={20} /></button>
          </div>
          <nav className="p-8">
            <ul className="space-y-6">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    onClick={() => playSound('teleport')}
                    className="flex items-center justify-between text-3xl font-anime uppercase italic tracking-wider text-zinc-600 hover:text-white transition-colors group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={24} className="text-zinc-900 group-hover:text-[var(--neon-primary)] transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <main className="flex-grow relative w-full max-w-full overflow-hidden">{children}</main>

      {/* Shopping Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-black border-l-4 border-white z-[100] transition-transform duration-500 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 manga-halftone text-white opacity-[0.05] pointer-events-none"></div>
        
        <div className="flex items-center justify-between p-6 border-b-4 border-white relative z-10">
          <h2 className="text-3xl font-anime text-white italic uppercase tracking-wider">STASH_LOG</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white p-2 border-2 border-white transition-all hover:bg-white hover:text-black">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-30">
              <ShoppingCart size={80} className="text-zinc-900" />
              <div className="space-y-4">
                <p className="text-3xl font-anime uppercase italic tracking-widest">STASH_EMPTY!</p>
                <p className="text-[10px] font-header font-black uppercase tracking-[0.3em]">GO LOOT SOME GEAR</p>
              </div>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="group relative flex gap-4 p-4 bg-white/5 border-2 border-white/10 hover:border-white transition-all overflow-hidden">
              <img src={item.image} className="w-16 h-20 object-cover border-2 border-white shadow-2xl shrink-0" />
              <div className="flex-grow flex flex-col justify-between min-w-0">
                <div className="min-w-0">
                   <h4 className="text-lg font-anime text-white uppercase italic tracking-wider line-clamp-1 break-words">{item.name}</h4>
                   <p className="text-[10px] font-header font-black text-[var(--neon-primary)] uppercase italic tracking-widest mt-1">{item.series}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center bg-black p-1 border border-white/20">
                    <button onClick={() => onUpdateCart(item.id, -1)} className="w-6 h-6 flex items-center justify-center font-black text-sm hover:text-[var(--neon-primary)]">-</button>
                    <span className="px-2 text-[10px] font-header font-black text-white">{item.quantity}</span>
                    <button onClick={() => onUpdateCart(item.id, 1)} className="w-6 h-6 flex items-center justify-center font-black text-sm hover:text-[var(--neon-secondary)]">+</button>
                  </div>
                  <p className="text-xl font-anime text-white italic tracking-widest">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => onRemoveFromCart(item.id)} className="absolute top-2 right-2 text-zinc-700 hover:text-red-500 transition-colors p-1">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t-4 border-white bg-black relative z-10">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-1">
                <p className="text-[9px] font-header font-black text-zinc-600 uppercase italic tracking-widest">TOTAL_VALUATION</p>
                <div className="flex items-center gap-2">
                   <Zap size={16} className="text-[var(--neon-secondary)] animate-pulse" />
                   <span className="text-4xl font-anime text-[var(--neon-secondary)] italic">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); playSound('success'); }} 
              className="w-full bg-white text-black py-4 font-anime text-2xl italic uppercase tracking-widest shadow-[6px_6px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              SYNC_ORDER!
            </button>
          </div>
        )}
      </div>

      <footer className="bg-black border-t-8 border-white py-20 mt-auto relative overflow-hidden w-full">
        <div className="absolute inset-0 manga-halftone text-white opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-10">
            <Logo size="lg" />
            <div className="flex flex-wrap justify-center gap-6 md:gap-16">
               {navLinks.map((link, idx) => (
                 <Link key={idx} to={link.path} onClick={() => playSound('teleport')} className="font-anime text-2xl md:text-4xl text-zinc-600 hover:text-white transition-colors uppercase italic tracking-widest">{link.name}</Link>
               ))}
            </div>
            <div className="h-1 w-40 bg-white/10"></div>
            <div className="space-y-4 text-center">
              <p className="text-zinc-800 text-[8px] md:text-xs font-header font-black uppercase tracking-[0.2em] md:tracking-[0.8em] italic break-words">© 2026 ZENKIRA_OPERATIONS // ALL_RIGHTS_RESERVED</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;