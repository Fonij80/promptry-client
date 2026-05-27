import { useNavigate } from "react-router-dom";
import { BlogList } from "@/components";

export const BlogListPage = () => {
  const navigate = useNavigate();
  const handlePostClick = (slug: string) => navigate(`/blog/${slug}`);

  return (
    <BlogList
      title="Fonij Blog"
      subtitle="Discover the latest posts, updates, and insights"
      onPostClick={handlePostClick}
    />
  );
};
