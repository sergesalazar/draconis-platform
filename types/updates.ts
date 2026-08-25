export type UpdateType = "promocion" | "oferta" | "noticia";

export interface UpdateMedia {
  kind: "image" | "video";
  url: string;
  mimeType: string;
}

export interface WordPressUpdate {
  id: number;
  title: string;
  description: string;
  type: UpdateType | null;
  media: UpdateMedia | null;
  publishedAt: string;
}

export interface WordPressCredentials {
  username: string;
  applicationPassword: string;
}

export interface WordPressUser {
  id: number;
  name: string;
}

export type WordPressErrorKind =
  | "unauthorized"
  | "payload-too-large"
  | "network"
  | "unknown";

export class WordPressApiError extends Error {
  kind: WordPressErrorKind;

  constructor(kind: WordPressErrorKind, message: string) {
    super(message);
    this.kind = kind;
    this.name = "WordPressApiError";
  }
}
