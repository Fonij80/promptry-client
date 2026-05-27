import { useCallback, useEffect, useState } from "react";
import type { BlogPost } from "@/types/blog";
import {
  listPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "@/api/storages/blogStorage";

export function useBlogList(includeDrafts = false) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    const items = listPosts({ includeDrafts });
    setPosts(items);
    setLoading(false);
  }, [includeDrafts]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { posts, loading, refresh };
}

export function useBlogPostBySlug(slug: string, includeDrafts = false) {
  const [post, setPost] = useState<BlogPost | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const item = getPostBySlug(slug, { includeDrafts });
    setPost(item);
    setLoading(false);
  }, [slug, includeDrafts]);

  return { post, loading };
}

export function useBlogPostById(id?: string) {
  const [post, setPost] = useState<BlogPost | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setPost(undefined);
      setLoading(false);
      return;
    }
    setLoading(true);
    const item = getPostById(id);
    setPost(item);
    setLoading(false);
  }, [id]);

  return { post, loading };
}

export function useBlogCmsActions(onChanged?: () => void) {
  const handleCreate = useCallback(
    (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
      const created = createPost(data);
      onChanged?.();
      return created;
    },
    [onChanged],
  );

  const handleUpdate = useCallback(
    (id: string, data: Partial<Omit<BlogPost, "id" | "createdAt">>) => {
      const updated = updatePost(id, data);
      onChanged?.();
      return updated;
    },
    [onChanged],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deletePost(id);
      onChanged?.();
    },
    [onChanged],
  );

  return { create: handleCreate, update: handleUpdate, remove: handleDelete };
}
