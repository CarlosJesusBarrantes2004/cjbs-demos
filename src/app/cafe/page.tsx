'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

const WA = '51926667079';

function waLink(msg: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

const WA_GENERAL = waLink('Hola, quiero hacer un pedido en Café Aromas.');
const WA_RESERVA = waLink('Hola, quiero reservar una mesa en Café Aromas. ¿Tienen disponibilidad?');

function waItem(nombre: string) {
  return waLink(`Hola, quiero pedir "${nombre}" en Café Aromas. ¿Está disponible?`);
}

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Cat = 'Bebidas' | 'Desayunos' | 'Postres';

interface MenuItem {
  id: string;
  cat: Cat;
  nombre: string;
  desc: string;
  precio: number;
  img: string;
  badge?: string;
}

const CATS: Cat[] = ['Bebidas', 'Desayunos', 'Postres'];

const MENU: MenuItem[] = [
  // Bebidas
  {
    id: 'americano', cat: 'Bebidas', nombre: 'Café Americano', precio: 8,
    desc: 'Espresso doble con agua caliente. Perfecto para empezar el día sin rodeos.',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&fit=crop&crop=center',
    badge: 'Más pedido',
  },
  {
    id: 'latte', cat: 'Bebidas', nombre: 'Latte de Vainilla', precio: 12,
    desc: 'Espresso con leche vaporizada y sirope de vainilla artesanal.',
    img: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80&fit=crop&crop=center',
  },
  {
    id: 'cappuccino', cat: 'Bebidas', nombre: 'Cappuccino Clásico', precio: 11,
    desc: 'Espresso, leche caliente y espuma densa en proporciones perfectas.',
    img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=80&fit=crop&crop=center',
  },
  {
    id: 'matcha', cat: 'Bebidas', nombre: 'Matcha Latte', precio: 14,
    desc: 'Matcha ceremonial japonés con leche de avena. Energía sin ansiedad.',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80&fit=crop&crop=center',
    badge: 'Favorito',
  },
  {
    id: 'te', cat: 'Bebidas', nombre: 'Infusión de Hierbas', precio: 8,
    desc: 'Selección de hierbas frescas: menta, jengibre o manzanilla. Elige la tuya.',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&fit=crop&crop=center',
  },
  {
    id: 'cold-brew', cat: 'Bebidas', nombre: 'Cold Brew 24h', precio: 13,
    desc: 'Café en frío extraído durante 24 horas. Suave, concentrado y sin amargura.',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&fit=crop&crop=center',
  },
  // Desayunos
  {
    id: 'palta', cat: 'Desayunos', nombre: 'Tostadas con Palta y Huevo', precio: 18,
    desc: 'Pan artesanal tostado, palta aplastada, huevo pochado y sal de mar.',
    img: 'https://images.unsplash.com/photo-1603046891729-da3c0e4e5f4f?w=600&q=80&fit=crop&crop=center',
    badge: 'Chef recomienda',
  },
  {
    id: 'granola', cat: 'Desayunos', nombre: 'Bowl de Granola', precio: 16,
    desc: 'Granola horneada en casa, yogurt griego, frutas de temporada y miel de abeja.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop&crop=top',
  },
  {
    id: 'pancakes', cat: 'Desayunos', nombre: 'Pancakes con Miel', precio: 20,
    desc: 'Torre de tres pancakes esponjosos con miel de maracuyá y mantequilla.',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&fit=crop&crop=center',
  },
  {
    id: 'sandwich', cat: 'Desayunos', nombre: 'Sándwich Club Aromas', precio: 22,
    desc: 'Pan ciabatta, pollo a la plancha, tocino crocante, lechuga y tomate cherry.',
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&fit=crop&crop=center',
  },
  // Postres
  {
    id: 'cheesecake', cat: 'Postres', nombre: 'Cheesecake de Maracuyá', precio: 14,
    desc: 'Base de galleta, relleno cremoso y coulis de maracuyá fresco. Sin gelatina.',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&fit=crop&crop=center',
    badge: 'Postre estrella',
  },
  {
    id: 'brownie', cat: 'Postres', nombre: 'Brownie con Helado', precio: 16,
    desc: 'Brownie de chocolate 70% cacao, tibio, con una bola de helado de vainilla.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&fit=crop&crop=center',
  },
  {
    id: 'tiramisu', cat: 'Postres', nombre: 'Tiramisú Artesanal', precio: 15,
    desc: 'Receta italiana con mascarpone real, café espresso y cacao amargo en polvo.',
    img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&fit=crop&crop=center',
  },
  {
    id: 'muffin', cat: 'Postres', nombre: 'Muffin de Arándanos', precio: 10,
    desc: 'Horno propio, arándanos frescos y cobertura de crumble. Recién horneado.',
    img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&fit=crop&crop=center',
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcoWA({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function IcoMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IcoClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IcoArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IcoClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IcoMapPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IcoWifi() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function IcoPaw() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4.5C11 3.12 10.12 2 9 2S7 3.12 7 4.5 7.88 7 9 7s2-1.12 2-2.5z" />
      <path d="M17 4.5C17 3.12 16.12 2 15 2s-2 1.12-2 2.5S14.88 7 16 7s1-.88 1-2.5z" />
      <path d="M6 10.5C6 9.12 5.12 8 4 8S2 9.12 2 10.5 2.88 13 4 13s2-1.12 2-2.5z" />
      <path d="M22 10.5C22 9.12 21.12 8 20 8s-2 1.12-2 2.5S19.88 13 21 13s1-.88 1-2.5z" />
      <path d="M15 18.5c0 1.93-1.34 3.5-3 3.5s-3-1.57-3-3.5c0-2.76 1.34-6.5 3-6.5s3 3.74 3 6.5z" />
    </svg>
  );
}

function IcoPlug() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" />
      <path d="M18 8H6a2 2 0 0 0-2 2v3a6 6 0 0 0 12 0v-3a2 2 0 0 0-2-2z" />
    </svg>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Chivo:wght@300;400;500;700&display=swap');

/* ── TOKENS ─────────────────────────────────────────────── */
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
  overflow-x: hidden;
}

/* ── BASE ────────────────────────────────────────────────── */
.ca *, .ca *::before, .ca *::after { box-sizing: border-box; }
.ca h1,.ca h2,.ca h3,.ca h4 { margin: 0; }
.ca p { margin: 0; }
.ca ul { margin: 0; padding: 0; list-style: none; }
.ca button { font-family: inherit; }
.ca a { text-decoration: none; }
.ca ::-webkit-scrollbar { width: 6px; height: 6px; }
.ca ::-webkit-scrollbar-track { background: var(--bg3); }
.ca ::-webkit-scrollbar-thumb { background: var(--brd2); border-radius: 3px; }
.ca ::-webkit-scrollbar-thumb:hover { background: var(--dim); }
.ca ::selection { background: var(--a); color: #fff; }
.ca *:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; border-radius: 4px; }

/* Container */
.cw { max-width: 1140px; margin: 0 auto; padding: 0 24px; }

/* ── HEADER ──────────────────────────────────────────────── */
.hdr { position: fixed; inset: 0 0 auto; z-index: 200; padding: 20px 0; transition: background var(--t) var(--e), box-shadow var(--t) var(--e), padding var(--t) var(--e); }
.hdr.on { background: rgba(249,245,239,.95); box-shadow: 0 1px 0 var(--brd); padding: 13px 0; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.hdr-i { max-width: 1140px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 10px; }

/* Logo */
.logo { display: flex; flex-direction: column; text-decoration: none; gap: 0; }
.logo-name { font-family: var(--fd); font-size: 18px; letter-spacing: .06em; color: var(--txt); line-height: 1; font-weight: 900; }
.logo-sub { font-size: 10px; font-weight: 500; color: var(--dim); letter-spacing: .14em; text-transform: uppercase; margin-top: 2px; }

/* Nav */
.nav { display: flex; align-items: center; gap: 2px; margin-left: auto; }
.na { background: none; border: none; cursor: pointer; font-size: 12px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--sub); padding: 7px 13px; border-radius: 6px; transition: color var(--t) var(--e), background var(--t) var(--e); }
.na:hover { color: var(--txt); background: var(--bg3); }
.na:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }

/* CTA header */
.hdr-cta { display: inline-flex; align-items: center; gap: 7px; background: var(--a); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 9px 18px; border-radius: var(--r); border: none; cursor: pointer; text-decoration: none; transition: background var(--t) var(--e), transform var(--t) var(--e); white-space: nowrap; }
.hdr-cta:hover { background: var(--a2); transform: translateY(-1px); }
.hdr-cta:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }

/* Hamburger */
.ham { display: none; align-items: center; justify-content: center; width: 36px; height: 36px; background: none; border: 1px solid var(--brd); border-radius: var(--r); color: var(--txt); cursor: pointer; margin-left: auto; flex-shrink: 0; transition: border-color var(--t) var(--e); }
.ham:hover { border-color: var(--a-brd); }
.ham:focus-visible { outline: 2px solid var(--a); }

/* Mobile menu */
.mob { padding: 12px 24px 20px; border-top: 1px solid var(--brd); background: var(--bg); display: flex; flex-direction: column; gap: 2px; animation: mdn .16s var(--e) both; }
@keyframes mdn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
.mob-a { background: none; border: none; cursor: pointer; font-size: 13px; font-weight: 700; color: var(--sub); text-align: left; padding: 12px 8px; border-radius: var(--r); letter-spacing: .06em; text-transform: uppercase; transition: color var(--t) var(--e), background var(--t) var(--e); }
.mob-a:hover { color: var(--txt); background: var(--bg3); }
.mob-cta { margin-top: 8px; text-align: center; }

/* ── BOTONES ─────────────────────────────────────────────── */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--fb); font-weight: 700; border: none; border-radius: var(--r); cursor: pointer; text-decoration: none; letter-spacing: .05em; text-transform: uppercase; font-size: 12px; transition: all var(--t) var(--e); white-space: nowrap; -webkit-tap-highlight-color: transparent; }
.btn:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }
.btn-prim { background: var(--a); color: #fff; padding: 13px 24px; box-shadow: 0 2px 12px rgba(196,98,45,.22); }
.btn-prim:hover { background: var(--a2); transform: translateY(-1px); box-shadow: 0 4px 18px rgba(196,98,45,.32); }
.btn-prim:active { transform: none; }
.btn-ghost { background: transparent; color: var(--sub); padding: 12px 20px; border: 1px solid var(--brd); }
.btn-ghost:hover { color: var(--txt); border-color: var(--brd2); background: var(--bg3); }
.btn-item { background: var(--a-bg); color: var(--a); padding: 9px 16px; border: 1px solid var(--a-brd); font-size: 11px; }
.btn-item:hover { background: var(--a); color: #fff; border-color: var(--a); }

/* ── HERO ────────────────────────────────────────────────── */
.hero { padding-top: 96px; display: grid; grid-template-columns: 1fr 1fr; min-height: 100svh; background: var(--bg); }
.hero-l { display: flex; flex-direction: column; justify-content: center; padding: 64px 48px 64px 0; padding-left: max(24px, calc((100vw - 1140px) / 2 + 24px)); }
.hero-r { position: relative; overflow: hidden; background: var(--bg3); }
.hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* Nota sobre el café */
.hero-note { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--a); margin-bottom: 24px; }
.hero-note::before { content: ''; width: 24px; height: 2px; background: var(--a); flex-shrink: 0; }

.hero-h1 { font-family: var(--fd); font-size: clamp(44px, 6vw, 80px); line-height: .95; letter-spacing: .02em; text-transform: uppercase; color: var(--txt); margin-bottom: 18px; font-weight: 900; }
.hero-h1 mark { background: none; color: var(--a); }

.hero-sub { font-size: clamp(15px, 1.4vw, 17px); line-height: 1.68; color: var(--sub); font-weight: 300; margin-bottom: 36px; max-width: 400px; }

.hero-proof { display: flex; gap: 28px; margin-bottom: 36px; }
.hp-item { display: flex; flex-direction: column; gap: 2px; }
.hp-val { font-family: var(--fd); font-size: 22px; letter-spacing: .04em; color: var(--txt); line-height: 1; font-weight: 900; }
.hp-lbl { font-size: 11px; font-weight: 600; color: var(--dim); letter-spacing: .08em; text-transform: uppercase; }

.hero-ctas { display: flex; gap: 10px; flex-wrap: wrap; }

/* Floating badge sobre foto */
.hero-badge { position: absolute; bottom: 32px; left: 32px; background: rgba(249,245,239,.96); border: 1px solid var(--brd); border-radius: var(--rl); padding: 14px 18px; display: flex; flex-direction: column; gap: 3px; backdrop-filter: blur(8px); box-shadow: 0 4px 20px rgba(28,17,10,.12); }
.hb-val { font-family: var(--fd); font-size: 17px; letter-spacing: .04em; color: var(--txt); line-height: 1; font-weight: 900; }
.hb-lbl { font-size: 10px; font-weight: 700; color: var(--dim); letter-spacing: .1em; text-transform: uppercase; }

/* ── MENÚ ────────────────────────────────────────────────── */
.menu-sec { padding: 88px 0; background: var(--bg); }
.menu-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; }
.menu-h2 { font-family: var(--fd); font-size: clamp(32px, 4vw, 52px); letter-spacing: .04em; text-transform: uppercase; color: var(--txt); line-height: .95; font-weight: 900; }
.menu-intro { font-size: 14px; color: var(--sub); line-height: 1.65; max-width: 280px; font-weight: 300; padding-top: 8px; }

/* Tabs */
.tabs { display: flex; gap: 4px; background: var(--bg3); border-radius: 10px; padding: 4px; margin-bottom: 40px; width: fit-content; border: 1px solid var(--brd); }
.tab { background: none; border: none; cursor: pointer; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--sub); padding: 9px 22px; border-radius: 7px; transition: all var(--t) var(--e); white-space: nowrap; }
.tab:hover { color: var(--txt); background: rgba(255,255,255,.6); }
.tab.on { background: var(--bg2); color: var(--a); box-shadow: 0 1px 4px rgba(28,17,10,.08); }
.tab:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }

/* Grid de items */
.menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

/* Card de ítem de menú */
.m-card { background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--rl); overflow: hidden; display: flex; flex-direction: column; transition: box-shadow var(--t) var(--e), transform var(--t) var(--e), border-color var(--t) var(--e); }
.m-card:hover { box-shadow: 0 8px 28px rgba(28,17,10,.1); transform: translateY(-3px); border-color: var(--brd2); }
.m-card-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; background: var(--bg3); }
.m-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s var(--e); }
.m-card:hover .m-card-img { transform: scale(1.04); }
.m-badge { position: absolute; top: 12px; left: 12px; background: var(--a); color: #fff; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; padding: 4px 9px; border-radius: 4px; }
.m-card-body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.m-name { font-size: 15px; font-weight: 700; color: var(--txt); line-height: 1.25; }
.m-desc { font-size: 13px; color: var(--sub); line-height: 1.55; font-weight: 300; flex: 1; }
.m-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 12px; border-top: 1px solid var(--brd); flex-wrap: wrap; }
.m-price { font-family: var(--fd); font-size: 22px; letter-spacing: .03em; color: var(--a); line-height: 1; font-weight: 900; }
.m-price span { font-family: var(--fb); font-size: 13px; font-weight: 700; opacity: .7; }

/* ── INFO: HORARIOS Y COMODIDADES ────────────────────────── */
.info-sec { padding: 88px 0; background: var(--bg3); border-top: 1px solid var(--brd); border-bottom: 1px solid var(--brd); }
.info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
.info-block { background: var(--bg2); border: 1px solid var(--brd); border-radius: var(--rl); padding: 32px 28px; display: flex; flex-direction: column; gap: 0; }
.info-h3 { font-family: var(--fd); font-size: 20px; letter-spacing: .05em; text-transform: uppercase; color: var(--txt); margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px solid var(--brd); font-weight: 900; }
.sch-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--brd); }
.sch-row:last-child { border-bottom: none; }
.sch-day { font-size: 13px; font-weight: 500; color: var(--sub); }
.sch-hrs { font-size: 13px; font-weight: 700; color: var(--a); }
.sch-cls { font-size: 12px; font-weight: 600; color: var(--dim); }
.como-list { display: flex; flex-direction: column; gap: 0; }
.como-item { display: flex; align-items: center; gap: 11px; padding: 12px 0; border-bottom: 1px solid var(--brd); font-size: 13px; font-weight: 500; color: var(--sub); }
.como-item:last-child { border-bottom: none; }
.como-ico { color: var(--a); opacity: .8; flex-shrink: 0; display: flex; align-items: center; }
.dir-content { display: flex; flex-direction: column; gap: 12px; }
.dir-line { display: flex; align-items: flex-start; gap: 10px; }
.dir-ico { color: var(--a); opacity: .8; flex-shrink: 0; margin-top: 1px; display: flex; }
.dir-txt { font-size: 13px; font-weight: 500; color: var(--sub); line-height: 1.55; }
.dir-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--dim); margin-bottom: 3px; }

/* ── CTA FINAL ───────────────────────────────────────────── */
.cta-sec { padding: 96px 0; background: var(--bg); }
.cta-inner { display: grid; grid-template-columns: 1fr auto; gap: 64px; align-items: center; }
.cta-h2 { font-family: var(--fd); font-size: clamp(36px, 4.8vw, 64px); letter-spacing: .03em; text-transform: uppercase; color: var(--txt); line-height: .95; margin-bottom: 16px; font-weight: 900; }
.cta-h2 mark { background: none; color: var(--a); }
.cta-sub { font-size: 15px; color: var(--sub); line-height: 1.65; font-weight: 300; margin-bottom: 28px; max-width: 440px; }
.cta-num { font-family: var(--fd); font-size: clamp(24px, 3vw, 38px); letter-spacing: .06em; color: var(--a); text-decoration: none; display: block; font-weight: 900; line-height: 1; transition: color var(--t) var(--e); }
.cta-num:hover { color: var(--a2); }
.cta-num-label { font-size: 10px; font-weight: 700; color: var(--dim); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 6px; }

/* ── FOOTER ──────────────────────────────────────────────── */
.ftr { background: var(--txt); color: #f9f5ef; padding: 36px 0 24px; }
.ftr-i { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; padding-bottom: 22px; border-bottom: 1px solid rgba(255,255,255,.08); margin-bottom: 18px; }
.ftr-brand { font-family: var(--fd); font-size: 20px; letter-spacing: .06em; color: #f9f5ef; font-weight: 900; margin-right: auto; }
.ftr-brand em { color: var(--a); font-style: normal; }
.ftr-links { display: flex; gap: 2px; flex-wrap: wrap; }
.ftr-lnk { background: none; border: none; cursor: pointer; font-size: 11px; font-weight: 700; color: rgba(249,245,239,.45); padding: 6px 11px; border-radius: 4px; text-decoration: none; display: inline-flex; letter-spacing: .08em; text-transform: uppercase; transition: color var(--t) var(--e), background var(--t) var(--e); }
.ftr-lnk:hover { color: #f9f5ef; background: rgba(255,255,255,.06); }
.ftr-lnk:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }
.ftr-wa { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: var(--grn); text-decoration: none; padding: 7px 13px; border-radius: var(--r); border: 1px solid rgba(29,185,84,.25); transition: background var(--t) var(--e), border-color var(--t) var(--e); }
.ftr-wa:hover { background: rgba(29,185,84,.08); border-color: rgba(29,185,84,.45); }
.ftr-wa:focus-visible { outline: 2px solid var(--grn); }
.ftr-wa svg { width: 15px; height: 15px; }
.ftr-bot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
.ftr-copy { font-size: 11px; color: rgba(249,245,239,.35); }
.ftr-credit { font-size: 11px; color: rgba(249,245,239,.35); }
.ftr-credit b { color: rgba(249,245,239,.6); font-weight: 600; }
.ftr-credit em { color: var(--a); font-style: normal; font-weight: 500; }

/* ── FAB ─────────────────────────────────────────────────── */
.fab { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 58px; height: 58px; border-radius: 50%; background: #1db954; color: #fff; display: flex; align-items: center; justify-content: center; text-decoration: none; box-shadow: 0 4px 18px rgba(29,185,84,.38); transition: background var(--t) var(--e), transform var(--t) var(--e), box-shadow var(--t) var(--e); animation: fp 3s ease-in-out infinite; }
.fab:hover { background: #17a048; transform: scale(1.08); box-shadow: 0 6px 26px rgba(29,185,84,.52); animation: none; }
.fab:focus-visible { outline: 3px solid #1db954; outline-offset: 4px; animation: none; }
.fab svg { width: 27px; height: 27px; }
@media (prefers-reduced-motion: no-preference) {
  @keyframes fp { 0%,100%{box-shadow:0 4px 18px rgba(29,185,84,.38),0 0 0 0 rgba(29,185,84,.3)} 55%{box-shadow:0 4px 18px rgba(29,185,84,.38),0 0 0 12px rgba(29,185,84,0)} }
}
@media (prefers-reduced-motion: reduce) { .fab { animation: none; } }

/* ── RESPONSIVE ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
  .info-grid { grid-template-columns: 1fr 1fr; }
  .info-block:last-child { grid-column: 1 / -1; }
}
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .hero-l { padding: 52px 24px 44px; }
  .hero-r { height: 380px; }
  .cta-inner { grid-template-columns: 1fr; gap: 36px; }
}
@media (max-width: 768px) {
  .nav,.hdr-cta { display: none; }
  .ham { display: flex; }
  .menu-sec { padding: 64px 0; }
  .info-sec { padding: 64px 0; }
  .cta-sec { padding: 64px 0; }
  .menu-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .info-grid { grid-template-columns: 1fr; }
  .info-block:last-child { grid-column: auto; }
  .menu-head { flex-direction: column; }
  .hero-proof { gap: 18px; }
  .ftr-i { flex-direction: column; align-items: flex-start; }
  .ftr-brand { margin-right: 0; }
  .ftr-bot { flex-direction: column; align-items: flex-start; }
  .fab { bottom: 20px; right: 20px; width: 52px; height: 52px; }
  .fab svg { width: 24px; height: 24px; }
}
@media (max-width: 520px) {
  .cw { padding: 0 16px; }
  .hdr-i { padding: 0 16px; }
  .hero-l { padding: 44px 16px 36px; }
  .hero-r { height: 280px; }
  .menu-grid { grid-template-columns: 1fr; }
  .tabs { width: 100%; justify-content: stretch; }
  .tab { flex: 1; text-align: center; }
  .hero-proof { flex-wrap: wrap; }
}
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CafeAromasPage() {
  const [tab, setTab] = useState<Cat>('Bebidas');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const goTo = useCallback((id: string) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [closeMenu]);

  const items = MENU.filter(m => m.cat === tab);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ca">

        {/* ── HEADER ──────────────────────────────────────────── */}
        <header className={`hdr${scrolled ? ' on' : ''}`} role="banner">
          <div className="hdr-i">
            <a href="#inicio" className="logo" onClick={e => { e.preventDefault(); goTo('inicio'); }} aria-label="Café Aromas — ir al inicio">
              <span className="logo-name">CAFÉ AROMAS</span>
              <span className="logo-sub">Lima, Perú</span>
            </a>

            <nav className="nav" aria-label="Navegación principal">
              <button className="na" onClick={() => goTo('menu')}>Menú</button>
              <button className="na" onClick={() => goTo('info')}>Horarios</button>
              <button className="na" onClick={() => goTo('contacto')}>Contacto</button>
            </nav>

            <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="hdr-cta" aria-label="Reservar mesa por WhatsApp">
              <IcoWA size={13} /> Reservar mesa
            </a>

            <button className="ham" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
              {menuOpen ? <IcoClose /> : <IcoMenu />}
            </button>
          </div>

          {menuOpen && (
            <nav className="mob" aria-label="Menú de navegación móvil">
              <button className="mob-a" onClick={() => goTo('menu')}>Menú</button>
              <button className="mob-a" onClick={() => goTo('info')}>Horarios</button>
              <button className="mob-a" onClick={() => goTo('contacto')}>Contacto</button>
              <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="btn btn-prim mob-cta" onClick={closeMenu} style={{ width: '100%', justifyContent: 'center' }}>
                <IcoWA size={14} /> Reservar mesa
              </a>
            </nav>
          )}
        </header>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section id="inicio" className="hero" aria-labelledby="hero-h1">
          {/* Izquierda */}
          <div className="hero-l">
            <div className="hero-note" aria-label="Lima, Miraflores">
              Miraflores, Lima
            </div>

            <h1 id="hero-h1" className="hero-h1">
              EL CAFÉ<br />QUE TE<br /><mark>MERECES.</mark>
            </h1>

            <p className="hero-sub">
              Granos de origen único, preparados por baristas que conocen la diferencia
              entre un buen café y uno extraordinario.
            </p>

            <div className="hero-proof" aria-label="Cifras de la cafetería">
              <div className="hp-item">
                <span className="hp-val">4.9★</span>
                <span className="hp-lbl">Google</span>
              </div>
              <div className="hp-item">
                <span className="hp-val">6+</span>
                <span className="hp-lbl">Años abiertos</span>
              </div>
              <div className="hp-item">
                <span className="hp-val">100%</span>
                <span className="hp-lbl">Artesanal</span>
              </div>
            </div>

            <div className="hero-ctas">
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn btn-prim" aria-label="Hacer un pedido por WhatsApp">
                <IcoWA size={15} /> Hacer un pedido
              </a>
              <button className="btn btn-ghost" onClick={() => goTo('menu')} aria-label="Ver el menú completo">
                Ver menú <IcoArrow />
              </button>
            </div>
          </div>

          {/* Derecha — Foto */}
          <div className="hero-r" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=85&fit=crop&crop=center"
              alt="Interior de Café Aromas"
              className="hero-img"
              loading="eager"
            />
            <div className="hero-badge">
              <span className="hb-lbl">Especialidad del día</span>
              <span className="hb-val">Latte de Vainilla</span>
            </div>
          </div>
        </section>

        {/* ── MENÚ ─────────────────────────────────────────────── */}
        <section id="menu" className="menu-sec" aria-labelledby="menu-h2">
          <div className="cw">
            <div className="menu-head">
              <h2 id="menu-h2" className="menu-h2">NUESTRA<br />CARTA.</h2>
              <p className="menu-intro">
                Ingredientes frescos, recetas propias y un barista
                que prepara cada pedido con la misma dedicación.
              </p>
            </div>

            {/* Tabs */}
            <div role="tablist" className="tabs" aria-label="Categorías del menú">
              {CATS.map(c => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={tab === c}
                  aria-controls="menu-panel"
                  className={`tab${tab === c ? ' on' : ''}`}
                  onClick={() => setTab(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid de ítems */}
            <div
              id="menu-panel"
              role="tabpanel"
              aria-label={`Ítems de ${tab}`}
              className="menu-grid"
            >
              {items.map(item => (
                <article key={item.id} className="m-card" aria-label={`${item.nombre} — S/ ${item.precio}`}>
                  <div className="m-card-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.nombre}
                      className="m-card-img"
                      loading="lazy"
                    />
                    {item.badge && (
                      <span className="m-badge">{item.badge}</span>
                    )}
                  </div>
                  <div className="m-card-body">
                    <h3 className="m-name">{item.nombre}</h3>
                    <p className="m-desc">{item.desc}</p>
                    <div className="m-foot">
                      <div className="m-price" aria-label={`Precio: S/ ${item.precio}`}>
                        <span>S/ </span>{item.precio}
                      </div>
                      <a
                        href={waItem(item.nombre)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-item"
                        aria-label={`Pedir ${item.nombre} por WhatsApp`}
                      >
                        <IcoWA size={13} /> Pedir
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── HORARIOS / COMODIDADES / DIRECCIÓN ───────────────── */}
        <section id="info" className="info-sec" aria-labelledby="info-h2">
          <div className="cw">
            <h2 id="info-h2" className="menu-h2" style={{ marginBottom: '40px' }}>
              VISÍTANOS.
            </h2>
            <div className="info-grid">

              {/* Horarios */}
              <div className="info-block">
                <h3 className="info-h3">Horario</h3>
                <div>
                  <div className="sch-row">
                    <span className="sch-day">Lunes — Viernes</span>
                    <span className="sch-hrs">7:30 AM — 9:00 PM</span>
                  </div>
                  <div className="sch-row">
                    <span className="sch-day">Sábados</span>
                    <span className="sch-hrs">8:00 AM — 10:00 PM</span>
                  </div>
                  <div className="sch-row">
                    <span className="sch-day">Domingos</span>
                    <span className="sch-hrs">9:00 AM — 8:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Comodidades */}
              <div className="info-block">
                <h3 className="info-h3">El espacio</h3>
                <div className="como-list">
                  {[
                    { ico: <IcoWifi />, txt: 'Wi-Fi de alta velocidad' },
                    { ico: <IcoPaw />, txt: 'Pet-friendly en terraza' },
                    { ico: <IcoPlug />, txt: 'Enchufes en todas las mesas' },
                    { ico: <IcoClock />, txt: 'Espacio de trabajo disponible' },
                  ].map(({ ico, txt }) => (
                    <div key={txt} className="como-item">
                      <span className="como-ico">{ico}</span>
                      {txt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dirección y contacto */}
              <div className="info-block" id="contacto">
                <h3 className="info-h3">Cómo llegar</h3>
                <div className="dir-content">
                  <div className="dir-line">
                    <span className="dir-ico"><IcoMapPin /></span>
                    <div>
                      <p className="dir-label">Dirección</p>
                      <p className="dir-txt">Av. Petit Thouars 4863, Miraflores, Lima</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <p className="dir-label" style={{ marginBottom: '10px' }}>Contacto directo</p>
                    <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn btn-prim" style={{ width: '100%', justifyContent: 'center' }} aria-label="Escribir a Café Aromas por WhatsApp">
                      <IcoWA size={15} /> +51 926 667 079
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────── */}
        <section className="cta-sec" aria-labelledby="cta-h2">
          <div className="cw">
            <div className="cta-inner">
              <div>
                <h2 id="cta-h2" className="cta-h2">
                  TU MESA<br /><mark>TE ESPERA.</mark>
                </h2>
                <p className="cta-sub">
                  Reserva en segundos por WhatsApp y llega directamente a tu mesa.
                  Sin apps, sin filas, sin esperas.
                </p>
                <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="btn btn-prim" aria-label="Reservar mesa por WhatsApp">
                  <IcoWA size={16} /> Reservar mi mesa
                </a>
              </div>
              <div>
                <p className="cta-num-label">Número directo</p>
                <a href={`tel:+${WA}`} className="cta-num" aria-label="Llamar a Café Aromas: +51 926 667 079">
                  +51 926<br />667 079
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer className="ftr" role="contentinfo">
          <div className="cw">
            <div className="ftr-i">
              <div className="ftr-brand">CAFÉ <em>AROMAS</em></div>
              <nav className="ftr-links" aria-label="Navegación del pie de página">
                <button className="ftr-lnk" onClick={() => goTo('menu')}>Menú</button>
                <button className="ftr-lnk" onClick={() => goTo('info')}>Horarios</button>
                <button className="ftr-lnk" onClick={() => goTo('contacto')}>Contacto</button>
              </nav>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="ftr-wa" aria-label="Contactar a Café Aromas por WhatsApp">
                <IcoWA /> +51 926 667 079
              </a>
            </div>
            <div className="ftr-bot">
              <p className="ftr-copy">© {new Date().getFullYear()} Café Aromas. Lima, Perú. Todos los derechos reservados.</p>
              <p className="ftr-credit">Desarrollado por <b>CJBS Studio</b> · <em>@cjbs.dev</em></p>
            </div>
          </div>
        </footer>

        {/* ── FAB WhatsApp ─────────────────────────────────────── */}
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="fab"
          aria-label="Abrir WhatsApp para hacer un pedido en Café Aromas"
        >
          <IcoWA size={27} />
        </a>
      </div>
    </>
  );
}
