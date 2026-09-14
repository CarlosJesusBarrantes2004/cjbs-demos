'use client';
import { flushSync } from 'react-dom';

import { useState, useEffect, useCallback, useRef } from 'react';
import './styles.css';
import { Cat, Product, CartItem, CATS, PRODUCTS, TICKER_ITEMS, LOOKBOOK, FAQS, IG_FEED, waLink, WA_GENERAL } from './data';
import { IcoWA, IcoBag, IcoPlus, IcoMinus, IcoX, IcoMenu, IcoChevron, IcoArrow, IcoSun, IcoMoon } from './icons';

function ProductImage({ src, alt, className, loading = 'lazy' }: { src: string, alt: string, className?: string, loading?: 'lazy' | 'eager' }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`${className || ''} img-fallback`} aria-label={`Imagen no disponible para ${alt}`}>
        <IcoBag s={32} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setError(true)} />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TiendaNeoLimaPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState<Cat>('Todos');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const handleFilterChange = useCallback((newFilter: Cat) => {
    if (newFilter === filter) return;
    if (!document.startViewTransition) {
      setFilter(newFilter);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        setFilter(newFilter);
      });
    });
  }, [filter]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const goTo = useCallback((id: string) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [closeMenu]);

  // Cart helpers
  const addToCart = useCallback((product: Product, talla: string) => {
    setCart(prev => {
      const exists = prev.find(i => i.productId === product.id && i.talla === talla);
      if (exists) {
        return prev.map(i =>
          i.productId === product.id && i.talla === talla ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { productId: product.id, nombre: product.nombre, precio: product.precio, talla, qty: 1, img: product.img }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, talla: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.talla === talla)));
  }, []);

  const updateQty = useCallback((productId: string, talla: string, delta: number) => {
    setCart(prev =>
      prev.flatMap(i => {
        if (i.productId !== productId || i.talla !== talla) return [i];
        const newQty = i.qty + delta;
        return newQty <= 0 ? [] : [{ ...i, qty: newQty }];
      })
    );
  }, []);

  const total = cart.reduce((s, i) => s + i.precio * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const checkout = useCallback(() => {
    if (cart.length === 0) return;
    const lines = cart.map(i => `- ${i.qty}x ${i.nombre} (Talla ${i.talla}) - S/ ${i.precio * i.qty}`).join('\n');
    const msg = `¡Hola NEO-LIMA! Quiero confirmar este pedido:\n${lines}\nTotal a pagar: S/ ${total}\nMétodo de pago preferido: Yape / Plin`;
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
  }, [cart, total]);

  // Filtered products
  const products = filter === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  const newDrops = PRODUCTS.filter(p => p.badge === 'Nuevo drop').slice(0, 4);

  // Ticker content duplicated for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      
      <div className="nl">

        {/* ── TICKER ────────────────────────────────────────────── */}
        <div className="ticker" aria-label="Información de la tienda" role="marquee">
          <div className="ticker-track">
            {tickerItems.map((item, i) => (
              <span key={i} className="ticker-item">
                {item}
                <span className="ticker-sep" aria-hidden="true">&nbsp;•&nbsp;</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── HEADER ────────────────────────────────────────────── */}
        <header className="hdr" role="banner">
          <div className="hdr-i">
            <a href="#inicio" className="logo" onClick={e => { e.preventDefault(); goTo('inicio'); }} aria-label="NEO-LIMA Streetwear — ir al inicio">
              NEO<em>-LIMA</em>
            </a>

            <nav className="nav" aria-label="Navegación principal">
              <button className="na" onClick={() => goTo('catalogo')}>Catálogo</button>
              <button className="na" onClick={() => goTo('lookbook')}>Lookbook</button>
              <button className="na" onClick={() => goTo('faq')}>FAQ</button>
            </nav>

            {mounted && (
              <button
                className="theme-btn"
                onClick={toggleTheme}
                aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
              >
                {theme === 'dark' ? <IcoSun s={20} /> : <IcoMoon s={20} />}
              </button>
            )}

            <button
              className="cart-btn"
              onClick={() => setCartOpen(v => !v)}
              aria-label={`Abrir carrito — ${itemCount} ${itemCount === 1 ? 'ítem' : 'ítems'}`}
            >
              <IcoBag s={20} />
              {itemCount > 0 && (
                <span className="cart-badge" aria-hidden="true" key={itemCount}>{itemCount}</span>
              )}
            </button>

            <button className="ham" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
              {menuOpen ? <IcoX s={20} /> : <IcoMenu s={20} />}
            </button>
          </div>

          {menuOpen && (
            <nav className="mob" aria-label="Menú de navegación móvil">
              <button className="mob-a" onClick={() => goTo('catalogo')}>Catálogo</button>
              <button className="mob-a" onClick={() => goTo('lookbook')}>Lookbook</button>
              <button className="mob-a" onClick={() => goTo('faq')}>FAQ</button>
              <button className="mob-a" onClick={() => { closeMenu(); setCartOpen(true); }}>Carrito ({itemCount})</button>
            </nav>
          )}
        </header>

        <main>
          {/* ── HERO ──────────────────────────────────────────────── */}
        <section id="inicio" className="hero" aria-labelledby="hero-h1">
          <div className="hero-l">
            <h1 id="hero-h1" className="hero-h1">
              NO ES SOLO<br />ROPA,<br />ES POSTURA.
            </h1>

            <p className="hero-sub">
              Streetwear hecho para las calles de Lima.
              Algodón pesado 280g, corte boxy, ediciones limitadas
              que no vas a encontrar en ningún mall.
            </p>

            <div className="hero-ctas">
              <button className="btn btn-r" onClick={() => goTo('catalogo')} aria-label="Ver el catálogo completo">
                Ver el drop <IcoArrow s={14} />
              </button>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn btn-g" aria-label="Consultar por WhatsApp">
                <IcoWA s={14} /> Consultar
              </a>
            </div>
          </div>

          <div className="hero-r" aria-hidden="true">
            <ProductImage
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=85&fit=crop&crop=top"
              alt="Modelo con ropa NEO-LIMA Streetwear"
              className="hero-img"
              loading="eager"
            />
            <div className="hero-img-ov" />
          </div>
        </section>

        {/* ── NUEVOS DROPS ──────────────────────────────────────── */}
        {newDrops.length > 0 && (
          <section className="new-drops" aria-labelledby="nd-h2">
            <div className="nw">
              <h2 id="nd-h2" className="nd-h2">RECIÉN LLEGADO.</h2>
              <div className="nd-grid" role="list">
                {newDrops.map(product => (
                  <article key={`nd-${product.id}`} className="nd-card" role="listitem">
                    <ProductImage src={product.img} alt={product.nombre} className="nd-img" />
                    <div className="nd-body">
                      <h3 className="nd-name">{product.nombre}</h3>
                      <div className="nd-price">S/ {product.precio}</div>
                      <button className="btn btn-g nd-btn" onClick={() => goTo('catalogo')}>Ver en catálogo</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FILTROS ───────────────────────────────────────────── */}
        <div className="filter-bar" role="navigation" aria-label="Filtrar productos">
          <div className="filter-i">
            {CATS.map(c => (
              <button
                key={c}
                className={`filter-btn${filter === c ? ' on' : ''}`}
                onClick={() => handleFilterChange(c)}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ── CATÁLOGO ──────────────────────────────────────────── */}
        <section id="catalogo" className="catalog" aria-labelledby="cat-h2">
          <div className="nw">
            <div className="prod-grid">
              {products.map(product => {
                const selectedTalla = selectedSizes[product.id] ?? '';
                const canAdd = selectedTalla !== '';
                return (
                  <article 
                    key={product.id} 
                    className="prod-card" 
                    aria-label={`${product.nombre} — S/ ${product.precio}`}
                    style={{ viewTransitionName: `prod-${product.id}` } as React.CSSProperties}
                  >
                    <div className="prod-img-wrap">
                      <ProductImage src={product.img} alt={product.nombre} className="prod-img" />
                      {product.badge && <span className="prod-badge">{product.badge}</span>}
                    </div>
                    <div className="prod-body">
                      <div className="prod-head-row">
                        <h3 className="prod-name">{product.nombre}</h3>
                        {product.badge === 'Stock limitado' && product.stock && (
                          <span className="prod-stock-alert" aria-live="polite">🔥 Solo quedan {product.stock}</span>
                        )}
                      </div>
                      <div className="sz-wrap">
                        <div className="sz-head">
                          <span className="sz-lbl">TALLA</span>
                          <button className="sz-guide-btn" onClick={() => setSizeGuideOpen(true)}>Guía de tallas</button>
                        </div>
                        <div className={`sizes${errorId === product.id ? ' err-shake' : ''}`} role="group" aria-label={`Tallas de ${product.nombre}`}>
                          {product.tallas.map(t => (
                            <button
                              key={t}
                              className={`sz${selectedTalla === t ? ' on' : ''}`}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: t }))}
                              aria-pressed={selectedTalla === t}
                              aria-label={`Talla ${t}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="prod-foot">
                        <div className="prod-price" aria-label={`Precio: S/ ${product.precio}`}>
                          <span>S/ </span>{product.precio}
                        </div>
                        <button
                          className={`add-btn${canAdd ? ' ready' : ''}`}
                          onClick={() => {
                            if (canAdd) {
                              addToCart(product, selectedTalla);
                              setErrorId(null);
                            } else {
                              setErrorId(product.id);
                              setTimeout(() => setErrorId(null), 800);
                            }
                          }}
                          aria-label={canAdd ? `Agregar ${product.nombre} talla ${selectedTalla} al carrito` : 'Selecciona una talla primero'}
                        >
                          <IcoPlus s={12} />
                          {canAdd ? 'Agregar' : 'Elige talla'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CALIDAD ───────────────────────────────────────────── */}
        <section className="quality" aria-label="Estándares de calidad">
          <div className="nw">
            <div className="qual-grid">
              <div className="qual-item">
                <div className="qual-num">280g</div>
                <div className="qual-title">Algodón reactivo pesado</div>
                <p className="qual-desc">Tela gruesa que no se deforma. Mantiene la forma después de múltiples lavados. Sin mezcla sintética.</p>
              </div>
              <div className="qual-item">
                <div className="qual-num">Boxy</div>
                <div className="qual-title">Corte oversized real</div>
                <p className="qual-desc">No es un talle más grande disfrazado de oversize. El patrón está diseñado desde cero con caída natural.</p>
              </div>
              <div className="qual-item">
                <div className="qual-num">24h</div>
                <div className="qual-title">Envío express Lima</div>
                <p className="qual-desc">Pedidos antes de las 2 PM salen ese mismo día. Lima Metropolitana en 24–48 h, provincias en 3–5 días.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOOKBOOK ──────────────────────────────────────────── */}
        <section id="lookbook" className="lookbook" aria-labelledby="lb-h2">
          <div className="nw">
            <div className="lb-head">
              <h2 id="lb-h2" className="lb-h2">LA CALLE<br />HABLA.</h2>
              <p className="lb-note">Outfits reales. Gente real. Sin filtros de agencia.</p>
            </div>
            <div className="lb-grid">
              {LOOKBOOK.map((item, i) => (
                <div key={i} className="lb-card" aria-label={item.quote}>
                  <ProductImage src={item.img} alt={`Outfit NEO-LIMA ${i + 1}`} className="lb-img" />
                  <div className="lb-ov" aria-hidden="true" />
                  <p className="lb-quote" aria-hidden="true">{item.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" className="faq" aria-labelledby="faq-h2">
          <div className="nw">
            <h2 id="faq-h2" className="faq-h2">PREGUNTAS<br />FRECUENTES.</h2>
            <div className="faq-list" role="list">
              {FAQS.map((item, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div key={i} className="faq-item" role="listitem">
                    <button
                      className="faq-q"
                      onClick={() => setActiveFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      id={`faq-q-${i}`}
                    >
                      {item.q}
                      <IcoChevron s={18} open={isOpen} />
                    </button>
                    <div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className={`faq-a${isOpen ? ' open' : ''}`}
                    >
                      <div className="faq-a-wrapper">
                        <div className="faq-a-inner">{item.a}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── IG FEED ───────────────────────────────────────────── */}
        <section className="ig-section" aria-labelledby="ig-h2">
          <div className="nw">
            <h2 id="ig-h2" className="ig-h2">SÍGUENOS <a href="https://instagram.com/neolima.pe" target="_blank" rel="noopener noreferrer">@NEOLIMA.PE</a></h2>
            <div className="ig-grid">
              {IG_FEED.map((img, i) => (
                <a key={i} href="https://instagram.com/neolima.pe" target="_blank" rel="noopener noreferrer" className="ig-item" aria-label={`Ver publicación en Instagram ${i + 1}`}>
                  <ProductImage src={img} alt={`Publicación Instagram ${i + 1}`} className="ig-img" />
                </a>
              ))}
            </div>
          </div>
        </section>
        </main>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer className="ftr" role="contentinfo">
          <div className="nw">
            <div className="ftr-i">
              <div className="ftr-brand">NEO<em>-LIMA</em></div>
              <div className="ftr-cols">
                <div>
                  <div className="ftr-col-h">Tienda</div>
                  <div className="ftr-col-links">
                    <button className="ftr-lnk" onClick={() => goTo('catalogo')}>Catálogo</button>
                    <button className="ftr-lnk" onClick={() => goTo('lookbook')}>Lookbook</button>
                    <button className="ftr-lnk" onClick={() => goTo('faq')}>FAQ</button>
                  </div>
                </div>
                <div>
                  <div className="ftr-col-h">Políticas</div>
                  <div className="ftr-col-links">
                    <button className="ftr-lnk" onClick={() => goTo('faq')}>Envíos</button>
                    <button className="ftr-lnk" onClick={() => goTo('faq')}>Cambios y devoluciones</button>
                    <button className="ftr-lnk" onClick={() => goTo('faq')}>Privacidad</button>
                  </div>
                </div>
                <div>
                  <div className="ftr-col-h">Atención al cliente</div>
                  <div className="ftr-col-links">
                    <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="ftr-wa" aria-label="Contactar por WhatsApp">
                      <IcoWA /> +51 926 667 079
                    </a>
                    <span className="ftr-lnk" style={{ cursor: 'default', fontSize: '11px', color: 'var(--dim)', marginTop: '4px' }}>Lun – Sáb · 9 AM – 9 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ftr-bot">
              <p className="ftr-copy">© {new Date().getFullYear()} NEO-LIMA Streetwear. Lima, Perú.</p>
              <p className="ftr-credit">Desarrollado por <b>CJBS Studio</b> · <em>@cjbs.dev</em></p>
            </div>
          </div>
        </footer>

        {/* ── SIZE GUIDE MODAL ──────────────────────────────────── */}
        <div
          className={`backdrop${sizeGuideOpen ? ' on' : ''}`}
          onClick={() => setSizeGuideOpen(false)}
          aria-hidden="true"
          style={{ zIndex: 1000 }}
        />
        <div className={`sz-modal${sizeGuideOpen ? ' on' : ''}`} role="dialog" aria-modal="true" aria-labelledby="sz-title">
          <div className="sz-modal-head">
            <h2 id="sz-title" className="sz-modal-title">GUÍA DE TALLAS</h2>
            <button className="sz-modal-close" onClick={() => setSizeGuideOpen(false)} aria-label="Cerrar guía">
              <IcoX s={20} />
            </button>
          </div>
          <div className="sz-modal-body">
            <p className="sz-modal-desc">Medidas en centímetros. Nuestras prendas tienen un corte <b>boxy oversized</b>. Pide tu talla habitual para un fit holgado, o una menos si prefieres un ajuste clásico.</p>
            <div className="sz-table-wrap">
              <table className="sz-table">
                <thead>
                  <tr>
                    <th>Talla</th>
                    <th>Pecho</th>
                    <th>Largo</th>
                    <th>Manga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>S</td><td>58 cm</td><td>68 cm</td><td>22 cm</td></tr>
                  <tr><td>M</td><td>62 cm</td><td>72 cm</td><td>23 cm</td></tr>
                  <tr><td>L</td><td>66 cm</td><td>74 cm</td><td>24 cm</td></tr>
                  <tr><td>XL</td><td>70 cm</td><td>76 cm</td><td>25 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── CART BACKDROP ─────────────────────────────────────── */}
        <div
          className={`backdrop${cartOpen ? ' on' : ''}`}
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />

        {/* ── CART DRAWER ───────────────────────────────────────── */}
        <div
          className={`drawer${cartOpen ? ' on' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Carrito de compras"
        >
          <div className="drawer-head">
            <span className="drawer-title">CARRITO</span>
            <button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">
              <IcoX s={18} />
            </button>
          </div>

          <div className="drawer-body">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <IcoBag s={48} />
                <span>Tu carrito está vacío.<br />Explora el drop antes de que se agote.</span>
              </div>
            ) : (
              cart.map(item => (
                <div key={`${item.productId}-${item.talla}`} className="cart-row">
                  <ProductImage src={item.img} alt={item.nombre} className="cart-thumb" />
                  <div className="cart-info">
                    <div className="cart-name">{item.nombre}</div>
                    <div className="cart-talla">Talla: {item.talla}</div>
                    <div className="cart-price">S/ {item.precio * item.qty}</div>
                    <div className="qty-ctrl" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                      <button className="qty-btn" onClick={() => updateQty(item.productId, item.talla, -1)} aria-label="Quitar uno">
                        <IcoMinus s={12} />
                      </button>
                      <span className="qty-val" aria-live="polite">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.productId, item.talla, 1)} aria-label="Agregar uno">
                        <IcoPlus s={12} />
                      </button>
                    </div>
                  </div>
                  <button className="cart-del" onClick={() => removeFromCart(item.productId, item.talla)} aria-label={`Eliminar ${item.nombre} del carrito`}>
                    <IcoX s={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="drawer-foot">
            <div className="subtotal-row">
              <span className="subtotal-lbl">Total</span>
              <span className="subtotal-val" aria-live="polite">S/ {total}</span>
            </div>
            <button
              className="btn btn-wa"
              onClick={checkout}
              disabled={cart.length === 0}
              aria-label="Confirmar pedido por WhatsApp con Yape o Plin"
            >
              <IcoWA s={16} /> Pedir por WhatsApp (Yape / Plin)
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
