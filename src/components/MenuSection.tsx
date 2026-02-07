import { useState } from "react";
import { ChevronDown } from "lucide-react";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeBerry from "@/assets/cake-berry.jpg";
import cakeMango from "@/assets/cake-mango.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import bentoCake from "@/assets/bento-cake.jpg";

interface MenuCategory {
  id: string;
  title: string;
  price: string;
  minWeight?: string;
  image: string;
  flavors?: string[];
  items?: { name: string; price: string }[];
}

const menuData: MenuCategory[] = [
  {
    id: "biscuit",
    title: "Бисквитные торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: cakeBerry,
    flavors: [
      "Рафаэлло — кокосовые бисквиты, крем, малиновый конфитюр",
      "Манго-маракуйя — кокосовые бисквиты, манговый крем, конфитюр маракуйя",
      "Мятный — ванильные бисквиты, мятный крем, белый шоколад",
      "Клубника со сливками — ванильные бисквиты, сливочный крем, клубничный конфитюр",
      "Миндаль-банан",
      "Ягода-малина",
      "Фисташка-малина",
      "Красный бархат",
      "Сникерс",
      "Морковный",
      "Шоколадная вишня",
      "Карамельная груша",
    ],
  },
  {
    id: "seasonal",
    title: "Сезонные торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: cakeMango,
    flavors: [
      "Кленовая тыква",
      "Арахисовый",
      "Яблочный пирог",
      "Шоколадный апельсин",
    ],
  },
  {
    id: "classic",
    title: "Классические торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: cakeChocolate,
    flavors: ["Медовик", "Молочная девочка"],
  },
  {
    id: "cupcakes",
    title: "Капкейки",
    price: "от 2 500₽",
    image: cupcakes,
    items: [
      { name: "6 шт", price: "2 500₽" },
      { name: "10 шт", price: "3 600₽" },
      { name: "12 шт", price: "4 700₽" },
    ],
  },
  {
    id: "bento",
    title: "Бенто-торты",
    price: "1 750₽",
    image: bentoCake,
    flavors: ["Любая начинка на ваш выбор", "~500 г"],
  },
];

const MenuSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>("biscuit");

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
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-2xl text-cream mb-1">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gold font-semibold text-lg">
                      {category.price}
                    </span>
                    {category.minWeight && (
                      <span className="text-cream/70 text-sm">
                        {category.minWeight}
                      </span>
                    )}
                  </div>
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
                      : `${category.items?.length} варианта`}
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
                      ? "max-h-[500px] mt-4"
                      : "max-h-0"
                  }`}
                >
                  <div className="space-y-2 pt-4 border-t border-border">
                    {category.flavors?.map((flavor, i) => (
                      <p
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        • {flavor}
                      </p>
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
