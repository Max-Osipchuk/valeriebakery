import { useState } from "react";
import { ChevronDown } from "lucide-react";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeBerry from "@/assets/cake-berry.jpg";
import cakeMango from "@/assets/cake-mango.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import bentoCake from "@/assets/bento-cake.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery11 from "@/assets/gallery-11.jpg";

interface FlavorItem {
  name: string;
  description: string;
}

interface PriceItem {
  name: string;
  price: string;
}

interface MenuCategory {
  id: string;
  title: string;
  price: string;
  minWeight?: string;
  image: string;
  flavors?: FlavorItem[];
  items?: PriceItem[];
  options?: { label: string; values: string[] }[];
}

const menuData: MenuCategory[] = [
  {
    id: "biscuit1",
    title: "Бисквитные торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: cakeBerry,
    flavors: [
      { name: "Рафаэлло", description: "Кокосовые бисквиты и крем, начинка из малинового конфитюра" },
      { name: "Манго Маракуйя", description: "Кокосовые бисквиты, манговый крем и 2 начинки: маракуйевый конфитюр и манговый чизкейк" },
      { name: "Мятный", description: "Ванильные бисквиты, мятный крем и 2 начинки из мятного мусса и белого шоколада в сливках" },
      { name: "Клубника со сливками", description: "Ванильные бисквиты, сливочный крем и 2 начинки из клубничного конфитюра и клубничного мусса" },
    ],
  },
  {
    id: "biscuit2",
    title: "Бисквитные торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: cakeMango,
    flavors: [
      { name: "Миндаль банан", description: "Миндальные бисквиты и крем, начинка из карамелизированного банана" },
      { name: "Ягода малина", description: "Малиновые бисквиты и крем, начинка из малинового конфитюра, посыпанного маршмеллоу" },
      { name: "Фисташка малина", description: "Фисташковые бисквиты и крем, начинка из малинового конфитюра" },
      { name: "Красный бархат", description: "Бисквиты красный бархат, ванильный крем и начинка из вишневого конфитюра" },
    ],
  },
  {
    id: "biscuit3",
    title: "Бисквитные торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: cakeChocolate,
    flavors: [
      { name: "Сникерс", description: "Шоколадные бисквиты, ванильный крем и начинка из арахиса, политого солёной карамелью" },
      { name: "Морковный", description: "Морковные бисквиты, ванильный крем и 2 начинки из солёной карамели и ванильного чизкейка" },
      { name: "Шоколадная вишня", description: "Шоколадные бисквиты и крем, начинка из вишневого конфитюра" },
      { name: "Карамельная груша", description: "Карамельные бисквиты, ванильный крем и начинка из жареной груши, политой солёной карамелью" },
    ],
  },
  {
    id: "seasonal",
    title: "Сезонные торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: gallery9,
    flavors: [
      { name: "Кленовая тыква", description: "Тыквенные бисквиты, кленовый крем и начинка из солёной карамели" },
      { name: "Арахисовый", description: "Арахисовые бисквиты и крем, начинка из арахиса, политого солёной карамелью" },
      { name: "Яблочный пирог", description: "Пряные бисквиты с добавлением специй (корица, мускат, имбирь), ванильный крем и начинка из жареных яблок, политых солёной карамелью" },
      { name: "Шоколадный апельсин", description: "Шоколадные бисквиты и крем, начинка из апельсинового конфитюра" },
    ],
  },
  {
    id: "classic",
    title: "Классические торты",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: gallery11,
    flavors: [
      { name: "Медовик", description: "Медовые коржи и ванильно-сметанный крем" },
      { name: "Молочная девочка", description: "Бисквиты с добавлением сгущённого молока, ванильный крем и начинка из малинового конфитюра" },
    ],
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
    options: [
      { label: "Бисквит", values: ["ваниль", "шоколад", "красный бархат", "миндаль", "мак", "кокос"] },
      { label: "Крем", values: ["ваниль", "шоколад"] },
      { label: "Начинка", values: [
        "ягодный конфитюр (малина, клубника, черника, вишня)",
        "фруктовый конфитюр (манго, маракуйя, яблоки с корицей, апельсин с корицей, груша, лимон)",
        "солёная карамель",
        "солёная карамель с арахисом или миндалём",
        "заварной ванильный крем",
        "белый шоколад в сливках",
      ]},
    ],
  },
  {
    id: "bento",
    title: "Бенто-торт",
    price: "1 750₽",
    image: bentoCake,
    items: [{ name: "~500 гр", price: "1 750₽" }],
    options: [
      { label: "Бисквит", values: ["ваниль", "шоколад", "красный бархат", "миндаль", "мак", "кокос"] },
      { label: "Начинка", values: [
        "ягодный конфитюр (малина, клубника, черника, вишня)",
        "фруктовый конфитюр (манго, маракуйя, яблоки с корицей, апельсин с корицей, груша, лимон)",
        "солёная карамель",
        "солёная карамель с арахисом или миндалём",
        "заварной ванильный крем",
        "белый шоколад в сливках",
      ]},
      { label: "Крем", values: ["ваниль", "шоколад", "манго", "кокос", "миндаль"] },
    ],
  },
];

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
                      ? "max-h-[800px] mt-4"
                      : "max-h-0"
                  }`}
                >
                  <div className="space-y-3 pt-4 border-t border-border">
                    {category.flavors?.map((flavor, i) => (
                      <div key={i} className="text-sm">
                        <span className="font-semibold text-chocolate">{flavor.name}</span>
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
