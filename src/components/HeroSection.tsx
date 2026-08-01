import { Sparkles, Heart, Palette } from "lucide-react";
import heroAsset from "@/assets/hero-cake-white.jpg.asset.json";
import OrderForm from "@/components/OrderForm";

const HeroSection = () => {
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
          <div className="text-center lg:text-left animate-fade-up min-w-0">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-chocolate mb-6 break-words">
              Торты, в которые{" "}
              <span className="text-gradient-gold italic">влюбляются</span>{" "}
              с первого кусочка
            </h1>

            <p className="text-lg md:text-xl text-chocolate-light mb-8 max-w-xl mx-auto lg:mx-0 break-words">
              Торты и десерты на заказ в Санкт-Петербурге. Бенто-торты — от
              1 750 ₽, большие торты — от 3 300 ₽.
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

            {/* Hero Image */}
            <div className="mb-10 lg:mb-0 lg:mt-12 min-w-0">
              <div className="relative mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-sm lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-b from-dustyPink/20 to-gold/20 rounded-3xl blur-2xl transform scale-110" />
                <img
                  src={heroAsset.url}
                  alt="Свадебный торт с золотым топпером от Valerie Bakery"
                  width={1209}
                  height={1612}
                  fetchPriority="high"
                  decoding="async"
                  className="relative rounded-3xl shadow-elevated w-full object-cover object-center aspect-[3/4]"
                />
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="relative min-w-0">
            <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-elevated border border-border/50 animate-scale-in">
              <OrderForm
                variant="light"
                submitLabel="Заказать торт"
                commentPlaceholder="Комментарий к заказу (пожелания к декору)"
                header={
                  <>
                    <h2 className="font-serif text-2xl md:text-3xl text-chocolate mb-2">
                      Оставить заявку
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Опишите ваш идеальный торт, и мы свяжемся с вами
                    </p>
                  </>
                }
              />
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
