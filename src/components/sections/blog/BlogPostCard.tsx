import type { BlogPost } from "@/types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: (slug: string) => void;
}

export const BlogPostCard = ({ post, onClick }: BlogPostCardProps) => {
  const handleClick = () => onClick?.(post.slug);

  const dateLabel = new Date(post.createdAt).toLocaleDateString();

  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card/80 via-background to-muted/60 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/40",
        onClick && "cursor-pointer",
      )}
      role={onClick ? "button" : "article"}
      onClick={onClick ? handleClick : undefined}
    >
      {/* Gradient Overlay + Image */}
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <CardHeader className="p-6 pb-4">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{dateLabel}</span>
        </div>

        <h3
          className={cn(
            "mb-2 line-clamp-2 text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors",
            onClick && "group-hover:underline",
          )}
        >
          {post.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border-border/50 bg-gradient-to-r from-muted/80 to-primary/10 text-xs shadow-md hover:from-primary/20 transition-all"
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <p className="line-clamp-2 mb-4 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {onClick && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 border-border/50 bg-gradient-to-r from-transparent via-primary/10 to-transparent px-4 py-1.5 text-sm font-medium shadow-sm transition-all hover:gap-3 hover:shadow-md hover:backdrop-blur-sm"
          >
            Read more
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
