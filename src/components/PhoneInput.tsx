import InputMask from "react-input-mask";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

interface MaskState {
  value: string;
  selection: { start: number; end: number } | null;
}

// Автозаполнение и вставка приходят целой строкой: «+7 981 …» или «8 981 …».
// Маска уже начинается с +7, поэтому у 11-значного номера отбрасываем первую
// цифру. Иначе «8» попадёт в код оператора, а последняя цифра потеряется.
const normalizeFullNumber = (newState: MaskState, _oldState: MaskState, userInput: string | null): MaskState => {
  const digits = userInput?.replace(/\D/g, "") ?? "";
  if (digits.length !== 11 || !/^[78]/.test(digits)) return newState;

  const d = digits.slice(1);
  const value = `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`;
  return { value, selection: { start: value.length, end: value.length } };
};

// В проекте react-input-mask 2.x, а @types/react-input-mask описывает 3.x,
// где этот хук называется иначе. Поэтому передаём его через spread.
const maskHooks = { beforeMaskedValueChange: normalizeFullNumber };

const PhoneInput = ({
  value,
  onChange,
  className,
  placeholder = "+7 (___) ___-__-__",
  required = false,
}: PhoneInputProps) => {
  return (
    <InputMask
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      alwaysShowMask={true}
      {...maskHooks}
    >
      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...inputProps}
          type="tel"
          inputMode="tel"
          name="phone"
          autoComplete="tel"
          aria-label="Номер телефона"
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
    </InputMask>
  );
};

export default PhoneInput;
