import { Phone, MapPin, Clock, Instagram } from "lucide-react";
import OrderForm from "@/components/OrderForm";

const CTASection = () => {
  return (
    <section id="order" className="py-20 md:py-32 bg-chocolate relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-dustyPink/10 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left min-w-0">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
              Готовы заказать{" "}
              <span className="italic text-gold">торт мечты?</span>
            </h2>
            <p className="text-cream/70 text-lg mb-10 max-w-lg mx-auto lg:mx-0">
              Оставьте заявку, и мы свяжемся с вами в течение часа для
              обсуждения деталей вашего идеального десерта.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-cream/60 text-sm">Телефон</p>
                  <a
                    href="tel:+79819384324"
                    className="text-cream font-medium hover:text-gold transition-colors"
                  >
                    +7 (981) 938-43-24
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-cream/60 text-sm">Адрес</p>
                  <p className="text-cream font-medium">
                    Санкт-Петербург, доставка
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-cream/60 text-sm">Время работы</p>
                  <p className="text-cream font-medium">Ежедневно 9:00 – 21:00</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-cream/60 text-sm">Instagram</p>
                  <a
                    href="https://www.instagram.com/_valerie_bakery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream font-medium hover:text-gold transition-colors"
                  >
                    @_valerie_bakery
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-cream/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-cream/20">
            <h3 className="font-serif text-2xl md:text-3xl text-cream mb-6">
              Оставить заявку
            </h3>

            <OrderForm
              variant="dark"
              submitLabel="Оставить заявку"
              commentPlaceholder="Опишите ваш торт мечты..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
