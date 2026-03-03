import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ShieldCheck, ArrowLeft, Package, CheckCircle2, ChevronRight, Banknote, Smartphone, Zap, Shield, Lock, Info, Activity } from 'lucide-react';
import { CartItem, Order } from '../types';
import { EASTER_EGGS } from '../constants';

interface CheckoutProps {
  cart: CartItem[];
  onPlaceOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => void;
  onFindEgg: (id: string, name: string) => void;
  onPlaySound: (type: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder, onFindEgg, onPlaySound }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
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

  const proceedToStep3 = () => {
    setIsVerifying(true);
    onPlaySound('powerup');
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 1500);
  };

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    onPlaySound('success');
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
      <div className="container mx-auto px-4 py-24 text-center space-y-8 w-full">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-[#FF2E88]">
          <Package size={36} />
        </div>
        <h2 className="text-3xl font-anime text-white italic uppercase">No Payload Detected</h2>
        <p className="text-[#9CA3AF] font-mono text-sm px-6">Your cargo bay is empty. Return to the marketplace to gather gear.</p>
        <Link to="/shop" onClick={() => onPlaySound('click')} className="inline-block px-10 py-4 bg-[#FF2E88] text-white font-header font-bold rounded-sm uppercase italic transition-all">Return to Market</Link>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-8 animate-in fade-in zoom-in duration-700 w-full">
        <div className="w-24 h-24 bg-[#00F5FF]/10 rounded-full flex items-center justify-center mx-auto text-[#00F5FF] shadow-[0_0_20px_#00F5FF]/20">
          <CheckCircle2 size={48} className="animate-pulse" />
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl md:text-7xl font-anime text-white italic uppercase">Order Synchronized</h2>
          <p className="text-[#00F5FF] font-mono tracking-widest uppercase text-[10px] md:text-sm px-4">Encryption Successful // Gear is en route to your coordinates.</p>
        </div>
        <div className="max-w-xs md:max-w-md mx-auto h-1 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#00F5FF] animate-[loading_3s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-[#9CA3AF] text-[8px] font-mono uppercase">Syncing order history...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-40 w-full overflow-hidden max-w-7xl pt-10">
      <div className="mb-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-8 border-b border-white/5">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <Link to="/shop" onClick={() => onPlaySound('click')} className="text-[#9CA3AF] hover:text-[#FF2E88] transition-colors p-2 border border-white/5 rounded-sm hover:bg-white/5">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-4xl md:text-6xl font-header font-black text-white italic uppercase tracking-tighter">
                SYNC_<span className="text-[#FF2E88]">LOGOUT</span>_CHECKOUT
              </h1>
           </div>
           <p className="text-[var(--text-muted)] font-mono text-[9px] uppercase tracking-[0.4em] italic pl-1.5">
              Protocol: Final_Acquisition // Mode: Encrypted
           </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 bg-black/40 p-2 md:p-3 border border-white/10 rounded-sm">
           <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-[8px] md:text-[10px] font-header font-black uppercase italic ${step >= 1 ? 'bg-[#FF2E88] text-white shadow-[0_0_10px_#FF2E88]' : 'text-white/20'}`}>01_SHIP</div>
           <div className="w-2 md:w-4 h-px bg-white/10"></div>
           <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-[8px] md:text-[10px] font-header font-black uppercase italic ${step >= 2 ? 'bg-[#00F5FF] text-black shadow-[0_0_10px_#00F5FF]' : 'text-white/20'}`}>02_PAY</div>
           <div className="w-2 md:w-4 h-px bg-white/10"></div>
           <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-[8px] md:text-[10px] font-header font-black uppercase italic ${step >= 3 ? 'bg-[#7B5CFF] text-white shadow-[0_0_10px_#7B5CFF]' : 'text-white/20'}`}>03_SYNC</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        <div className="lg:col-span-8 space-y-8 w-full">
          
          {/* STEP 1: Shipping */}
          <div className={`glass p-6 md:p-10 border-2 ${step === 1 ? 'border-[#FF2E88]' : 'border-white/5'} rounded-sm transition-all w-full relative overflow-hidden`}>
            {step > 1 && <div className="absolute top-4 right-4 text-emerald-500 flex items-center gap-2 font-header font-black text-[10px] uppercase italic animate-in slide-in-from-right-4"><CheckCircle2 size={14}/> Verified</div>}
            
            <div className="flex items-center gap-4 mb-8">
                <span className={`w-10 h-10 flex items-center justify-center rounded-sm font-header text-xl font-black ${step === 1 ? 'bg-[#FF2E88] text-white shadow-[0_0_15px_#FF2E88]' : 'bg-white/5 text-white/20 border border-white/5'}`}>01</span>
                <h2 className="text-xl md:text-2xl font-header font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                  <MapPin size={22} className="text-[#FF2E88]" /> SHIP_COORDINATES
                </h2>
            </div>

            {step === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="space-y-1">
                  <label className="text-[10px] font-header font-black text-[#9CA3AF] uppercase italic tracking-widest">Citizen_Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="ID_HANDLE" className="w-full bg-black/60 border border-white/10 p-4 text-xs text-[#FF2E88] focus:outline-none focus:border-[#FF2E88] font-mono uppercase" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-header font-black text-[#9CA3AF] uppercase italic tracking-widest">Pin_Registry</label>
                  <input name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="000 000" className="w-full bg-black/60 border border-white/10 p-4 text-xs text-[#FF2E88] focus:outline-none focus:border-[#FF2E88] font-mono" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-header font-black text-[#9CA3AF] uppercase italic tracking-widest">Grid_Sector_Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="STREET_DATA_SECTOR" className="w-full bg-black/60 border border-white/10 p-4 text-xs text-[#FF2E88] focus:outline-none focus:border-[#FF2E88] font-mono uppercase" />
                </div>
                <button 
                  onClick={() => { setStep(2); onPlaySound('click'); }}
                  className="md:col-span-2 py-5 bg-[#FF2E88] text-white font-header font-black uppercase italic rounded-sm shadow-[0_0_20px_rgba(255,46,136,0.3)] transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95"
                >
                  INITIALIZE_LOCATION <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <div className="bg-black/40 p-6 border border-white/5 rounded-sm flex items-center justify-between">
                <div className="space-y-1">
                   <p className="text-white font-header font-black uppercase italic text-sm">{formData.fullName || 'Anonymous Operative'}</p>
                   <p className="text-[#9CA3AF] font-mono text-[10px] uppercase tracking-widest italic">{formData.address || 'Void Sector'}, {formData.zip || '000000'}</p>
                </div>
                <button onClick={() => { setStep(1); onPlaySound('shutter'); }} className="text-[9px] font-header font-black text-[#FF2E88] uppercase italic border border-[#FF2E88]/30 px-3 py-1 hover:bg-[#FF2E88] hover:text-white transition-all">RE-CALIBRATE</button>
              </div>
            )}
          </div>

          {/* STEP 2: Payment */}
          <div className={`glass p-6 md:p-10 border-2 ${step === 2 ? 'border-[#00F5FF]' : 'border-white/5'} rounded-sm transition-all w-full relative overflow-hidden`}>
            {step > 2 && <div className="absolute top-4 right-4 text-[#00F5FF] flex items-center gap-2 font-header font-black text-[10px] uppercase italic animate-in slide-in-from-right-4"><Lock size={14}/> Encrypted</div>}
            
            <div className="flex items-center gap-4 mb-8">
                <span className={`w-10 h-10 flex items-center justify-center rounded-sm font-header text-xl font-black ${step === 2 ? 'bg-[#00F5FF] text-black shadow-[0_0_15px_#00F5FF]' : 'bg-white/5 text-white/20 border border-white/5'}`}>02</span>
                <h2 className="text-xl md:text-2xl font-header font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                  <Smartphone size={22} className="text-[#00F5FF]" /> PAYMENT_PROTOCOL
                </h2>
            </div>

            {step === 2 ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button 
                    onClick={() => { setFormData({...formData, paymentMethod: 'card'}); onPlaySound('click'); }}
                    className={`relative p-6 border-2 flex flex-col items-center gap-4 rounded-sm transition-all ${formData.paymentMethod === 'card' ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.2)]' : 'border-white/5 bg-black/40 text-white/40 hover:border-white/20'}`}
                  >
                    <CreditCard size={28} />
                    <span className="font-header text-[10px] uppercase font-black italic tracking-widest">NEURAL_CARD</span>
                    {formData.paymentMethod === 'card' && <div className="absolute top-0 right-0 w-2 h-2 bg-[#00F5FF] animate-pulse"></div>}
                  </button>
                  <button 
                    onClick={() => { setFormData({...formData, paymentMethod: 'upi'}); onPlaySound('click'); }}
                    className={`relative p-6 border-2 flex flex-col items-center gap-4 rounded-sm transition-all ${formData.paymentMethod === 'upi' ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.2)]' : 'border-white/5 bg-black/40 text-white/40 hover:border-white/20'}`}
                  >
                    <Zap size={28} />
                    <span className="font-header text-[10px] uppercase font-black italic tracking-widest">UPI_LINK</span>
                    {formData.paymentMethod === 'upi' && <div className="absolute top-0 right-0 w-2 h-2 bg-[#00F5FF] animate-pulse"></div>}
                  </button>
                  <button 
                    onClick={() => { setFormData({...formData, paymentMethod: 'cod'}); onPlaySound('click'); }}
                    className={`relative p-6 border-2 flex flex-col items-center gap-4 rounded-sm transition-all ${formData.paymentMethod === 'cod' ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.2)]' : 'border-white/5 bg-black/40 text-white/40 hover:border-white/20'}`}
                  >
                    <Banknote size={28} />
                    <span className="font-header text-[10px] uppercase font-black italic tracking-widest">PHYS_CREDIT</span>
                    {formData.paymentMethod === 'cod' && <div className="absolute top-0 right-0 w-2 h-2 bg-[#00F5FF] animate-pulse"></div>}
                  </button>
                </div>

                {/* Sub-Forms for Payment */}
                <div className="p-6 md:p-8 bg-black/60 border border-white/10 rounded-sm space-y-6 relative overflow-hidden">
                   {formData.paymentMethod === 'card' && (
                      <div className="space-y-6 animate-in zoom-in-95 duration-300">
                         <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck size={14} className="text-emerald-500" />
                           <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">Secure_Vault_Protocol_Enabled</span>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-mono text-white/40 uppercase italic">Artifact_Card_Number</label>
                            <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] font-mono tracking-[0.3em] focus:border-[#00F5FF] focus:outline-none" />
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[9px] font-mono text-white/40 uppercase italic">EXP_DATE</label>
                               <input name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] font-mono focus:border-[#00F5FF] focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[9px] font-mono text-white/40 uppercase italic">SEC_CVV</label>
                               <input name="cardCVV" value={formData.cardCVV} onChange={handleInputChange} type="password" placeholder="***" className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] font-mono focus:border-[#00F5FF] focus:outline-none" />
                            </div>
                         </div>
                      </div>
                   )}

                   {formData.paymentMethod === 'upi' && (
                      <div className="space-y-6 animate-in zoom-in-95 duration-300">
                         <div className="flex items-center gap-2 mb-2">
                           <Activity size={14} className="text-[var(--neon-secondary)] animate-pulse" />
                           <span className="text-[8px] font-mono text-[var(--neon-secondary)] uppercase tracking-widest">Neural_Sync_Ready</span>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-mono text-white/40 uppercase italic">Universal_Payment_ID</label>
                            <div className="relative">
                               <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                               <input name="upiId" value={formData.upiId} onChange={handleInputChange} type="text" placeholder="OPERATIVE@BANK" className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-4 text-sm text-[#00F5FF] font-mono focus:border-[#00F5FF] focus:outline-none uppercase" />
                            </div>
                         </div>
                      </div>
                   )}

                   {formData.paymentMethod === 'cod' && (
                      <div className="space-y-6 animate-in zoom-in-95 duration-300 py-4 text-center">
                         <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-[var(--neon-secondary)] mb-4">
                            <Banknote size={32} />
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-lg font-header font-black text-white italic uppercase tracking-tighter">PHYSICAL_CREDIT_MODE</h4>
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-relaxed px-4 md:px-10 italic">Exchange credits with the logistics operative upon physical artifact acquisition at your coordinates.</p>
                         </div>
                      </div>
                   )}
                </div>

                <button 
                  onClick={proceedToStep3}
                  disabled={isVerifying}
                  className="w-full py-5 bg-[#00F5FF] text-black font-header font-black uppercase italic rounded-sm shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>SYNCING_PROTOCOLS... <Activity size={18} className="animate-spin" /></>
                  ) : (
                    <>VERIFY_PAYMENT_CHANNEL <ChevronRight size={18} /></>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-black/40 p-6 border border-white/5 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-sm flex items-center justify-center text-[#00F5FF]">
                      {formData.paymentMethod === 'card' ? <CreditCard size={20}/> : formData.paymentMethod === 'upi' ? <Zap size={20}/> : <Banknote size={20}/>}
                   </div>
                   <div className="space-y-1">
                      <p className="text-white font-header font-black uppercase italic text-[10px] md:text-sm">{formData.paymentMethod === 'card' ? 'NEURAL_CARD_GATEWAY' : formData.paymentMethod === 'upi' ? 'UPI_LINK_PROTOCOL' : 'PHYSICAL_CREDIT_SYNC'}</p>
                      <p className="text-[#9CA3AF] font-mono text-[8px] md:text-[10px] uppercase tracking-widest italic">{formData.paymentMethod === 'card' ? 'CARD_TOKENIZED_ACTIVE' : formData.paymentMethod === 'upi' ? formData.upiId : 'Pay on Delivery'}</p>
                   </div>
                </div>
                <button onClick={() => { setStep(2); onPlaySound('shutter'); }} className="text-[9px] font-header font-black text-[#00F5FF] uppercase italic border border-[#00F5FF]/30 px-3 py-1 hover:bg-[#00F5FF] hover:text-black transition-all">CHANGE</button>
              </div>
            )}
          </div>

          {/* STEP 3: Final Review */}
          <div className={`glass p-6 md:p-10 border-2 ${step === 3 ? 'border-[#7B5CFF]' : 'border-white/5'} rounded-sm transition-all relative overflow-hidden w-full`}>
            <div className="flex items-center gap-4 mb-8">
                <span className={`w-10 h-10 flex items-center justify-center rounded-sm font-header text-xl font-black ${step === 3 ? 'bg-[#7B5CFF] text-white shadow-[0_0_15px_#7B5CFF]' : 'bg-white/5 text-white/20 border border-white/5'}`}>03</span>
                <h2 className="text-xl md:text-2xl font-header font-black text-white italic uppercase flex items-center gap-3 tracking-tighter">
                  <ShieldCheck size={22} className="text-[#7B5CFF]" /> FINAL_SYNC_REVIEW
                </h2>
            </div>

            {step === 3 && (
              <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 w-full">
                <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 md:pr-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                      <div className="flex items-center gap-4 md:gap-6 min-w-0">
                        <div className="relative shrink-0">
                           <img src={item.image} className="w-10 h-12 md:w-12 md:h-16 object-cover border border-white/10 rounded-sm" alt="" />
                           <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-[#7B5CFF] text-[8px] md:text-[10px] font-header font-black text-white italic border-2 border-black rounded-full shadow-lg">{item.quantity}</span>
                        </div>
                        <div className="min-w-0">
                           <span className="font-header font-black text-[10px] md:text-xs text-white uppercase italic tracking-widest block truncate">{item.name}</span>
                           <span className="font-mono text-[8px] md:text-[9px] text-white/30 uppercase tracking-widest">{item.series}</span>
                        </div>
                      </div>
                      <span className="font-header font-black text-xs md:text-sm text-[#00F5FF] italic shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 md:p-8 bg-[var(--neon-primary)]/5 border-2 border-[var(--neon-primary)]/20 rounded-sm space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neon-primary)] text-white flex items-center justify-center rounded-sm shadow-[0_0_15px_var(--neon-primary)] shrink-0">
                         <Shield size={24} />
                      </div>
                      <div>
                         <h4 className="text-sm md:text-lg font-header font-black text-white italic uppercase tracking-tighter leading-none">READY_FOR_DEPLOYMENT</h4>
                         <p className="text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Synchronizing neural nodes for acquisition.</p>
                      </div>
                   </div>
                   
                   <button 
                    onClick={handlePlaceOrder}
                    className="w-full py-5 md:py-6 bg-[#FF2E88] text-white font-header font-black text-lg md:text-xl uppercase italic rounded-sm shadow-[0_0_30px_rgba(255,46,136,0.5)] transition-all flex items-center justify-center gap-3 md:gap-5 hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
                   >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    LOOT_DEPLOY <Package size={24} className="group-hover:translate-y-[-5px] transition-transform"/>
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Order Summary */}
        <div className="lg:col-span-4 sticky top-32 w-full">
          <div className="glass p-6 md:p-10 border-2 border-white/10 rounded-sm space-y-8 w-full relative overflow-hidden group">
            <div className="absolute inset-0 manga-halftone text-white opacity-[0.03] pointer-events-none"></div>
            
            <div className="flex items-center gap-3 pb-6 border-b border-white/5">
               <Package size={20} className="text-[var(--neon-tertiary)]" />
               <h3 className="text-lg md:text-xl font-header font-black text-white uppercase italic tracking-tighter">ORDER_MANIFEST</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-[8px] md:text-[10px] font-header font-black uppercase tracking-widest italic">
                <span className="text-[#9CA3AF]">CARGO_SUBTOTAL</span>
                <span className="text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[8px] md:text-[10px] font-header font-black uppercase tracking-widest italic">
                <span className="text-[#9CA3AF]">WARP_TRANSIT</span>
                <span className="text-[#00F5FF]">{shipping === 0 ? 'FREE_LOGISTICS' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              
              <div className="pt-6 md:pt-8 mt-4 border-t-2 border-white/10 flex flex-col items-end gap-1">
                <span className="text-[8px] md:text-[10px] font-header font-black text-[#FF2E88] uppercase italic tracking-[0.3em] leading-none">TOTAL_VALUATION</span>
                <span className="text-3xl md:text-5xl font-header font-black text-[#00F5FF] italic drop-shadow-[0_0_15px_#00F5FF]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
               <div className="p-3 md:p-4 bg-white/5 border border-white/5 rounded-sm flex items-center gap-3 md:gap-4">
                  <div className="p-1.5 md:p-2 bg-emerald-500/20 text-emerald-500 rounded-sm shrink-0">
                     <ShieldCheck size={16} />
                  </div>
                  <p className="text-[7px] md:text-[9px] font-mono text-white/40 uppercase leading-relaxed tracking-wider">Secure Transmission Active // 256-bit AES Encryption.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;