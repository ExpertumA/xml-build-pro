import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Zap, FileText, Infinity, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-headline text-foreground mb-4">
            Тарифы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Сервис предоставляет доступ к формированию XML-документов в соответствии с требованиями Минстроя РФ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Pay per generation */}
          <Card className="relative p-6 rounded-2xl border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Оплата за генерацию</h3>
                  <p className="text-sm text-muted-foreground">Для проектных организаций</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Пояснительная записка</span>
                  <span className="font-semibold">3 000 ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Задание на проектирование</span>
                  <span className="font-semibold">2 500 ₽</span>
                </div>
              </div>

              <ul className="space-y-1.5 pt-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span>Оплата только за генерацию</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span>Без ограничений по срокам</span>
                </li>
              </ul>

              <Button className="w-full" variant="outline" asChild>
                <Link to="/register">Начать работу</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Unlimited for experts */}
          <Card className="relative p-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent transition-all duration-300 hover:shadow-lg">
            <div className="absolute -top-3 right-4">
              <Badge className="bg-primary text-primary-foreground">
                <Infinity className="h-3 w-3 mr-1" />
                Безлимит
              </Badge>
            </div>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Подписка без лимитов</h3>
                  <p className="text-sm text-muted-foreground">Для экспертных организаций</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">12 000 ₽</span>
                <span className="text-sm text-muted-foreground">/ месяц</span>
              </div>

              <p className="text-sm text-muted-foreground">
                XML-схема заключения экспертизы
              </p>

              <ul className="space-y-1.5 pt-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span>Неограниченно генераций</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span>Приоритетная обработка</span>
                </li>
              </ul>

              <Button className="w-full" asChild>
                <Link to="/register">Оформить подписку</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link 
            to="/pricing" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Подробнее о тарифах
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
