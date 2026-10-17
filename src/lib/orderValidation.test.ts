import { describe, expect, it } from "vitest";
import { getPhoneError, validateOrderFormData, type OrderFormData } from "./orderValidation";

const validOrder: OrderFormData = {
  name: "Анна",
  phone: "+7 (981) 938-43-24",
  social: "@anna",
  email: "",
  privacyConsent: true,
  delivery: "pickup",
  comment: "",
};

describe("getPhoneError", () => {
  it("принимает полный номер из маски", () => {
    expect(getPhoneError("+7 (981) 938-43-24")).toBeNull();
  });

  it("считает пустую маску ненаписанным номером", () => {
    expect(getPhoneError("")).toBe("Укажите номер телефона");
    expect(getPhoneError("+7 (___) ___-__-__")).toBe("Укажите номер телефона");
  });

  it("не пропускает номер без последней цифры", () => {
    expect(getPhoneError("+7 (981) 938-43-2_")).toMatch(/неполный/);
  });

  it("не пропускает 11 цифр, если первая не 7", () => {
    expect(getPhoneError("89819384324")).toMatch(/неполный/);
  });
});

describe("validateOrderFormData", () => {
  it("пропускает корректную заявку", () => {
    expect(validateOrderFormData(validOrder)).toBeNull();
  });

  it("останавливает заявку с неполным телефоном", () => {
    expect(validateOrderFormData({ ...validOrder, phone: "+7 (981) 938-43-2_" })).toMatch(/неполный/);
  });
});
