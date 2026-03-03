import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { 
  Plus, 
  Database, 
  Image as ImageIcon, 
  Zap, 
  Layers, 
  Trash2, 
  Edit3, 
  X, 
  RefreshCw, 
  Search, 
  Video, 
  Settings, 
  Link as LinkIcon, 
  FileVideo, 
  Tag, 
  Hammer, 
  Ruler, 
  Weight, 
  Globe, 
  AlertCircle,
  ShieldAlert,
  TrendingDown,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  logoVideo: string;
  onUpdateLogoVideo: (url: string) => void;
  isAudioOn: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, onAddProduct, onUpdateProduct, onDeleteProduct, logoVideo, onUpdateLogoVideo, isAudioOn
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [logoSourceMode, setLogoSourceMode] = useState<'url' | 'file'>('url');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    series: '',
    category: 'Figures',
    price: 0,
    originalPrice: 0,
    description: '',
    image: '',
    image2: '',
    videoUrl: '',
    videoUrl2: '',
    stock: 0,
    specs: {
      material: '',
      dimensions: '',
      weight: '',
      origin: '',
      rarity: 'Common'
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      series: '',
      category: 'Figures',
      price: 0,
      originalPrice: 0,
      description: '',
      image: '',
      image2: '',
      videoUrl: '',
      videoUrl2: '',
      stock: 0,
      specs: {
        material: '',
        dimensions: '',
        weight: '',
        origin: '',
        rarity: 'Common'
      }
    });
    setEditingId(null);
  };

  const handleEdit = (p: Product) => {
    setFormData({ 
      ...p,
      specs: {
        material: p.specs?.material || '',
        dimensions: p.specs?.dimensions || '',
        weight: p.specs?.weight || '',
        origin: p.specs?.origin || '',
        rarity: p.specs?.rarity || 'Common'
      }
    });
    setEditingId(p.id);
    setIsFormOpen(true);
  };

  const handleSpecChange = (field: keyof NonNullable<Product['specs']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalProduct: Product = {
      ...formData,
      id: editingId || `ZK-UNIT-${Date.now()}`,
      price: Number(formData.price) || 0,
      originalPrice: Number(formData.originalPrice) || 0,
      stock: Math.max(0, parseInt(String(formData.stock)) || 0),
      isFeatured: products.find(p => p.id === editingId)?.isFeatured ?? true,
    } as Product;

    if (editingId) {
      onUpdateProduct(finalProduct);
    } else {
      onAddProduct(finalProduct);
    }
    
    resetForm();
    setIsFormOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.series.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pb-40 space-y-10 pt-6 max-w-[1600px]">
      {/* Tactical Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-8 border-b border-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black rounded-sm shadow-[4px_4px_0_var(--neon-primary)]">ZK</div>
             <h1 className="text-4xl font-header font-black text-white italic uppercase tracking-tighter">
               CORE_<span className="text-[var(--neon-tertiary)]">ARCHIVE</span>
             </h1>
          </div>
          <p className="text-[var(--text-muted)] font-mono text-[9px] uppercase tracking-[0.4em] italic pl-1.5">
            Registry_Sector: 001 // Auth_State: Root
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
           <div className="relative flex-grow sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text"
                placeholder="SCAN_ARTIFACT_DATABASE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 pl-11 pr-4 py-4 text-[10px] text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase"
              />
           </div>
           {!isFormOpen && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 bg-[var(--neon-tertiary)] text-black font-header font-black uppercase italic rounded-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:scale-105 transition-transform"
              >
                <Plus size={16} /> INITIALIZE_UNIT
              </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Pane: Registry Table */}
        <div className={`${isFormOpen ? 'xl:col-span-7' : 'xl:col-span-12'} space-y-6 transition-all duration-500`}>
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <ClipboardList size={18} className="text-[var(--neon-secondary)]" />
                 <h2 className="text-xl font-header font-black text-white italic uppercase tracking-widest">TACTICAL_REGISTRY</h2>
              </div>
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{filteredProducts.length} UNITS_SYNCED</span>
           </div>

           <div className="bg-black/60 border border-white/10 rounded-sm overflow-x-auto custom-scrollbar">
             <table className="w-full text-left border-collapse min-w-[900px]">
               <thead>
                 <tr className="bg-white/5 text-[9px] font-header font-black text-white/40 uppercase tracking-[0.2em] italic border-b border-white/10">
                   <th className="px-6 py-5">#</th>
                   <th className="px-6 py-5">UNIT_IDENTITY</th>
                   <th className="px-6 py-5">SERIES</th>
                   <th className="px-6 py-5">VALUATION</th>
                   <th className="px-6 py-5">STOCK</th>
                   <th className="px-6 py-5">ASSETS</th>
                   <th className="px-6 py-5 text-right">OPS</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredProducts.map((p, idx) => (
                   <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                     <td className="px-6 py-5 font-mono text-[10px] text-white/20">{String(idx + 1).padStart(2, '0')}</td>
                     <td className="px-6 py-5">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-black border border-white/10 overflow-hidden shrink-0">
                           <img src={p.image} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="space-y-0.5">
                           <p className="text-[11px] font-header font-black text-white uppercase italic tracking-widest line-clamp-1">{p.name}</p>
                           <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.1em]">{p.category}</p>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-5">
                       <span className="px-2 py-0.5 bg-white/5 text-white/60 text-[8px] font-mono uppercase tracking-widest border border-white/10">{p.series}</span>
                     </td>
                     <td className="px-6 py-5">
                       <div className="space-y-0.5">
                         <p className="text-[12px] font-header font-black text-[var(--neon-secondary)] italic">₹{p.price.toLocaleString()}</p>
                         {p.originalPrice && p.originalPrice > p.price && (
                           <p className="text-[9px] font-mono text-white/20 line-through">₹{p.originalPrice.toLocaleString()}</p>
                         )}
                       </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono font-bold ${p.stock <= 5 ? 'text-orange-500' : 'text-white'}`}>{p.stock}</span>
                          <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                             <div className={`h-full ${p.stock <= 5 ? 'bg-orange-500' : 'bg-[var(--neon-tertiary)]'}`} style={{ width: `${Math.min(100, p.stock * 5)}%` }}></div>
                          </div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <ImageIcon size={12} className={p.image ? 'text-emerald-500' : 'text-red-500/20'} />
                          <ImageIcon size={12} className={p.image2 ? 'text-emerald-500' : 'text-white/10'} />
                          <Video size={12} className={p.videoUrl ? 'text-[var(--neon-secondary)]' : 'text-white/10'} />
                        </div>
                     </td>
                     <td className="px-6 py-5 text-right">
                       <div className="flex justify-end gap-2">
                         <button onClick={() => handleEdit(p)} className="p-2.5 bg-white/5 text-white/40 hover:text-white hover:bg-[var(--neon-primary)]/20 transition-all"><Edit3 size={14} /></button>
                         <button onClick={() => onDeleteProduct(p.id)} className="p-2.5 bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/20 transition-all"><Trash2 size={14} /></button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Right Pane: Unit Form (Sticky) */}
        {isFormOpen && (
          <div className="xl:col-span-5 animate-in slide-in-from-right-10 duration-500">
            <div className="sticky top-32 space-y-6">
              <form onSubmit={handleSubmit} className={`glass p-8 md:p-10 border-2 ${editingId ? 'border-[var(--neon-primary)]/50' : 'border-[var(--neon-tertiary)]/50'} rounded-sm space-y-8 relative overflow-hidden`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${editingId ? 'bg-[var(--neon-primary)]' : 'bg-[var(--neon-tertiary)]'}`}></div>
                    <h2 className="text-xl font-header font-black text-white italic uppercase tracking-tighter">
                      {editingId ? "UPDATE_UNIT_CORE" : "INITIALIZE_NEW_UNIT"}
                    </h2>
                  </div>
                  <button type="button" onClick={() => { setIsFormOpen(false); resetForm(); }} className="p-2 hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                {/* Grid Container for better alignment */}
                <div className="space-y-8">
                  {/* General Node */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[9px] font-header font-black text-white/40 uppercase tracking-[0.2em]">
                       <Zap size={12} className="text-[var(--neon-tertiary)]" /> IDENTITY_NODE
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Artifact_Identity</label>
                        <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase" placeholder="NAME" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Neural_Series</label>
                        <input required value={formData.series} onChange={(e) => setFormData({...formData, series: e.target.value})} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase placeholder:opacity-20" placeholder="SERIES" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Classification</label>
                        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as any})} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase appearance-none">
                          <option value="Figures">Figures</option>
                          <option value="Apparel">Apparel</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Collectibles">Collectibles</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Unit_Stock</label>
                        <input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-white font-mono" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Transmission_Logs (Description)</label>
                      <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase resize-none" placeholder="ENTER MISSION LOGS..." />
                    </div>
                  </div>

                  {/* Pricing Node */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[9px] font-header font-black text-white/40 uppercase tracking-[0.2em]">
                       <Tag size={12} className="text-[var(--neon-secondary)]" /> VALUATION_SYNC
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Market_Price (Actual)</label>
                        <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-[var(--neon-secondary)] font-mono" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Original_Val (Before Disc)</label>
                        <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value) || 0})} className="w-full bg-black/60 border border-white/10 p-3 text-[11px] text-white/30 font-mono" />
                      </div>
                    </div>
                  </div>

                  {/* Specs Node */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[9px] font-header font-black text-white/40 uppercase tracking-[0.2em]">
                       <Hammer size={12} className="text-[var(--neon-primary)]" /> TACTICAL_SPECIFICATIONS
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1"><Hammer size={8}/> Material</label>
                        <input value={formData.specs?.material} onChange={(e) => handleSpecChange('material', e.target.value)} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" placeholder="PVC/ABS" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1"><Ruler size={8}/> Dimensions</label>
                        <input value={formData.specs?.dimensions} onChange={(e) => handleSpecChange('dimensions', e.target.value)} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" placeholder="24CM" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1"><Weight size={8}/> Weight</label>
                        <input value={formData.specs?.weight} onChange={(e) => handleSpecChange('weight', e.target.value)} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" placeholder="0.8KG" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1"><Globe size={8}/> Origin</label>
                        <input value={formData.specs?.origin} onChange={(e) => handleSpecChange('origin', e.target.value)} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" placeholder="FOUNDRY" />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase flex items-center gap-1"><ShieldAlert size={8}/> Rarity_Class</label>
                        <select value={formData.specs?.rarity} onChange={(e) => handleSpecChange('rarity', e.target.value as any)} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white font-mono uppercase appearance-none">
                          <option value="Common">Common</option>
                          <option value="Rare">Rare</option>
                          <option value="Epic">Epic</option>
                          <option value="Zenith">Zenith</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Assets Node */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[9px] font-header font-black text-white/40 uppercase tracking-[0.2em]">
                       <ImageIcon size={12} className="text-[var(--neon-primary)]" /> ASSET_MANIFEST
                    </div>
                    <div className="space-y-3">
                      <input value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:border-[var(--neon-primary)] font-mono" placeholder="IMAGE_01_URL" />
                      <input value={formData.image2} onChange={(e) => setFormData({...formData, image2: e.target.value})} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:border-[var(--neon-primary)] font-mono" placeholder="IMAGE_02_URL" />
                      <input value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:border-[var(--neon-secondary)] font-mono" placeholder="CINEMATIC_STREAM_URL" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                  <button type="submit" className={`flex-grow py-5 ${editingId ? 'bg-[var(--neon-primary)] shadow-[0_0_20px_var(--neon-primary)]' : 'bg-[var(--neon-tertiary)] shadow-[0_0_20px_var(--neon-tertiary)]'} text-black font-header font-black uppercase italic rounded-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all`}>
                    {editingId ? <RefreshCw size={18} /> : <Plus size={18} />} {editingId ? "SYNC_RE-DEPLOY" : "INITIALIZE_DEPLOY"}
                  </button>
                  <button type="button" onClick={() => { setIsFormOpen(false); resetForm(); }} className="px-10 py-5 border border-white/10 text-white font-header font-black uppercase italic rounded-sm hover:bg-white/5 transition-all">ABORT</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Global Config Section */}
      <section className="glass p-10 border border-white/10 rounded-sm space-y-8 mt-20">
        <div className="flex items-center gap-3">
          <Settings size={22} className="text-[var(--neon-secondary)]" />
          <h2 className="text-2xl font-header font-black text-white uppercase italic tracking-tighter">GLOBAL_CORE_OVERRIDES</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-header font-black text-white uppercase italic tracking-widest">SECRET_LOGO_STREAM</label>
              <div className="flex bg-black/60 p-0.5 border border-white/10 rounded-sm">
                <button onClick={() => setLogoSourceMode('url')} className={`px-4 py-1 text-[8px] font-header font-black uppercase ${logoSourceMode === 'url' ? 'bg-[var(--neon-secondary)] text-black' : 'text-zinc-600'}`}>WEB_REF</button>
                <button onClick={() => setLogoSourceMode('file')} className={`px-4 py-1 text-[8px] font-header font-black uppercase ${logoSourceMode === 'file' ? 'bg-[var(--neon-secondary)] text-black' : 'text-zinc-600'}`}>LOCAL_UPLOAD</button>
              </div>
            </div>
            
            {logoSourceMode === 'url' ? (
              <div className="relative">
                <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input 
                  type="text"
                  value={logoVideo}
                  onChange={(e) => onUpdateLogoVideo(e.target.value)}
                  placeholder="https://cinematic-vault/stream.mp4"
                  className="w-full bg-black/60 border border-white/10 pl-12 pr-4 py-4 text-[10px] text-white focus:border-[var(--neon-secondary)] font-mono"
                />
              </div>
            ) : (
              <label className="relative block w-full aspect-video border-2 border-dashed border-white/10 rounded-sm hover:border-[var(--neon-secondary)] cursor-pointer bg-black/40 group overflow-hidden">
                <input type="file" accept="video/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => onUpdateLogoVideo(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }} className="hidden" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 group-hover:scale-110 transition-transform">
                  <FileVideo size={36} className="text-white/20" />
                  <p className="text-[10px] font-mono text-white/40 uppercase italic tracking-widest">UPLOAD_CORE_STREAM</p>
                </div>
              </label>
            )}
          </div>
          
          <div className="p-8 bg-white/5 border border-white/5 rounded-sm flex items-center gap-8 relative overflow-hidden">
            <div className="w-24 h-24 bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_20px_rgba(0,0,0,1)]">
               {logoVideo ? <video src={logoVideo} className="w-full h-full object-cover" autoPlay muted={!isAudioOn} loop /> : <Video className="text-white/10" />}
            </div>
            <div className="space-y-2 min-w-0">
               <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">Status: <span className="text-emerald-500 animate-pulse">Online</span></p>
               <p className="text-[11px] font-header font-black text-[var(--neon-secondary)] uppercase italic tracking-widest truncate">{logoVideo || 'VOID_STREAM'}</p>
               <div className="flex gap-2 pt-2">
                 <div className="px-3 py-1 bg-white/5 text-[8px] font-mono text-white/40 uppercase">Resolution: 1080p_Dynamic</div>
                 <div className="px-3 py-1 bg-white/5 text-[8px] font-mono text-white/40 uppercase">Codec: H.264_Secure</div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;