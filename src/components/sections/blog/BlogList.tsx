import { BlogLayout } from "./BlogLayout";
import { BlogPostCard } from "./BlogPostCard";
import { useBlogList } from "@/api/hooks/useBlogApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface BlogListProps {
  title?: string;
  subtitle?: string;
  onPostClick?: (slug: string) => void;
}

export const BlogList = ({ title, subtitle, onPostClick }: BlogListProps) => {
  const { posts, loading } = useBlogList(false);

  if (loading) {
    return (
      <BlogLayout title={title} subtitle={subtitle}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
          ))}
        </div>
      </BlogLayout>
    );
  }

  if (!posts.length) {
    return (
      <BlogLayout title={title} subtitle={subtitle}>
        <Card className="mx-auto max-w-md border-border/50 bg-gradient-to-br from-muted/50 to-card/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-muted p-3">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">No posts yet</h3>
            <p className="text-muted-foreground">
              Be the first to create amazing content. Start writing now!
            </p>
          </CardContent>
        </Card>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout title={title} subtitle={subtitle}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} onClick={onPostClick} />
        ))}
      </div>
    </BlogLayout>
  );
};
