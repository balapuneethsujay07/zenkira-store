
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Categories from './pages/Categories.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Checkout from './pages/Checkout.tsx';
import Orders from './pages/Orders.tsx';
import Profile from './pages/Profile.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Wishlist from './pages/Wishlist.tsx';
import ProductModal from './components/ProductModal.tsx';
import { Product, CartItem, Order, UserProfile, UserRole, Review } from './types.ts';
import { PRODUCTS } from './constants.tsx';
import { Zap, Sparkles, Moon, Coins, Trophy } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export type Theme = 'neon' | 'solar' | 'void';

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole | null;
  user: UserProfile | null;
}

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    role: null,
    user: null
  });
  
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'egg' | 'system' | 'secret'} | null>(null);
  const [theme, setTheme] = useState<Theme>('neon');
  const [showRewardCelebration, setShowRewardCelebration] = useState(false);
  
  // Easter Egg States
  const [isSlashActive, setIsSlashActive] = useState(false);
  const [isSmokeActive, setIsSmokeActive] = useState(false);
  const [isGlobalGlowActive, setIsGlobalGlowActive] = useState(false);
  const [isLeafStormActive, setIsLeafStormActive] = useState(false);
  const [isSecretOverlayActive, setIsSecretOverlayActive] = useState(false);
  const [isDarkModeEggActive, setIsDarkModeEggActive] = useState(false);
  const [isEmblemActive, setIsEmblemActive] = useState(false);

  const typedBuffer = useRef('');

  useEffect(() => {
    const html = document.documentElement;
    html.className = `theme-${theme}`;
  }, [theme]);

  const notify = (message: string, type: 'egg' | 'system' | 'secret' = 'system') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      typedBuffer.current = (typedBuffer.current + e.key).toUpperCase().slice(-10);
      
      if (typedBuffer.current.includes('ZENKIRA')) {
        setIsGlobalGlowActive(true);
        notify('SYSTEM_OVERLOAD: GLOBAL NEON ACTIVE', 'system');
        setTimeout(() => setIsGlobalGlowActive(false), 5000);
        typedBuffer.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogoSecret = () => {
    setIsSecretOverlayActive(true);
    setIsSlashActive(true);
    setIsLeafStormActive(true);
    setIsEmblemActive(true);
    notify('SECRET_TECHNIQUE: LOGO_BURST_ACTIVATED', 'secret');
    setTimeout(() => {
      setIsSlashActive(false);
      setIsLeafStormActive(false);
    }, 1500);
    setTimeout(() => {
      setIsSecretOverlayActive(false);
      setIsEmblemActive(false);
    }, 4000);
  };

  const handleFindEgg = (eggId: string, eggName: string) => {
    if (!foundEggs.includes(eggId)) {
      setFoundEggs(prev => [...prev, eggId]);
      notify(`NEURAL_SYNC: ${eggName.toUpperCase()} ACQUIRED! (${foundEggs.length + 1}/5)`, 'egg');
    }
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    notify(`SYSTEM: ${product.name.toUpperCase()} SYNCED TO CART (${quantity})`);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setSelectedProduct(null);
    notify(`SYSTEM: PRIORITY CHANNEL OPEN FOR ${product.name.toUpperCase()}`);
  };

  const handleUpdateCart = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ZK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      status: 'Processing',
      trackingNumber: `ZK-${Math.random().toString(36).substring(2, 11).toUpperCase()}`
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    notify("ORDER_STABLE: SHIPMENT DEPLOYED");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isWishlisted = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      const name = product ? product.name.toUpperCase() : "ARTIFACT";
      
      if (isWishlisted) {
        notify(`NEURAL_LINK: ${name} DE-SYNCED`);
        return prev.filter(id => id !== productId);
      } else {
        notify(`NEURAL_LINK: ${name} SAVED_TO_WISHLIST`, 'secret');
        return [...prev, productId];
      }
    });
  };

  const handleLoginSuccess = (role: UserRole) => {
    const user: UserProfile = {
      name: role === 'admin' ? 'ZENKIRA' : 'Operative_Neo',
      email: role === 'admin' ? 'admin@zenkira.net' : 'user@zenkira.net',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role === 'admin' ? 'Admin' : 'Felix'}`,
      joinDate: 'Feb 2026',
      loyaltyPoints: role === 'admin' ? 999999 : 0,
      role: role
    };
    setAuth({
      isLoggedIn: true,
      role: role,
      user: user
    });
    
    // Trigger celebration animation
    setShowRewardCelebration(true);
    setTimeout(() => setShowRewardCelebration(false), 5000);
    
    notify(`${role.toUpperCase()}_ACCESS: IDENTITY_VERIFIED`);
  };

  const handleLogout = () => {
    setAuth({
      isLoggedIn: false,
      role: null,
      user: null
    });
    notify("SESSION_TERMINATED");
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    notify(`ADMIN: NEW_ARTIFACT_DEPLOYED: ${newProduct.name.toUpperCase()}`, 'secret');
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    notify(`ADMIN: ARTIFACT_RE-SYNCED: ${updatedProduct.name.toUpperCase()}`, 'secret');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    notify(`ADMIN: ARTIFACT_DECOMMISSIONED`, 'system');
  };

  const handleAddReview = (productId: string, review: Review) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, reviews: [review, ...(p.reviews || [])] };
      }
      return p;
    }));
    notify("FEEDBACK_RECEIVED: NEURAL_LINK_STRENGTHENED", "secret");
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* Loyalty Points Celebration Overlay */}
      {showRewardCelebration && (
        <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="animate-in fade-in zoom-in-50 duration-700 flex flex-col items-center">
             <div className="relative">
                <Trophy size={100} className="text-[var(--neon-tertiary)] drop-shadow-[0_0_20px_var(--neon-tertiary)] animate-bounce" />
                <Sparkles size={40} className="absolute -top-4 -right-4 text-[var(--neon-secondary)] animate-pulse" />
             </div>
             <div className="mt-8 text-center glass p-8 border border-[var(--neon-tertiary)]/50 shadow-[0_0_50px_rgba(204,255,0,0.2)]">
                <h3 className="text-2xl font-header font-black text-white italic uppercase tracking-[0.2em]">Neural_Sync_Reward</h3>
                <p className="text-4xl font-header font-black text-[var(--neon-tertiary)] italic mt-4 drop-shadow-[0_0_15px_var(--neon-tertiary)]">
                   +{auth.user?.loyaltyPoints.toLocaleString() || 0} Z-POINTS
                </p>
                <div className="mt-4 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">LOYALTY_MATRIX_INITIALIZED</div>
             </div>
          </div>
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-1 h-1 bg-[var(--neon-tertiary)] rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `scale(${Math.random() * 2 + 1})`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {isSlashActive && <div className="slash-effect"><div className="slash-line" /></div>}
      {isSmokeActive && <div className="smoke-effect" />}
      {isEmblemActive && (
        <div className="pirate-emblem-overlay">
          <div className="relative">
            <Coins size={300} className="text-[#FFD700]/30 drop-shadow-[0_0_50px_rgba(255,215,0,0.4)]" />
            <div className="absolute inset-0 flex items-center justify-center"><Sparkles size={100} className="text-white animate-pulse" /></div>
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed top-24 right-8 z-[200] px-6 py-4 glass border-l-4 ${notification.type === 'egg' ? 'border-[#00F5FF]' : notification.type === 'secret' ? 'border-[#7B5CFF]' : 'border-[#FF2E88]'} animate-in slide-in-from-right-10 duration-500 shadow-2xl`}>
          <div className="flex items-center gap-4">
            {notification.type === 'egg' ? <Sparkles className="text-[#00F5FF]" /> : notification.type === 'secret' ? <Zap className="text-[#7B5CFF]" /> : <Zap className="text-[#FF2E88]" />}
            <span className="font-header text-[11px] font-black uppercase tracking-[0.2em] italic text-[#EAEAFF]">{notification.message}</span>
          </div>
        </div>
      )}

      <div className={isGlobalGlowActive ? 'global-neon-glow' : ''}>
        <Layout 
          cart={cart} 
          wishlist={wishlist} 
          onUpdateCart={handleUpdateCart}
          onRemoveFromCart={handleRemoveFromCart}
          onToggleWishlist={toggleWishlist}
          isLoggedIn={auth.isLoggedIn}
          role={auth.role}
          onFindEgg={handleFindEgg}
          onLogoSecret={handleLogoSecret}
          currentTheme={theme}
          onThemeChange={setTheme}
        >
          <Routes>
            <Route path="/" element={
              <Home 
                products={products}
                onAddToCart={handleAddToCart} 
                onToggleWishlist={toggleWishlist} 
                wishlist={wishlist} 
                onOpenModal={setSelectedProduct}
                onFindEgg={handleFindEgg}
              />
            } />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register onRegisterSuccess={() => handleLoginSuccess('user')} />} />
            <Route path="/shop" element={
              <Shop 
                products={products}
                onAddToCart={handleAddToCart} 
                onToggleWishlist={toggleWishlist} 
                wishlist={wishlist} 
                onOpenModal={setSelectedProduct}
                onFindEgg={handleFindEgg}
              />
            } />
            <Route path="/product/:id" element={
              <ProductDetail 
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleWishlist={toggleWishlist} 
                wishlist={wishlist}
                onAddReview={handleAddReview}
                currentUser={auth.user}
              />
            } />
            
            <Route path="/wishlist" element={
              <Wishlist 
                products={products}
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onOpenModal={setSelectedProduct}
                onFindEgg={handleFindEgg}
              />
            } />
            
            <Route path="/checkout" element={
              auth.isLoggedIn ? <Checkout cart={cart} onPlaceOrder={handlePlaceOrder} onFindEgg={handleFindEgg} /> : <Navigate to="/login" />
            } />
            <Route path="/orders" element={
              auth.isLoggedIn ? <Orders orders={orders} /> : <Navigate to="/login" />
            } />
            <Route path="/profile" element={
              auth.isLoggedIn ? <Profile profile={auth.user!} orders={orders} onLogout={handleLogout} /> : <Navigate to="/login" />
            } />
            
            <Route path="/admin" element={
              auth.isLoggedIn && auth.role === 'admin' ? (
                <AdminDashboard 
                  products={products} 
                  onAddProduct={handleAddProduct} 
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              ) : <Navigate to="/login" />
            } />

            <Route path="/categories" element={<Categories products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={
              <div className="container mx-auto px-4 py-24 text-center space-y-8">
                <h1 className="text-8xl font-header font-black text-[#FF2E88]">404</h1>
                <p className="text-2xl font-header text-white uppercase italic">This page drifted out of the Zenkira archive.</p>
                <Link to="/" className="inline-block px-12 py-4 bg-[#00F5FF] text-black font-header font-black uppercase italic rounded-sm transition-transform hover:scale-105">Return to Archive</Link>
              </div>
            } />
          </Routes>
        </Layout>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={products.find(p => p.id === selectedProduct.id) || selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onFindEgg={handleFindEgg}
          onAddReview={handleAddReview}
          currentUser={auth.user}
        />
      )}
    </Router>
  );
};

export default App;
