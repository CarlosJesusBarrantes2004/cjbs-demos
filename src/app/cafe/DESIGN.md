---
name: Café Aromas
description: Un landing audaz y magnético de cafetería artesanal.
colors:
  primary: "#d97740"
  primary-hover: "#e58b57"
  neutral-bg: "#1a1614"
  neutral-bg-raised: "#231d1a"
  neutral-bg-highest: "#2e2723"
  neutral-border: "#3e3530"
  neutral-border-hover: "#4f443e"
  neutral-text: "#f9f5ef"
  neutral-text-sub: "#c1b2a6"
  neutral-text-dim: "#928377"
typography:
  display:
    fontFamily: "var(--fd)"
    fontSize: "clamp(48px, 6.5vw, 92px)"
    fontWeight: 900
    lineHeight: 0.88
  headline:
    fontFamily: "var(--fd)"
    fontSize: "clamp(32px, 4vw, 52px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "0.04em"
  body:
    fontFamily: "var(--fb)"
    fontSize: "13px"
    fontWeight: 300
    lineHeight: 1.55
  label:
    fontFamily: "var(--fb)"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.08em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  container: "24px"
  gap-sm: "10px"
  gap-md: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Café Aromas

## Overview

**Creative North Star: "El Refugio Nocturno"**

El diseño es elegante pero rebelde. Presenta una oscuridad cálida y envolvente que se siente íntima, magnética y premium. Rompemos las convenciones de las cuadrículas genéricas para ofrecer un ritmo asimétrico e impredecible. El usuario no solo escanea una carta; explora un entorno táctil donde el texto se apila y superpone artesanalmente, y los elementos responden físicamente a su presencia.

**Key Characteristics:**
- Modo oscuro nativo fundamentado en "Marrones Tierra" profundos, sin usar negros puros.
- Interacciones "Tilt 3D Magnético" que brindan tactilidad a las tarjetas del menú.
- Tipografía heroica superpuesta y ligeramente rotada, evocando un sello artesanal.
- Grilla asimétrica audaz (`grid-auto-flow: dense`), destacando ítems clave de forma impredecible.

## Colors

Una paleta profunda y cálida centrada en tonos Marrones Tierra y Ámbar Quemado.

### Primary
- **Ámbar Quemado** (#d97740): El pulso visual de la interfaz. Se usa para botones principales, el precio del producto y la insignia del hero. Transmite calidez y energía.
- **Ámbar Luminoso** (#e58b57): Color de hover y estado activo, ligeramente más brillante.

### Neutral
- **Tierra Profunda** (#1a1614): El fondo base (`--bg`). Un marrón extremadamente oscuro que reemplaza al negro puro para suavizar el contraste y mantener la calidez.
- **Tierra Elevada** (#231d1a): Superficies y tarjetas (`--bg2`).
- **Tierra Alta** (#2e2723): Elementos flotantes y tabs activos (`--bg3`).
- **Crema Textual** (#f9f5ef): El texto principal. Suaviza la dureza del blanco puro.
- **Avellana Atenuado** (#c1b2a6): Texto secundario (`--sub`) con alto contraste AA para la lectura cómoda de descripciones largas.

**The Warm Dark Rule.** Nunca se usa negro puro (#000000) ni blanco puro (#ffffff) en las superficies grandes. Todo el contraste se construye sobre la rampa de temperatura de los granos de café.

## Typography

**Display Font:** Playfair Display (definido por `--fd`)
**Body Font:** Chivo / Geist / sans-serif (definido por `--fb`)

**Character:** Una colisión entre la majestuosidad editorial de un serif de alto contraste y la modernidad utilitaria de una fuente sans-serif geométrica.

### Hierarchy
- **Display** (900, clamp(48px, 6.5vw, 92px), 0.88): El grito principal del Hero. Usado con tracking negativo y rotaciones sutiles superpuestas.
- **Headline** (900, clamp(32px, 4vw, 52px), 0.95): Títulos de sección como "MENÚ". Amplio, mayúsculas, dominante.
- **Title** (700, 16px, 1.2): Nombres de los ítems en las tarjetas del menú.
- **Body** (300, 13px, 1.55): Descripciones de productos, altamente legibles.
- **Label** (700, 12px, 0.08em, uppercase): Botones, tabs y anotaciones.

**The Handcrafted Overlap Rule.** Los textos gigantes (`Display`) deben sentirse estampados a mano: superposición, *tracking* negativo extremo y rotación en elementos clave.

## Layout

El layout rompe la monotonía intencionalmente con una cuadrícula asimétrica y densa.

- El **Hero** utiliza un grid 1x2 simétrico en desktop (1fr 1fr), colapsando a 1 columna en móvil (max 900px).
- El **Menú** emplea `grid-template-columns: repeat(4, 1fr)` con `grid-auto-flow: dense`. La primera tarjeta (y cada quinta) destaca rompiendo la cuadrícula (`grid-column: span 2; grid-row: span 2;`), dándole una imagen panorámica e infundiendo imprevisibilidad al scroll.

## Elevation & Depth

No empleamos sombras de caída tradicionales (drop-shadows negras), las cuales desaparecen en la oscuridad. La profundidad se logra a través de capas tonales y efectos de glow.

### Shadow Vocabulary
- **Glow Magnético** (`box-shadow: 0 4px 18px rgba(217,119,64,.25)`): Resplandor ambiental de color ámbar quemado que emana de los botones primarios interactivos al hacer hover.
- **Paralaje Físico**: En lugar de sombras estáticas, las tarjetas (`.m-card`) utilizan perspectiva y rotación 3D dependiente de la posición del ratón. El contenido interno levita (`translateZ(30px)`) para crear profundidad real de campo.

## Shapes

- Esquinas ligeramente redondeadas para mantener una estética accesible pero premium.
- **Botones y Tabs**: Radio pequeño (4px-7px).
- **Tarjetas y Contenedores**: Radio moderado (12px, `var(--rl)`).
- **Insignias flotantes**: Píldoras redondas u orgánicas (`border-radius: 50%` o redondeos altos).

## Components

### Menu Card (Magnetic Tilt 3D)
- **Shape:** Borde sutil (`1px solid var(--brd)`), radio de 12px.
- **Comportamiento interactivo:** Al hacer hover, la tarjeta rastrea la posición del mouse rotando en sus ejes X e Y (`transform: perspective(1000px) rotateX(...) rotateY(...)`). 
- **Imagen:** Experimenta un paralaje de profundidad y un zoom lento de 1.08x.

### Tabs (Categorías de Menú)
- **Shape:** Píldoras alojadas dentro de un track unificado con `background: var(--bg3)`.
- **Estado Activo:** El tab seleccionado levanta ligeramente su fondo a `var(--bg2)` asumiendo el color primario Ámbar Quemado.
- **Comportamiento Móvil:** Deslizamiento nativo horizontal (`overflow-x: auto`) para asegurar que nunca rompa el layout en anchos mínimos.

### Sello Animado (Hero Seal)
- **Componente firma:** Un gráfico vectorial rotatorio (SVG) que contiene el texto "CAFÉ AROMAS • 100% ARTESANAL •".
- **Comportamiento:** Su animación de giro está enlazada físicamente al nivel de scroll del navegador (`animation-timeline: scroll()`), creando una conexión táctil entre la acción del usuario y la interfaz.

## Do's and Don'ts

### Do:
- **Do** usar la técnica de `animation-timeline: scroll()` para dar vida a los elementos gráficos fijos a medida que el usuario desciende, creando paralaje sutil.
- **Do** emplear contrastes basados en la temperatura de color (Marrones Tierra vs Ámbar) y mantener la legibilidad por encima de AA.
- **Do** dejar que la asimetría dirija la mirada, dándole más área a los ítems que merecen ser destacados visualmente.

### Don't:
- **Don't** aplicar sombras negras de desenfoque alto; se perderán en el fondo oscuro. Usa resplandores (glows) del color primario.
- **Don't** alinear la tipografía del Hero perfectamente. Debes abrazar el caos ordenado y el solapamiento.
- **Don't** olvidar el fallback de animaciones (asegurar que haya una rotación basada en tiempo o que simplemente sea estática) para los navegadores sin soporte a scroll-driven animations.
