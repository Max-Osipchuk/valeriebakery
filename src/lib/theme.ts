// Пока посетитель сам не выбрал тему, сайт тёмный вечером и ночью, светлый утром и днём.
// Эту же логику повторяет скрипт в index.html: он включает тему до загрузки JS,
// чтобы вечером не мигал светлый фон. Меняешь часы здесь — поменяй и там.
export const THEME_STORAGE_KEY = "theme";
const EVENING_HOUR = 20;
const MORNING_HOUR = 7;

export const getTimeOfDayTheme = (date = new Date()) => {
  const hour = date.getHours();
  return hour >= EVENING_HOUR || hour < MORNING_HOUR ? "dark" : "light";
};
