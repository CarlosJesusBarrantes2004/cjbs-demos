'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

const WA = '51926667079';

function waLink(msg: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

const WA_GENERAL = waLink('Hola, quiero reservar una cita en Barbería Don Navaja.');

function waServicio(nombre: string) {
  return waLink(`Hola, quiero reservar el servicio "${nombre}" en Barbería Don Navaja.`);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  detalles: string[];
  duracion: string;
  precio: number;
  etiqueta?: string;
}

const SERVICIOS: Servicio[] = [
  {
    id: 'fade',
    nombre: 'Corte Clásico / Degradado Fade',
    descripcion: 'Degradado técnico adaptado a tu morfología craneal. Acabado con máquina y tijera, perfil limpio con navaja.',
    detalles: ['Lavado incluido', 'Perfilado de nuca', 'Peinado final'],
    duracion: '45 min',
    precio: 25,
    etiqueta: 'Más solicitado',
  },
  {
    id: 'barba',
    nombre: 'Perfilado y Cuidado de Barba',
    descripcion: 'Afeitado con navaja recta, toalla caliente, perfilado con precisión milimétrica e hidratación post-afeitado.',
    detalles: ['Toalla caliente', 'Navaja recta', 'Bálsamo hidratante'],
    duracion: '30 min',
    precio: 18,
  },
  {
    id: 'combo',
    nombre: 'Combo Don Navaja',
    descripcion: 'La experiencia completa: corte degradado, barba con navaja y toalla caliente. El servicio que define a nuestra barbería.',
    detalles: ['Corte + Barba', 'Toalla caliente', 'Lavado y peinado'],
    duracion: '75 min',
    precio: 38,
    etiqueta: 'Experiencia VIP',
  },
  {
    id: 'tratamiento',
    nombre: 'Tratamiento Capilar / Mascarilla Negra',
    descripcion: 'Mascarilla de carbón activado con masaje capilar. Limpia poros, nutre el cuero cabelludo y reactiva el folículo.',
    detalles: ['Carbón activado', 'Masaje capilar', 'Aclarado con vapor'],
    duracion: '40 min',
    precio: 20,
  },
];

const METRICAS = [
  { valor: '5', unidad: 'barberos', nota: 'certificados' },
  { valor: '4.9★', unidad: 'en Google', nota: '180+ reseñas' },
  { valor: '8+', unidad: 'años', nota: 'de experiencia' },
  { valor: 'S/18', unidad: 'desde', nota: 'sin cobros ocultos' },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1621645585098-b80c3e981971?w=800&q=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?w=800&q=80&fit=crop&crop=center"
];

const TESTIMONIOS = [
  { nombre: "Carlos Mendoza", texto: "Fui por primera vez y la atención fue de primera. El degradado me quedó perfecto, el barbero se tomó su tiempo. 100% recomendado.", rating: 5 },
  { nombre: "Javier R.", texto: "El combo con toalla caliente es una experiencia que todos deben probar. Ambiente muy clásico y relajante.", rating: 5 },
  { nombre: "Luis Fernando", texto: "Sin esperas innecesarias. Llegas a tu hora y te atienden. El local está impecable y la música en su punto.", rating: 5 }
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcoWA({ size = 24 }: { size?: number }) {
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

function IcoSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IcoMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IcoClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IcoCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IcoArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IcoStar({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IcoScissor({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1); setService(''); setDate(''); setTime(''); setName(''); setPhone('');
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const dates = [
    { id: 'hoy', label: 'Hoy' },
    { id: 'manana', label: 'Mañana' },
    { id: 'pasado', label: 'Pasado m.' }
  ];

  const times = ['10:00 AM', '11:00 AM', '12:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'];

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!date && !!time;
    if (step === 3) return name.trim().length > 2 && phone.trim().length > 5;
    return false;
  };

  const handleNext = () => {
    if (canNext()) {
      if (step < 3) setStep(s => s + 1);
      else {
        const text = `Hola Don Navaja, quiero confirmar una reserva:\n\n✂️ Servicio: ${service}\n📅 Fecha: ${date}\n⏰ Hora: ${time}\n👤 Nombre: ${name}\n\n¿Tienen disponibilidad?`;
        window.open(`https://wa.me/51999888777?text=${encodeURIComponent(text)}`, '_blank');
        onClose();
      }
    }
  };

  return (
    <div className="bk-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="bk-title">
      <div className="bk-modal" onClick={e => e.stopPropagation()}>
        <button className="bk-close" onClick={onClose} aria-label="Cerrar modal"><IcoClose /></button>
        
        <div className="bk-hdr">
          <div className="bk-step-ind">Paso {step} de 3</div>
          <h2 id="bk-title" className="bk-title">
            {step === 1 && '¿Qué te hacemos hoy?'}
            {step === 2 && 'Elige tu momento'}
            {step === 3 && 'Tus coordenadas'}
          </h2>
        </div>

        <div className="bk-body">
          {step === 1 && (
            <div className="bk-list">
              {SERVICIOS.map(s => (
                <button 
                  key={s.id} 
                  className={`bk-opt ${service === s.nombre ? 'on' : ''}`}
                  onClick={() => setService(s.nombre)}
                >
                  <span className="bk-opt-n">{s.nombre}</span>
                  <span className="bk-opt-p">S/{s.precio}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="bk-dt">
              <div className="bk-dt-lbl">Fecha</div>
              <div className="bk-row">
                {dates.map(d => (
                  <button 
                    key={d.id} 
                    className={`bk-pill ${date === d.label ? 'on' : ''}`}
                    onClick={() => setDate(d.label)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="bk-dt-lbl" style={{marginTop: 16}}>Hora Disponible</div>
              <div className="bk-grid">
                {times.map(t => (
                  <button 
                    key={t} 
                    className={`bk-pill ${time === t ? 'on' : ''}`}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bk-form">
              <div className="bk-inp-g">
                <label htmlFor="bk-name">Nombre o Apodo</label>
                <input 
                  id="bk-name" type="text" placeholder="Ej. El Chino"
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="bk-inp-g">
                <label htmlFor="bk-phone">Teléfono (WhatsApp)</label>
                <input 
                  id="bk-phone" type="tel" placeholder="999 888 777"
                  value={phone} onChange={e => setPhone(e.target.value)}
                />
              </div>
              
              <div className="bk-summary">
                <div className="bk-sum-r"><span>Servicio</span> <strong>{service}</strong></div>
                <div className="bk-sum-r"><span>Cuándo</span> <strong>{date}, {time}</strong></div>
              </div>
            </div>
          )}
        </div>

        <div className="bk-ftr">
          {step > 1 && (
            <button className="bk-btn-sec" onClick={() => setStep(s => s-1)}>Volver</button>
          )}
          <button 
            className="bk-btn-prim" 
            disabled={!canNext()}
            onClick={handleNext}
            style={{ marginLeft: step === 1 ? 'auto' : 0, width: step === 1 ? '100%' : 'auto', flex: 1 }}
          >
            {step === 3 ? 'Confirmar Reserva' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function BarberImage({ src, alt, className, style, loading }: any) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className={className} style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg3)' }} role="img" aria-label={alt}>
        <div style={{ opacity: 0.2, color: 'var(--sub)' }}><IcoScissor size={48} /></div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} style={style} loading={loading} onError={() => setErr(true)} />;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `

        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

                /* ── TOKENS ──────────────────────────────────────────────────────────── */
                .p {
    --bg:     #171412;
    --bg2:    #1c1815;
    --bg3:    #29231f;
    --brd:    #3b322a;
    --txt: #fdf8f2;
    --sub: #bcaea1;
    --dim:    #988879;
    --a: #d97706;
    --a2: #b45309;
    --a-bg: rgba(217, 119, 6, .12);
    --a-brd: rgba(217, 119, 6, .25);
    --a-blue: #264653;
    --a-blue-bg: rgba(38, 70, 83, .12);
    --grn:    #1db954;
    --e: cubic-bezier(.4, 0, .2, 1);
    --t: .22s;
    --r: 2px;
    --rl: 4px;
    --fd: 'Bebas Neue', 'Arial Black', sans-serif;
    --fs: 'Playfair Display', serif;
    --fb: 'Barlow', 'Geist', system-ui, sans-serif;
  }

                /* LIGHT */
                .p.light {
    --bg: #e8dcc4;
    --bg2: #f2ebd9;
    --bg3: #d1c3a6;
    --brd: #bca889;
    --txt:    #302213;
    --sub:    #5b432a;
    --dim:    #826950;
    --a:      #b45309;
    --a2:     #92400e;
    --a-bg: rgba(180, 83, 9, .08);
    --a-brd: rgba(180, 83, 9, .35);
    --a-blue: #1d3557;
    --a-blue-bg: rgba(29, 53, 87, .08);
  }

                /* ── BASE ──────────────────────────────────────────────────────────── */
                * { box-sizing: border-box; margin: 0; padding: 0;
}
                body { background: var(--bg); color: var(--txt); font-family: var(--fb); -webkit-font-smoothing: antialiased; }
                .p { min-height: 100svh; background: var(--bg); transition: background-color 0.6s ease, color 0.6s ease; position: relative; }
                .p::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.04; pointer-events: none; z-index: 9999; mix-blend-mode: overlay; transform: translateZ(0); will-change: transform; }
                .p.light::after { opacity: 0.03; mix-blend-mode: multiply; }
                /* Estructurales con suavizado de tema */
                .hero, .sec, .sec-alt, .info-block, .cta-final, .ftr, .hdr { transition: background-color 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease; }
                .w { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
                .p h1,.p h2,.p h3,.p h4 { margin: 0; }
                .p p { margin: 0; }
                .p ul { margin: 0; padding: 0; list-style: none; }
                .p button { font-family: inherit; }
                .p a { text-decoration: none; }

                /* Scrollbar */
                .p::-webkit-scrollbar { width: 6px; }
                .p::-webkit-scrollbar-track { background: var(--bg2); }
                .p::-webkit-scrollbar-thumb { background: var(--brd); border-radius: 3px; }
                .p::-webkit-scrollbar-thumb:hover { background: var(--dim); }
                .p::selection { background: var(--a); color: #fff; }

                /* ── DECORATIONS ─────────────────────────────────────────────────────── */
                .barber-pole { height: 8px; width: 100%; max-width: 100vw; box-sizing: border-box; background-color: var(--bg2); background-image: repeating-linear-gradient(45deg, var(--a), var(--a) 16px, transparent 16px, transparent 32px, var(--a-blue) 32px, var(--a-blue) 48px, transparent 48px, transparent 64px); opacity: 0.25; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5); border-bottom: 1px solid var(--brd); border-top: 1px solid var(--brd); overflow: hidden; animation: pole-spin 4s linear infinite; }
@keyframes pole-spin { from { background-position: 0 0; } to { background-position: calc(-64px * 1.41421356) 0; } }
@media (prefers-reduced-motion: reduce) { .barber-pole { animation: none; } }
                .p.light .barber-pole { opacity: 0.4; }

                /* ── BOOKING MODAL ────────────────────────────────────────────────────── */
                .bk-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px; animation: fi .2s var(--e); }
@keyframes fi { from { opacity: 0; } to { opacity: 1; } }
                .bk-modal { background: var(--bg2); width: 100%; max-width: 480px; border: 1px solid var(--brd); border-radius: 0; position: relative; display: flex; flex-direction: column; box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5); animation: mup .3s var(--e); max-height: 90vh; }
@keyframes mup { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .p.light .bk-modal { box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.15); }
                .bk-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--sub); cursor: pointer; transition: color var(--t); padding: 4px; }
                .bk-close:hover { color: var(--txt); }

                .bk-hdr { padding: 32px 32px 24px; border-bottom: 1px solid var(--brd); }
                .bk-step-ind { font-size: 11px; font-weight: 700; color: var(--a); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; }
                .bk-title { font-family: var(--fs); font-size: 28px; color: var(--txt); line-height: 1.1; margin: 0; font-style: italic; }

                .bk-body { padding: 32px; overflow-y: auto; flex: 1; }
                .bk-list { display: flex; flex-direction: column; gap: 12px; }
                .bk-opt { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--bg); border: 1px solid var(--brd); cursor: pointer; transition: all var(--t); text-align: left; }
                .bk-opt:hover { border-color: var(--a-brd); }
                .bk-opt.on { background: var(--a-bg); border-color: var(--a); box-shadow: inset 4px 0 0 var(--a); }
                .bk-opt-n { font-size: 15px; font-weight: 600; color: var(--txt); }
                .bk-opt-p { font-size: 14px; color: var(--sub); }

                .bk-dt-lbl { font-size: 12px; font-weight: 700; color: var(--sub); letter-spacing: .05em; text-transform: uppercase; margin-bottom: 12px; }
                .bk-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 24px; scrollbar-width: none; }
                .bk-row::-webkit-scrollbar { display: none; }
                .bk-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
                .bk-pill { padding: 12px 8px; background: var(--bg); border: 1px solid var(--brd); color: var(--txt); font-size: 13px; font-weight: 600; cursor: pointer; transition: all var(--t); text-align: center; }
                .bk-pill:hover { border-color: var(--a-brd); }
                .bk-pill.on { background: var(--a); border-color: var(--a); color: #fff; }

                .bk-form { display: flex; flex-direction: column; gap: 20px; }
                .bk-inp-g { display: flex; flex-direction: column; gap: 8px; }
                .bk-inp-g label { font-size: 12px; font-weight: 700; color: var(--sub); letter-spacing: .05em; text-transform: uppercase; }
                .bk-inp-g input { padding: 14px 16px; background: var(--bg); border: 1px solid var(--brd); color: var(--txt); font-family: var(--fb); font-size: 15px; outline: none; transition: border-color var(--t); }
                .bk-inp-g input:focus { border-color: var(--a); box-shadow: inset 2px 0 0 var(--a); }

                .bk-summary { margin-top: 12px; padding: 16px; background: var(--bg3); border: 1px dashed var(--brd); display: flex; flex-direction: column; gap: 8px; }
                .bk-sum-r { display: flex; justify-content: space-between; font-size: 14px; }
                .bk-sum-r span { color: var(--sub); }
                .bk-sum-r strong { color: var(--txt); }

                .bk-ftr { padding: 24px 32px; border-top: 1px solid var(--brd); display: flex; gap: 12px; }
                .bk-btn-sec { flex: 1; padding: 14px; background: transparent; border: 1px solid var(--brd); color: var(--txt); font-family: var(--fb); font-weight: 700; text-transform: uppercase; letter-spacing: .05em; cursor: pointer; transition: background var(--t); }
                .bk-btn-sec:hover { background: var(--bg3); }
                .bk-btn-prim { flex: 2; padding: 14px; background: var(--a); border: none; color: #fff; font-family: var(--fb); font-weight: 800; text-transform: uppercase; letter-spacing: .05em; cursor: pointer; transition: background var(--t), opacity var(--t); }
                .bk-btn-prim:hover: not(:disabled) { background: var(--a2); }
                .bk-btn-prim:disabled { opacity: 0.5; cursor: not-allowed; }

                /* ── HEADER ──────────────────────────────────────────────────────────── */
                .hdr { position: fixed; inset: 0 0 auto; z-index: 200; padding: 16px 0; transition: background var(--t) var(--e), box-shadow var(--t) var(--e); }
                .hdr.on { background: rgba(10, 10, 12, .92); box-shadow: 0 1px 0 var(--brd); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
                .p.light .hdr.on { background: rgba(245, 243, 239, .94); }
                .hdr-i { max-width: 1160px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 10px; }

                /* Logo */
                .logo { display: flex; align-items: center; gap: 0; text-decoration: none; }
                .logo-n { font-family: var(--fd); font-size: 26px; letter-spacing: .04em; color: var(--txt); line-height: 1; transition: color var(--t) var(--e); }
                .logo-n span { color: var(--a); }

                /* Nav */
                .nav { display: flex; align-items: center; gap: 0; margin-left: auto; }
                .nav-a { background: none; border: none; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--sub); padding: 7px 13px; border-radius: var(--r); letter-spacing: .04em; text-transform: uppercase; transition: color var(--t) var(--e), background var(--t) var(--e); }
                .nav-a:hover { color: var(--txt); background: rgba(255, 255, 255, .05); }
                .p.light .nav-a:hover { background: rgba(0, 0, 0, .04); }
                .nav-a:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; border-radius: 4px; }

                /* Toggle */
                .theme-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: var(--bg3); border: 1px solid var(--brd); color: var(--sub); cursor: pointer; transition: color var(--t) var(--e), background var(--t) var(--e), border-color var(--t) var(--e); flex-shrink: 0; }
                .theme-btn:hover { color: var(--a); border-color: var(--a-brd); background: var(--a-bg); }
                .theme-btn:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }

                /* CTA header */
                .hdr-cta { display: flex; align-items: center; gap: 6px; background: var(--a); color: #fff; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 8px 16px; border-radius: var(--r); border: none; cursor: pointer; text-decoration: none; transition: background var(--t) var(--e), transform var(--t) var(--e); flex-shrink: 0; }
                .hdr-cta:hover { background: var(--a2); transform: translateY(-1px); }
                .hdr-cta:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }
                .p.light .hdr-cta { color: #fff; }

                /* Hamburger */
                .ham { display: none; align-items: center; justify-content: center; width: 36px; height: 36px; background: none; border: 1px solid var(--brd); border-radius: var(--r); color: var(--txt); cursor: pointer; margin-left: auto; transition: border-color var(--t) var(--e); }
                .ham:hover { border-color: var(--a-brd); }
                .ham:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }

                /* Mobile menu */
                .mob { padding: 12px 24px 20px; border-top: 1px solid var(--brd); background: var(--bg); display: flex; flex-direction: column; gap: 2px; animation: mdn .16s var(--e) both; }
@keyframes mdn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
                .mob-a { background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 600; color: var(--sub); text-align: left; padding: 12px 8px; border-radius: var(--r); letter-spacing: .04em; text-transform: uppercase; transition: color var(--t) var(--e), background var(--t) var(--e); }
                .mob-a:hover { color: var(--txt); background: var(--bg3); }
                .mob-cta { margin-top: 8px; }

                /* ── HERO ─────────────────────────────────────────────────────────────── */
                .hero { padding-top: 120px; padding-bottom: 80px; min-height: 100svh; background: var(--bg); display: flex; align-items: center; overflow: hidden; position: relative; }
                .hero::before, .cta-final::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity: 0.08; pointer-events: none; mix-blend-mode: overlay; z-index: 1; transform: translateZ(0); will-change: transform; }
                .p.light .hero::before, .p.light .cta-final::before { mix-blend-mode: multiply; opacity: 0.04; }
                .hero-i { max-width: 1160px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; width: 100%; }
                .hero-l { display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 10; }
                .hero-r { position: relative; border-radius: var(--r); overflow: hidden; aspect-ratio: 4 / 5; box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.5); border: 2px solid var(--brd); }
                .p.light .hero-r { box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.15); }
                .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(40%) sepia(30%) contrast(1.1) brightness(0.8); transition: transform 2s var(--e); }
                .hero-r:hover .hero-img { transform: scale(1.03); }

                .hero-tag { position: absolute; top: -50px; right: 0px; width: 120px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg2); border: 2px dashed var(--a); border-radius: 50%; font-family: var(--fs); font-size: 16px; font-style: italic; font-weight: 700; letter-spacing: .04em; text-transform: lowercase; color: var(--txt); margin-bottom: 0; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4); z-index: 20; transform: rotate(-15deg); }
                .p.light .hero-tag { box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.1); }
                .hero-tag-icon { display: none; }

                .hero-h1 { font-family: var(--fd); font-size: clamp(80px, 11vw, 150px); line-height: .85; letter-spacing: 0.02em; color: var(--txt); margin-bottom: 24px; text-transform: uppercase; text-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4); }
                .p.light .hero-h1 { color: var(--txt); }

                .hero-sub { font-size: clamp(16px, 1.5vw, 18px); line-height: 1.65; color: var(--sub); max-width: 460px; margin-bottom: 36px; }

                /* Badges de servicio */
                .hero-checks { display: flex; flex-direction: column; gap: 8px; margin-bottom: 36px; }
                .hero-check { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 600; color: var(--sub); letter-spacing: .01em; }
                .hc-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--a-bg); border: 1px solid var(--a-brd); color: var(--a); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

                /* CTAs */
                .hero-ctas { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
                .btn-prim { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--a); color: #fff; font-family: var(--fb); font-size: 15px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 18px 36px; border-radius: var(--r); border: none; cursor: pointer; text-decoration: none; transition: all 0.1s var(--e); box-shadow: 6px 6px 0 var(--a-brd); position: relative; overflow: hidden; }
                .btn-prim::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.25), transparent); transform: translateX(-100%); transition: transform 0.6s var(--e); }
                .btn-prim:hover { background: var(--a2); transform: translate(3px, 3px); box-shadow: 3px 3px 0 var(--a-brd); }
                .btn-prim:hover::after { transform: translateX(100%); }
                .btn-prim:active { transform: translate(6px, 6px); box-shadow: 0 0 0 transparent; }
                .btn-prim:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }
                .p.light .btn-prim { color: #fff; }
                .btn-sec { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--sub); font-size: 13px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 12px 20px; border-radius: var(--r); border: 1px solid var(--brd); cursor: pointer; transition: color var(--t) var(--e), border-color var(--t) var(--e), background var(--t) var(--e); }
                .btn-sec:hover { color: var(--txt); border-color: rgba(255, 255, 255, .16); background: var(--bg3); }
                .p.light .btn-sec:hover { background: var(--bg3); border-color: var(--brd); }
                .btn-sec:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }

                /* ── STRIP DE MÉTRICAS ────────────────────────────────────────────────── */
                .strip { background: var(--bg2); border-top: 1px solid var(--brd); border-bottom: 1px solid var(--brd); padding: 0; }
                .strip-i { display: grid; grid-template-columns: repeat(4, 1fr); }
                .metric { padding: 28px 32px; border-right: 1px solid var(--brd); display: flex; flex-direction: column; gap: 2px; position: relative; }
                .metric:last-child { border-right: none; }
                .metric::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--a); opacity: 0; transition: opacity var(--t) var(--e); }
                .metric:hover::before { opacity: 1; }
                .m-val { font-family: var(--fd); font-size: 42px; letter-spacing: 0; color: var(--txt); line-height: 1; }
                .m-unit { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--a); }
                .m-note { font-size: 12px; color: var(--dim); margin-top: 2px; }

                /* ── SERVICIOS ────────────────────────────────────────────────────────── */
                .sec { padding: 96px 0; }
                .sec-alt { background: var(--bg2); }
                .sec-h { border-bottom: 1px solid var(--brd); padding-bottom: 32px; margin-bottom: 48px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
                .sec-h2 { font-family: var(--fd); font-size: clamp(40px, 5vw, 68px); letter-spacing: 0; text-transform: uppercase; color: var(--txt); line-height: .92; }
                .sec-desc { font-size: 16px; color: var(--sub); max-width: 400px; line-height: 1.6; }

                /* Tabla de servicios -> Cuadrícula */
                .svc-table { display: flex; flex-direction: column; gap: 0; background: var(--bg2); padding: 20px 40px; border: 1px solid var(--brd); box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3); }
                .p.light .svc-table { box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.06); }
                .svc-row { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: start; padding: 28px 0; border-bottom: 1px dashed var(--brd); border-radius: 0; background: transparent; transition: background-color 0.2s var(--e); position: relative; overflow: visible; }
                .svc-row:last-child { border-bottom: none; }
                .svc-row:hover { background: var(--bg3); padding-left: 16px; padding-right: 16px; margin-left: -16px; margin-right: -16px; }
                .svc-row.vip { background: var(--bg3); border: 1px dashed var(--a-brd); padding: 24px; margin: 12px-24px; }
                .p.light .svc-row.vip { background: rgba(180, 83, 9, .04); }

                .svc-info { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
                .svc-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
                .svc-name { font-family: var(--fd); font-size: clamp(24px, 3vw, 32px); letter-spacing: 0.02em; text-transform: uppercase; color: var(--txt); line-height: 1; }
                .svc-tag { display: inline-flex; align-items: center; gap: 5px; font-family: var(--fs); font-style: italic; font-size: 11px; font-weight: 700; letter-spacing: .04em; text-transform: lowercase; background: transparent; border: 1px solid var(--a-blue); color: var(--txt); padding: 4px 8px; border-radius: 0; flex-shrink: 0; box-shadow: 2px 2px 0 var(--a-blue-bg); position: relative; overflow: hidden; }
                .svc-tag::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); animation: vip-shine 4s ease-in-out infinite; }
@keyframes vip-shine { 0%, 75% { left: -100%; } 100% { left: 200%; } }
@media (prefers-reduced-motion: reduce) { .svc-tag::after { animation: none; display: none; } }
                .p.light .svc-tag { color: var(--txt); background: transparent; box-shadow: 2px 2px 0 var(--a-blue-bg); border-color: var(--a-blue); }
                .svc-desc { font-size: 15px; color: var(--sub); line-height: 1.65; max-width: 100%; }
                .svc-details { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
                .svc-detail { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: var(--dim); letter-spacing: .04em; text-transform: uppercase; }
                .svc-detail svg { color: var(--a); flex-shrink: 0; }
                .svc-dur { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: var(--dim); }

                .svc-bottom { display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-start; gap: 16px; margin-top: 0; padding-top: 0; border-top: none; width: auto; }
                .svc-price-col { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
                .svc-price { font-family: var(--fd); font-size: clamp(36px, 4vw, 48px); letter-spacing: 0; color: var(--txt); line-height: 1; text-shadow: 2px 2px 0 var(--a-bg); }
                .svc-price-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--dim); }

                .svc-btn-col { display: flex; align-items: center; }
                .svc-btn { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: 1px solid var(--brd); color: var(--sub); font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 10px 16px; border-radius: 0; cursor: pointer; text-decoration: none; transition: all 0.1s var(--e); white-space: nowrap; box-shadow: 2px 2px 0 var(--bg3); }
                .svc-btn:hover { color: var(--a); border-color: var(--a-brd); background: var(--bg2); transform: translate(1px, 1px); box-shadow: 1px 1px 0 var(--bg3); }
                .svc-btn:active { transform: translate(2px, 2px); box-shadow: 0 0 0 transparent; }
                .svc-btn:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; }
                .svc-row.vip.svc-btn { border-color: var(--a-brd); color: var(--a); box-shadow: 2px 2px 0 var(--a-bg); }
                .svc-row.vip.svc-btn:hover { background: var(--bg3); color: var(--a); border-color: var(--a); }
                .p.light .svc-row.vip.svc-btn:hover { color: var(--a); }

                /* ── GALERIA ──────────────────────────────────────────────────────────── */
                .gal { padding: 96px 0; background: var(--bg); border-top: 1px dashed var(--brd); border-bottom: 1px dashed var(--brd); }
                .gal-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 48px; }
                .gal-item { aspect-ratio: 4 / 5; position: relative; border-radius: 0; overflow: hidden; background: var(--bg3); box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2); }
                .p.light .gal-item { box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05); }
                .gal-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(70%) sepia(20%) contrast(1.1); transition: transform 0.6s var(--e), filter 0.6s var(--e); }
                .gal-item:hover .gal-img { transform: scale(1.05); filter: grayscale(0%) sepia(0%); }

                /* ── TESTIMONIOS ──────────────────────────────────────────────────────── */
                .test { padding: 96px 0; background: var(--bg2); }
                .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
                .test-card { padding: 32px; border: 1px dashed var(--brd); background: transparent; display: flex; flex-direction: column; gap: 16px; position: relative; box-shadow: 4px 4px 0 var(--bg3); }
                .test-card::before { content: '"'; font-family: var(--fd); font-size: 80px; position: absolute; top: 16px; right: 24px; color: var(--bg3); line-height: 1; pointer-events: none; }
                .test-stars { display: flex; gap: 4px; color: var(--a); }
                .test-txt { font-size: 15px; color: var(--sub); line-height: 1.6; font-style: italic; }
                .test-author { font-size: 14px; font-weight: 700; color: var(--txt); letter-spacing: 0.04em; text-transform: uppercase; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--brd); }

                /* ── HORARIOS / INFO ──────────────────────────────────────────────────── */
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .info-block { background: var(--bg); border: 1px solid var(--brd); border-radius: var(--rl); padding: 36px 32px; display: flex; flex-direction: column; gap: 0; }
                .sec-alt.info-block { background: var(--bg2); }
                .p.light .sec-alt.info-block { background: var(--bg2); }
                .info-block-h { font-family: var(--fd); font-size: 32px; letter-spacing: 0; text-transform: uppercase; color: var(--txt); margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--brd); }
                .sched-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--brd); }
                .sched-row:last-child { border-bottom: none; }
                .sched-day { font-size: 13px; font-weight: 600; color: var(--sub); letter-spacing: .03em; }
                .sched-hrs { font-size: 14px; font-weight: 700; color: var(--a); letter-spacing: .02em; }
                .sched-cls { font-size: 12px; font-weight: 600; color: var(--dim); }

                .amenity-list { display: flex; flex-direction: column; gap: 0; }
                .amenity-row { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--brd); font-size: 14px; font-weight: 500; color: var(--sub); }
                .amenity-row:last-child { border-bottom: none; }
                .amenity-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--a); flex-shrink: 0; opacity: 0.7; }

                /* ── CTA FINAL ────────────────────────────────────────────────────────── */
                .cta-final { padding: 96px 0; background: var(--bg); border-top: 1px solid var(--brd); position: relative; }
                .cta-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; position: relative; z-index: 2; }
                .cta-h2 { font-family: var(--fd); font-size: clamp(48px, 6vw, 84px); letter-spacing: 0; text-transform: uppercase; color: var(--txt); line-height: .92; margin-bottom: 20px; }
                .cta-sub { font-size: 17px; color: var(--sub); line-height: 1.6; margin-bottom: 32px; max-width: 420px; }
                .cta-r { display: flex; flex-direction: column; gap: 16px; }
                .cta-tel { font-family: var(--fs); font-style: italic; font-size: clamp(36px, 4.5vw, 56px); letter-spacing: 0; color: var(--a); text-decoration: none; transition: color var(--t) var(--e); }
                .cta-tel:hover { color: var(--a2); }
                .cta-tel:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }
                .cta-note { font-size: 12px; font-weight: 600; color: var(--dim); letter-spacing: .06em; text-transform: uppercase; }

                /* ── FOOTER ───────────────────────────────────────────────────────────── */
                .ftr { background: var(--bg2); border-top: 1px solid var(--brd); padding: 40px 0 28px; }
                .ftr-i { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--brd); }
                .ftr-brand { font-family: var(--fd); font-size: 26px; letter-spacing: 0; color: var(--txt); margin-right: auto; }
                .ftr-brand span { color: var(--a); }
                .ftr-links { display: flex; gap: 2px; flex-wrap: wrap; }
                .ftr-lnk { background: none; border: none; cursor: pointer; font-size: 11px; font-weight: 700; color: var(--dim); padding: 6px 11px; border-radius: 4px; text-decoration: none; display: inline-flex; letter-spacing: .08em; text-transform: uppercase; transition: color var(--t) var(--e), background var(--t) var(--e); }
                .ftr-lnk:hover { color: var(--txt); background: var(--bg3); }
                .ftr-lnk:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; border-radius: 3px; }
                .ftr-wa { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: var(--grn); text-decoration: none; padding: 7px 12px; border-radius: var(--r); border: 1px solid rgba(29, 185, 84, .2); letter-spacing: .02em; transition: background var(--t) var(--e), border-color var(--t) var(--e); }
                .ftr-wa:hover { background: rgba(29, 185, 84, .06); border-color: rgba(29, 185, 84, .4); }
                .ftr-wa:focus-visible { outline: 2px solid var(--grn); outline-offset: 2px; }
                .ftr-wa svg { width: 15px; height: 15px; }
                .ftr-bot { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
                .ftr-copy { font-size: 11px; color: var(--dim); }
                .ftr-credit { font-size: 11px; color: var(--dim); }
                .ftr-credit b { color: var(--sub); font-weight: 600; }
                .ftr-credit em { color: var(--a); font-style: normal; font-weight: 500; opacity: .8; }

/* ── WA FAB ───────────────────────────────────────────────────────────── */
@keyframes fab-pulse {
  0% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.6);
}
70% { box-shadow: 0 0 0 20px rgba(29, 185, 84, 0); }
100% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0); }
                }
                .fab { position: fixed; bottom: 32px; right: 32px; z-index: 100; width: 64px; height: 64px; border-radius: 50%; background: var(--grn); color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(29, 185, 84, .4); transition: transform var(--t) var(--e), box-shadow var(--t) var(--e), background-color var(--t) var(--e); animation: fab-pulse 2.5s infinite cubic-bezier(0.16, 1, 0.3, 1); }
                .fab:hover { animation: none; transform: scale(1.08) translateY(-4px); box-shadow: 0 12px 32px rgba(29, 185, 84, .6); background: #1ed760; }
                .fab:active { transform: scale(0.95); }
                .fab svg { transition: transform var(--t) var(--e); width: 28px; height: 28px; }
                .fab:hover svg { transform: scale(1.1) rotate(5deg); }
                .fab:focus-visible { outline: 3px solid #1db954; outline-offset: 4px; animation: none; }
@media(prefers-reduced-motion: reduce) {
                  * { animation- duration: 0.01ms!important; animation-iteration-count: 1!important; transition-duration: 0.01ms!important; scroll-behavior: auto!important;
}
                  .fab { animation: none; }
                }

/* ── RESPONSIVE ───────────────────────────────────────────────────────── */
@media(max-width: 1024px) {
                  .hero-i { gap: 40px; }
                  .svc-bottom { flex-direction: column; align-items: stretch; gap: 20px; }
                  .svc-btn { width: 100%; justify-content: center; }
}
@media(max-width: 900px) {
                  .hero-i { grid-template-columns: 1fr; }
                  .hero-r { aspect-ratio: 16 / 9; }
                  .svc-table { grid-template-columns: 1fr; }
                  .strip-i { grid-template-columns: repeat(2, 1fr); }
                  .metric:nth-child(2) { border-right: none; }
                  .metric:nth-child(3) { border-top: 1px solid var(--brd); }
                  .metric:nth-child(4) { border-top: 1px solid var(--brd); border-right: none; }
                  .info-grid { grid-template-columns: 1fr; }
                  .cta-inner { grid-template-columns: 1fr; gap: 40px; }
                  .gal-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                  .test-grid { grid-template-columns: 1fr; }
}
@media(max-width: 768px) {
                  .nav, .hdr-cta { display: none; }
                  .ham { display: flex; }
                  .sec { padding: 64px 0; }
                  .cta-final { padding: 64px 0; }
                  .svc-row { padding: 20px 16px; }
                  .hero-h1 { font-size: clamp(48px, 12vw, 72px); }
                  .ftr-i { flex-direction: column; align-items: flex-start; }
                  .ftr-brand { margin-right: 0; }
                  .ftr-bot { flex-direction: column; }
                  .fab { bottom: 20px; right: 20px; width: 52px; height: 52px; }
                  .fab svg { width: 25px; height: 25px; }
                  .metric { padding: 20px; }
                  .hero::before, .cta-final::before { display: none; }
}
@media(max-width: 480px) {
                  .w { padding: 0 16px; }
                  .hdr-i { padding: 0 16px; }
                  .hero-i { padding: 0 16px; }
                  .strip-i { grid-template-columns: 1fr 1fr; }
                  .hero-r { aspect-ratio: 4 / 5; }
                  .sec-h { flex-direction: column; align-items: flex-start; }
                  .gal-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
                  .hero-tag { transform: scale(0.8) rotate(-15deg); transform-origin: top right; right: 0; top: -30px; }
                  .svc-table { padding: 16px; }
}
`;

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BarberiaDonNavajaPage() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={`p${ light ? ' light' : '' }`}>

        {/* HEADER */}
        <header className={`hdr${ scrolled ? ' on' : '' }`} role="banner">
          <div className="hdr-i">
            <a href="#inicio" className="logo" onClick={e => { e.preventDefault(); goTo('inicio'); }} aria-label="Don Navaja — ir al inicio">
              <span className="logo-n">DON<span> NAVAJA</span></span>
            </a>
            <nav className="nav" aria-label="Navegación principal">
              <button className="nav-a" onClick={() => goTo('servicios')}>Servicios</button>
              <button className="nav-a" onClick={() => goTo('horarios')}>Horarios</button>
              <button className="nav-a" onClick={() => goTo('contacto')}>Contacto</button>
            </nav>
            <button className="theme-btn" onClick={() => setLight(v => !v)} aria-label={light ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}>
              {light ? <IcoMoon /> : <IcoSun />}
            </button>
            <button onClick={() => setBookOpen(true)} className="hdr-cta" aria-label="Reservar cita">
              <IcoWA size={14} /> Reservar cita
            </button>
            <button className="ham" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
              {menuOpen ? <IcoClose /> : <IcoMenu />}
            </button>
          </div>
          {menuOpen && (
            <nav className="mob" aria-label="Menú de navegación móvil">
              <button className="mob-a" onClick={() => goTo('servicios')}>Servicios</button>
              <button className="mob-a" onClick={() => goTo('horarios')}>Horarios</button>
              <button className="mob-a" onClick={() => goTo('contacto')}>Contacto</button>
              <button className="btn-prim mob-cta" onClick={() => { closeMenu(); setBookOpen(true); }} style={{ width: '100%', justifyContent: 'center' }}>
                <IcoWA size={14} /> Reservar Cita
              </button>
            </nav>
          )}
        </header>
        <div className="barber-pole" aria-hidden="true" />

        {/* HERO */}
        <section id="inicio" className="hero" aria-labelledby="hero-h1">
          <div className="hero-i">
            {/* Left */}
            <div className="hero-l">
              <div className="hero-tag" aria-label="Establecido en 2018">
                <span>EST.</span>
                <span style={{ fontSize: '20px', lineHeight: 1 }}>2018</span>
              </div>

              <h1 id="hero-h1" className="hero-h1">
                EL MEJOR<br />CORTE DE<br />TU VIDA.
              </h1>

              <p className="hero-sub">
                Barberos certificados, técnica sin concesiones y materiales de primer nivel.
                No vendemos cortes — construimos tu imagen.
              </p>

              <ul className="hero-checks" aria-label="Garantías del servicio">
                {[
                  'Corte con lavado siempre incluido',
                  'Toalla caliente en todos los servicios de barba',
                  'Cancelación sin cargo con 2 h de anticipación',
                ].map(c => (
                  <li key={c} className="hero-check">
                    <span className="hc-dot" aria-hidden="true"><IcoCheck /></span>
                    {c}
                  </li>
                ))}
              </ul>

              <div className="hero-ctas">
                <button onClick={() => setBookOpen(true)} className="btn-prim" aria-label="Reservar cita">
                  <IcoWA size={16} /> Reservar mi cita
                </button>
                <button className="btn-sec" onClick={() => goTo('servicios')} aria-label="Ver todos los servicios">
                  Ver servicios <IcoArrow />
                </button>
              </div>
            </div>

            {/* Right — real Unsplash barbershop image */}
            <div className="hero-r" aria-hidden="true">
              <BarberImage
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85&fit=crop&crop=faces,center"
                alt="Barbero trabajando en Barbería Don Navaja"
                className="hero-img"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* STRIP DE MÉTRICAS */}
        <div className="strip" role="region" aria-label="Métricas de la barbería">
          <div className="strip-i">
            {METRICAS.map(m => (
              <div key={m.unidad} className="metric">
                <div className="m-val">{m.valor}</div>
                <div className="m-unit">{m.unidad}</div>
                <div className="m-note">{m.nota}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICIOS */}
        <section id="servicios" className="sec" aria-labelledby="serv-h2">
          <div className="w">
            <div className="sec-h">
              <h2 id="serv-h2" className="sec-h2">Nuestros<br />servicios.</h2>
              <p className="sec-desc">
                Sin paquetes genéricos. Cada servicio tiene un propósito
                claro y un barbero que sabe ejecutarlo.
              </p>
            </div>

            <div className="svc-table" role="list">
              {SERVICIOS.map(s => (
                <article
                  key={s.id}
                  className={`svc-row${ s.etiqueta === 'Experiencia VIP' ? ' vip' : '' }`}
                  role="listitem"
                  aria-label={`${ s.nombre }— S / ${ s.precio }`}
                >
                  <div className="svc-info">
                    <div className="svc-top">
                      <h3 className="svc-name">{s.nombre}</h3>
                      {s.etiqueta && (
                        <span className="svc-tag">
                          {s.etiqueta === 'Experiencia VIP' && <IcoStar size={10} />}
                          {s.etiqueta}
                        </span>
                      )}
                    </div>
                    <p className="svc-desc">{s.descripcion}</p>
                    <div className="svc-details">
                      <span className="svc-dur"><IcoClock /> {s.duracion}</span>
                      {s.detalles.map(d => (
                        <span key={d} className="svc-detail"><IcoCheck /> {d}</span>
                      ))}
                    </div>
                  </div>

                  <div className="svc-bottom">
                    <div className="svc-price-col" aria-label={`Precio: S / ${ s.precio }`}>
                      <div className="svc-price">S/{s.precio}</div>
                      <div className="svc-price-label">por sesión</div>
                    </div>

                    <div className="svc-btn-col">
                      <button
                        onClick={() => setBookOpen(true)}
                        className="svc-btn"
                        aria-label={`Reservar ${ s.nombre }`}
                      >
                        <IcoWA size={13} /> Reservar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="gal" aria-labelledby="gal-h2">
          <div className="w">
            <div className="sec-h">
              <h2 id="gal-h2" className="sec-h2">El Local.</h2>
              <p className="sec-desc">Nuestra casa. Un espacio diseñado para que desconectes y vivas la experiencia clásica.</p>
            </div>
            <div className="gal-grid">
              {GALLERY.map((src, i) => (
                <div key={i} className="gal-item">
                  <BarberImage src={src} alt={`Galería ${ i + 1 }`} className="gal-img" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="test" aria-labelledby="test-h2">
          <div className="w">
            <div className="sec-h">
              <h2 id="test-h2" className="sec-h2">La Voz de<br/>la Calle.</h2>
              <p className="sec-desc">Más de 180 reseñas de 5 estrellas en Google nos respaldan. No lo decimos nosotros.</p>
            </div>
            <div className="test-grid">
              {TESTIMONIOS.map((t, i) => (
                <div key={i} className="test-card">
                  <div className="test-stars" aria-label={`Calificación: ${ t.rating }de 5 estrellas`}>
                    {[...Array(t.rating)].map((_, j) => <IcoStar key={j} size={14} />)}
                  </div>
                  <p className="test-txt">"{t.texto}"</p>
                  <p className="test-author">— {t.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HORARIOS Y COMODIDADES */}
        <section id="horarios" className="sec sec-alt" aria-labelledby="hor-h2">
          <div className="w">
            <div className="sec-h">
              <h2 id="hor-h2" className="sec-h2">Planifica<br />tu visita.</h2>
              <p className="sec-desc">
                Ambiente tranquilo, bien climatizado y pensado
                para que llegues y te olvides del reloj.
              </p>
            </div>

            <div className="info-grid">
              {/* Horarios */}
              <div className="info-block">
                <h3 className="info-block-h">Horario</h3>
                <div>
                  <div className="sched-row">
                    <span className="sched-day">Lunes — Sábado</span>
                    <span className="sched-hrs">9:00 AM — 9:00 PM</span>
                  </div>
                  <div className="sched-row">
                    <span className="sched-day">Domingo</span>
                    <span className="sched-cls">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Comodidades */}
              <div className="info-block">
                <h3 className="info-block-h">El local</h3>
                <div className="amenity-list">
                  {[
                    'Aire acondicionado',
                    'Wi-Fi sin contraseña',
                    'Bebidas de cortesía',
                    'Estacionamiento cercano',
                    'Pago en efectivo y transferencia',
                  ].map(a => (
                    <div key={a} className="amenity-row">
                      <span className="amenity-dot" aria-hidden="true" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contacto" className="cta-final" aria-labelledby="cta-h2">
          <div className="w">
            <div className="cta-inner">
              <div>
                <h2 id="cta-h2" className="cta-h2">TU PRÓXIMO<br />CORTE,<br />HOY.</h2>
                <p className="cta-sub">
                  Escríbenos por WhatsApp, dinos qué servicio quieres
                  y coordinamos tu cita en menos de dos minutos.
                </p>
                <button onClick={() => setBookOpen(true)} className="btn-prim" aria-label="Reservar cita">
                  <IcoWA size={17} /> Reservar ahora
                </button>
              </div>
              <div className="cta-r">
                <p className="cta-note">Número directo</p>
                <a href={`tel: +${ WA }`} className="cta-tel" aria-label="Llamar a +51 926 667 079">
                  +51 926<br />667 079
                </a>
                <div>
                  <p className="cta-note" style={{ marginBottom: '4px' }}>Respuesta inmediata</p>
                  <p style={{ fontSize: '13px', color: 'var(--sub)' }}>Lun – Sáb · 9 AM – 9 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ftr" role="contentinfo">
          <div className="w">
            <div className="ftr-i">
              <div className="ftr-brand">DON<span> NAVAJA</span></div>
              <nav className="ftr-links" aria-label="Navegación del pie de página">
                <button className="ftr-lnk" onClick={() => goTo('servicios')}>Servicios</button>
                <button className="ftr-lnk" onClick={() => goTo('horarios')}>Horarios</button>
                <button className="ftr-lnk" onClick={() => goTo('contacto')}>Contacto</button>
              </nav>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="ftr-wa" aria-label="Contactar por WhatsApp: +51 926 667 079">
                <IcoWA /> +51 926 667 079
              </a>
            </div>
            <div className="ftr-bot">
              <p className="ftr-copy">© {new Date().getFullYear()} Barbería Don Navaja. Lima, Perú.</p>
              <p className="ftr-credit">Desarrollado por <b>CJBS Studio</b> · <em>@cjbs.dev</em></p>
            </div>
          </div>
        </footer>

        {/* FAB WhatsApp */}
        <button
          onClick={() => setBookOpen(true)}
          className="fab"
          aria-label="Abrir modal para reservar una cita"
        >
          <IcoWA size={28} />
        </button>

        <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      </div>
    </>
  );
}
