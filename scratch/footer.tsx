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
