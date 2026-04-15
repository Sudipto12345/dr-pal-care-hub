import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useSupabaseData";
import PageHero from "@/components/shared/PageHero";
import heroBlog from "@/assets/hero-blog.jpg";

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts(true);

  return (
    <div>
      <PageHero
        title="Health Blog"
        subtitle="Insights and tips for natural wellness"
        bgImage={heroBlog}
        icon={<BookOpen className="w-7 h-7 text-white" />}
        gradient="from-info/80 via-primary/60 to-secondary/50"
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (posts || []).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(posts || []).map((post: any) => (
                <Link to={`/blog/${post.slug || post.id}`} key={post.id} className="block">
                  <Card className="border-border rounded-2xl hover:shadow-card transition-all duration-300 group h-full">
                    <CardContent className="p-6">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="w-full h-40 rounded-xl object-cover mb-4" />
                      ) : (
                        <div className="w-full h-40 rounded-xl bg-accent/50 flex items-center justify-center mb-4">
                          <span className="text-3xl">📖</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-heading font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt || post.content?.substring(0, 120)}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
