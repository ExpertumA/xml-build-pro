import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, FileText, Zap, Building2, Infinity, Users, Briefcase, User, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-subtle">
          <div className="container text-center">
            <h1 className="text-display text-foreground mb-6">
              Тарифы сервиса
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Сервис предоставляет доступ к формированию XML-документов в соответствии с требованиями Минстроя РФ.
              Оплата зависит от типа документа и выбранного тарифа.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Pay per generation */}
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Оплата за генерацию документов</CardTitle>
                      <CardDescription className="text-base">Тариф 1</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      Проектные организации
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Архитекторы
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      ГИПы
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Частные лица
                    </Badge>
                  </div>

                  <p className="text-muted-foreground">
                    Вы оплачиваете фактическое формирование документов. 
                    Каждая генерация оплачивается отдельно.
                  </p>

                  <div className="space-y-4 py-4 border-t border-b">
                    <p className="font-semibold">Стоимость генерации документов</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Раздел №1 проектной документации</p>
                          <p className="text-sm text-muted-foreground">«Пояснительная записка»</p>
                        </div>
                        <span className="text-lg font-bold whitespace-nowrap ml-4">3 000 ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Задание на проектирование</p>
                        <span className="text-lg font-bold whitespace-nowrap ml-4">2 500 ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">XML-схемы этапа инженерных изысканий и проектирования</p>
                        <Badge variant="outline">Скоро</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold">Как работает</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Доступ к сервису предоставляется по подписке</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Оплата списывается только при запуске генерации</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Один запуск = одна оплаченная генерация</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Срок работы над проектом не ограничен</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Повторная генерация оплачивается отдельно</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    📌 Подходит как для 1–2 проектов, так и для большого объёма работ.
                  </p>

                  <Button className="w-full" size="lg" asChild>
                    <Link to="/register">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Начать работу
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Unlimited for experts */}
              <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-primary text-primary-foreground">
                    <Infinity className="h-3 w-3 mr-1" />
                    Безлимит
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Подписка без лимитов</CardTitle>
                      <CardDescription className="text-base">Тариф 2 — для экспертных организаций</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      Экспертные организации
                    </Badge>
                  </div>

                  <p className="text-muted-foreground">
                    Для компаний, выполняющих экспертизу проектной документации
                  </p>

                  <div className="space-y-4 py-4 border-t border-b">
                    <p className="font-semibold">Включено в тариф</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>XML-схема заключения экспертизы</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Неограниченное количество генераций</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Фиксированная стоимость</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center py-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">12 000 ₽</span>
                      <span className="text-muted-foreground text-lg">/ месяц</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold">Условия</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Подписка действует 1 календарный месяц</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Количество генераций не ограничено</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>Тариф применяется только к XML-схеме заключения экспертизы</span>
                      </li>
                      <li className="flex items-start gap-3 text-muted-foreground">
                        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Другие типы документов в данный тариф не входят</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    📌 Тариф предназначен для регулярной профессиональной работы без ограничений по объёму.
                  </p>

                  <Button className="w-full" size="lg" asChild>
                    <Link to="/register">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Оформить подписку
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Info section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">ℹ️ Важная информация</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg border">
                  <p className="text-sm">Один аккаунт предназначен для одного пользователя</p>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <p className="text-sm">Передача доступа третьим лицам запрещена</p>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <p className="text-sm">Все документы формируются на основании данных, предоставленных пользователем</p>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <p className="text-sm">Сервис не осуществляет передачу документов в органы государственной экспертизы</p>
                </div>
              </div>

              <div className="text-center space-y-4 pt-8">
                <h3 className="text-xl font-semibold">Как выбрать тариф?</h3>
                <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                  <div className="p-4 bg-background rounded-lg border text-left">
                    <p className="font-medium mb-1">Вы проектируете →</p>
                    <p className="text-sm text-muted-foreground">Выбирайте подписку с оплатой за генерацию</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/30 text-left">
                    <p className="font-medium mb-1">Вы экспертная организация →</p>
                    <p className="text-sm text-muted-foreground">Выбирайте подписку без лимитов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container text-center">
            <p className="text-muted-foreground mb-4">
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
