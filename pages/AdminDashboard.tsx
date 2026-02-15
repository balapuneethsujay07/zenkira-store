
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Package, Database, Image as ImageIcon, MapPin, Zap, Layers, Trash2, Edit3, X, RefreshCw, Search, Video, ShieldAlert, CheckCircle, Info, Ruler, Weight, Hammer, ChevronDown, ChevronUp } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, onAddProduct, onUpdateProduct, onDeleteProduct
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    series: '',
    category: 'Figures',
    price: 0,
    description: '',
    image: '',
    image2: '',
    images: [],
    videoUrl: '',
    stock: 0,
    specs: {
      material: '',
      dimensions: '',
      weight: '',
      origin: '',
      rarity: 'Common'
    }
  });

  const handleAddImageUrl = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const handleUpdateImageUrl = (index: number, url: string) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages[index] = url;
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const handleRemoveImageUrl = (index: number) => {
    const updatedImages = (formData.images || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const confirmSubmit = () => {
    if (editingId) {
      const updatedProduct: Product = {
        ...formData,
        id: editingId,
        isFeatured: products.find(p => p.id === editingId)?.isFeatured ?? true,
      } as Product;
      onUpdateProduct(updatedProduct);
      setEditingId(null);
    } else {
      const newProduct: Product = {
        ...formData,
        id: `ZK-ADMIN-${Date.now()}`,
        isFeatured: true,
      } as Product;
      onAddProduct(newProduct);
    }
    
    resetForm();
    setIsFormOpen(false);
    setIsConfirming(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      series: '',
      category: 'Figures',
      price: 0,
      description: '',
      image: '',
      image2: '',
      images: [],
      videoUrl: '',
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
      },
      images: p.images || []
    });
    setEditingId(p.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateAdd = () => {
    resetForm();
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.series.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pb-40 space-y-10 pt-6">
      {/* Header with Search and Stats */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-header font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
            <Database size={36} className="text-[var(--neon-tertiary)]" /> 
            CORE_<span className="text-[var(--neon-tertiary)]">CONTROL</span>
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-[var(--text-muted)] font-mono text-[9px] uppercase tracking-[0.4em] italic border-l-2 border-[var(--neon-tertiary)] pl-4">
              Sector: Central_Archive // Admin_Level
            </p>
            <span className="text-[10px] bg-white/5 px-3 py-0.5 rounded-full font-mono text-white/40 uppercase">
              {products.length} Items Indexed
            </span>
          </div>
        </div>

        <div className="flex w-full md:w-auto gap-4">
           <div className="relative flex-grow md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text"
                placeholder="QUICK_SCAN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase rounded-sm"
              />
           </div>
           {!isFormOpen && (
              <button 
                onClick={handleInitiateAdd}
                className="px-6 py-3 bg-[var(--neon-tertiary)] text-black font-header font-black uppercase italic rounded-sm flex items-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:scale-105 active:scale-95 transition-all"
              >
                <Plus size={16} /> ADD_UNIT
              </button>
           )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Form Column - Conditional Width */}
        <div className={`transition-all duration-700 ${isFormOpen ? 'lg:w-[55%] opacity-100' : 'w-0 h-0 opacity-0 overflow-hidden pointer-events-none'}`}>
          <form onSubmit={handleSubmit} className={`glass p-8 md:p-10 border-2 ${editingId ? "border-[var(--neon-primary)]/50" : "border-[var(--neon-tertiary)]/30"} rounded-sm space-y-10 relative overflow-hidden`}>
            {/* Form Top Bar */}
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${editingId ? 'bg-[var(--neon-primary)] animate-pulse' : 'bg-[var(--neon-tertiary)] animate-pulse'}`}></div>
                  <h2 className="text-2xl font-header font-black text-white uppercase italic tracking-tighter">
                    {editingId ? "UPDATE_ENTRY" : "INITIALIZE_ENTRY"}
                  </h2>
               </div>
               <button type="button" onClick={() => { setIsFormOpen(false); resetForm(); }} className="p-2 hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-all rounded-sm">
                  <X size={24} />
               </button>
            </div>

            {/* Block 1: Essential Identity */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[10px] font-header font-black text-white/40 uppercase tracking-[0.3em]">
                <Package size={14} className="text-[var(--neon-tertiary)]" /> 01 // IDENTITY_DATA
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Artifact_Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Neural_Series</label>
                  <input 
                    required
                    value={formData.series}
                    onChange={(e) => setFormData({...formData, series: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Classification</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full bg-black/60 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono uppercase appearance-none"
                  >
                    <option value="Figures">Figures</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Collectibles">Collectibles</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Valuation (₹)</label>
                    <input 
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-black/60 border border-white/10 p-4 text-sm text-[var(--neon-secondary)] focus:outline-none focus:border-[var(--neon-tertiary)] font-mono" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Stock_Units</label>
                    <input 
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                      className="w-full bg-black/60 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[var(--neon-tertiary)] font-mono" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Visual Assets */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-[10px] font-header font-black text-white/40 uppercase tracking-[0.3em]">
                <ImageIcon size={14} className="text-[var(--neon-secondary)]" /> 02 // ASSET_REGISTRY
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase italic">Root_Asset_URL</label>
                  <input 
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-secondary)] font-mono" 
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase italic">Hover_Asset_URL</label>
                  <input 
                    value={formData.image2}
                    onChange={(e) => setFormData({...formData, image2: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-secondary)] font-mono" 
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase italic">Secondary_Stacks</label>
                   <button 
                    type="button" 
                    onClick={handleAddImageUrl}
                    className="text-[8px] font-header font-black text-[var(--neon-secondary)] uppercase flex items-center gap-1.5 hover:brightness-125 transition-all"
                  >
                    <Plus size={10} /> ADD_SLOT
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.images?.map((url, idx) => (
                    <div key={idx} className="flex gap-2 animate-in slide-in-from-left-2 duration-300">
                      <input 
                        value={url}
                        onChange={(e) => handleUpdateImageUrl(idx, e.target.value)}
                        className="flex-grow bg-black/60 border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-[var(--neon-secondary)] font-mono" 
                        placeholder="Additional Image URL..."
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveImageUrl(idx)}
                        className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all rounded-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {(!formData.images || formData.images.length === 0) && (
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] italic py-4 border border-dashed border-white/5 text-center rounded-sm">
                      No additional visual arrays mapped.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Block 3: Technical Specs */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-[10px] font-header font-black text-white/40 uppercase tracking-[0.3em]">
                <Hammer size={14} className="text-[var(--neon-primary)]" /> 03 // TECH_SPEC_MANIFEST
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Base_Material</label>
                  <input 
                    value={formData.specs?.material}
                    onChange={(e) => setFormData({...formData, specs: { ...formData.specs, material: e.target.value }})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Spatial_Dims</label>
                  <input 
                    value={formData.specs?.dimensions}
                    onChange={(e) => setFormData({...formData, specs: { ...formData.specs, dimensions: e.target.value }})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Mass_Scale</label>
                  <input 
                    value={formData.specs?.weight}
                    onChange={(e) => setFormData({...formData, specs: { ...formData.specs, weight: e.target.value }})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Origin_Sector</label>
                  <input 
                    value={formData.specs?.origin}
                    onChange={(e) => setFormData({...formData, specs: { ...formData.specs, origin: e.target.value }})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-mono text-[var(--text-muted)] uppercase">Rarity_Grade</label>
                  <select 
                    value={formData.specs?.rarity}
                    onChange={(e) => setFormData({...formData, specs: { ...formData.specs, rarity: e.target.value as any }})}
                    className="w-full bg-black/60 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase appearance-none"
                  >
                    <option value="Common">Common</option>
                    <option value="Rare">Rare</option>
                    <option value="Epic">Epic</option>
                    <option value="Zenith">Zenith</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5 pt-4">
                <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Artifact_Legacy_Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[var(--neon-primary)] font-mono uppercase resize-none placeholder:opacity-20"
                  placeholder="ARCHIVE DESCRIPTION..."
                />
              </div>
            </div>

            <div className="flex gap-4 pt-10 border-t border-white/5">
              <button 
                type="submit"
                className={`flex-grow py-5 ${editingId ? 'bg-[var(--neon-primary)]' : 'bg-[var(--neon-tertiary)]'} text-black font-header font-black uppercase italic rounded-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:brightness-110 hover:-translate-y-1 active:translate-y-0`}
              >
                {editingId ? <RefreshCw size={22} /> : <Plus size={22} />}
                {editingId ? "INITIALIZE_RE-SYNC" : "DEPLOY_UNIT"}
              </button>
              <button 
                type="button"
                onClick={() => { setIsFormOpen(false); resetForm(); }}
                className="px-10 py-5 border border-white/10 text-white font-header font-black uppercase italic rounded-sm hover:bg-white/5 transition-all"
              >
                ABORT
              </button>
            </div>
          </form>
        </div>

        {/* Product List Column */}
        <div className={`transition-all duration-700 ${isFormOpen ? 'lg:w-[45%]' : 'w-full'} space-y-6`}>
           {/* List Header */}
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-3">
               <Layers size={20} className="text-[var(--neon-secondary)]" />
               <h3 className="text-xl font-header font-black text-white italic uppercase tracking-tighter">ARTIFACT_ARCHIVE</h3>
             </div>
             <div className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm">
               Showing {filteredProducts.length} Results
             </div>
           </div>

           {/* The Grid/List */}
           <div className="grid grid-cols-1 gap-4 max-h-[1000px] overflow-y-auto custom-scrollbar pr-2">
             {filteredProducts.map((p) => (
               <div 
                key={p.id} 
                className={`glass border-l-4 ${editingId === p.id ? 'border-[var(--neon-primary)] bg-[var(--neon-primary)]/5' : 'border-white/10 hover:border-[var(--neon-secondary)]'} p-4 flex items-center justify-between transition-all group`}
               >
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 shrink-0 border border-white/5 rounded-sm overflow-hidden relative shadow-lg">
                      <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      {p.images && p.images.length > 0 && (
                        <div className="absolute top-0 right-0 p-0.5 bg-[var(--neon-secondary)] text-black">
                           <ImageIcon size={8} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-header font-black text-[11px] text-white uppercase italic tracking-tight line-clamp-1 group-hover:text-[var(--neon-secondary)] transition-colors">{p.name}</h4>
                      <div className="flex items-center gap-3 text-[7px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                         <span>{p.series}</span>
                         <span className="w-1 h-1 rounded-full bg-white/20"></span>
                         <span className="text-white/40">{p.category}</span>
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                         <span className="text-[10px] font-header font-black text-[var(--neon-secondary)] italic">₹{p.price.toLocaleString()}</span>
                         <span className={`text-[8px] font-mono uppercase ${p.stock <= 5 ? 'text-[var(--neon-primary)]' : 'text-white/40'}`}>
                           Stock: {p.stock}
                         </span>
                      </div>
                    </div>
                 </div>

                 <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(p)}
                      className="p-3 bg-white/5 text-[var(--text-muted)] hover:text-white hover:bg-[var(--neon-secondary)]/10 rounded-sm transition-all shadow-inner"
                      title="Edit Artifact"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-3 bg-white/5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
                      title="Purge Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
               </div>
             ))}
             {filteredProducts.length === 0 && (
               <div className="py-20 text-center glass border border-dashed border-white/10 rounded-sm opacity-50">
                  <Search size={40} className="mx-auto mb-4 text-white/10" />
                  <p className="font-header font-black uppercase text-[10px] tracking-widest">No Signals Detected</p>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* CONFIRMATION OVERLAY */}
      {isConfirming && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsConfirming(false)} />
          <div className="relative w-full max-w-lg glass border border-[var(--neon-primary)] rounded-sm p-10 space-y-10 shadow-[0_0_100px_rgba(255,46,136,0.2)] animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-5">
               <ShieldAlert size={44} className="text-[var(--neon-primary)] animate-pulse" />
               <div className="space-y-1">
                  <h2 className="text-3xl font-header font-black uppercase italic tracking-tighter text-white">DECODE_CONFIRM</h2>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">Validate parameters before archival commit</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6 bg-white/5 p-6 border border-white/5 rounded-sm font-mono">
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[8px] text-[var(--text-muted)] uppercase">Identity</span>
                  <span className="text-[11px] text-white uppercase">{formData.name}</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[8px] text-[var(--text-muted)] uppercase">Valuation</span>
                  <span className="text-[11px] text-[var(--neon-secondary)] font-bold italic">₹{formData.price?.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[8px] text-[var(--text-muted)] uppercase">Inventory</span>
                  <span className="text-[11px] text-white uppercase">{formData.stock} Units // Sector: {formData.specs?.origin || 'N/A'}</span>
               </div>
            </div>

            <div className="flex gap-4">
               <button 
                 onClick={confirmSubmit}
                 className="flex-grow py-5 bg-[var(--neon-primary)] text-white font-header font-black uppercase italic rounded-sm shadow-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all"
               >
                 <CheckCircle size={20} /> SYNC_COMMAND
               </button>
               <button 
                 onClick={() => setIsConfirming(false)}
                 className="px-8 py-5 border border-white/10 text-white font-header font-black uppercase italic rounded-sm hover:bg-white/5 transition-all"
               >
                 ABORT
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
