'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── SVG Icons ─────────────────────────────────────────────────────────────

function IcoFolder({ open = false }: { open?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--ide-accent)' }}>
      {open ? (
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="currentColor" fillOpacity="0.2" />
      ) : (
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      )}
    </svg>
  );
}

function IcoFileTsx() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#3178c6' }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="7" y="17" fontSize="8" fontWeight="bold" stroke="none" fill="currentColor" fontFamily="sans-serif">TSX</text>
    </svg>
  );
}

function IcoChevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', opacity: 0.6 }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IcoMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IcoSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function LogoCJBS() {
  return (
    <svg className="ide-logo" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="70" y="42" fontFamily="sans-serif" fontSize="42" fontWeight="900" fill="var(--ide-txt)" textAnchor="middle" letterSpacing="-0.04em">
        CJBS<tspan fill="var(--ide-accent)">.</tspan>
      </text>
      <text x="70" y="58" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="var(--ide-dim)" textAnchor="middle" letterSpacing="0.4em">
        STUDIO
      </text>
    </svg>
  );
}

// ─── CSS Styles ────────────────────────────────────────────────────────────

const CSS = `
:root {
  /* DARK THEME (Default) */
  --ide-bg: #09090b;
  --ide-txt: #e4e4e7;
  --ide-dim: #71717a;
  --ide-dimmer: #3f3f46;
  --ide-accent: #f59e0b; /* Amber */
  --ide-hover: rgba(255, 255, 255, 0.06);
  --ide-active: rgba(245, 158, 11, 0.1);
  --ide-guide: #27272a;
  --ide-comm: #6b7280; /* Comment color */
}

.ide-light {
  /* LIGHT THEME */
  --ide-bg: #ffffff;
  --ide-txt: #0f172a;
  --ide-dim: #94a3b8;
  --ide-dimmer: #cbd5e1;
  --ide-accent: #d97706; /* Darker amber for contrast */
  --ide-hover: rgba(0, 0, 0, 0.04);
  --ide-active: rgba(217, 119, 6, 0.08);
  --ide-guide: #e2e8f0;
  --ide-comm: #64748b;
}

.ide-wrapper {
  background-color: var(--ide-bg);
  color: var(--ide-txt);
  min-height: 100vh;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, color 0.3s;
}

.ide-wrapper *, .ide-wrapper *::before, .ide-wrapper *::after {
  box-sizing: border-box;
}

.ide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--ide-guide);
}

.ide-logo {
  width: 140px;
  height: 70px;
  transition: width 0.3s, height 0.3s;
}

.ide-theme-toggle {
  background: none;
  border: none;
  color: var(--ide-dim);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
}

.ide-theme-toggle:hover {
  background: var(--ide-hover);
  color: var(--ide-txt);
}

.ide-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.ide-tree-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Tree Animation */
.tree-row {
  opacity: 0;
  transform: translateY(4px);
  animation: fadeRow 0.3s forwards ease-out;
}

@keyframes fadeRow {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger delays */
.delay-0 { animation-delay: 0.1s; }
.delay-1 { animation-delay: 0.15s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.25s; }
.delay-4 { animation-delay: 0.3s; }
.delay-5 { animation-delay: 0.35s; }

/* Items */
.tree-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  margin: 2px 0;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  color: var(--ide-txt);
  transition: background-color 0.15s;
  position: relative;
}

.tree-item:hover {
  background-color: var(--ide-hover);
}

.tree-item.env-file {
  color: var(--ide-dim);
}

.tree-item-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0; /* for truncation */
}

.tree-item-name {
  font-size: 14px;
  white-space: nowrap;
}

.tree-item-comment {
  color: var(--ide-comm);
  font-size: 13px;
  margin-left: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
}

/* Guides */
.tree-branch {
  position: relative;
  padding-left: 20px;
}

.tree-branch::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 6px;
  width: 1px;
  background: var(--ide-guide);
}

/* Focus styles */
.tree-item:focus-visible {
  outline: 2px solid var(--ide-accent);
  outline-offset: -1px;
}

@media (max-width: 768px) {
  .ide-logo {
    width: 100px;
    height: 50px;
  }
  
  .ide-header {
    padding: 12px 16px;
  }
  
  .ide-main {
    padding: 24px 16px;
  }

  .tree-branch {
    padding-left: 12px;
  }

  .tree-branch::before {
    left: 4px;
  }

  .tree-item-inner {
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .tree-item-name {
    flex: 1;
    min-width: 100px;
  }

  .tree-item-comment {
    white-space: normal !important;
    margin-left: 36px;
    flex-basis: 100%;
    margin-top: 4px;
    line-height: 1.4;
  }
}
`;

// ─── Component ─────────────────────────────────────────────────────────────

export default function CJBSLandingPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('cjbs-theme');
    if (stored === 'light') {
      setTheme('light');
    } else if (stored === 'dark') {
      setTheme('dark');
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cjbs-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={`ide-wrapper ${theme === 'light' ? 'ide-light' : 'ide-dark'}`}>

        {/* Header */}
        <header className="ide-header">
          <div style={{ width: '40px' }} /> {/* Spacer for centering */}
          <LogoCJBS />
          <button
            className="ide-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? <IcoSun /> : <IcoMoon />}
          </button>
        </header>

        {/* Main Directory Tree */}
        <main className="ide-main">
          <div className="ide-tree-container" role="tree" aria-label="CJBS Studio Projects">

            {/* Root Folder */}
            <div
              className="tree-row delay-0"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', fontWeight: 'bold', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => setIsOpen(!isOpen)}
              role="treeitem"
              aria-expanded={isOpen}
            >
              <IcoChevron open={isOpen} />
              <IcoFolder open={isOpen} />
              <span>cjbs-studio/</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateRows: isOpen ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.3s ease-out',
            }}>
              <div style={{ overflow: 'hidden' }}>
                <div className="tree-branch">

                  {/* Project 1 */}
                  <Link href="/barberia" className="tree-item tree-row delay-1" role="treeitem">
                    <div className="tree-item-inner">
                      <span style={{ width: '12px' }} /> {/* indent matching chevron */}
                      <IcoFileTsx />
                      <span className="tree-item-name">barberia</span>
                      <span className="tree-item-comment">// barbería clásica, reservas por WhatsApp</span>
                    </div>
                  </Link>

                  {/* Project 2 */}
                  <Link href="/cafe" className="tree-item tree-row delay-2" role="treeitem">
                    <div className="tree-item-inner" style={{ alignItems: 'flex-start' }}>
                      <span style={{ width: '12px', marginTop: '2px' }} />
                      <div style={{ marginTop: '2px' }}><IcoFileTsx /></div>
                      <span className="tree-item-name" style={{ marginTop: '2px' }}>cafe-aromas</span>
                      <div className="tree-item-comment" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span>// menú interactivo y pedidos</span>
                        <span>// panel de administración: /cafe/admin — contraseña: Cafe2004</span>
                      </div>
                    </div>
                  </Link>

                  {/* Project 3 */}
                  <Link href="/tienda" className="tree-item tree-row delay-3" role="treeitem">
                    <div className="tree-item-inner">
                      <span style={{ width: '12px' }} />
                      <IcoFileTsx />
                      <span className="tree-item-name">tienda</span>
                      <span className="tree-item-comment">// tienda e-commerce estilo hypebeast</span>
                    </div>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

