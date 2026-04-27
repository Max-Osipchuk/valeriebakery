export type OrderDelivery = "pickup" | "yandex";

export interface OrderFormData {
  name: string;
  phone: string;
  social: string;
  email: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
  delivery: OrderDelivery;
  comment: string;
}

export const orderFieldLimits = {
  name: 100,
  phone: 30,
  social: 100,
  email: 254,
  comment: 500,
} as const;

const cleanText = (value: string, maxLength: number) =>
  value.trim().replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").slice(0, maxLength);

export const normalizeOrderFormData = (data: OrderFormData): OrderFormData => ({
  name: cleanText(data.name, orderFieldLimits.name),
  phone: cleanText(data.phone, orderFieldLimits.phone),
  social: cleanText(data.social, orderFieldLimits.social),
  email: cleanText(data.email, orderFieldLimits.email),
  marketingConsent: Boolean(data.marketingConsent && data.email.trim()),
  privacyConsent: Boolean(data.privacyConsent),
  delivery: data.delivery,
  comment: cleanText(data.comment, orderFieldLimits.comment),
});

export const validateOrderFormData = (data: OrderFormData): string | null => {
  const normalized = normalizeOrderFormData(data);

  if (!normalized.name) return "Введите имя.";
  if (!normalized.phone) return "Введите телефон.";
  if (!/^\+?[0-9\s()\-]{7,30}$/.test(normalized.phone)) return "Введите корректный телефон.";
  if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized.email)) return "Введите корректный email.";
  if (normalized.delivery !== "pickup" && normalized.delivery !== "yandex") return "Выберите способ получения.";
  if (!normalized.privacyConsent) return "Необходимо согласие на обработку персональных данных";

  return null;
};
