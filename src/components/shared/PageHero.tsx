import { Leaf } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
  icon?: React.ReactNode;
  gradient?: string;
}

const PageHero = ({
  title,
  subtitle,
  bgImage,
  icon,
  gradient = "from-primary/85 via-primary/60 to-secondary/50",
}: PageHeroProps) => (
  <section className="relative overflow-hidden pt-16">
    {/* Background image */}
    <img
      src={bgImage}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Gradient overlay */}
    <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />
    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />

    {/* Content */}
    <div className="relative z-10 py-16 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 text-center">
        {icon && (
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm mb-5">
            {icon}
          </div>
        )}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight max-w-3xl mx-auto drop-shadow-lg">
          {title}
        </h1>
        <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Decorative floating leaves */}
        <div className="absolute top-8 left-8 opacity-20 animate-float hidden md:block">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-12 right-12 opacity-15 animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>
          <Leaf className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  </section>
);

export default PageHero;
