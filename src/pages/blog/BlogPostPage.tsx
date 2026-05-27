import { useParams, Link } from "react-router-dom";
import { BlogPost } from "@/components";

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="min-h-screen bg-background p-8">
        {/* 404 handled in BlogPost */}
        <BlogPost slug={slug || ""} />
      </div>
    );
  }

  return <BlogPost slug={slug} />;
};
