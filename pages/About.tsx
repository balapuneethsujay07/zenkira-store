
import React from 'react';
import { SAMPLE_VIDEOS, Logo } from '../constants';
import { History, Target, Users, Globe, Zap, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-40 space-y-40">
      {/* Hero Header */}
      <section className="container mx-auto px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-block px-4 py-1 bg-[var(--neon-secondary)]/10 border border-[var(--neon-secondary)]/30 rounded-full">
            <p className="text-[10px] font-header font-black text-[var(--neon-secondary)] uppercase tracking-[0.4em]">ORIGIN_STORY_001</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-header font-black text-white italic tracking-tighter uppercase leading-none">
            ZENKIRA <span className="text-[var(--neon-primary)]">MANIFEST</span>
          </h1>
          <p className="text-[#888888] text-xl md:text-2xl font-header font-black italic uppercase tracking-widest leading-relaxed">
            Born from the neon streets of Akihabara. Dedicated to the preservation of elite artifact quality.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="aspect-video relative rounded-sm overflow-hidden border-2 border-white/5 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]">
             <video autoPlay muted loop className="w-full h-full object-cover opacity-60">
                <source src={SAMPLE_VIDEOS[1]} type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute bottom-8 left-8">
               <p className="font-header font-black text-white italic uppercase tracking-[0.3em]">Grid_Sector: Headquarters</p>
             </div>
           </div>
           <div className="space-y-8">
             <h2 className="text-4xl font-header font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
               <Zap className="text-[var(--neon-tertiary)]" /> OUR_PURPOSE
             </h2>
             <div className="space-y-6 text-[#9CA3AF] font-mono text-sm leading-relaxed uppercase tracking-wider italic border-l-4 border-[var(--neon-primary)] pl-10">
               <p>Zenkira started in 2020 as a high-encryption community project by elite collectors. We found the standard marketplace to be cluttered with artifacts of questionable neural quality.</p>
               <p>Today, we are a leading global gateway for 100% authentic licensed products. Every shipment is a tribute to the creators who bring these stories to life in our world.</p>
             </div>
           </div>
        </div>
      </section>

      {/* Core Protocols */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <History className="text-[var(--neon-primary)]" />, title: 'FOUNDED_2020', desc: 'Initialized in a small high-tech hub in Tokyo.' },
            { icon: <Target className="text-[var(--neon-secondary)]" />, title: 'AUTH_PROTOCOL', desc: '100% official licensed artifact validation.' },
            { icon: <Users className="text-[var(--neon-tertiary)]" />, title: 'GLOBAL_CELL', desc: '500k+ active operatives across the global grid.' },
            { icon: <Globe className="text-white" />, title: 'SECTOR_EXP', desc: 'Secure delivery to over 120 global sectors.' },
          ].map((item, i) => (
            <div key={i} className="p-10 glass border border-white/5 rounded-sm space-y-6 group hover:border-[var(--neon-primary)] transition-all duration-500 hover:-translate-y-2">
              <div className="p-4 bg-white/5 rounded-sm w-fit transition-all duration-500 group-hover:bg-[var(--neon-primary)] group-hover:text-white group-hover:shadow-[0_0_20px_var(--neon-primary)]">{item.icon}</div>
              <h3 className="font-header font-black text-white text-lg italic uppercase tracking-widest">{item.title}</h3>
              <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Message */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-black to-[var(--bg-dark)] border-2 border-white/5 p-16 md:p-24 rounded-sm relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <Logo size="lg" />
          </div>
          <div className="max-w-3xl mx-auto space-y-12 relative z-10">
            <h2 className="text-5xl md:text-7xl font-header font-black text-white italic tracking-tighter uppercase">JOIN_THE_ELITE</h2>
            <p className="text-[#9CA3AF] font-mono text-sm leading-relaxed uppercase tracking-widest">Whether you are a veteran operative or a new initiate, Zenkira provides the gear necessary for your legend.</p>
            <div className="pt-10 flex flex-col items-center gap-4">
              <div className="w-20 h-1 bg-[var(--neon-primary)]"></div>
              <p className="text-[var(--neon-secondary)] font-header font-black text-xl italic uppercase tracking-[0.4em]">TEAM_ZENKIRA</p>
              <p className="text-[var(--text-muted)] font-mono text-[10px] uppercase">Established by fans, for fans.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
