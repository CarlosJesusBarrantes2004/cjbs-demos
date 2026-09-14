export type Cat = 'Todos' | 'Hoodies' | 'Camisetas' | 'Pantalones' | 'Accesorios';

export interface Product {
  id: string;
  nombre: string;
  precio: number;
  cat: Exclude<Cat, 'Todos'>;
  tallas: string[];
  img: string;
  badge?: string;
  stock?: number;
}

export interface CartItem {
  productId: string;
  nombre: string;
  precio: number;
  talla: string;
  qty: number;
  img: string;
}

export const WA = '51926667079';
export function waLink(msg: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}
export const WA_GENERAL = waLink('Hola, quiero saber más sobre NEO-LIMA Streetwear.');

export const CATS: Cat[] = ['Todos', 'Hoodies', 'Camisetas', 'Pantalones', 'Accesorios'];

export const PRODUCTS: Product[] = [
  { id: 'h1', cat: 'Hoodies', nombre: 'Hoodie Acid Wash', precio: 130, tallas: ['S', 'M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop&crop=center', badge: 'Más vendido' },
  { id: 'h2', cat: 'Hoodies', nombre: 'Hoodie Vintage Crest', precio: 120, tallas: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80&fit=crop&crop=center', badge: 'Edición limitada', stock: 5 },
  { id: 'h3', cat: 'Hoodies', nombre: 'Hoodie Heavy Duty', precio: 145, tallas: ['S', 'M', 'L'], img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&fit=crop&crop=center', badge: 'Nuevo drop' },
  { id: 'h4', cat: 'Hoodies', nombre: 'Zip Hoodie Obsidian', precio: 135, tallas: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&q=80&fit=crop&crop=center' },
  
  { id: 'c1', cat: 'Camisetas', nombre: 'Camiseta Heavyweight Black', precio: 70, tallas: ['S', 'M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop&crop=center', badge: 'Nuevo drop' },
  { id: 'c2', cat: 'Camisetas', nombre: 'Camiseta Oversize Gráfica', precio: 75, tallas: ['S', 'M', 'L'], img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80&fit=crop&crop=center' },
  { id: 'c3', cat: 'Camisetas', nombre: 'Camiseta Washed Charcoal', precio: 80, tallas: ['S', 'M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80&fit=crop&crop=center' },
  { id: 'c4', cat: 'Camisetas', nombre: 'Camiseta Boxy Fit', precio: 70, tallas: ['S', 'M'], img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80&fit=crop&crop=center', badge: 'Stock limitado', stock: 2 },
  
  { id: 'p1', cat: 'Pantalones', nombre: 'Cargo Pant Negro', precio: 150, tallas: ['S', 'M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80&fit=crop&crop=center', badge: 'Stock limitado', stock: 4 },
  { id: 'p2', cat: 'Pantalones', nombre: 'Sweatpant Essential', precio: 110, tallas: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fit=crop&crop=center' },
  { id: 'p3', cat: 'Pantalones', nombre: 'Parachute Pant', precio: 160, tallas: ['S', 'M', 'L'], img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&fit=crop&crop=center', badge: 'Nuevo drop' },
  { id: 'p4', cat: 'Pantalones', nombre: 'Denim Baggy Faded', precio: 180, tallas: ['M', 'L', 'XL'], img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop&crop=center' },

  { id: 'a1', cat: 'Accesorios', nombre: 'Beanie Logo Patch', precio: 45, tallas: ['Única'], img: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80&fit=crop&crop=center' },
  { id: 'a2', cat: 'Accesorios', nombre: 'Gorra Trucker', precio: 55, tallas: ['Única'], img: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&q=80&fit=crop&crop=center' },
  { id: 'a3', cat: 'Accesorios', nombre: 'Crossbody Bag', precio: 90, tallas: ['Única'], img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80&fit=crop&crop=center', badge: 'Stock limitado', stock: 1 },
  { id: 'a4', cat: 'Accesorios', nombre: 'Medias Heavy Cotton', precio: 40, tallas: ['M', 'L'], img: 'https://images.unsplash.com/photo-1511556820780-d81d5f14d18c?w=600&q=80&fit=crop&crop=center' },
];

export const IG_FEED = [
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=400&q=80&fit=crop&crop=center'
];

export const TICKER_ITEMS = [
  'ENVÍOS A TODO EL PERÚ',
  'PAGA CON YAPE O PLIN',
  'DROP LIMITADO 2026',
  '100% ALGODÓN PESADO 280G',
  'CORTE BOXY FIT',
  'STREETWEAR LIMA',
];

export const LOOKBOOK = [
  { img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80&fit=crop&crop=top', quote: '"Este hoodie es fuego puro." — @lima.fits' },
  { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80&fit=crop&crop=top', quote: '"Tela pesada, corte perfecto." — @neo.style.pe' },
  { img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80&fit=crop&crop=top', quote: '"Llevo la XL oversize y está brutal." — @kaleb.lima' },
  { img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80&fit=crop&crop=top', quote: '"El cargo negó combina con todo." — @strt.pe' },
];

export const FAQS = [
  {
    q: '¿Cuánto demoran los envíos?',
    a: 'Lima Metropolitana: 24–48 horas. Provincias: 3–5 días hábiles por Olva Courier. Te mandamos el código de rastreo por WhatsApp en cuanto despachamos.',
  },
  {
    q: '¿Cómo pago con Yape o Plin?',
    a: 'Después de confirmar tu pedido por WhatsApp, te enviamos el número de Yape/Plin. Una vez recibido el pago, despachamos el mismo día (antes de las 2 PM).',
  },
  {
    q: '¿Puedo cambiar mi talla si me equivoco?',
    a: 'Sí. Tienes hasta 7 días desde la recepción para solicitar un cambio. La prenda debe estar sin usar, con etiqueta. El costo del envío de retorno es del cliente.',
  },
];
