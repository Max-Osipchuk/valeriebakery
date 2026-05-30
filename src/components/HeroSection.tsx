import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Palette, Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-cake.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { normalizeOrderFormData, orderFieldLimits, validateOrderFormData } from "@/lib/orderValidation";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    social: "",
    email: "",
    marketingConsent: false,
    privacyConsent: false,
    delivery: "pickup" as "pickup" | "yandex",
    comment: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitReady = Boolean(
    formData.phone.trim() &&
      (formData.email.trim() || formData.social.trim()) &&
      formData.privacyConsent
  );
  const isTouched = Boolean(
    formData.name || formData.phone || formData.social || formData.email ||
    formData.comment || formData.privacyConsent
  );
  const submitHint = isTouched && !isSubmitReady
    ? !formData.phone.trim()
      ? "Укажите номер телефона"
      : !formData.email.trim() && !formData.social.trim()
      ? "Укажите email или Telegram"
      : "Подтвердите согласие с политикой конфиденциальности"
    : null;

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
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ошибка отправки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Sparkles, text: "Натуральные ингредиенты" },
    { icon: Heart, text: "Ручная работа" },
    { icon: Palette, text: "Индивидуальный декор" },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-dustyPink-light/30 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gold-light/20 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-chocolate mb-6">
              Торты, в которые{" "}
              <span className="text-gradient-gold italic">влюбляются</span>{" "}
              с первого кусочка
            </h1>

            <p className="text-lg md:text-xl text-chocolate-light/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Торты и десерты на заказ в Санкт-Петербурге. Создаём сладкие
              шедевры с любовью и заботой о каждой детали.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-cream/80 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-soft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <feature.icon className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium text-chocolate-light">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Hero Image */}
            <div className="mb-10 lg:mb-0 lg:mt-12">
              <div className="relative mx-auto max-w-sm lg:max-w-md lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-b from-dustyPink/20 to-gold/20 rounded-3xl blur-2xl transform scale-110" />
                <img
                  src={heroImage}
                  alt="Изысканный торт от Valerie Bakery"
                  className="relative rounded-3xl shadow-elevated w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="relative">

            {/* Contact Form */}
            <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-elevated border border-border/50 animate-scale-in">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gold fill-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-chocolate mb-2">
                    Заявка принята!
                  </h3>
                  <p className="text-chocolate-light mb-1">
                    Свяжемся с вами в течение часа
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Пн–Вс, 9:00–21:00
                  </p>
                  <div className="bg-cream rounded-2xl px-5 py-4 mb-6 text-left space-y-2">
                    <p className="text-xs font-medium text-gold uppercase tracking-wider mb-3">Что будет дальше</p>
                    <div className="flex items-start gap-2 text-sm text-chocolate-light">
                      <span className="text-gold font-bold shrink-0">1.</span>
                      <span>Мы изучим заявку и подберём для вас варианты</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-chocolate-light">
                      <span className="text-gold font-bold shrink-0">2.</span>
                      <span>Позвоним или напишем, чтобы уточнить детали</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-chocolate-light">
                      <span className="text-gold font-bold shrink-0">3.</span>
                      <span>Согласуем дизайн, вкус и дату — и приступим к работе</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Если срочно — звоните напрямую:</p>
                  <a
                    href="tel:+79819384324"
                    className="text-lg font-semibold text-chocolate hover:text-gold transition-colors"
                  >
                    +7 (981) 938-43-24
                  </a>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", phone: "", social: "", email: "", marketingConsent: false, privacyConsent: false, delivery: "pickup", comment: "" });
                      }}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors underline underline-offset-2"
                    >
                      Оставить ещё одну заявку
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl md:text-3xl text-chocolate mb-2">
                    Оставить заявку
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Опишите ваш идеальный торт, и мы свяжемся с вами
                  </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      required
                      maxLength={orderFieldLimits.name}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Телефон"
                      required
                      maxLength={orderFieldLimits.phone}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Укажите хотя бы один способ связи: email или мессенджер
                  </p>
                  <div>
                    <input
                      type="text"
                      placeholder="Telegram (@username) или Instagram"
                      maxLength={orderFieldLimits.social}
                      value={formData.social}
                      onChange={(e) =>
                        setFormData({ ...formData, social: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      maxLength={orderFieldLimits.email}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value, marketingConsent: e.target.value.trim() ? formData.marketingConsent : false })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground"
                    />
                  </div>
                  <label
                    title={!formData.email.trim() ? "Укажите email чтобы подписаться" : undefined}
                    className={`flex items-start gap-3 text-sm transition-colors ${formData.email.trim() ? "text-chocolate-light" : "text-muted-foreground"}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      disabled={!formData.email.trim()}
                      onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-border accent-gold disabled:cursor-not-allowed disabled:opacity-40"
                    />
                    <span>Хочу получать скидки и узнавать о новинках и акциях</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, delivery: "pickup" })}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
                        formData.delivery === "pickup"
                          ? "bg-gold text-chocolate border-gold"
                          : "bg-cream border-border text-chocolate-light hover:border-gold/50"
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
                          : "bg-cream border-border text-chocolate-light hover:border-gold/50"
                      }`}
                    >
                      🚗 Яндекс Доставка
                    </button>
                  </div>
                  <div>
                    <textarea
                      placeholder="Комментарий к заказу (дата, пожелания к декору)"
                      rows={3}
                      maxLength={orderFieldLimits.comment}
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-xs leading-relaxed text-chocolate-light/75">
                    <input
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-gold"
                    />
                    <span>
                      Я согласен(на) на обработку моих персональных данных в соответствии с{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                        Политикой конфиденциальности
                      </a>
                    </span>
                  </label>
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      'Заказать торт'
                    )}
                  </Button>
                  {submitHint && (
                    <p className="text-center text-sm text-muted-foreground">
                      {submitHint}
                    </p>
                  )}
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-chocolate-light/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-chocolate-light/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
