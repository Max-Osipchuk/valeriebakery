import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Palette } from "lucide-react";
import heroImage from "@/assets/hero-cake.jpg";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", comment: "" });
    }, 3000);
  };

  const features = [
    { icon: Sparkles, text: "Натуральные ингредиенты" },
    { icon: Heart, text: "Ручная работа" },
    { icon: Palette, text: "Индивидуальный декор" },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-dustyPink-light/30 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gold-light/20 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-chocolate mb-6">
              Торты, в которые{" "}
              <span className="text-gradient-gold italic">влюбляются</span>{" "}
              с первого кусочка
            </h1>

            <p className="text-lg md:text-xl text-chocolate-light/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Торты и десерты на заказ в Санкт-Петербурге. Создаём сладкие
              шедевры с любовью и заботой о каждой детали.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-cream/80 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-soft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <feature.icon className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium text-chocolate-light">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Hero Image for Mobile */}
            <div className="lg:hidden mb-10">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-dustyPink/20 to-gold/20 rounded-3xl blur-2xl transform scale-110" />
                <img
                  src={heroImage}
                  alt="Изысканный торт от Valerie Bakery"
                  className="relative rounded-3xl shadow-elevated w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>

          {/* Right - Form + Image */}
          <div className="relative">
            {/* Hero Image for Desktop */}
            <div className="hidden lg:block absolute -top-10 -right-10 w-[120%] h-[120%] -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-dustyPink/20 to-gold/20 rounded-[40px] blur-3xl" />
            </div>

            <div className="hidden lg:block absolute -top-20 right-0 w-[400px] h-[400px] -z-10">
              <img
                src={heroImage}
                alt="Изысканный торт"
                className="w-full h-full object-cover rounded-[40px] shadow-elevated opacity-40"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-elevated border border-border/50 animate-scale-in">
              <h2 className="font-serif text-2xl md:text-3xl text-chocolate mb-2">
                Оставить заявку
              </h2>
              <p className="text-muted-foreground mb-6">
                Опишите ваш идеальный торт, и мы свяжемся с вами
              </p>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gold fill-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-chocolate mb-2">
                    Спасибо за заявку!
                  </h3>
                  <p className="text-muted-foreground">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Телефон"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Комментарий к заказу (дата, пожелания к декору)"
                      rows={3}
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <Button type="submit" variant="hero" size="xl" className="w-full">
                    Заказать торт
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-chocolate-light/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-chocolate-light/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
