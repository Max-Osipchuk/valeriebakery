import InputMask from "react-input-mask";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

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
      alwaysShowMask={false}
    >
      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input
          {...inputProps}
          type="tel"
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
    </InputMask>
  );
};

export default PhoneInput;
