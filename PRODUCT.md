# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router), React, Tailwind CSS v4 (implied).

## Users

Dueños de negocios (barberías, cafeterías, marcas de ropa) y clientes potenciales de **CJBS Studio** que buscan interfaces comerciales premium, de alta conversión y con identidades visuales fuertes.

## Product Purpose

Un catálogo de demos comerciales (Landing pages y E-commerce livianos) que demuestra capacidades de UI/UX design y frontend engineering. Su objetivo es probar que se pueden construir experiencias web "reales" y artesanales, alejadas de las plantillas genéricas generadas por IA.

## Positioning

Interfaces comerciales de alta gama, hechas a medida, con un enfoque absoluto en la conversión directa (WhatsApp) y en estéticas visuales audaces que se comprometen al 100% con el nicho de cada cliente. Cero clichés, cero "AI tells".

## Operating Context

Navegadores web modernos (Desktop y Mobile). Los usuarios exploran estos demos como prueba de concepto para contratar servicios de desarrollo o diseño. La interacción final siempre desemboca en flujos de compra o reserva vía WhatsApp.

## Capabilities and Constraints

- **Restricción estricta:** Prohibido el uso de patrones visuales genéricos asociados a IA (ej. fuentes serif cursivas fuera de lugar, bordes "side-tab" por defecto).
- **Conversión:** Todos los flujos deben integrar enlaces directos a WhatsApp (wa.me) con mensajes pre-llenados.
- **Rendimiento:** Animaciones fluidas que no causen *layout thrash*, soporte para *prefers-reduced-motion*.

## Brand Commitments

El repositorio alberga múltiples marcas ficticias pero con estándares reales:
- **CJBS Studio (@cjbs.dev):** La firma de autoría en todos los footers.
- **NEO-LIMA STREETWEAR (Tienda):** Identidad urbana, contrastes marcados (negro profundo, acentos humo/neón), tipografía display bold/black condensada, actitud streetwear (stickers visuales de *LIMITED DROP*).
- **Barbería Don Navaja (Barbería):** Estética clásica americana y vintage (Bebas Neue con acentos serif en Fraunces, texturas pesadas, motivos de barber pole, tonos carbón, ámbar y rampa sepia terracota para el modo claro).
- **Café Aromas (Cafetería):** Estética cálida y artesanal (tonos café tostado, terracota, sin clichés).

## Evidence on Hand

- Estructura de rutas Next.js operativas (`/barberia`, `/cafe`, `/tienda`).
- Funciones de utilidad `waLink` estandarizadas.

## Product Principles

1. **Compromiso Total con el Borde (Bolder):** Si una demo es urbana, debe sentirse intensamente urbana. No suavizar los conceptos para complacer a todo el mundo.
2. **Diseño para la Acción:** La jerarquía tipográfica y espacial debe guiar al usuario inevitablemente hacia el CTA principal (WhatsApp).
3. **Calidad de Producción Nativa:** El código debe sentirse escrito por un ingeniero senior (transiciones suaves, tokens semánticos, contrastes accesibles).
