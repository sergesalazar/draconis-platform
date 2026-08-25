import type {
  UpdateMedia,
  UpdateType,
  WordPressCredentials,
  WordPressUpdate,
  WordPressUser,
} from "@/types/updates";
import { WordPressApiError } from "@/types/updates";

const WP_API_BASE = "https://draconisenterprise.com/wp-json/wp/v2";
const UPDATES_CATEGORY_SLUG = "novedades";
const UPDATE_TYPE_SLUGS: Record<UpdateType, string> = {
  promocion: "promocion",
  oferta: "oferta",
  noticia: "noticia",
};

function toBasicAuthHeader(credentials: WordPressCredentials): string {
  const token = btoa(
    `${credentials.username}:${credentials.applicationPassword}`,
  );
  return `Basic ${token}`;
}

async function throwForErrorResponse(response: Response): Promise<never> {
  if (response.status === 401) {
    throw new WordPressApiError(
      "unauthorized",
      "Credenciales inválidas o sesión expirada.",
    );
  }
  if (response.status === 413) {
    throw new WordPressApiError(
      "payload-too-large",
      "El archivo es demasiado grande para el servidor.",
    );
  }
  throw new WordPressApiError(
    "unknown",
    `WordPress respondió con un error (${response.status}).`,
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function extractMedia(embedded: Record<string, unknown> | undefined): UpdateMedia | null {
  const featuredMediaList = embedded?.["wp:featuredmedia"];
  const featured = Array.isArray(featuredMediaList) ? featuredMediaList[0] : undefined;

  if (!featured?.source_url) return null;

  const mimeType: string = featured.mime_type ?? "";

  return {
    kind: mimeType.startsWith("video/") ? "video" : "image",
    url: featured.source_url,
    mimeType,
  };
}

function extractUpdateType(embedded: Record<string, unknown> | undefined): UpdateType | null {
  const termGroups = embedded?.["wp:term"];
  const terms = Array.isArray(termGroups) ? termGroups.flat() : [];
  const tagSlugs = terms
    .filter((term) => term?.taxonomy === "post_tag")
    .map((term) => term.slug as string);

  return (
    (Object.keys(UPDATE_TYPE_SLUGS) as UpdateType[]).find((type) =>
      tagSlugs.includes(UPDATE_TYPE_SLUGS[type]),
    ) ?? null
  );
}

async function resolveTermId(
  taxonomy: "categories" | "tags",
  slug: string,
): Promise<number | null> {
  const response = await fetch(`${WP_API_BASE}/${taxonomy}?slug=${slug}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data[0]?.id ?? null;
}

export async function getPublishedUpdates(): Promise<WordPressUpdate[]> {
  try {
    const categoryId = await resolveTermId("categories", UPDATES_CATEGORY_SLUG);
    if (categoryId === null) return [];

    const response = await fetch(
      `${WP_API_BASE}/posts?categories=${categoryId}&_embed&per_page=12&orderby=date&order=desc`,
    );
    if (!response.ok) return [];

    const posts = await response.json();
    if (!Array.isArray(posts)) return [];

    return posts.map((post) => ({
      id: post.id,
      title: stripHtml(post.title?.rendered ?? ""),
      description: stripHtml(post.excerpt?.rendered ?? ""),
      type: extractUpdateType(post._embedded),
      media: extractMedia(post._embedded),
      publishedAt: post.date,
    }));
  } catch {
    return [];
  }
}

export async function verifyWordPressCredentials(
  credentials: WordPressCredentials,
): Promise<WordPressUser> {
  const response = await fetch(`${WP_API_BASE}/users/me`, {
    headers: { Authorization: toBasicAuthHeader(credentials) },
  });

  if (!response.ok) {
    await throwForErrorResponse(response);
  }

  const data = await response.json();
  return { id: data.id, name: data.name };
}

export async function deleteUpdatePost(
  postId: number,
  credentials: WordPressCredentials,
): Promise<void> {
  const response = await fetch(`${WP_API_BASE}/posts/${postId}?force=true`, {
    method: "DELETE",
    headers: { Authorization: toBasicAuthHeader(credentials) },
  });

  if (!response.ok) {
    await throwForErrorResponse(response);
  }
}

export async function uploadMediaToWordPress(
  file: File,
  credentials: WordPressCredentials,
): Promise<{ id: number; mimeType: string }> {
  const response = await fetch(`${WP_API_BASE}/media`, {
    method: "POST",
    headers: {
      Authorization: toBasicAuthHeader(credentials),
      "Content-Disposition": `attachment; filename="${file.name}"`,
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    await throwForErrorResponse(response);
  }

  const data = await response.json();
  return { id: data.id, mimeType: data.mime_type };
}

interface CreateUpdatePostPayload {
  title: string;
  description: string;
  type: UpdateType;
  mediaId: number;
}

export async function createUpdatePost(
  payload: CreateUpdatePostPayload,
  credentials: WordPressCredentials,
): Promise<{ id: number; link: string }> {
  const [categoryId, tagId] = await Promise.all([
    resolveTermId("categories", UPDATES_CATEGORY_SLUG),
    resolveTermId("tags", UPDATE_TYPE_SLUGS[payload.type]),
  ]);

  if (categoryId === null) {
    throw new WordPressApiError(
      "unknown",
      `No se encontró la categoría "${UPDATES_CATEGORY_SLUG}" en WordPress. Creala antes de publicar.`,
    );
  }

  const response = await fetch(`${WP_API_BASE}/posts`, {
    method: "POST",
    headers: {
      Authorization: toBasicAuthHeader(credentials),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      content: payload.description,
      status: "publish",
      featured_media: payload.mediaId,
      categories: [categoryId],
      tags: tagId !== null ? [tagId] : [],
    }),
  });

  if (!response.ok) {
    await throwForErrorResponse(response);
  }

  const data = await response.json();
  return { id: data.id, link: data.link };
}
