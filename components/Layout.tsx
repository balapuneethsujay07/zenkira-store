
import React, { useState, useRef, useEffect } from 'react';
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
  onThemeChange?: (theme: Theme) => void;
  currentTheme?: Theme;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, cart, wishlist, onUpdateCart, onRemoveFromCart, onToggleWishlist, isLoggedIn, role, onFindEgg, onLogoSecret, 
  currentTheme = 'neon', onThemeChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  
  const audioContext = useRef<AudioContext | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [location.pathname]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const wishlistCount = wishlist.length;

  const playSound = (freq: number = 440, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!isAudioOn) return;
    if (!audioContext.current) audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioContext.current.currentTime);
    gain.gain.setValueAtTime(0.05, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioContext.current.destination);
    osc.start();
    osc.stop(audioContext.current.currentTime + duration);
  };

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isLoggedIn && role === 'admin') {
    navLinks.unshift({ name: 'Admin', path: '/admin' });
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[var(--bg-dark)] text-white transition-colors duration-500`}>
      <div className="bg-white text-black text-[11px] py-2 px-6 text-center font-header font-black tracking-[0.4em] uppercase z-[60] relative transition-colors border-b-4 border-black shadow-[0_4px_0_var(--neon-primary)]">
        NEW DROP ALERT: <span className="text-[var(--neon-primary)] animate-pulse">GEAR 5 // LIMITED STOCK</span> AVAILABLE WORLDWIDE
      </div>

      <header className="bg-black border-b-4 border-white z-50 sticky top-0 transition-colors h-28 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-8">
            
            <div className="flex items-center gap-8 shrink-0">
              <button 
                onClick={() => { setIsMenuOpen(true); playSound(400); }} 
                className="lg:hidden text-white p-2 border-2 border-white rounded-sm hover:bg-white hover:text-black transition-all"
              >
                <Menu size={28} />
              </button>
              <Logo size="sm" onSecretClick={onLogoSecret} />
            </div>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-14">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      onMouseEnter={() => playSound(600, 'sine', 0.05)}
                      className={`font-anime text-3xl uppercase italic tracking-widest transition-all relative group ${location.pathname === link.path ? 'text-[var(--neon-primary)]' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {link.name}
                      <span className={`absolute -bottom-2 left-0 h-1.5 bg-[var(--neon-primary)] transition-all duration-300 ${location.pathname === link.path ? 'w-full shadow-[0_4px_0_white]' : 'w-0 group-hover:w-full shadow-[0_4px_0_white]'}`}></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-8 shrink-0">
              <button onClick={() => setIsAudioOn(!isAudioOn)} className="text-zinc-500 hover:text-white transition-colors">
                {isAudioOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>

              <div className="relative">
                <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="text-zinc-500 hover:text-white transition-colors">
                  <Palette size={24} />
                </button>
                {isThemeMenuOpen && (
                  <div className="absolute top-full right-0 mt-8 w-64 glass border-4 border-white rounded-none z-[100] animate-in fade-in slide-in-from-top-4 duration-200 shadow-[12px_12px_0px_var(--neon-primary)]">
                    <div className="p-4 bg-white text-black font-anime text-xl italic uppercase">Visual_Tuner</div>
                    <div className="flex flex-col">
                      {[
                        { id: 'neon', name: 'CYBER_NEON', color: '#FF2E88' },
                        { id: 'solar', name: 'SOLAR_PULSE', color: '#FF6600' },
                        { id: 'void', name: 'DEEP_VOID', color: '#B026FF' }
                      ].map(t => (
                        <button 
                          key={t.id}
                          onClick={() => { onThemeChange?.(t.id as Theme); setIsThemeMenuOpen(false); playSound(800); }}
                          className={`flex items-center justify-between p-6 text-xs font-header font-black uppercase italic tracking-widest transition-all hover:bg-white/10 ${currentTheme === t.id ? 'text-white' : 'text-zinc-500'}`}
                        >
                          {t.name}
                          <div className="w-4 h-4 rounded-none border-2 border-white" style={{ backgroundColor: t.color }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Link */}
              <Link 
                to="/wishlist" 
                className={`relative text-zinc-500 hover:text-[var(--neon-primary)] transition-all p-2 ${location.pathname === '/wishlist' ? 'text-[var(--neon-primary)]' : ''}`}
                onMouseEnter={() => playSound(700, 'sine', 0.05)}
              >
                <Heart size={28} fill={location.pathname === '/wishlist' || wishlistCount > 0 ? "currentColor" : "none"} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--neon-primary)] text-white text-[9px] font-header font-black w-5 h-5 flex items-center justify-center border-2 border-black rounded-none shadow-[0_0_10px_var(--neon-primary)]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to={isLoggedIn ? "/profile" : "/login"} className="text-zinc-500 hover:text-white transition-colors">
                {role === 'admin' ? <ShieldCheck size={28} className="text-[var(--neon-tertiary)]" /> : <User size={28} />}
              </Link>
              
              <button onClick={() => setIsCartOpen(true)} className="relative group p-2 bg-white text-black border-2 border-black shadow-[4px_4px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-90">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-header font-black w-7 h-7 flex items-center justify-center rounded-none border-2 border-white">
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
        <div className={`absolute top-0 left-0 h-full w-full max-w-sm bg-black border-r-8 border-[var(--neon-primary)] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-10 border-b-4 border-white flex items-center justify-between">
            <Logo size="sm" />
            <button onClick={() => setIsMenuOpen(false)} className="text-white p-3 border-4 border-white rounded-none hover:bg-white hover:text-black transition-all"><X size={32} /></button>
          </div>
          <nav className="p-12">
            <ul className="space-y-12">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    className="flex items-center justify-between text-6xl font-anime uppercase italic tracking-wider text-zinc-600 hover:text-white transition-colors group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={48} className="text-zinc-900 group-hover:text-[var(--neon-primary)] group-hover:translate-x-6 transition-all" />
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/wishlist"
                  className="flex items-center justify-between text-6xl font-anime uppercase italic tracking-wider text-zinc-600 hover:text-[var(--neon-primary)] transition-colors group"
                >
                  <span>Wishlist</span>
                  <Heart size={48} className="text-zinc-900 group-hover:text-[var(--neon-primary)] group-hover:translate-x-6 transition-all" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="flex-grow relative">{children}</main>

      {/* Shopping Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-black border-l-8 border-white z-[100] transition-transform duration-500 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 manga-halftone text-white opacity-[0.05] pointer-events-none"></div>
        
        <div className="flex items-center justify-between p-12 border-b-4 border-white relative z-10">
          <h2 className="text-6xl font-anime text-white italic uppercase tracking-wider">STASH_LOG</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white p-3 border-4 border-white transition-all hover:bg-white hover:text-black">
            <X size={28} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-12 space-y-12 relative z-10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-12 opacity-30">
              <ShoppingCart size={100} className="text-zinc-900" />
              <div className="space-y-6">
                <p className="text-5xl font-anime uppercase italic tracking-widest">STASH_EMPTY!</p>
                <p className="text-xs font-header font-black uppercase tracking-[0.5em]">GO LOOT SOME GEAR</p>
              </div>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="group relative flex gap-8 p-6 bg-white/5 border-4 border-white/10 hover:border-white transition-all overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
              <div className="absolute -right-6 -top-6 opacity-[0.1] group-hover:opacity-[0.2] transition-opacity">
                <Sparkles size={100} className="text-white" />
              </div>
              <img src={item.image} className="w-28 h-36 object-cover border-4 border-white shadow-2xl" />
              <div className="flex-grow flex flex-col justify-between">
                <div>
                   <h4 className="text-2xl font-anime text-white uppercase italic tracking-wider line-clamp-1">{item.name}</h4>
                   <p className="text-[12px] font-header font-black text-[var(--neon-primary)] uppercase italic tracking-widest mt-2">{item.series}</p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center bg-black p-2 border-2 border-white/20">
                    <button onClick={() => onUpdateCart(item.id, -1)} className="w-10 h-10 flex items-center justify-center font-black text-xl hover:text-[var(--neon-primary)] transition-colors">-</button>
                    <span className="px-4 text-sm font-header font-black text-white">{item.quantity}</span>
                    <button onClick={() => onUpdateCart(item.id, 1)} className="w-10 h-10 flex items-center justify-center font-black text-xl hover:text-[var(--neon-secondary)] transition-colors">+</button>
                  </div>
                  <p className="text-3xl font-anime text-white italic tracking-widest">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => onRemoveFromCart(item.id)} className="absolute top-4 right-4 text-zinc-700 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="p-12 border-t-8 border-white bg-black relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-2">
                <p className="text-xs font-header font-black text-zinc-600 uppercase italic tracking-widest">TOTAL_VALUATION</p>
                <div className="flex items-center gap-4">
                   <Zap size={32} className="text-[var(--neon-secondary)] animate-pulse" />
                   <span className="text-6xl font-anime text-[var(--neon-secondary)] italic drop-shadow-[6px_6px_0px_#000]">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }} 
              className="w-full bg-white text-black py-8 font-anime text-4xl italic uppercase tracking-widest shadow-[12px_12px_0px_var(--neon-primary)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none glitch-hover"
            >
              SYNC_ORDER!
            </button>
          </div>
        )}
      </div>

      <footer className="bg-black border-t-8 border-white py-40 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 manga-halftone text-white opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center space-y-16">
            <Logo size="lg" onSecretClick={onLogoSecret} />
            <div className="flex flex-wrap justify-center gap-16">
               {navLinks.map((link, idx) => (
                 <Link key={idx} to={link.path} className="font-anime text-4xl text-zinc-600 hover:text-white transition-colors uppercase italic tracking-widest">{link.name}</Link>
               ))}
               <Link to="/wishlist" className="font-anime text-4xl text-zinc-600 hover:text-[var(--neon-primary)] transition-colors uppercase italic tracking-widest">Wishlist</Link>
            </div>
            <div className="h-1 w-80 bg-white/10"></div>
            <div className="space-y-6 text-center">
              <p className="text-zinc-800 text-xs font-header font-black uppercase tracking-[0.8em] italic">© 2026 ZENKIRA_OPERATIONS // ALL_RIGHTS_RESERVED</p>
              <div className="flex items-center justify-center gap-6 text-zinc-900">
                <ShieldCheck size={20} /> <Zap size={20} /> <Target size={20} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
