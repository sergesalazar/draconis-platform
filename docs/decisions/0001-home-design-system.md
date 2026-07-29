# 0001 — Sistema de diseño del Home sin librerías externas

- **Estado**: Aceptada
- **Fecha**: 2026-07-28

## Contexto

El Home debía verse como una agencia de talento premium (editorial, cinematográfico,
minimalista), sin usar librerías de UI/animación, carruseles ni video de fondo, y
sin instalar dependencias nuevas.

## Decisión

- **Tipografía**: Geist Sans (ya existente) para cuerpo/UI, + Fraunces (`next/font/google`,
  peso `variable`) para titulares editoriales. No se agregó ningún paquete npm.
- **Color**: tokens propios en `app/globals.css` (`--color-ink`, `--color-paper`,
  `--color-obsidian`, `--color-accent`, etc.) dentro de `@theme inline`, en vez de una
  paleta de un framework de UI.
- **Imágenes**: `i.pravatar.cc` para retratos de talento (rostros reales, estables).
  Se descartó `picsum.photos` para imágenes "editoriales" (hero, sección Nosotros)
  porque devuelve fotografía completamente aleatoria — en pruebas mostró un bisonte
  en un acantilado como fondo del Hero. En su lugar: Hero usa un fondo decorativo
  100% CSS (viñeta + grano + marca de agua tipográfica), y "Sobre Draconis" usa un
  mosaico de retratos (mismo servicio confiable que el roster) en vez de una foto
  de stock sin control de contenido.
- Sin `framer-motion`, sin carruseles, sin iconos de librería (SVG inline donde hace falta).

## Gotcha importante (Tailwind v4 + `next/font`)

`@theme inline` en `globals.css` **no propaga correctamente** una variable tipo
`--font-display: var(--font-fraunces)` hacia CSS escrito a mano ni siempre hacia el
`:root` — el build la vacía silenciosamente (afectó tanto una regla `body{font-family}`
como una utilidad `font-display` custom). La forma confiable es referenciar
directamente la variable que expone `next/font` (`var(--font-fraunces)`,
`var(--font-geist-sans)`) en vez de indireccionar por un token propio del theme.
Ver comentarios en `app/globals.css` y las clases `font-[family-name:var(--font-fraunces)]`
en `components/sections/*`.

## Consecuencias

- Cero dependencias nuevas; el diseño es 100% Tailwind v4 + CSS propio.
- Las imágenes de talento (`i.pravatar.cc`) y el mosaico de "Sobre Draconis" son
  **placeholders temporales** — deben reemplazarse por fotografía real del roster
  antes de producción. `next.config.ts` ya tiene `images.remotePatterns` para esos
  hosts; al cambiar a fotos propias, actualizar esa lista.
- Si en el futuro se necesita otro font-family custom vía `@theme`, no asumir que
  `font-<nombre>` se genera solo — verificar con el patrón de este documento.
