import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MessageSquare, Clock } from "lucide-react";

const Support = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Заполните имя, email и сообщение");
      return;
    }
    toast.success("Обращение отправлено. Ответим в течение 4 часов в рабочие дни.");
    setForm({ name: "", email: "", topic: "general", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 max-w-5xl">
          <div className="text-center space-y-3 mb-12">
            <h1 className="text-4xl font-semibold tracking-tight">Поддержка</h1>
            <p className="text-muted-foreground">
              Поможем с настройкой, генерацией XML и счетами. Отвечаем в рабочие часы.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:support@xmlexpert.ru"
                      className="text-sm text-primary hover:underline"
                    >
                      support@xmlexpert.ru
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Телефон</p>
                    <a
                      href="tel:+78001234567"
                      className="text-sm text-primary hover:underline"
                    >
                      +7 800 123-45-67
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">бесплатно по РФ</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Часы работы</p>
                    <p className="text-sm text-muted-foreground">
                      Пн–Пт, 09:00–19:00 МСК
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">SLA ответа</p>
                    <p className="text-sm text-muted-foreground">
                      до 4 часов в рабочее время
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Создать обращение</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Тема</Label>
                    <Select
                      value={form.topic}
                      onValueChange={(v) => setForm({ ...form, topic: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Общий вопрос</SelectItem>
                        <SelectItem value="generation">Проблема с генерацией</SelectItem>
                        <SelectItem value="billing">Биллинг и закрывающие</SelectItem>
                        <SelectItem value="account">Аккаунт и доступ</SelectItem>
                        <SelectItem value="bug">Сообщить об ошибке</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Опишите ситуацию, укажите ID проекта или заявки, если применимо"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Отправить</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
