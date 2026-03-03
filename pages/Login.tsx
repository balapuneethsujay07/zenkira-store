import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, RefreshCw, Activity, User, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLoginSuccess: (role: UserRole) => void;
  onPlaySound: (type: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onPlaySound }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [scanStatus, setScanStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('FIELD_EMPTY: ENTER_IDENTIFIER');
      onPlaySound('glitch');
      return;
    }

    if (role === 'admin') {
      if (formData.email !== 'ZENKIRA' || formData.password !== '1234') {
        setError('ACCESS_DENIED: INVALID_MASTER_ID');
        onPlaySound('glitch');
        return;
      }
    }

    setIsConnecting(true);
    onPlaySound('powerup');
    setScanStatus(role === 'admin' ? 'AWAKENING_OVERLORD_DOMAIN...' : 'SYNCHRONIZING_PROTAGONIST_SOUL...');

    setTimeout(() => setScanStatus(role === 'admin' ? 'BYPASSING_WORLD_LIMITS...' : 'RELEASING_HIDDEN_POTENTIAL...'), 600);
    setTimeout(() => setScanStatus(`${role.toUpperCase()}_SIGNATURE_RECOGNIZED`), 1200);
    setTimeout(() => setScanStatus('NEURAL_LINK_ESTABLISHED'), 1800);

    setTimeout(() => {
      onLoginSuccess(role);
      navigate(role === 'admin' ? '/admin' : '/profile');
    }, 3000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative w-full overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] ${role === 'admin' ? 'bg-[var(--haki-purple)]/10' : 'bg-[var(--chakra-blue)]/10'} blur-[80px] md:blur-[120px] rounded-full pointer-events-none transition-colors duration-500`}></div>
      
      <div className="w-full max-w-md relative z-10">
        {isConnecting && (
          <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-30"></div>
            
            <div className="relative z-30 flex flex-col items-center space-y-8 md:space-y-10 max-w-full text-center">
              <div className="relative">
                <div className={`w-24 h-24 md:w-32 md:h-32 border-4 border-dashed rounded-full animate-[spin_4s_linear_infinite] ${role === 'admin' ? 'border-[var(--haki-purple)]' : 'border-[var(--chakra-blue)]'}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <RefreshCw size={32} className={`animate-spin-slow ${role === 'admin' ? 'text-[var(--haki-purple)]' : 'text-[var(--chakra-blue)]'}`} />
                </div>
                <div className={`absolute -top-1 left-1/2 w-2 h-2 rounded-full animate-ping ${role === 'admin' ? 'bg-[var(--haki-purple)]' : 'bg-[var(--chakra-blue)]'}`}></div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 text-white">
                    <Activity size={16} className={`${role === 'admin' ? 'text-[var(--haki-purple)]' : 'text-[var(--chakra-blue)]'} animate-pulse`} />
                    <p className="font-header font-black uppercase italic tracking-[0.2em] md:tracking-[0.4em] text-sm md:text-lg px-4">
                      {scanStatus}
                    </p>
                  </div>
                </div>
                
                <div className="h-1.5 w-64 md:w-72 bg-white/10 rounded-full overflow-hidden border border-white/5 p-0.5 mx-auto">
                  <div className={`h-full animate-[loading_3s_ease-in-out_infinite] ${role === 'admin' ? 'bg-[var(--haki-purple)]' : 'bg-[var(--chakra-blue)]'}`}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`glass p-6 md:p-10 border-2 ${role === 'admin' ? 'border-[var(--haki-purple)]/40 shadow-[0_0_20px_rgba(75,0,130,0.1)]' : 'border-[var(--chakra-blue)]/40 shadow-[0_0_20px_rgba(0,163,255,0.1)]'} rounded-sm relative overflow-hidden group transition-all duration-500 w-full`}>
          
          <div className="flex bg-black/60 p-1 rounded-sm mb-8 md:mb-10 border border-white/5">
            <button 
              onClick={() => { setRole('user'); onPlaySound('click'); }}
              className={`flex-grow py-2.5 flex flex-col items-center justify-center transition-all ${role === 'user' ? 'bg-[var(--chakra-blue)] text-white shadow-[0_0_10px_var(--chakra-blue)]' : 'text-[var(--text-muted)]'}`}
            >
              <User size={14} />
              <span className="text-[10px] font-header font-black uppercase italic mt-1">USER</span>
            </button>
            <button 
              onClick={() => { setRole('admin'); onPlaySound('click'); }}
              className={`flex-grow py-2.5 flex flex-col items-center justify-center transition-all ${role === 'admin' ? 'bg-[var(--haki-purple)] text-white shadow-[0_0_10px_var(--haki-purple)]' : 'text-[var(--text-muted)]'}`}
            >
              <ShieldCheck size={14} />
              <span className="text-[10px] font-header font-black uppercase italic mt-1">ADMIN</span>
            </button>
          </div>

          <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-header font-black text-white italic tracking-tighter uppercase">
              ZENKIRA <span className={role === 'admin' ? 'text-[var(--haki-purple)]' : 'text-[var(--chakra-blue)]'}>{role === 'admin' ? 'ZENITH' : 'ORIGIN'}</span>
            </h1>
            <p className="text-[var(--text-muted)] font-mono text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.5em] uppercase">
              {role === 'admin' ? 'ARCHIVE_MASTER_LOGIN' : 'IDENTITY_SYNC_ESTABLISHED'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <input 
                type="text" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder={role === 'admin' ? "ZENKIRA" : "HERO_NAME"}
                className="w-full bg-black/40 border border-white/10 p-3 md:p-4 text-xs md:text-sm text-white focus:outline-none focus:border-white/30 font-mono uppercase transition-all" 
              />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••"
                className="w-full bg-black/40 border border-white/10 p-3 md:p-4 text-xs md:text-sm text-white focus:outline-none focus:border-white/30 font-mono transition-all" 
              />
            </div>

            {error && <p className="text-red-500 text-[9px] font-mono uppercase text-center animate-pulse">{error}</p>}

            <button 
              type="submit"
              className="w-full py-4 md:py-5 bg-[#FF2E88] text-white font-header font-bold uppercase italic rounded-sm transition-all flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_15px_rgba(255,46,136,0.2)]"
            >
               <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
               {role === 'admin' ? 'CLAIM THE THRONE' : 'START YOUR LEGEND'}
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 md:mt-8 text-center">
            <Link to="/register" onClick={() => onPlaySound('click')} className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest hover:text-white transition-colors">
              CREATE_AVATAR_NODE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;