'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

type Cat = 'Bebidas' | 'Desayunos' | 'Postres';

interface MenuItem {
  id: string;
  cat: Cat;
  nombre: string;
  desc: string;
  precio: number;
  img: string;
  badge?: string;
  disponible?: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcoLogOut() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IcoTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IcoPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IcoClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── CSS Styles ────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Chivo:wght@300;400;500;700&display=swap');

.ca {
  --bg:    #f9f5ef;
  --bg2:   #ffffff;
  --bg3:   #f1ebe0;
  --brd:   #e0d5c5;
  --brd2:  #cfc3b0;
  --txt:   #1c110a;
  --sub:   #6b5444;
  --dim:   #a08878;
  --a:     #c4622d;
  --a2:    #a24f20;
  --a-bg:  rgba(196,98,45,.09);
  --a-brd: rgba(196,98,45,.28);
  --grn:   #1db954;
  --r:     8px;
  --rl:    16px;
  --e:     cubic-bezier(.4,0,.2,1);
  --t:     .2s;
  --fd:    'Unbounded', 'Arial Black', sans-serif;
  --fb:    'Chivo', 'Geist', system-ui, sans-serif;
  background: var(--bg);
  color: var(--txt);
  font-family: var(--fb);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

.ca.dark {
  --bg:    #1a1614;
  --bg2:   #231d1a;
  --bg3:   #2e2723;
  --brd:   #3e3530;
  --brd2:  #4f443e;
  --txt:   #f9f5ef;
  --sub:   #c1b2a6;
  --dim:   #928377;
  --a:     #d97740;
  --a2:    #e58b57;
  --a-bg:  rgba(217, 119, 64, 0.12);
  --a-brd: rgba(217, 119, 64, 0.28);
}

.ca *, .ca *::before, .ca *::after { box-sizing: border-box; }
.ca h1, .ca h2, .ca h3 { margin: 0; }
.ca button, .ca input, .ca select, .ca textarea { font-family: inherit; }
.ca ::-webkit-scrollbar { width: 6px; height: 6px; }
.ca ::-webkit-scrollbar-track { background: var(--bg3); }
.ca ::-webkit-scrollbar-thumb { background: var(--brd2); border-radius: 3px; }
.ca ::-webkit-scrollbar-thumb:hover { background: var(--dim); }
.ca *:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; border-radius: 4px; }

/* Admin Layout */
.admin-hdr { padding: 16px 24px; background: var(--bg2); border-bottom: 1px solid var(--brd); display: flex; align-items: center; justify-content: space-between; }
.admin-logo { font-family: var(--fd); font-size: 16px; font-weight: 900; color: var(--txt); text-transform: uppercase; letter-spacing: 0.04em; }
.admin-logo em { color: var(--a); font-style: normal; }
.admin-main { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
.admin-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }

/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: none; border-radius: var(--r); font-weight: 700; cursor: pointer; transition: all var(--t) var(--e); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 18px; }
.btn-prim { background: var(--a); color: #fff; box-shadow: 0 2px 12px rgba(196,98,45,.22); }
.btn-prim:hover:not(:disabled) { background: var(--a2); transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--sub); border: 1px solid var(--brd); }
.btn-ghost:hover:not(:disabled) { color: var(--txt); border-color: var(--brd2); background: var(--bg3); }
.btn-danger { background: transparent; color: #dc2626; padding: 8px; border: 1px solid transparent; min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center; }
.btn-danger:hover { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.2); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* Tabs */
.tabs { display: flex; gap: 4px; background: var(--bg3); border-radius: 10px; padding: 4px; width: fit-content; border: 1px solid var(--brd); }
.tab { background: none; border: none; cursor: pointer; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--sub); padding: 9px 22px; border-radius: 7px; transition: all var(--t) var(--e); white-space: nowrap; }
.tab:hover { color: var(--txt); background: rgba(255,255,255,.6); }
.tab.on { background: var(--bg2); color: var(--a); box-shadow: 0 1px 4px rgba(28,17,10,.08); }

/* Table */
.tbl-wrap { background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--rl); overflow: hidden; }
.tbl { width: 100%; border-collapse: collapse; text-align: left; }
.tbl th { background: var(--bg3); padding: 12px 16px; font-size: 11px; font-weight: 700; color: var(--dim); text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid var(--brd); }
.tbl td { padding: 16px; border-bottom: 1px solid var(--brd); vertical-align: middle; }
.tbl tr:last-child td { border-bottom: none; }
.tbl tr:hover { background: rgba(0,0,0,0.02); }
.ca.dark .tbl tr:hover { background: rgba(255,255,255,0.02); }

.item-img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; background: var(--bg3); flex-shrink: 0; }
.item-info { display: flex; align-items: center; gap: 16px; }
.item-text { display: flex; flex-direction: column; gap: 4px; }
.item-name { font-weight: 700; font-size: 14px; color: var(--txt); }
.item-desc { font-size: 12px; color: var(--sub); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; max-width: 280px; }

/* Inline Edit Input */
.inp-price { width: 80px; padding: 8px 12px; border: 1px solid transparent; border-radius: var(--r); background: transparent; font-family: var(--fd); font-size: 16px; color: var(--a); font-weight: 700; transition: all var(--t); min-height: 44px; }
.inp-price:hover { background: var(--bg3); border-color: var(--brd); }
.inp-price:focus { background: var(--bg); border-color: var(--a); outline: none; }

/* Toggle Switch */
.switch { position: relative; display: inline-block; width: 40px; height: 22px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--brd2); transition: .3s; border-radius: 24px; }
.slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
input:checked + .slider { background-color: var(--grn); }
input:focus-visible + .slider { outline: 2px solid var(--a); outline-offset: 2px; }
input:checked + .slider:before { transform: translateX(18px); }
.switch-wrap { display: flex; align-items: center; gap: 8px; min-height: 44px; }
.switch-lbl { font-size: 12px; font-weight: 600; color: var(--sub); }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn var(--t) var(--e); }
.modal { background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--rl); width: 100%; max-width: 480px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); animation: slideUp var(--t) var(--e); max-height: 90vh; display: flex; flex-direction: column; }
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
.modal-hdr { padding: 24px; border-bottom: 1px solid var(--brd); display: flex; justify-content: space-between; align-items: center; }
.modal-title { font-family: var(--fd); font-size: 20px; font-weight: 900; color: var(--txt); text-transform: uppercase; }
.modal-close { background: none; border: none; color: var(--sub); cursor: pointer; padding: 4px; border-radius: 4px; min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center; }
.modal-close:hover { background: var(--bg3); color: var(--txt); }
.modal-body { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
.modal-ftr { padding: 24px; border-top: 1px solid var(--brd); display: flex; justify-content: flex-end; gap: 12px; }

/* Forms */
.form-grp { display: flex; flex-direction: column; gap: 6px; }
.form-lbl { font-size: 11px; font-weight: 700; color: var(--dim); text-transform: uppercase; letter-spacing: 0.1em; }
.inp { padding: 12px 16px; border: 1px solid var(--brd); border-radius: var(--r); background: var(--bg); color: var(--txt); font-size: 14px; font-family: inherit; transition: border-color var(--t); }
.inp:focus { outline: none; border-color: var(--a); }
textarea.inp { resize: vertical; min-height: 80px; }

/* Responsive Adjustments */
@media (max-width: 768px) {
  /* Tabs */
  .tabs { width: 100%; justify-content: flex-start; overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 8px; }
  .tab { flex: 1 0 auto; text-align: center; }
  
  /* Modal */
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; width: 100%; border-radius: 20px 20px 0 0; max-height: 90vh; border-bottom: none; border-left: none; border-right: none; margin: 0; }
  
  /* Table to Cards */
  .tbl-wrap { border: none; background: transparent; }
  .tbl, .tbl tbody, .tbl tr, .tbl td { display: block; width: 100%; }
  .tbl thead { display: none; }
  .tbl tr { 
    background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--rl); 
    margin-bottom: 16px; padding: 16px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
  }
  .tbl td { padding: 0; border: none; }
  .tbl td::before { display: none; }
  
  .td-info { flex-basis: 100%; width: 100%; }
  .td-info .item-info { align-items: flex-start; }
  .item-desc { max-width: 100%; }
  
  .td-price { flex: 1; }
  .td-status { flex: 1; display: flex; justify-content: center; }
  .td-actions { flex: 0 0 auto; display: flex; justify-content: flex-end; }
}

/* Fallback Login */
.login-wrap { width: 100%; max-width: 360px; margin: 0 auto; background: var(--bg2); padding: 40px 32px; border-radius: var(--rl); border: 1px solid var(--brd); box-shadow: 0 12px 32px rgba(0,0,0,.08); }
.login-title { font-family: var(--fd); font-size: 28px; color: var(--txt); text-align: center; margin-bottom: 8px; text-transform: uppercase; }
.login-sub { font-size: 11px; font-weight: 700; color: var(--dim); text-align: center; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px; }
.msg { padding: 12px 16px; border-radius: var(--r); font-size: 13px; font-weight: 600; text-align: center; margin-bottom: 16px; }
.msg-err { background: var(--a-bg); color: var(--a); border: 1px solid var(--a-brd); }
`;

// ─── Component ─────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Cat>('Bebidas');
  
  // Auth fallback
  const [sessionExpired, setSessionExpired] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({ cat: 'Bebidas', disponible: true });

  const router = useRouter();
  
  // Re-use theme preference (default to light in admin usually, but respect localstorage if any)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const stored = localStorage.getItem('ca-theme');
    if (stored === 'dark' || stored === 'light') setTheme(stored);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cafe/admin/menu');
      if (res.status === 401) {
        setSessionExpired(true);
        return;
      }
      if (!res.ok) throw new Error('Error al cargar la carta');
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/cafe/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setSessionExpired(false);
        setPassword('');
        fetchItems();
        router.refresh(); // Tell Next.js middleware it's OK now
      } else {
        setLoginError('Contraseña incorrecta');
      }
    } catch (err) {
      setLoginError('Error de red al intentar iniciar sesión');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/cafe/admin/logout', { method: 'POST' });
      router.push('/cafe/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const checkAuthError = (res: Response) => {
    if (res.status === 401) {
      setSessionExpired(true);
      return true;
    }
    return false;
  };

  const handleUpdateAvailability = async (item: MenuItem, disponible: boolean) => {
    // Optimistic update
    setItems(items.map(i => i.id === item.id ? { ...i, disponible } : i));
    try {
      const res = await fetch('/api/cafe/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, disponible })
      });
      if (checkAuthError(res)) return;
      if (!res.ok) throw new Error('Error al actualizar disponibilidad');
    } catch (err) {
      // Revert on error
      setItems(items.map(i => i.id === item.id ? { ...i, disponible: item.disponible } : i));
      alert('Hubo un error al guardar los cambios.');
    }
  };

  const handleUpdatePrice = async (item: MenuItem, newPrice: number) => {
    if (newPrice === item.precio) return; // No change
    if (isNaN(newPrice) || newPrice < 0) return;

    // Optimistic update
    setItems(items.map(i => i.id === item.id ? { ...i, precio: newPrice } : i));
    try {
      const res = await fetch('/api/cafe/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, precio: newPrice })
      });
      if (checkAuthError(res)) return;
      if (!res.ok) throw new Error('Error al actualizar precio');
    } catch (err) {
      // Revert on error
      setItems(items.map(i => i.id === item.id ? { ...i, precio: item.precio } : i));
      alert('Hubo un error al guardar el precio.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    
    const previousItems = [...items];
    setItems(items.filter(i => i.id !== id));
    
    try {
      const res = await fetch('/api/cafe/admin/menu?id=' + encodeURIComponent(id), {
        method: 'DELETE'
      });
      if (checkAuthError(res)) return;
      if (!res.ok) throw new Error('Error al eliminar');
    } catch (err) {
      setItems(previousItems);
      alert('Error al intentar eliminar el producto.');
    }
  };

  const openNewItemModal = () => {
    setFormData({ 
      id: 'p-' + Math.random().toString(36).substr(2, 6), // Generate simple random ID
      cat: tab, 
      nombre: '', 
      desc: '', 
      precio: 0, 
      img: '', 
      badge: '',
      disponible: true 
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.id) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/cafe/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (checkAuthError(res)) return;
      if (!res.ok) throw new Error('Error al guardar el producto');
      
      const { item } = await res.json();
      setItems([...items, item]);
      setIsModalOpen(false);
    } catch (err) {
      alert('Hubo un error al intentar guardar el producto.');
    } finally {
      setSaving(false);
    }
  };

  const displayedItems = items.filter(i => i.cat === tab);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={`ca ${theme}`}>
        
        {sessionExpired ? (
          <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="login-wrap">
              <h1 className="login-title">Café Aromas</h1>
            <div className="login-sub">Acceso Restringido</div>
            
            {loginError && <div className="msg msg-err">{loginError}</div>}
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="password"
                className="inp"
                placeholder="Contraseña de admin"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-prim" disabled={loggingIn || !password} style={{ width: '100%', padding: '12px' }}>
                {loggingIn ? 'Autenticando...' : 'Ingresar'}
              </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <header className="admin-hdr">
              <div className="admin-logo">CAFÉ <em>AROMAS</em> — Admin</div>
              <button className="btn btn-ghost" onClick={handleLogout}>
                <IcoLogOut /> Salir
              </button>
            </header>

            <main className="admin-main">
              <div className="admin-head">
                <div className="tabs" role="tablist">
                  {(['Bebidas', 'Desayunos', 'Postres'] as Cat[]).map(c => (
                    <button
                      key={c}
                      role="tab"
                      aria-selected={tab === c}
                      className={`tab ${tab === c ? 'on' : ''}`}
                      onClick={() => setTab(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <button className="btn btn-prim" onClick={openNewItemModal}>
                  <IcoPlus /> Agregar producto
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '48px', color: 'var(--sub)' }}>Cargando datos...</div>
              ) : error ? (
                <div className="msg msg-err">{error}</div>
              ) : (
                <div className="tbl-wrap">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio (S/)</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedItems.length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'center', color: 'var(--sub)', padding: '32px' }}>
                            No hay productos en esta categoría.
                          </td>
                        </tr>
                      ) : (
                        displayedItems.map(item => (
                          <tr key={item.id}>
                            <td data-label="Producto" className="td-info">
                              <div className="item-info">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.img || 'https://via.placeholder.com/100'} alt={item.nombre} className="item-img" loading="lazy" />
                                <div className="item-text">
                                  <div className="item-name">{item.nombre} {item.badge && <span style={{ fontSize: '9px', background: 'var(--a)', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>{item.badge}</span>}</div>
                                  <div className="item-desc">{item.desc}</div>
                                </div>
                              </div>
                            </td>
                            <td data-label="Precio (S/)" className="td-price">
                              <input 
                                type="number" 
                                className="inp-price" 
                                defaultValue={item.precio}
                                step="0.5"
                                min="0"
                                onBlur={(e) => handleUpdatePrice(item, parseFloat(e.target.value))}
                                aria-label="Editar precio"
                              />
                            </td>
                            <td data-label="Estado" className="td-status">
                              <label className="switch-wrap">
                                <div className="switch">
                                  <input 
                                    type="checkbox" 
                                    checked={item.disponible !== false}
                                    onChange={(e) => handleUpdateAvailability(item, e.target.checked)}
                                  />
                                  <span className="slider"></span>
                                </div>
                                <span className="switch-lbl">{item.disponible !== false ? 'Disponible' : 'Agotado'}</span>
                              </label>
                            </td>
                            <td data-label="Acciones" className="td-actions">
                              <button 
                                className="btn btn-danger"
                                onClick={() => handleDelete(item.id)}
                                aria-label="Eliminar producto"
                                title="Eliminar producto"
                              >
                                <IcoTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </main>

            {/* Modal de Agregar Producto */}
            {isModalOpen && (
              <div className="modal-overlay" onClick={() => !saving && setIsModalOpen(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-hdr">
                    <div className="modal-title">Nuevo Producto</div>
                    <button className="modal-close" onClick={() => !saving && setIsModalOpen(false)}><IcoClose /></button>
                  </div>
                  <form onSubmit={handleSaveModal}>
                    <div className="modal-body">
                      <div className="form-grp">
                        <label className="form-lbl">Nombre del Producto</label>
                        <input className="inp" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder="Ej. Latte de Vainilla" />
                      </div>
                      
                      <div className="form-grp">
                        <label className="form-lbl">Descripción</label>
                        <textarea className="inp" required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} placeholder="Detalles de la preparación e ingredientes..." />
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-grp">
                          <label className="form-lbl">Categoría</label>
                          <select className="inp" value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value as Cat})}>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Desayunos">Desayunos</option>
                            <option value="Postres">Postres</option>
                          </select>
                        </div>
                        <div className="form-grp">
                          <label className="form-lbl">Precio (S/)</label>
                          <input type="number" step="0.5" min="0" required className="inp" value={formData.precio || ''} onChange={e => setFormData({...formData, precio: parseFloat(e.target.value)})} placeholder="0.00" />
                        </div>
                      </div>

                      <div className="form-grp">
                        <label className="form-lbl">URL de la Imagen</label>
                        <input type="url" className="inp" required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://..." />
                      </div>

                      <div className="form-grp">
                        <label className="form-lbl">Badge (Opcional)</label>
                        <input className="inp" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} placeholder="Ej. NUEVO, RECOMENDADO" />
                      </div>
                    </div>
                    <div className="modal-ftr">
                      <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)} disabled={saving}>Cancelar</button>
                      <button type="submit" className="btn btn-prim" disabled={saving}>{saving ? 'Guardando...' : 'Guardar Producto'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
