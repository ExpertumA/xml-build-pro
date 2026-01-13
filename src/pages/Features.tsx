import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const documentTypes = [
  {
    title: 'Раздел №1 «Пояснительная записка»',
    description: 'Полная структура пояснительной записки с поддержкой всех обязательных разделов',
    status: 'available',
  },
  {
    title: 'Результаты конъюнктурного анализа',
    description: 'Формирование XML для данных конъюнктурного анализа рынка строительных ресурсов',
    status: 'available',
  },
  {
    title: 'Задание на проектирование',
    description: 'Структурированные данные задания на проектирование в формате XML',
    status: 'available',
  },
  {
    title: 'XML-схема заключения экспертизы',
    description: 'Формат для заключений государственной и негосударственной экспертизы',
    status: 'available',
  },
  {
    title: 'Ведомость объёмов работ',
    description: 'Детализированная ведомость с привязкой к конструктивным элементам',
    status: 'available',
  },
  {
    title: 'Сведения о признании ПД типовой',
    description: 'XML-схема для документации по типовому проектированию',
    status: 'available',
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-subtle">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-display text-foreground mb-6">
                Возможности
              </h1>
              <p className="text-xl text-muted-foreground">
                Поддерживаемые типы документов и XML-схемы для этапов изысканий и проектирования
              </p>
            </div>
          </div>
        </section>

        {/* Document types */}
        <section className="py-20">
          <div className="container">
            <div className="flex items-center gap-3 mb-12">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-semibold">Этап изысканий и проектирования</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((doc, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <Badge variant="secondary" className="text-success bg-success/10">
                      Доступно
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Construction phase */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="flex items-center gap-3 mb-12">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <h2 className="text-2xl font-semibold">Этап строительства</h2>
            </div>

            <div className="max-w-xl">
              <div className="p-8 rounded-2xl border border-warning/20 bg-warning/5">
                <Badge className="bg-warning text-warning-foreground mb-4">
                  Скоро
                </Badge>
                <h3 className="text-xl font-medium mb-2">
                  Запуск в марте 2025
                </h3>
                <p className="text-muted-foreground">
                  Мы работаем над поддержкой документов этапа строительства: 
                  исполнительная документация, акты скрытых работ, журналы работ и другие.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
