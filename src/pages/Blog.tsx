import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const posts = [
  { id: 1, title: "Understanding Homeopathy: A Beginner's Guide", excerpt: "Learn the fundamentals of homeopathic medicine and how it works with your body's natural healing.", date: "Mar 15, 2025", category: "Education" },
  { id: 2, title: "Top 5 Remedies for Seasonal Allergies", excerpt: "Discover natural homeopathic remedies that can help you manage seasonal allergies effectively.", date: "Mar 10, 2025", category: "Remedies" },
  { id: 3, title: "Homeopathy for Children: Safe & Effective", excerpt: "Why homeopathy is an excellent choice for treating common childhood ailments.", date: "Mar 5, 2025", category: "Pediatrics" },
  { id: 4, title: "Managing Stress with Natural Remedies", excerpt: "Explore homeopathic approaches to reducing stress and improving mental wellness.", date: "Feb 28, 2025", category: "Wellness" },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="border-border rounded-2xl hover:shadow-card transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-secondary bg-accent px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
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
