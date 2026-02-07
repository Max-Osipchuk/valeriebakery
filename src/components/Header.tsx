import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-2xl md:text-3xl font-bold text-chocolate">
            Valerie
          </span>
          <span className="font-serif text-xl md:text-2xl italic text-dustyPink">
            Bakery
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Меню", id: "menu" },
            { label: "Галерея", id: "gallery" },
            { label: "Вопросы", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-chocolate-light font-medium hover:text-gold transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToSection("order")}
          className="bg-chocolate text-cream px-5 py-2.5 rounded-lg font-medium hover:bg-chocolate-light transition-all duration-300 hover:scale-105"
        >
          Заказать
        </button>
      </div>
    </header>
  );
};

export default Header;
