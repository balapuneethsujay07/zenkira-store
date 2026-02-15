
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isInitializing, setIsInitializing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    setTimeout(() => {
      setSuccess(true);
      onRegisterSuccess();
      setTimeout(() => navigate('/profile'), 1500);
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md relative">
        <div className="glass p-10 border-2 border-white/10 rounded-sm relative overflow-hidden group">
          <div className="text-center space-y-4 mb-10">
            <h1 className="text-4xl font-header font-black text-white italic tracking-tighter uppercase">
              ZENKIRA <span className="text-[#FF2E88]">WORLD</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
               <div className="h-px w-8 bg-white/20"></div>
               <p className="text-[var(--text-muted)] font-mono text-[9px] tracking-[0.4em] uppercase">Identity_Initialization</p>
               <div className="h-px w-8 bg-white/20"></div>
            </div>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Identity_Handle</label>
                  <input 
                    type="text" 
                    required
                    placeholder="USERNAME"
                    className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono uppercase transition-all placeholder:opacity-30" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Comm_Link</label>
                  <input 
                    type="email" 
                    required
                    placeholder="EMAIL"
                    className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono uppercase transition-all placeholder:opacity-30" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-header font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Access_Shield</label>
                  <input 
                    type="password" 
                    required
                    placeholder="ZENKEY"
                    className="w-full bg-black/40 border border-white/10 p-4 text-sm text-[#00F5FF] focus:outline-none focus:border-[#FF2E88] font-mono transition-all placeholder:opacity-30" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isInitializing}
                className="w-full py-5 bg-[#00F5FF] text-black font-header font-bold uppercase italic rounded-sm transition-all flex items-center justify-center gap-3 group relative overflow-hidden shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_35px_rgba(0,245,255,0.7)] active:shadow-[0_0_10px_rgba(0,245,255,0.4)] hover:scale-[1.02] active:scale-95"
              >
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                 {isInitializing ? 'CALIBRATING...' : 'ESTABLISH LINK'}
                 {!isInitializing && <ShieldCheck size={18} className="group-hover:rotate-12 transition-transform" />}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <CheckCircle className="w-16 h-16 text-[#00F5FF] mx-auto mb-4 animate-bounce shadow-[0_0_30px_rgba(0,245,255,0.4)]" />
              <p className="font-header font-black text-white uppercase italic tracking-widest">LINK_ESTABLISHED</p>
              <p className="text-[9px] font-mono text-[var(--text-muted)] mt-2">Diverging to profile cores...</p>
            </div>
          )}

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <Link to="/login" className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest hover:text-white transition-colors group">
              <span className="group-hover:text-[#FF2E88]">SYNC_EXISTING?</span> RETURN_TO_LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
