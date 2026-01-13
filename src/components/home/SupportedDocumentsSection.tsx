import { FileText, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const documentTypes = [
  {
    title: 'Раздел №1 «Пояснительная записка»',
    description: 'Полная структура пояснительной записки с поддержкой всех обязательных разделов',
  },
  {
    title: 'Результаты конъюнктурного анализа',
    description: 'Формирование XML для данных конъюнктурного анализа рынка строительных ресурсов',
  },
  {
    title: 'Задание на проектирование',
    description: 'Структурированные данные задания на проектирование в формате XML',
  },
  {
    title: 'XML-схема заключения экспертизы',
    description: 'Формат для заключений государственной и негосударственной экспертизы',
  },
  {
    title: 'Ведомость объёмов работ',
    description: 'Детализированная ведомость с привязкой к конструктивным элементам',
  },
  {
    title: 'Сведения о признании ПД типовой',
    description: 'XML-схема для документации по типовому проектированию и отмене такого решения',
  },
];

const SupportedDocumentsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <FileText className="h-4 w-4" />
            Этап изысканий и проектирования
          </div>
          <h2 className="text-headline text-foreground mb-4">
            Поддерживаемые документы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Все типы документов, которые мы переводим в машиночитаемый XML по требованиям Минстроя РФ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* Construction phase teaser */}
        <div className="max-w-xl mx-auto">
          <div className="p-6 rounded-2xl border border-warning/20 bg-warning/5 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning/20">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">Этап строительства</h3>
                <Badge className="bg-warning text-warning-foreground text-xs">
                  Скоро
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Запуск в марте 2025 — исполнительная документация, акты скрытых работ, журналы работ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedDocumentsSection;
