
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ShieldCheck, ArrowLeft, Package, CheckCircle2, ChevronRight, Banknote, Smartphone } from 'lucide-react';
import { CartItem, Order } from '../types';
// Removed .tsx extension for standard TS module resolution
import { EASTER_EGGS } from '../constants';

interface CheckoutProps {
  cart: CartItem[];
  onPlaceOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => void;
  onFindEgg: (id: string, name: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder, onFindEgg }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 250;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    onPlaceOrder({
      items: cart,
      total: total,
      paymentMethod: formData.paymentMethod.toUpperCase()
    });
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-[#FF2E88]">
          <Package size={48} />
        </div>
        <h2 className="text-4xl font-accent text-white italic uppercase">No Payload Detected</h2>
        <p className="text-[#9CA3AF] font-mono">Your cargo bay is empty. Return to the marketplace to gather gear.</p>
        <Link to="/shop" className="inline-block px-12 py-4 bg-[#FF2E88] text-white font-accent font-bold rounded-sm uppercase italic hover:scale-[1.03] active:scale-[0.97] transition-all">Return to Market</Link>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="w-32 h-32 bg-[#00F5FF]/10 rounded-full flex items-center justify-center mx-auto text-[#00F5FF] shadow-[0_0_30px_#00F5FF]/30">
          <CheckCircle2 size={80} className="animate-pulse" />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-accent text-white italic uppercase">Order Synchronized</h2>
          <p className="text-[#00F5FF] font-mono tracking-widest uppercase">Encryption Successful // Gear is en route to your coordinates.</p>
        </div>
        <div className="max-w-md mx-auto h-1 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#00F5FF] animate-[loading_3s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-[#9CA3AF] text-xs font-mono uppercase">Syncing order history...</p>
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="mb-12 flex items-center gap-4">
        <Link to="/shop" className="text-[#9CA3AF] hover:text-[#FF2E88] transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-4xl md:text-6xl font-header font-black text-white italic uppercase tracking-tighter">Sync <span className="text-[#FF2E88]">Checkout</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-8">
          
          <div className={`glass p-8 border ${step === 1 ? 'border-[#FF2E88]' : 'border-white/5'} rounded-sm transition-all`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 flex items-center justify-center rounded-sm font-header text-xl ${step === 1 ? 'bg-[#FF2E88] text-white shadow-[0_0_15px_#FF2E88]' : 'bg-white/10 text-white'}`}>1</span>
                <h2 className="text-2xl font-header font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                  <MapPin size={24} className="text-[#FF2E88]" /> Shipping_Coords
                </h2>
              </div>
            </div>

            {step === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">Full_Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="RECIPIENT_IDENTIFIER" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">Pin_Code</label>
                  <input name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="XXXXXX" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">Grid_Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="STREET_LOCATION" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">City_Sector</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="NEO_REGION" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono" />
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="md:col-span-2 py-4 bg-[#FF2E88] text-white font-header font-black uppercase italic rounded-sm shadow-[0_0_15px_#FF2E88]/40 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  Confirm Address <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <p className="text-[#9CA3AF] font-mono text-sm pl-14 italic">
                {formData.fullName || 'User'} // {formData.address || 'Void'}, {formData.city || 'Sector'} {formData.zip || '000'}
              </p>
            )}
          </div>

          <div className={`glass p-8 border ${step === 2 ? 'border-[#00F5FF]' : 'border-white/5'} rounded-sm transition-all`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 flex items-center justify-center rounded-sm font-header text-xl ${step === 2 ? 'bg-[#00F5FF] text-black shadow-[0_0_15px_#00F5FF]' : 'bg-white/10 text-white'}`}>2</span>
                <h2 className="text-2xl font-header font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                  <Smartphone size={24} className="text-[#00F5FF]" /> Payment_Method
                </h2>
              </div>
            </div>

            {step === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                    className={`p-6 border flex flex-col items-center gap-4 rounded-sm transition-all hover:scale-105 active:scale-95 ${formData.paymentMethod === 'card' ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-[#00F5FF]' : 'border-white/10 text-[#9CA3AF] hover:border-white/20'}`}
                  >
                    <CreditCard size={32} />
                    <span className="font-mono text-[10px] uppercase font-bold">Credit/Debit Card</span>
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, paymentMethod: 'upi'})}
                    className={`p-6 border flex flex-col items-center gap-4 rounded-sm transition-all hover:scale-105 active:scale-95 ${formData.paymentMethod === 'upi' ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-[#00F5FF]' : 'border-white/10 text-[#9CA3AF] hover:border-white/20'}`}
                  >
                    <Smartphone size={32} />
                    <span className="font-mono text-[10px] uppercase font-bold">UPI / PhonePe</span>
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                    className={`p-6 border flex flex-col items-center gap-4 rounded-sm transition-all hover:scale-105 active:scale-95 ${formData.paymentMethod === 'cod' ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-[#00F5FF]' : 'border-white/10 text-[#9CA3AF] hover:border-white/20'}`}
                  >
                    <Banknote size={32} />
                    <span className="font-mono text-[10px] uppercase font-bold">Cash On Delivery</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5 animate-in fade-in duration-300">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">Card_Number</label>
                      <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#00F5FF] font-mono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">Exp_Date</label>
                      <input name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#00F5FF] font-mono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#9CA3AF] uppercase">CVV_Code</label>
                      <input name="cardCVV" value={formData.cardCVV} onChange={handleInputChange} type="text" placeholder="XXX" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#00F5FF] font-mono" />
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-4 bg-[#00F5FF] text-black font-header font-black uppercase italic rounded-sm shadow-[0_0_15px_#00F5FF]/40 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  Verify Payment <ChevronRight size={18} />
                </button>
              </div>
            )}
            {step > 2 && (
              <p className="text-[#9CA3AF] font-mono text-sm pl-14 italic uppercase">
                {formData.paymentMethod.toUpperCase()} // READY
              </p>
            )}
          </div>

          <div className={`glass p-8 border ${step === 3 ? 'border-[#7B5CFF]' : 'border-white/5'} rounded-sm transition-all relative overflow-hidden`}>
            {/* EASTER EGG: Wings of Freedom hidden in Review Section background */}
            <button 
              onClick={() => onFindEgg(EASTER_EGGS.SURVEY_WINGS.id, EASTER_EGGS.SURVEY_WINGS.name)}
              className="absolute -right-4 top-4 opacity-5 hover:opacity-100 transition-opacity transform -rotate-12 hover:scale-125"
            >
               <svg viewBox="0 0 100 100" className="w-24 h-24 fill-[#7B5CFF]">
                  <path d="M50 20 L60 40 L80 45 L65 60 L70 80 L50 70 L30 80 L35 60 L20 45 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M40 30 C30 40 30 70 50 80 C70 70 70 40 60 30" fill="none" stroke="currentColor" strokeWidth="2" />
               </svg>
            </button>

            <div className="flex items-center gap-4 mb-8">
              <span className={`w-10 h-10 flex items-center justify-center rounded-sm font-header text-xl ${step === 3 ? 'bg-[#7B5CFF] text-white shadow-[0_0_15px_#7B5CFF]' : 'bg-white/10 text-white'}`}>3</span>
              <h2 className="text-2xl font-header font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                <ShieldCheck size={24} className="text-[#7B5CFF]" /> Review_Protocol
              </h2>
            </div>

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="w-6 h-6 flex items-center justify-center bg-white/10 text-[10px] font-mono text-white rounded-full">{item.quantity}x</span>
                        <span className="font-mono text-sm text-white uppercase">{item.name}</span>
                      </div>
                      <span className="font-mono text-sm text-[#00F5FF]">₹{ (item.price * item.quantity).toLocaleString() }</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full py-6 bg-[#FF2E88] text-white font-header font-black text-xl uppercase italic rounded-sm shadow-[0_0_30px_#FF2E88]/50 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-4"
                >
                  <Package size={24} /> PLACE SECURE ORDER
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-32">
          <div className="glass p-8 border border-white/10 rounded-sm space-y-8">
            <h3 className="text-xl font-header font-black text-white uppercase italic tracking-tighter">Order_Manifest</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#9CA3AF] font-mono uppercase">Cargo_Subtotal</span>
                <span className="text-white font-mono">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#9CA3AF] font-mono uppercase">Warp_Shipping</span>
                <span className="text-[#00F5FF] font-mono">{shipping === 0 ? 'FREE_CLASS' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <span className="text-xs font-header font-black text-[#FF2E88] uppercase italic leading-none">Final_Total</span>
                <span className="text-4xl font-header font-black text-[#00F5FF] italic shadow-[0_0_10px_#00F5FF]/10">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
