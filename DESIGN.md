---
name: NEO-LIMA Streetwear
description: Streetwear hecho para las calles de Lima. Algodón pesado, corte boxy, ediciones limitadas.
colors:
  primary: "#e8222b"
  primary-hover: "#c41a22"
  neutral-bg: "#0a0a0a"
  neutral-surface: "#111111"
  neutral-surface-raised: "#1a1a1a"
  neutral-border: "#252525"
  neutral-border-hover: "#333333"
  neutral-text: "#f0f0f0"
  neutral-text-sub: "#888888"
  neutral-text-dim: "#555555"
  whatsapp-green: "#25d366"
typography:
  display:
    fontFamily: "'Anton', 'Arial Black', sans-serif"
    fontWeight: 400
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Anton', 'Arial Black', sans-serif"
    fontWeight: 400
    letterSpacing: "0.04em"
  body:
    fontFamily: "'Barlow', system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Barlow', system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  container-padding: "20px"
  grid-gap: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-text-sub}"
    rounded: "{rounded.sm}"
  button-secondary-hover:
    backgroundColor: "{colors.neutral-surface-raised}"
    textColor: "{colors.neutral-text}"
---

# Design System: NEO-LIMA Streetwear

## Overview

**Creative North Star: "El Bunker del Streetwear"**

El diseño es crudo, urbano y sin filtros. Priorizamos una experiencia de usuario utilitaria y una postura de marca inquebrantable, donde la fuerza y el peso visual predominan sobre la delicadeza. El diseño actúa como un escenario brutalista y ruidoso, pero milimétricamente estructurado: contraste extremo, tipografía condensada que golpea y un modo oscuro innegociable. Cero adornos innecesarios.

**Key Characteristics:**
- Modo oscuro puro (`#0a0a0a`) como lienzo innegociable.
- Acento de alto contraste en rojo intenso (Alerta/Urgencia).
- Tipografía display brutalista y ultra condensada.
- Elementos modulares con bordes definidos y delineados rígidos.

## Colors

El esquema de color es utilitario y de alto contraste, diseñado para desaparecer detrás del producto mientras guía agresivamente la atención con el acento rojo.

- **Primary (`#e8222b`):** El pulso del sistema. Usado para botones principales, el *ticker* promocional y badges de stock.
- **Neutrals (`#0a0a0a` al `#f0f0f0`):** Una rampa estricta de grises neutros que estructuran la profundidad sin necesidad de sombras suaves (fondos, tarjetas, bordes y texto).
- **Utility (`#25d366`):** Verde exclusivo para las conversiones directas por WhatsApp, familiar para el usuario limeño.

## Typography

El sistema tipográfico opone una voz fuerte (Anton) contra una base altamente legible (Barlow).

- **Display & Headlines (Anton):** Mayúsculas obligatorias. Interlineado (leading) extremadamente ajustado (0.88 - 1.0). Para títulos gigantes, el *tracking* (letter-spacing) es levemente negativo o nulo. Para sub-títulos, se añade un tracking positivo (`0.04em`).
- **Body & Data (Barlow):** Pesos que varían entre 300, 400 y 700. Un *line-height* generoso (1.65) compensa el texto claro sobre fondo oscuro para mantener una lectura relajada.
- **Microcopy & Labels:** Fuente Barlow a 10-12px, en mayúsculas, con un *tracking* extendido (`0.1em` - `0.14em`), dándole un aspecto técnico y militar.

## Layout

- **Grid System:** Diseño responsivo basado en CSS Grid. En el escritorio (máx 1200px), el catálogo usa 4 columnas, y el Hero se divide en una cuadrícula asimétrica de 12 columnas.
- **Densidad:** Agrupación ajustada en componentes internos (padding de botones y tarjetas) pero con secciones amplias (72px padding vertical) para aislar contenido clave como Lookbook y FAQ.
- **Safe Areas:** Adaptación nativa a entornos móviles (`env(safe-area-inset-bottom)`) asegurando que los menús inferiores flotantes respeten el hardware del SO.

## Elevation & Depth

- **Sin Sombras Estructurales:** La elevación se marca exclusivamente con variaciones tonales en el fondo (de `--bg` a `--bg2` y `--bg3`) y mediante delineados sólidos (`border: 1px solid var(--brd)`).
- **Sombras de Acento:** Solo los botones de *Primary Action* (Rojo y WhatsApp) utilizan un resplandor de color difuminado (glow) para comunicar interactividad táctil sin simular elevación 3D realista.

## Shapes

- Formas duras y utilitarias. Los radios de borde son mínimos para no suavizar en exceso la estética urbana.
- **Componentes primarios (Botones, Inputs):** 4px (`var(--r)`).
- **Contenedores y Tarjetas:** 8px (`var(--rl)`) para mantener contenido agrupado sin volverse un rectángulo cortante.

## Components

Táctiles, utilitarios y contundentes. Nada de sombras suaves; bordes definidos, áreas de clic grandes y feedback rápido.

- **Product Card:** Estructura modular, delineada en gris. Imágenes con proporción 3:4.
- **Size Selector:** Botones rígidos, cuadrados o mínimamente redondeados (44x44px en móviles para fácil toque). Proveen un *feedback* agresivo (una animación *shake* horizontal y bordes rojos) cuando el usuario intenta agregar al carrito sin seleccionar talla.
- **Drawer (Cart):** Panel lateral rígido de alto contraste. Mantiene la jerarquía visual con sub-totales gigantes y una llamada a la acción inferior ineludible.
