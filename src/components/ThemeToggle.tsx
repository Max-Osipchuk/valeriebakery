import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ThemeToggleProps extends ButtonProps {
  // С подписью — для мобильного меню, без подписи — иконка в шапке
  withLabel?: boolean;
}

const ThemeToggle = ({ withLabel = false, ...props }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      type="button"
      variant="ghost"
      size={withLabel ? "default" : "icon"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={withLabel ? undefined : isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      {...props}
    >
      <Icon className="h-5 w-5" />
      {withLabel && (isDark ? "Светлая тема" : "Тёмная тема")}
    </Button>
  );
};

export default ThemeToggle;
