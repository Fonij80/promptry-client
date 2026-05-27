// src/api/storages/blogStorage.ts
import type { BlogPost } from "../types/blog";
import seedData from "@/data/blog-posts.json"; // ← add this import

const STORAGE_KEY = "fonij_blog_posts_v1";

function ensureSeeded() {
  if (typeof window === "undefined") return;
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  }
}

function readRaw(): BlogPost[] {
  if (typeof window === "undefined") return [];
  ensureSeeded(); // ← ensure JSON is loaded into localStorage once
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

function writeRaw(posts: BlogPost[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function listPosts(options?: { includeDrafts?: boolean }): BlogPost[] {
  const posts = readRaw();
  if (options?.includeDrafts) return posts.sort(sortByDateDesc);
  return posts.filter((p) => p.status === "published").sort(sortByDateDesc);
}

export function getPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): BlogPost | undefined {
  const posts = readRaw();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return undefined;
  if (!options?.includeDrafts && post.status !== "published") return undefined;
  return post;
}

export function getPostById(id: string): BlogPost | undefined {
  const posts = readRaw();
  return posts.find((p) => p.id === id);
}

export function createPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">,
): BlogPost {
  const posts = readRaw();
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(post);
  writeRaw(posts);
  return post;
}

export function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "id" | "createdAt">>,
): BlogPost | undefined {
  const posts = readRaw();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  const updated: BlogPost = {
    ...posts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  posts[index] = updated;
  writeRaw(posts);
  return updated;
}

export function deletePost(id: string): void {
  const posts = readRaw();
  const next = posts.filter((p) => p.id !== id);
  writeRaw(next);
}

function sortByDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
