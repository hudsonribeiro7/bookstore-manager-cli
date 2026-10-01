import { Author } from "./Author";

export interface Book {
  id?: number;
  title: string;
  authorId: number;
  available: boolean;
  author?: Author;
  authorName?: string;
}