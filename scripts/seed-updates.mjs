#!/usr/bin/env node
// Crea 3 posts de muestra en la categoría "novedades" de WordPress, para
// poder ver la sección de Novedades poblada antes de publicar contenido real.
//
// Requisito previo: la categoría "novedades" y los tags "promocion",
// "oferta", "noticia" deben existir en WordPress (Entradas → Categorías /
// Etiquetas).
//
// Uso (nunca pegues tu Application Password en el chat ni en un archivo
// versionado — pasala solo como variable de entorno al ejecutar):
//   WP_USERNAME=tu_usuario WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" node scripts/seed-updates.mjs

const WP_API_BASE = "https://draconisenterprise.com/wp-json/wp/v2";

const username = process.env.WP_USERNAME;
const appPassword = process.env.WP_APP_PASSWORD;

if (!username || !appPassword) {
  console.error(
    "Faltan variables de entorno. Uso:\n" +
      '  WP_USERNAME=tu_usuario WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" node scripts/seed-updates.mjs',
  );
  process.exit(1);
}

const authHeader = `Basic ${Buffer.from(`${username}:${appPassword}`).toString("base64")}`;

const SAMPLE_UPDATES = [
  {
    type: "promocion",
    title: "Sesión de management gratuita para nuevo talento",
    description:
      "Durante este mes ofrecemos una primera sesión de asesoría de carrera sin costo para artistas emergentes del Estado de México.",
    imageSeed: "novedad-promocion-1",
  },
  {
    type: "oferta",
    title: "Paquete de producción musical con descuento",
    description:
      "20% de descuento en paquetes de grabación y mezcla para proyectos reservados antes de fin de mes.",
    imageSeed: "novedad-oferta-1",
  },
  {
    type: "noticia",
    title: "Draconis Enterprise suma nuevo talento al roster",
    description:
      "Nos entusiasma anunciar la incorporación de nuevos artistas a nuestra agencia este trimestre.",
    imageSeed: "novedad-noticia-1",
  },
];

async function resolveTermId(taxonomy, slug) {
  const response = await fetch(`${WP_API_BASE}/${taxonomy}?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`No se pudo consultar ${taxonomy} (${response.status})`);
  }
  const data = await response.json();
  if (!data[0]) {
    throw new Error(
      `No existe el término "${slug}" en ${taxonomy}. Creálo primero en wp-admin.`,
    );
  }
  return data[0].id;
}

async function uploadSampleImage(seed) {
  const imageResponse = await fetch(
    `https://picsum.photos/seed/${seed}/1200/900`,
  );
  if (!imageResponse.ok) {
    throw new Error(`No se pudo descargar la imagen de muestra (${seed})`);
  }
  const buffer = Buffer.from(await imageResponse.arrayBuffer());

  const uploadResponse = await fetch(`${WP_API_BASE}/media`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Disposition": `attachment; filename="${seed}.jpg"`,
      "Content-Type": "image/jpeg",
    },
    body: buffer,
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `Falló la subida de media (${uploadResponse.status}): ${await uploadResponse.text()}`,
    );
  }

  const media = await uploadResponse.json();
  return media.id;
}

async function createSamplePost(sample, categoryId, tagId, mediaId) {
  const response = await fetch(`${WP_API_BASE}/posts`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: sample.title,
      content: sample.description,
      status: "publish",
      featured_media: mediaId,
      categories: [categoryId],
      tags: [tagId],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Falló la creación del post (${response.status}): ${await response.text()}`,
    );
  }

  return response.json();
}

async function main() {
  console.log("Resolviendo categoría 'novedades'...");
  const categoryId = await resolveTermId("categories", "novedades");

  for (const sample of SAMPLE_UPDATES) {
    console.log(`\nCreando muestra: "${sample.title}"`);
    const tagId = await resolveTermId("tags", sample.type);
    const mediaId = await uploadSampleImage(sample.imageSeed);
    const post = await createSamplePost(sample, categoryId, tagId, mediaId);
    console.log(`  Publicado: ${post.link}`);
  }

  console.log("\nListo. Recargá el home del sitio para ver las novedades.");
}

main().catch((error) => {
  console.error("\nError:", error.message);
  process.exit(1);
});
