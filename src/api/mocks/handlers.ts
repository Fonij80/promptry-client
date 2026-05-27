import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/blog/posts", () => {
    return HttpResponse.json(require("../../data/blog-posts.json"));
  }),
  http.get("/api/blog/posts/:slug", ({ params }) => {
    const posts = require("../../data/blog-posts.json");
    const post = posts.find((p: any) => p.slug === params.slug);
    return post
      ? HttpResponse.json(post)
      : new HttpResponse(null, { status: 404 });
  }),
];
