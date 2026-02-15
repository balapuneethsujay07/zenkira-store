
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, ShieldAlert } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pb-40 pt-20">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="text-center space-y-8">
           <div className="inline-block px-4 py-1 bg-[var(--neon-tertiary)]/10 border border-[var(--neon-tertiary)]/30 rounded-full">
            <p className="text-[10px] font-header font-black text-[var(--neon-tertiary)] uppercase tracking-[0.4em]">COMMUNICATION_LINK_04</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-header font-black text-white italic tracking-tighter uppercase leading-none">
            ESTABLISH <span className="text-[var(--neon-primary)]">LINK</span>
          </h1>
          <p className="text-[#888888] max-w-2xl mx-auto font-header font-black text-lg uppercase tracking-widest italic">Questions regarding artifact status or delivery? Reach out on these frequencies.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-header font-black text-white italic uppercase tracking-widest border-l-4 border-[var(--neon-secondary)] pl-6">SYNC_INFO</h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="p-4 bg-white/5 rounded-sm text-[var(--neon-secondary)] h-fit transition-all duration-300 group-hover:bg-[var(--neon-secondary)] group-hover:text-black">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-header font-black text-white uppercase tracking-widest text-sm mb-2 italic">HQ_Coordinates</h4>
                    <p className="text-[#9CA3AF] font-mono text-xs uppercase tracking-widest leading-relaxed italic">Akihabara Square, Chiyoda City<br />Tokyo, 101-0021 Japan</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="p-4 bg-white/5 rounded-sm text-[var(--neon-primary)] h-fit transition-all duration-300 group-hover:bg-[var(--neon-primary)] group-hover:text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-header font-black text-white uppercase tracking-widest text-sm mb-2 italic">Neural_Mail</h4>
                    <p className="text-[#9CA3AF] font-mono text-xs uppercase tracking-widest italic">support@zenkira.net<br />admin@zenkira.net</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="p-4 bg-white/5 rounded-sm text-[var(--neon-tertiary)] h-fit transition-all duration-300 group-hover:bg-[var(--neon-tertiary)] group-hover:text-black">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-header font-black text-white uppercase tracking-widest text-sm mb-2 italic">Comm_Channel</h4>
                    <p className="text-[#9CA3AF] font-mono text-xs uppercase tracking-widest italic">+81 (0)3 9876 5432<br />Mon - Fri: 09:00 - 18:00 JST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-[var(--neon-primary)]/10 border-l-8 border-[var(--neon-primary)] rounded-sm space-y-6">
              <MessageCircle size={36} className="text-[var(--neon-primary)]" />
              <h3 className="text-xl font-header font-black text-white italic uppercase tracking-tighter">LIVE_BURST</h3>
              <p className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider italic leading-relaxed">Need instant artifact verification? Connect with an operative right now via encrypted chat.</p>
              <button className="w-full py-4 bg-[var(--neon-primary)] text-white font-header font-black italic uppercase tracking-widest text-xs rounded-sm transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_var(--neon-primary)]">INIT_CHAT</button>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <form className="glass border border-white/10 p-10 md:p-16 rounded-sm space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-[0.4em] ml-1">Identity_Handle</label>
                  <input 
                    type="text" 
                    placeholder="E.G. TANJIRO_99" 
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-5 text-xs text-white font-mono focus:outline-none focus:border-[var(--neon-secondary)] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-[0.4em] ml-1">Comm_Address</label>
                  <input 
                    type="email" 
                    placeholder="OPERATIVE@GRID.COM" 
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-5 text-xs text-white font-mono focus:outline-none focus:border-[var(--neon-secondary)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-[0.4em] ml-1">Subject_Priority</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-5 text-xs text-[#9CA3AF] font-mono focus:outline-none focus:border-[var(--neon-secondary)] transition-all appearance-none">
                  <option>GENERAL_INQUIRY</option>
                  <option>ARTIFACT_STATUS</option>
                  <option>SYNC_ERROR</option>
                  <option>PARTNERSHIP_DOMAIN</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-[0.4em] ml-1">Manifest_Content</label>
                <textarea 
                  rows={6}
                  placeholder="TRANSMIT YOUR MESSAGE..." 
                  className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-6 text-xs text-white font-mono focus:outline-none focus:border-[var(--neon-secondary)] transition-all resize-none"
                ></textarea>
              </div>

              <button className="w-full py-6 bg-[var(--neon-secondary)] text-black font-header font-black text-lg uppercase italic flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
                SEND_TRANSMISSION <Send size={22} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
