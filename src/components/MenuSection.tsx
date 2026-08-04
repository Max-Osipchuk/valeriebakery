import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { menuData, selectFlavor } from "@/data/menu";

const MenuSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>("biscuit1");

  return (
    <section id="menu" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Наше меню
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-chocolate mb-6">
            Десерты для <span className="italic text-dustyPink">особых</span>{" "}
            моментов
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Каждый торт создаётся с любовью из натуральных ингредиентов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuData.map((category, index) => (
            <div
              key={category.id}
              className="cake-card group relative bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-up border border-border/40 hover:border-gold/40"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/20 to-transparent" />
                {/* Price chip */}
                <div className="absolute top-4 right-4 bg-cream/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft">
                  <span className="text-chocolate font-semibold text-sm">
                    {category.price}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-2xl text-cream mb-1 drop-shadow-sm">
                    {category.title}
                  </h3>
                  {category.minWeight && (
                    <span className="inline-flex items-center gap-2 text-cream/80 text-xs tracking-wide">
                      <span className="h-px w-5 bg-gold" />
                      {category.minWeight}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === category.id ? null : category.id
                    )
                  }
                  className="w-full flex items-center justify-between text-chocolate-light hover:text-chocolate transition-colors"
                >
                  <span className="font-medium">
                    {category.flavors
                      ? `${category.flavors.length} вкусов`
                      : "Подробнее"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      expandedId === category.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedId === category.id
                      ? "max-h-[900px] mt-4"
                      : "max-h-0"
                  }`}
                >
                  <div className="space-y-3 pt-4 border-t border-border">
                    {category.flavors?.map((flavor, i) => (
                      <div key={i} className="text-sm">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-semibold text-chocolate">{flavor.name}</span>
                          <button
                            onClick={() => selectFlavor(flavor.name)}
                            className="shrink-0 text-xs font-medium text-gold hover:text-chocolate transition-colors underline underline-offset-2"
                          >
                            Заказать
                          </button>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mt-0.5">
                          {flavor.description}
                        </p>
                      </div>
                    ))}
                    {category.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.name}
                        </span>
                        <span className="text-chocolate font-medium">
                          {item.price}
                        </span>
                      </div>
                    ))}
                    {category.options?.map((option, i) => (
                      <div key={i} className="text-sm mt-2">
                        <span className="font-semibold text-chocolate">{option.label}:</span>
                        <p className="text-muted-foreground leading-relaxed mt-0.5">
                          {option.values.join(", ")}
                        </p>
                      </div>
                    ))}
                    {category.items && (
                      <button
                        onClick={() =>
                          selectFlavor(category.id === "bento" ? "Бенто-торт" : category.title)
                        }
                        className="mt-2 w-full rounded-xl bg-gold/15 px-4 py-3 text-sm font-medium text-chocolate hover:bg-gold/30 transition-colors"
                      >
                        Заказать {category.id === "bento" ? "бенто-торт" : "капкейки"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
