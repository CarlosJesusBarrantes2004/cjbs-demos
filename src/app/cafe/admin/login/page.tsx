'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');

.ca {
  --bg: #f9f5ef;
  --bg2: #fff;
  --bg3: #f2ebd9;
  --brd: #e5d5c5;
  --txt: #302213;
  --sub: #5b432a;
  --dim: #826950;
  --a: #c4622d;
  --a2: #a85122;
  --e: cubic-bezier(.4, 0, .2, 1);
  --t: .2s;
  --r: 8px;
  --fd: 'Bebas Neue', 'Arial Black', sans-serif;
  --fb: 'Barlow', 'Geist', system-ui, sans-serif;
  
  background: var(--bg);
  color: var(--txt);
  font-family: var(--fb);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ca h1, .ca h2 { font-family: var(--fd); letter-spacing: 0.04em; text-transform: uppercase; margin: 0; }
.ca ::selection { background: var(--a); color: #fff; }
.ca *:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; border-radius: 4px; }
.btn-prim { display: inline-flex; align-items: center; justify-content: center; background: var(--a); color: #fff; font-family: var(--fb); font-weight: 700; border: none; border-radius: var(--r); cursor: pointer; padding: 13px 24px; letter-spacing: .05em; text-transform: uppercase; font-size: 13px; transition: all var(--t) var(--e); box-shadow: 0 2px 12px rgba(196,98,45,.22); width: 100%; }
.btn-prim:hover:not(:disabled) { background: var(--a2); transform: translateY(-1px); box-shadow: 0 4px 18px rgba(196,98,45,.32); }
.btn-prim:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; transform: none; }
.bento { background: var(--bg2); padding: 40px 32px; border-radius: 16px; border: 1px solid var(--brd); box-shadow: 0 12px 32px rgba(48,34,19,.04); width: 100%; max-width: 340px; }
.inp { width: 100%; padding: 12px 16px; margin-bottom: 24px; border: 1px solid var(--brd); border-radius: var(--r); background: var(--bg); font-family: var(--fb); font-size: 15px; color: var(--txt); transition: border-color var(--t); }
.inp:focus { border-color: var(--a); outline: none; }
`;

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/cafe/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/cafe/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ca">
        <form onSubmit={handleLogin} className="bento">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', color: 'var(--txt)', lineHeight: 1 }}>Café Aromas</h1>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--dim)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '6px' }}>Panel de Administración</p>
          </div>
          
          {error && <div style={{ color: 'var(--a)', marginBottom: '16px', fontSize: '13px', fontWeight: 500, textAlign: 'center' }}>{error}</div>}
          
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="inp"
            autoFocus
          />
          
          <button 
            type="submit" 
            disabled={loading || !password}
            className="btn-prim"
          >
            {loading ? 'Accediendo...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </>
  );
}
