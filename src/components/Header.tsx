import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className={`liquid-glass-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 motion-reduce:transition-none ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="liquid-glass-panel shrink-0 text-chocolate hover:bg-cream/80 md:hidden"
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

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
            <Button
              variant="ghost"
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-chocolate-light font-medium hover:bg-cream/40 hover:text-chocolate transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </Button>
          ))}
        </nav>

        <Button
          variant="heroPrimary"
          onClick={() => scrollToSection("order")}
          className="shrink-0 px-5 font-medium"
        >
          Заказать
        </Button>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`container mx-auto md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "max-h-56 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"
        }`}
      >
        <nav className="liquid-glass-panel rounded-lg p-2">
          {navigationItems.map((item) => (
            <Button
              variant="ghost"
              key={item.id}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => scrollToSection(item.id)}
              className="flex h-12 w-full justify-start rounded-md px-4 text-left font-medium text-chocolate-light transition-colors duration-300 hover:bg-gold/15 hover:text-chocolate"
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
