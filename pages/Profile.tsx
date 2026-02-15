import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Shield, LogOut, Package, ArrowRight, Zap, Award, Star } from 'lucide-react';
import { UserProfile, Order } from '../types';

interface ProfileProps {
  profile: UserProfile;
  orders: Order[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, orders, onLogout }) => {
  const navigate = useNavigate();
  
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const currentXP = Math.floor(totalSpent / 10) + profile.loyaltyPoints;
  const nextTierXP = 10000;
  const progressPercent = Math.min(100, (currentXP / nextTierXP) * 100);

  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-10 border border-[var(--neon-primary)]/30 rounded-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)]"></div>
            
            <div className="relative inline-block mb-8">
              <img src={profile.avatar} className="w-32 h-32 mx-auto border-4 border-[var(--neon-primary)] rounded-sm shadow-[0_0_20px_rgba(255,46,136,0.3)]" alt="Avatar" />
              <div className="absolute -bottom-2 -right-2 bg-[var(--neon-tertiary)] p-2 rounded-sm text-black shadow-lg">
                <Star size={16} fill="currentColor" />
              </div>
            </div>
            
            <h2 className="text-3xl font-header font-black text-white italic uppercase mb-2">{profile.name}</h2>
            <p className="text-[var(--neon-secondary)] font-mono text-[10px] uppercase tracking-[0.2em] mb-8">ELITE_ZENKIRA_CITIZEN</p>
            
            {/* Loyalty Points / XP System */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-end">
                <div className="text-left">
                  <p className="text-[9px] font-mono text-[var(--text-muted)] uppercase">WORLD_LOYALTY</p>
                  <p className="text-2xl font-header font-black text-white italic">{currentXP.toLocaleString()} Z-PTS</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-mono text-[var(--text-muted)] uppercase">LOYALTY_RANK</p>
                  <p className="text-sm font-header font-black text-[var(--neon-tertiary)] italic">S-RANK</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-mono text-[var(--text-muted)] uppercase">
                  <span>Ascension to God Rank</span>
                  <span className="text-[var(--neon-secondary)]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--neon-primary)] via-[var(--neon-secondary)] to-[var(--neon-tertiary)] shadow-[0_0_15px_var(--neon-primary)] transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass border border-white/5 rounded-sm overflow-hidden flex flex-col">
            <button onClick={() => navigate('/orders')} className="flex items-center gap-4 p-5 hover:bg-white/5 text-[var(--text-muted)] hover:text-white border-b border-white/5 transition-all text-left group">
              <Package size={18} className="group-hover:text-[var(--neon-secondary)] transition-colors" />
              <span className="font-mono text-xs uppercase tracking-widest">Order Archive</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-4 p-5 hover:bg-red-500/10 text-red-500 transition-all text-left group">
              <LogOut size={18} />
              <span className="font-mono text-xs uppercase tracking-widest">Logout from World</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-header font-black text-white italic uppercase tracking-tighter border-l-4 border-[var(--neon-primary)] pl-6">WORLD <span className="text-[var(--neon-primary)]">IDENTITY</span></h2>
              <div className="flex gap-4">
                 <div className="px-6 py-2 glass border border-[var(--neon-tertiary)]/30 rounded-sm">
                   <p className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Loyalty Status</p>
                   <p className="text-xs font-header font-black text-[var(--neon-tertiary)] uppercase italic">Sync Active</p>
                 </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 border border-white/10 rounded-sm space-y-6">
                <h3 className="text-[var(--neon-secondary)] text-[10px] font-header font-black uppercase italic">Neural_Data</h3>
                <div className="space-y-4 font-mono text-xs uppercase">
                  <p className="text-[var(--text-muted)]">Citizen Alias: <span className="text-white">{profile.name}</span></p>
                  <p className="text-[var(--text-muted)]">Encrypted Comm: <span className="text-white">{profile.email}</span></p>
                  <p className="text-[var(--text-muted)]">Join Rotation: <span className="text-white">{profile.joinDate}</span></p>
                </div>
              </div>
              <div className="glass p-8 border border-white/10 rounded-sm space-y-6">
                <h3 className="text-[var(--neon-primary)] text-[10px] font-header font-black uppercase italic">Power_Scaling</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: 'Purchases', val: orders.length, icon: <Package size={14} /> },
                    { label: 'Z-Points', val: currentXP, icon: <Zap size={14} /> },
                    { label: 'Badges', val: 3, icon: <Award size={14} /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1 p-3 bg-white/5 border border-white/5 rounded-sm min-w-[100px]">
                      <div className="flex items-center gap-2 text-[var(--text-muted)] text-[8px] uppercase">{stat.icon} {stat.label}</div>
                      <div className="text-sm font-header font-black text-white italic">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;