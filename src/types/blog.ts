export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  status: BlogPostStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
