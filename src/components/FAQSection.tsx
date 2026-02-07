import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "За сколько дней нужно заказывать торт?",
    answer:
      "Рекомендуем оформлять заказ минимум за 3-5 дней до события. Для праздничных дат (Новый год, 8 марта, 14 февраля) — за 7-10 дней. В срочных случаях свяжитесь с нами — постараемся помочь!",
  },
  {
    question: "Какой минимальный вес торта?",
    answer:
      "Минимальный вес для бисквитных, сезонных и классических тортов — 1.5 кг. Для бенто-тортов — около 500 г. Это оптимальный размер для сохранения всех вкусовых качеств и красивой подачи.",
  },
  {
    question: "Можно ли выбрать начинку?",
    answer:
      "Да, конечно! Вы можете выбрать любую начинку из нашего меню или обсудить индивидуальный вариант. Мы также учитываем пожелания по уровню сладости и особенности питания (без глютена, без лактозы).",
  },
  {
    question: "Входит ли декор в стоимость?",
    answer:
      "Базовый декор (выравнивание, надпись, простое оформление) входит в стоимость. Сложный декор (сахарные цветы, фигурки, многоуровневые композиции) рассчитывается отдельно после обсуждения вашей идеи.",
  },
  {
    question: "Делаете ли вы индивидуальный дизайн?",
    answer:
      "Да! Каждый торт мы создаём индивидуально под ваше мероприятие. Присылайте референсы, обсудим детали и создадим торт вашей мечты. Свадебные и корпоративные торты — наша особая гордость.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Вопросы и ответы
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-chocolate mb-6">
            Частые <span className="italic text-dustyPink">вопросы</span>
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          defaultValue="item-0"
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-2xl px-6 md:px-8 border-none shadow-soft data-[state=open]:shadow-elevated transition-shadow duration-300"
            >
              <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-chocolate hover:text-gold py-6 [&[data-state=open]]:text-gold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
