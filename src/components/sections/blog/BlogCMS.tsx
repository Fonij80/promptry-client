import { useState } from "react";
import type { BlogPost } from "@/types/blog";
import {
  useBlogCmsActions,
  useBlogList,
  useBlogPostById,
} from "@/api/hooks/useBlogApi";
import { BlogPostForm } from "./BlogPostForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowLeft } from "lucide-react";

type Mode = "list" | "create" | "edit";

export const BlogCMS = () => {
  const [mode, setMode] = useState<Mode>("list");
  const [editingId, setEditingId] = useState<string | undefined>();

  const { posts, loading, refresh } = useBlogList(true);
  const { post: editingPost } = useBlogPostById(editingId);
  const { create, update, remove } = useBlogCmsActions(refresh);

  const handleCreateClick = () => {
    setEditingId(undefined);
    setMode("create");
  };

  const handleEditClick = (id: string) => {
    setEditingId(id);
    setMode("edit");
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Delete this post permanently?")) {
      remove(id);
    }
  };

  const handleSubmitCreate = (values: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string;
    status: BlogPost["status"];
  }) => {
    create({
      slug: values.slug,
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      coverImage: values.coverImage || undefined,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: values.status,
    });
    setMode("list");
  };

  const handleSubmitEdit = (values: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string;
    status: BlogPost["status"];
  }) => {
    if (!editingId) return;
    update(editingId, {
      slug: values.slug,
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      coverImage: values.coverImage || undefined,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: values.status,
    });
    setMode("list");
  };

  const handleCancelForm = () => {
    setMode("list");
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Blog CMS
          </CardTitle>
          {mode === "list" ? (
            <Button onClick={handleCreateClick}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          ) : (
            <Button variant="outline" onClick={handleCancelForm}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to list
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {mode === "list" && (
            <>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : !posts.length ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 text-muted-foreground">
                  <p className="text-sm">No posts yet.</p>
                  <p className="text-xs">Create your first post above.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-32">Slug</TableHead>
                        <TableHead className="w-24">Status</TableHead>
                        <TableHead className="w-32">Updated</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">
                            {post.title}
                          </TableCell>
                          <TableCell className="text-sm font-mono">
                            {post.slug}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(post.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(post.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}

          {(mode === "create" || mode === "edit") && (
            <BlogPostForm
              initial={mode === "edit" ? (editingPost ?? null) : null}
              onSubmit={
                mode === "create" ? handleSubmitCreate : handleSubmitEdit
              }
              onCancel={handleCancelForm}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
