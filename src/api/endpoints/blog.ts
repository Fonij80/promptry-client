import { apiClient } from "../clients/http-client";
import type { BlogPost, BlogPostCreate } from "../types/blog";

export const blogApi = {
  listPosts: () => apiClient.request<BlogPost[]>("/blog/posts"),
  getPost: (slug: string) => apiClient.request<BlogPost>(`/blog/posts/${slug}`),
  createPost: (data: BlogPostCreate) =>
    apiClient.request<BlogPost>("/blog/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updatePost: (id: string, data: Partial<BlogPostCreate>) =>
    apiClient.request<BlogPost>(`/blog/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletePost: (id: string) =>
    apiClient.request<void>(`/blog/posts/${id}`, { method: "DELETE" }),
};
