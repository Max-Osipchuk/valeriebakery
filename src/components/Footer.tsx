import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-chocolate-light border-t border-cream/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-cream">
              Valerie
            </span>
            <span className="font-serif text-lg italic text-dustyPink">
              Bakery
            </span>
          </div>

          <p className="text-cream/60 text-sm flex items-center gap-1">
            Сделано с{" "}
            <Heart className="w-4 h-4 text-dustyPink fill-dustyPink" /> в
            Санкт-Петербурге
          </p>

          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Valerie Bakery
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
