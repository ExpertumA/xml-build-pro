import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Start",
    price: "4 990",
    period: "/ месяц",
    description: "Для небольших проектов",
    features: [
      "До 10 документов в месяц",
      "Все типы XML-схем",
      "Валидация по XSD",
      "Email поддержка",
      "История документов 30 дней",
    ],
    cta: "Начать",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "14 990",
    period: "/ месяц",
    description: "Для активных пользователей",
    features: [
      "До 50 документов в месяц",
      "Все типы XML-схем",
      "Валидация по XSD",
      "Приоритетная поддержка",
      "История документов 1 год",
      "API доступ",
      "Экспорт отчётов",
    ],
    cta: "Выбрать Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "По запросу",
    period: "",
    description: "Для крупных организаций",
    features: [
      "Безлимитные документы",
      "Все типы XML-схем",
      "Валидация по XSD",
      "Персональный менеджер",
      "Бессрочная история",
      "API доступ",
      "SLA 99.9%",
      "Интеграция с внутренними системами",
    ],
    cta: "Связаться",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-subtle">
          <div className="container text-center">
            <h1 className="text-display text-foreground mb-6">
              Тарифы
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите подходящий тариф для вашей организации. 
              Все тарифы включают полный функционал конвертации.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    plan.highlighted 
                      ? "border-primary bg-card shadow-xl shadow-primary/10 scale-105" 
                      : "border-border bg-card hover:border-primary/30 hover:shadow-lg"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                        Популярный
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link to={plan.name === "Enterprise" ? "#" : "/register"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ hint */}
        <section className="py-12 bg-secondary/30">
          <div className="container text-center">
            <p className="text-muted-foreground">
              Есть вопросы по тарифам?{" "}
              <a href="#" className="text-primary hover:underline">
                Свяжитесь с нами
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
