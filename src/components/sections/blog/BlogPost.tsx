import { BlogLayout } from "./BlogLayout";
import { useBlogPostBySlug } from "@/api/hooks/useBlogApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface BlogPostPageProps {
  slug: string;
}

export const BlogPost = ({ slug }: BlogPostPageProps) => {
  const { post, loading } = useBlogPostBySlug(slug, false);

  if (loading) {
    return (
      <BlogLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </BlogLayout>
    );
  }

  if (!post) {
    return (
      <BlogLayout title="Post Not Found">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-gradient-to-br from-destructive/5 to-destructive/2 p-12 text-center shadow-xl backdrop-blur-sm">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
            <span className="text-2xl">📄</span>
          </div>
          <h2 className="mb-3 text-2xl font-bold">Post not found</h2>
          <p className="mb-8 text-muted-foreground">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blog
            </Link>
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const dateLabel = new Date(post.createdAt).toLocaleDateString();

  return (
    <BlogLayout title={post.title}>
      <article className="mx-auto max-w-4xl space-y-8">
        {/* Meta Header */}
        <header className="space-y-4 rounded-2xl bg-gradient-to-r from-muted/50 to-card/80 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{dateLabel}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-[400px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
          </div>
        )}

        {/* Content */}
        <section className="prose prose-headings:font-black prose-headings:text-foreground prose-a:text-primary prose-strong:font-bold prose-neutral dark:prose-invert max-w-none space-y-6 rounded-2xl bg-gradient-to-br from-card/80 via-background to-muted/20 p-8 shadow-xl backdrop-blur-sm sm:text-lg">
          {post.content
            .split("\n")
            .filter(Boolean)
            .map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
        </section>

        {/* Back Button */}
        <div className="pt-8">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </Button>
        </div>
      </article>
    </BlogLayout>
  );
};
