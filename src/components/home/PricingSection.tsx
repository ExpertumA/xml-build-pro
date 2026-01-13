import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Start",
    price: "4 990",
    period: "₽/мес",
    description: "Для небольших проектов",
    features: [
      "До 10 документов в месяц",
      "Все типы XML-схем",
      "Валидация по XSD",
      "Email поддержка",
    ],
    cta: "Начать",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "14 990",
    period: "₽/мес",
    description: "Для активных пользователей",
    features: [
      "До 50 документов в месяц",
      "Приоритетная поддержка",
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
      "Персональный менеджер",
      "SLA 99.9%",
      "Интеграция с системами",
    ],
    cta: "Связаться",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-headline text-foreground mb-4">
            Тарифы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий тариф для вашей организации
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                plan.highlighted 
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-105" 
                  : "border-border bg-card hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Популярный
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.highlighted ? "default" : "outline"}
                asChild
              >
                <Link to={plan.name === "Enterprise" ? "#" : "/register"}>
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/pricing" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Смотреть все тарифы
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
