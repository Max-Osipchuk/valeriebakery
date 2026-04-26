import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Phone, MapPin, Clock, Instagram, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { normalizeOrderFormData, orderFieldLimits, validateOrderFormData } from "@/lib/orderValidation";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    social: "",
    delivery: "pickup" as "pickup" | "yandex",
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedData = normalizeOrderFormData(formData);
    const validationError = validateOrderFormData(normalizedData);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: normalizedData,
      });

      if (error) {
        console.error('Error sending request:', error);
        toast.error('Ошибка отправки. Попробуйте позвонить нам напрямую.');
        return;
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", social: "", delivery: "pickup", comment: "" });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ошибка отправки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="text-center lg:text-left">
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

            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gold fill-gold" />
                </div>
                <h3 className="font-serif text-xl text-cream mb-2">
                  Спасибо за заявку!
                </h3>
                <p className="text-cream/70">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-cream/10 rounded-xl border border-cream/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-cream placeholder:text-cream/50"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Телефон"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-cream/10 rounded-xl border border-cream/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-cream placeholder:text-cream/50"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Telegram (@username) или Instagram"
                    value={formData.social}
                    onChange={(e) =>
                      setFormData({ ...formData, social: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-cream/10 rounded-xl border border-cream/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-cream placeholder:text-cream/50"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, delivery: "pickup" })}
                    className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
                      formData.delivery === "pickup"
                        ? "bg-gold text-chocolate border-gold"
                        : "bg-cream/10 border-cream/20 text-cream/70 hover:border-gold/50"
                    }`}
                  >
                    🏠 Самовывоз
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, delivery: "yandex" })}
                    className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
                      formData.delivery === "yandex"
                        ? "bg-gold text-chocolate border-gold"
                        : "bg-cream/10 border-cream/20 text-cream/70 hover:border-gold/50"
                    }`}
                  >
                    🚗 Яндекс Доставка
                  </button>
                </div>
                <div>
                  <textarea
                    placeholder="Опишите ваш торт мечты..."
                    rows={4}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-cream/10 rounded-xl border border-cream/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-cream placeholder:text-cream/50 resize-none"
                  />
                </div>
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    'Оставить заявку'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
