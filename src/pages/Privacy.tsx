import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Общие положения",
    content:
      "Настоящая Политика конфиденциальности описывает порядок обработки персональных данных клиентов Valerie Bakery. Оператор данных — Valerie Bakery, Санкт-Петербург. Контакт для связи: +7 (981) 938-43-24, Instagram @_valerie_bakery.",
  },
  {
    title: "Какие данные собираются",
    content:
      "Мы можем получать имя, телефон, email, контакт в мессенджере или социальной сети, а также комментарий к заказу, включая дату, пожелания к декору и другие детали десерта.",
  },
  {
    title: "Цели обработки",
    content:
      "Данные используются для приёма и обработки заказов, связи с клиентом, уточнения деталей, организации самовывоза или доставки, а также для информирования о скидках, новинках и акциях при отдельном согласии на рассылку.",
  },
  {
    title: "Правовое основание",
    content:
      "Обработка персональных данных осуществляется в соответствии с Федеральным законом №152-ФЗ «О персональных данных» на основании согласия пользователя, выраженного при отправке формы заявки.",
  },
  {
    title: "Срок хранения данных",
    content:
      "Персональные данные хранятся только в течение срока, необходимого для обработки заказа, исполнения обязательств перед клиентом и соблюдения требований законодательства, либо до отзыва согласия пользователем.",
  },
  {
    title: "Права субъекта данных",
    content:
      "Вы можете запросить уточнение, изменение, удаление персональных данных, а также отозвать согласие на их обработку или отказаться от маркетинговой рассылки.",
  },
  {
    title: "Контакты для запросов по персональным данным",
    content:
      "Для запросов, связанных с персональными данными, напишите нам в Instagram @_valerie_bakery или позвоните по телефону +7 (981) 938-43-24.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-cream text-chocolate">
      <Helmet>
        <title>Политика конфиденциальности — Valerie Bakery</title>
        <meta
          name="description"
          content="Как Valerie Bakery обрабатывает персональные данные из форм заявки: какие данные собираются, цели обработки, сроки хранения и права клиента."
        />
        <link rel="canonical" href="https://valeriebakery.ru/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://valeriebakery.ru/privacy" />
        <meta property="og:title" content="Политика конфиденциальности — Valerie Bakery" />
        <meta
          property="og:description"
          content="Как Valerie Bakery обрабатывает персональные данные из форм заявки: цели, сроки хранения и права клиента."
        />
      </Helmet>
      <header className="border-b border-border/70 bg-cream/95 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between py-5">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl md:text-3xl font-bold text-chocolate">Valerie</span>
            <span className="font-serif text-xl md:text-2xl italic text-dustyPink">Bakery</span>
          </a>
          <Button asChild variant="heroPrimary" size="sm">
            <a href="/">Назад на главную</a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-12 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-gold">Valerie Bakery</p>
          <h1 className="mb-6 font-serif text-4xl md:text-6xl leading-tight text-chocolate">
            Политика конфиденциальности
          </h1>
          <p className="mb-12 text-base md:text-lg leading-relaxed text-chocolate-light">
            Мы бережно относимся к вашим данным и используем их только для обработки заявок,
            связи по заказам и рассылки при вашем согласии.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-border/70 pt-7">
                <h2 className="mb-3 font-serif text-2xl md:text-3xl text-chocolate">{section.title}</h2>
                <p className="text-sm md:text-base leading-7 text-chocolate-light">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;