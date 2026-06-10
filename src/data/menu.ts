import gallery9 from "@/assets/gallery-9.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";

export interface FlavorItem {
  name: string;
  description: string;
}

export interface PriceItem {
  name: string;
  price: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  price: string;
  minWeight?: string;
  image: string;
  flavors?: FlavorItem[];
  items?: PriceItem[];
  options?: { label: string; values: string[] }[];
}

export const menuData: MenuCategory[] = [
  {
    id: "biscuit1",
    title: "Тропические & Фруктовые",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: gallery15,
    flavors: [
      { name: "Рафаэлло", description: "Кокосовые бисквиты и крем, начинка из малинового конфитюра" },
      { name: "Манго Маракуйя", description: "Кокосовые бисквиты, манговый крем и 2 начинки: маракуйевый конфитюр и манговый чизкейк" },
      { name: "Мятный", description: "Ванильные бисквиты, мятный крем и 2 начинки из мятного мусса и белого шоколада в сливках" },
      { name: "Клубника со сливками", description: "Ванильные бисквиты, сливочный крем и 2 начинки из клубничного конфитюра и клубничного мусса" },
    ],
  },
  {
    id: "biscuit2",
    title: "Ореховые & Ягодные",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: gallery16,
    flavors: [
      { name: "Миндаль банан", description: "Миндальные бисквиты и крем, начинка из карамелизированного банана" },
      { name: "Ягода малина", description: "Малиновые бисквиты и крем, начинка из малинового конфитюра, посыпанного маршмеллоу" },
      { name: "Фисташка малина", description: "Фисташковые бисквиты и крем, начинка из малинового конфитюра" },
      { name: "Красный бархат", description: "Бисквиты красный бархат, ванильный крем и начинка из вишневого конфитюра" },
    ],
  },
  {
    id: "biscuit3",
    title: "Шоколадные & Карамельные",
    price: "2 200₽/кг",
    minWeight: "от 1.5 кг",
    image: gallery17,
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
    image: gallery18,
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
    image: gallery19,
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

export const SELECT_FLAVOR_EVENT = "valerie:select-flavor";

export const selectFlavor = (flavor: string) => {
  window.dispatchEvent(new CustomEvent(SELECT_FLAVOR_EVENT, { detail: flavor }));
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
};
