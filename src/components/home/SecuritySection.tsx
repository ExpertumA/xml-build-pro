import { Shield, Lock, Server, Eye, CheckCircle } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Шифрование данных",
    description: "Все документы шифруются с использованием AES-256. Передача данных защищена протоколом TLS 1.3.",
  },
  {
    icon: Server,
    title: "Серверы в России",
    description: "Данные хранятся на сертифицированных серверах в российских дата-центрах согласно требованиям 152-ФЗ.",
  },
  {
    icon: Eye,
    title: "Контроль доступа",
    description: "Строгое разграничение прав доступа. Только вы видите свои документы.",
  },
  {
    icon: Shield,
    title: "Автоматическое удаление",
    description: "Исходные файлы удаляются через 30 дней. Вы можете удалить данные в любой момент.",
  },
];

const SecuritySection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full mb-6">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Безопасность данных</span>
          </div>
          
          <h2 className="text-headline text-foreground mb-4">
            Ваши данные под надёжной защитой
          </h2>
          <p className="text-lg text-muted-foreground">
            Мы понимаем ценность проектной документации. Поэтому безопасность — 
            наш главный приоритет на каждом этапе работы.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 mb-4">
                <feature.icon className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 p-8 bg-card rounded-2xl border border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Соответствие стандартам
              </h3>
              <p className="text-muted-foreground">
                Наш сервис соответствует требованиям информационной безопасности
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">152-ФЗ</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">ГОСТ Р 57580</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
