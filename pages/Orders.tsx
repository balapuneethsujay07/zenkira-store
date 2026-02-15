
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, ExternalLink, ShieldCheck, Truck } from 'lucide-react';
import { Order } from '../types';

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="mb-12 space-y-6">
        <h1 className="text-4xl md:text-7xl font-accent text-white italic tracking-tighter uppercase">Order <span className="text-[#00F5FF]">History</span></h1>
        <p className="text-[#9CA3AF] font-mono text-sm uppercase tracking-widest">Tracking your elite gear acquisitions across the grid.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 glass border border-white/5 rounded-sm space-y-8">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-700">
            <Package size={48} />
          </div>
          <h2 className="text-2xl font-accent text-white italic uppercase">Archive_Empty</h2>
          <p className="text-slate-500 font-mono text-sm uppercase">No previous payloads detected in your neural history.</p>
          <Link to="/shop" className="inline-block px-12 py-4 bg-[#FF2E88] text-white font-accent font-bold rounded-sm uppercase italic shadow-[0_0_20px_#FF2E88]/30">Explore Shop</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="glass border border-white/10 rounded-sm overflow-hidden group">
              <div className="bg-white/5 p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-6">
                <div className="flex gap-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-[#9CA3AF] uppercase">ORDER_ID</p>
                    <p className="text-sm font-mono text-[#00F5FF]">{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-[#9CA3AF] uppercase">SYNC_DATE</p>
                    <p className="text-sm font-mono text-white">{order.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-[#9CA3AF] uppercase">TOTAL_VAL</p>
                    <p className="text-sm font-mono text-white font-bold">₹{order.total.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-[#9CA3AF] uppercase">GATEWAY</p>
                    <p className="text-sm font-mono text-[#7B5CFF] uppercase">{order.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className={`px-4 py-1.5 rounded-sm text-[10px] font-accent font-bold uppercase tracking-widest border ${
                     order.status === 'Processing' ? 'bg-[#7B5CFF]/10 text-[#7B5CFF] border-[#7B5CFF]/30' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                   }`}>
                     {order.status}
                   </div>
                   <button className="p-2 border border-white/10 text-white hover:text-[#00F5FF] hover:border-[#00F5FF] transition-all">
                      <ExternalLink size={18} />
                   </button>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <img src={item.image} className="w-16 h-16 object-cover border border-white/5 rounded-sm" />
                      <div>
                        <h4 className="font-accent text-white uppercase text-sm">{item.name}</h4>
                        <p className="text-[10px] font-mono text-[#9CA3AF] uppercase">{item.series} // Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-white">₹{ (item.price * item.quantity).toLocaleString() }</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-black/40 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-mono uppercase">
                    <ShieldCheck size={14} /> Tracking: {order.trackingNumber}
                  </div>
                  <p className="text-[9px] font-mono text-[#9CA3AF] uppercase opacity-60 ml-5">Logistic Hub: AV-CORE-SECTOR-7</p>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={`https://www.track-trace.com/post?track=${order.trackingNumber}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-accent text-[#00F5FF] hover:text-white border border-[#00F5FF]/30 hover:border-[#00F5FF] px-4 py-2 rounded-sm flex items-center gap-2 uppercase italic transition-all shadow-[0_0_10px_rgba(0,245,255,0.1)] hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                  >
                    <Truck size={14} /> Track Package
                  </a>
                  <button className="text-xs font-accent text-white hover:text-[#FF2E88] flex items-center gap-2 uppercase italic transition-colors">
                    View Invoice <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
