import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Меню", id: "menu" },
    { label: "Галерея", id: "gallery" },
    { label: "Вопросы", id: "faq" },
  ];

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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#FAF7F4]/80 backdrop-blur-md shadow-soft ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cream/90 text-chocolate shadow-soft transition-all duration-300 hover:bg-cream md:hidden"
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-bold text-chocolate">
              Valerie
            </span>
            <span className="font-serif text-xl md:text-2xl italic text-dustyPink">
              Bakery
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
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

      <div
        className={`container mx-auto md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "max-h-56 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"
        }`}
      >
        <nav className="rounded-lg bg-cream/95 p-2 shadow-elevated backdrop-blur-md">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full rounded-md px-4 py-3 text-left font-medium text-chocolate-light transition-colors duration-300 hover:bg-gold/15 hover:text-chocolate"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
