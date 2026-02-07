import { Heart, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-chocolate-light border-t border-cream/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-cream">
              Valerie
            </span>
            <span className="font-serif text-lg italic text-dustyPink">
              Bakery
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/_valerie_bakery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/70 hover:text-dustyPink transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">@_valerie_bakery</span>
            </a>
            <a
              href="tel:+79819384324"
              className="text-cream/70 hover:text-gold transition-colors text-sm"
            >
              +7 (981) 938-43-24
            </a>
          </div>

          <p className="text-cream/60 text-sm flex items-center gap-1">
            Сделано с{" "}
            <Heart className="w-4 h-4 text-dustyPink fill-dustyPink" /> Валерией
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
