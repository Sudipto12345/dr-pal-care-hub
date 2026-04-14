import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockBlogPosts } from "@/data/mockData";

const Blog = () => (
  <div>
    <section className="gradient-hero text-primary-foreground py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Health Blog</h1>
        <p className="text-primary-foreground/70 max-w-lg mx-auto">Insights and tips for natural wellness</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockBlogPosts.map((post) => (
            <Card key={post.id} className="border-border rounded-2xl hover:shadow-card transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-full h-40 rounded-xl bg-accent/50 flex items-center justify-center mb-4">
                  <span className="text-3xl">{post.category === "Education" ? "📖" : post.category === "Remedies" ? "🌱" : "👶"}</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-secondary bg-accent px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-muted-foreground">{post.views.toLocaleString()} views</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <Link to="#" className="inline-flex items-center text-sm font-medium text-secondary hover:underline">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
