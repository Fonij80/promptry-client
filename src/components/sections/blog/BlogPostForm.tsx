"use client";

import { useEffect, useState, useTransition } from "react";
import type { BlogPost, BlogPostStatus } from "@/types/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogPostFormValues {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  status: BlogPostStatus;
}

interface BlogPostFormProps {
  initial?: BlogPost | null;
  onSubmit: (values: BlogPostFormValues) => void;
  onCancel?: () => void;
}

export const BlogPostForm = ({
  initial,
  onSubmit,
  onCancel,
}: BlogPostFormProps) => {
  const [values, setValues] = useState<BlogPostFormValues>({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    status: "draft",
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (initial) {
      setValues({
        slug: initial.slug,
        title: initial.title,
        excerpt: initial.excerpt,
        content: initial.content,
        coverImage: initial.coverImage ?? "",
        tags: initial.tags.join(", "),
        status: initial.status,
      });
    }
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      onSubmit(values);
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          {initial ? "Edit Post" : "New Post"}
        </CardTitle>
        <CardDescription>
          Fill out the form to {initial ? "update" : "create"} your blog post.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                placeholder="my-first-post"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={values.status}
                onValueChange={(value) =>
                  setValues((prev) => ({
                    ...prev,
                    status: value as BlogPostStatus,
                  }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={values.excerpt}
              onChange={handleChange}
              placeholder="Short description for list page..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                name="coverImage"
                value={values.coverImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                placeholder="react, vite, cms"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              rows={12}
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
