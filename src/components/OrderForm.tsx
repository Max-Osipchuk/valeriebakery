import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { normalizeOrderFormData, orderFieldLimits, validateOrderFormData } from "@/lib/orderValidation";
import PhoneInput from "@/components/PhoneInput";
import { menuData, SELECT_FLAVOR_EVENT } from "@/data/menu";

// Структурированные поля упаковываются в comment перед отправкой,
// чтобы не менять формат заявки для edge-функции send-telegram.
// Лимит comment на сервере — 500 символов: 400 на текст + запас на префикс.
const COMMENT_MAX_LENGTH = 400;

const weightOptions = [
  "1.5–2 кг (≈8–10 порций)",
  "2–3 кг (≈12–15 порций)",
  "3–4 кг (≈18–22 порции)",
  "больше 4 кг",
];

const extraFlavorOptions = ["Капкейки", "Бенто-торт", "Нужен совет"];

const styles = {
  light: {
    input:
      "w-full px-5 py-4 bg-cream rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-chocolate placeholder:text-muted-foreground",
    colorScheme: "[color-scheme:light]",
    hint: "text-sm text-muted-foreground",
    fieldLabel: "block text-sm text-muted-foreground mb-1.5",
    selectChevron: "text-muted-foreground",
    marketingActive: "text-chocolate-light",
    marketingInactive: "text-muted-foreground",
    checkbox: "border-border",
    deliveryActive: "bg-gold text-chocolate border-gold",
    deliveryInactive: "bg-cream border-border text-chocolate-light hover:border-gold/50",
    privacy: "text-chocolate-light/75",
    successTitle: "text-chocolate",
    successLine: "text-chocolate-light",
    successMuted: "text-muted-foreground",
    successPanel: "bg-cream",
    successStep: "text-chocolate-light",
    successPhone: "text-chocolate",
    successAgain: "text-muted-foreground",
  },
  dark: {
    input:
      "w-full px-5 py-4 bg-cream/10 rounded-xl border border-cream/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-300 text-cream placeholder:text-cream/50",
    colorScheme: "[color-scheme:dark]",
    hint: "text-sm text-cream/55",
    fieldLabel: "block text-sm text-cream/55 mb-1.5",
    selectChevron: "text-cream/50",
    marketingActive: "text-cream/75",
    marketingInactive: "text-cream/35",
    checkbox: "border-cream/20",
    deliveryActive: "bg-gold text-chocolate border-gold",
    deliveryInactive: "bg-cream/10 border-cream/20 text-cream/70 hover:border-gold/50",
    privacy: "text-cream/60",
    successTitle: "text-cream",
    successLine: "text-cream/90",
    successMuted: "text-cream/55",
    successPanel: "bg-cream/10",
    successStep: "text-cream/80",
    successPhone: "text-cream",
    successAgain: "text-cream/50",
  },
} as const;

const emptyFormData = {
  name: "",
  phone: "",
  social: "",
  email: "",
  marketingConsent: false,
  privacyConsent: false,
  delivery: "pickup" as "pickup" | "yandex",
  flavor: "",
  eventDate: "",
  weight: "",
  comment: "",
};

const formatEventDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};

interface OrderFormProps {
  variant: "light" | "dark";
  submitLabel: string;
  commentPlaceholder: string;
  header?: React.ReactNode;
}

const OrderForm = ({ variant, submitLabel, commentPlaceholder, header }: OrderFormProps) => {
  const s = styles[variant];
  const [formData, setFormData] = useState(emptyFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const detailsSummary = [
    formData.flavor,
    formData.eventDate && formatEventDate(formData.eventDate),
    formData.weight,
  ]
    .filter(Boolean)
    .join(" · ");

  const minEventDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    const handleSelectFlavor = (event: Event) => {
      const flavor = (event as CustomEvent<string>).detail;
      setFormData((prev) => ({ ...prev, flavor }));
      setShowDetails(true);
      setIsSubmitted(false);
    };
    window.addEventListener(SELECT_FLAVOR_EVENT, handleSelectFlavor);
    return () => window.removeEventListener(SELECT_FLAVOR_EVENT, handleSelectFlavor);
  }, []);

  const isSubmitReady = Boolean(
    formData.phone.trim() &&
      (formData.email.trim() || formData.social.trim()) &&
      formData.privacyConsent
  );
  const isTouched = Boolean(
    formData.name || formData.phone || formData.social || formData.email ||
    formData.flavor || formData.eventDate || formData.weight ||
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

    const orderDetails = [
      formData.flavor && `Начинка: ${formData.flavor}`,
      formData.eventDate && `Дата события: ${formatEventDate(formData.eventDate)}`,
      formData.weight && `Вес: ${formData.weight}`,
    ]
      .filter(Boolean)
      .join(" · ");
    const packedComment = [orderDetails, formData.comment.trim()]
      .filter(Boolean)
      .join(". ");

    const normalizedData = normalizeOrderFormData({
      name: formData.name,
      phone: formData.phone,
      social: formData.social,
      email: formData.email,
      marketingConsent: formData.marketingConsent,
      privacyConsent: formData.privacyConsent,
      delivery: formData.delivery,
      comment: packedComment,
    });
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

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-gold fill-gold" />
        </div>
        <h3 className={`font-serif text-2xl mb-2 ${s.successTitle}`}>
          Заявка принята!
        </h3>
        <p className={`mb-1 ${s.successLine}`}>
          Свяжемся с вами в течение часа
        </p>
        <p className={`text-sm mb-6 ${s.successMuted}`}>
          Пн–Вс, 9:00–21:00
        </p>
        <div className={`rounded-2xl px-5 py-4 mb-6 text-left space-y-2 ${s.successPanel}`}>
          <p className="text-xs font-medium text-gold uppercase tracking-wider mb-3">Что будет дальше</p>
          <div className={`flex items-start gap-2 text-sm ${s.successStep}`}>
            <span className="text-gold font-bold shrink-0">1.</span>
            <span>Мы изучим заявку и подберём для вас варианты</span>
          </div>
          <div className={`flex items-start gap-2 text-sm ${s.successStep}`}>
            <span className="text-gold font-bold shrink-0">2.</span>
            <span>Позвоним или напишем, чтобы уточнить детали</span>
          </div>
          <div className={`flex items-start gap-2 text-sm ${s.successStep}`}>
            <span className="text-gold font-bold shrink-0">3.</span>
            <span>Согласуем дизайн, вкус и дату — и приступим к работе</span>
          </div>
        </div>
        <p className={`text-sm mb-1 ${s.successMuted}`}>Если срочно — звоните напрямую:</p>
        <a
          href="tel:+79819384324"
          className={`text-lg font-semibold hover:text-gold transition-colors ${s.successPhone}`}
        >
          +7 (981) 938-43-24
        </a>
        <div className="mt-6">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setShowDetails(false);
              setFormData(emptyFormData);
            }}
            className={`text-sm hover:text-gold transition-colors underline underline-offset-2 ${s.successAgain}`}
          >
            Оставить ещё одну заявку
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {header}
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
            className={s.input}
          />
        </div>
        <div>
          <PhoneInput
            value={formData.phone}
            onChange={(val) => setFormData({ ...formData, phone: val })}
            required
            className={s.input}
          />
        </div>
        <p className={s.hint}>
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
            className={s.input}
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
            className={s.input}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowDetails((open) => !open)}
            className={`w-full flex items-center justify-between text-sm transition-colors hover:text-gold ${s.hint}`}
          >
            <span className="truncate text-left">
              {detailsSummary
                ? `🎂 ${detailsSummary}`
                : "🎂 Уже выбрали торт? Добавьте детали (необязательно)"}
            </span>
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                showDetails ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showDetails ? "max-h-[400px] mt-4" : "max-h-0"
            }`}
          >
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  className={`${s.input} appearance-none cursor-pointer pr-12 [&>option]:text-chocolate [&>optgroup]:text-chocolate ${formData.flavor ? "" : variant === "dark" ? "text-cream/50" : "text-muted-foreground"}`}
                >
                  <option value="">Начинка (если уже выбрали)</option>
                  {menuData
                    .filter((category) => category.flavors)
                    .map((category) => (
                      <optgroup key={category.id} label={category.title}>
                        {category.flavors!.map((flavor) => (
                          <option key={flavor.name} value={flavor.name}>
                            {flavor.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  <optgroup label="Другое">
                    {extraFlavorOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${s.selectChevron}`}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={s.fieldLabel}>Дата события</label>
                  <input
                    type="date"
                    min={minEventDate}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={`${s.input} ${s.colorScheme}`}
                  />
                </div>
                <div>
                  <label className={s.fieldLabel}>Примерный вес</label>
                  <div className="relative">
                    <select
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className={`${s.input} appearance-none cursor-pointer pr-12 [&>option]:text-chocolate ${formData.weight ? "" : variant === "dark" ? "text-cream/50" : "text-muted-foreground"}`}
                    >
                      <option value="">Не знаю</option>
                      {weightOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${s.selectChevron}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, delivery: "pickup" })}
            className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
              formData.delivery === "pickup" ? s.deliveryActive : s.deliveryInactive
            }`}
          >
            🏠 Самовывоз
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, delivery: "yandex" })}
            className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
              formData.delivery === "yandex" ? s.deliveryActive : s.deliveryInactive
            }`}
          >
            🚗 Яндекс Доставка
          </button>
        </div>
        <div>
          <textarea
            placeholder={commentPlaceholder}
            rows={3}
            maxLength={COMMENT_MAX_LENGTH}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className={`${s.input} resize-none`}
          />
        </div>
        <label
          title={!formData.email.trim() ? "Укажите email чтобы подписаться" : undefined}
          className={`flex items-start gap-3 text-sm transition-colors ${formData.email.trim() ? s.marketingActive : s.marketingInactive}`}
        >
          <input
            type="checkbox"
            checked={formData.marketingConsent}
            disabled={!formData.email.trim()}
            onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
            className={`mt-0.5 h-4 w-4 rounded accent-gold disabled:cursor-not-allowed disabled:opacity-40 ${s.checkbox}`}
          />
          <span>Хочу получать скидки и узнавать о новинках и акциях</span>
        </label>
        <label className={`flex items-start gap-3 text-xs leading-relaxed ${s.privacy}`}>
          <input
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className={`mt-0.5 h-4 w-4 shrink-0 rounded accent-gold ${s.checkbox}`}
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
            submitLabel
          )}
        </Button>
        {submitHint && (
          <p className={`text-center ${s.hint}`}>
            {submitHint}
          </p>
        )}
      </form>
    </>
  );
};

export default OrderForm;
