import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useSupabaseData";
import PageHero from "@/components/shared/PageHero";
import heroBlog from "@/assets/hero-blog.jpg";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: posts, isLoading } = useBlogPosts(true);
  const post = posts?.find((p: any) => p.slug === slug || p.id === slug);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-3" />
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">Post Not Found</h2>
        <Button variant="outline" className="rounded-xl mt-2" asChild>
          <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={post.title}
        subtitle={new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        bgImage={post.image_url || heroBlog}
        icon={<BookOpen className="w-7 h-7 text-white" />}
      />
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" asChild>
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog</Link>
          </Button>

          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8" />
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed italic border-l-4 border-primary pl-4">
              {post.excerpt}
            </p>
          )}

          <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
