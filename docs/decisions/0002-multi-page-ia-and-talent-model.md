# 0002 — De Home de una página a sitio multi-página, y modelo de talento

- **Estado**: Aceptada
- **Fecha**: 2026-07-28

## Contexto

El Home original era una sola página con scroll y navegación por anclas (`#talento`,
`#servicios`, `#nosotros`, `#contacto`) que concentraba Hero, roster completo,
servicios, "Sobre nosotros" y un banner de cierre. Para una agencia de talento
premium, ese formato empieza a quedar corto: no hay una URL propia para compartir
un perfil de talento, "Nosotros" y "Servicios" compiten por espacio en la misma
página que el roster, y el patrón de ancla + `scroll-padding-top` es frágil.

## Decisión

### Multi-página en vez de one-page

Se investigaron patrones de UX reales de sitios de agencias de talento (sin copiar
el diseño de ninguna en particular) para decidir la arquitectura de información.
El patrón consistente en ese tipo de sitio es: Home corto que funciona como
vidriera, y páginas propias para roster, perfil individual, servicios y contacto.
Se adoptó ese modelo porque comunica exclusividad — cada talento tiene una URL
citable (`/talento/[slug]/`) en vez de una tarjeta perdida en un scroll — y porque
separa audiencias distintas (un cliente que busca un perfil puntual no debería
tener que scrollear todo el Home).

El Home queda reducido a: Hero + teaser de talento (7 destacados) + teaser de
"Sobre nosotros". Se retiran del Home las secciones completas de Servicios y el
banner de cierre; ambas viven ahora en sus propias rutas (`/servicios/`,
`/nosotros/`, `/contacto/`).

### `role` (display) vs `category` (filter key)

`Talent` ahora tiene dos campos que antes eran uno solo (`role` como texto libre):

- `role: string` — texto de despliegue, con género y matiz editorial ("Actriz",
  "Presentador", "Conductora"). Es lo que se muestra en tarjetas y perfiles.
- `category: TalentCategory` — clave estable de 4 valores (`actuacion`,
  `modelaje`, `contenido`, `conduccion`) usada únicamente para filtrar en
  `/talento/`.

No se puede filtrar de forma confiable sobre `role` porque es texto libre y
gendered ("Actriz" vs "Actor" vs "Modelo" no forman un enum limpio). Y no se puede
mostrar `category` directamente en la UI porque es una clave técnica en
minúsculas sin género ni matiz ("actuacion" no es un texto editorial aceptable).
De ahí la necesidad de mantener ambos campos por separado en vez de derivar uno
del otro.

### Trailing slash obligatorio en todo `href` interno

Con `output: "export"` no hay servidor que resuelva `/talento` a `/talento/`
agregando la barra final — sin ella, el export estático sirve un 404 en hosting
que no tenga reglas de redirect propias. Con `trailingSlash: true` en
`next.config.ts`, cada página se emite como `<ruta>/index.html`, así que **todo**
`href` interno del sitio (Navbar, Footer, `Button`, `TalentCard`, links de
"volver", etc.) debe terminar en `/` de forma literal: `/talento/`,
`/talento/${slug}/`, `/nosotros/`, `/servicios/`, `/contacto/`, y `/` para Home.

### `Button`: `next/link` interno vs `<a>` externo

`Button` ahora decide el elemento a renderizar según el `href`: si empieza con
`/`, renderiza `next/link`'s `<Link>` (navegación client-side dentro del sitio);
en cualquier otro caso (`mailto:`, `tel:`, `#`, `http(s)://`) renderiza el `<a>`
plano de siempre. Las clases visuales y las variantes (`primary`/`ghost`,
`light`/`dark`) no cambiaron — es puramente una decisión de qué elemento usar
para no romper `mailto:` ni enlaces externos, mientras se gana prefetching y
navegación sin recarga completa para todo lo interno.

### `/contacto` es mailto-only, sin formulario

Confirmado explícitamente con el cliente: `/contacto/` muestra un botón grande
`mailto:hola@draconisenterprise.com`, el email como texto y la ubicación
("Ciudad de México, México") — sin `<form>`, sin dependencia nueva, sin backend.
Es una decisión deliberada para este alcance, no una limitación técnica: el sitio
es un export estático sin servidor, y agregar un formulario implicaría sumar un
proveedor de envío de correo o una función serverless, lo cual queda fuera de
este cambio. Si en el futuro se necesita captura estructurada de leads, será una
decisión aparte (con su propio ADR) que evalúe proveedor, backend y manejo de
spam.

### Sin galería de fotos adicionales por talento (por ahora)

La primera versión de la ficha individual incluía una "galería" de 3 fotos por
talento usando más seeds de `i.pravatar.cc`. Al revisar visualmente se detectó
que esto rompe la premisa básica del placeholder: `i.pravatar.cc` devuelve una
persona real **distinta** por cada índice, no ángulos distintos de la misma
persona — el resultado eran fotos de desconocidos (y en un caso, de niños) en la
página de un talento adulto, lo cual es peor que no mostrar galería. Se retiró
`TalentGallery.tsx` y el campo `gallerySeeds` del modelo `Talent` por completo.
La ficha individual queda en: retrato + vitals + bio + CTA de contacto. Repuesto
pendiente de fotografía real del talento (no antes).

## Consecuencias

- El roster creció de 6 a 12 talentos (3 por categoría, 7 destacados, al menos
  uno por categoría) para que el filtro de `/talento/` tenga sentido con más de
  un resultado por pestaña.
- `types/home.ts` y `features/home/data.ts` se eliminaron; su contenido se
  repartió en `types/talent.ts`, `types/services.ts`, `types/about.ts` y sus
  respectivos `features/*/data.ts`.
- La regla `scroll-padding-top: 6rem` en `app/globals.css` se eliminó junto con
  el patrón de scroll-por-ancla que la motivaba; los tokens de color y tipografía
  de `app/globals.css` no se tocaron.
- Cualquier página o componente nuevo que agregue un link interno debe seguir la
  regla de trailing slash — no hay red de seguridad del lado del servidor que la
  corrija.
