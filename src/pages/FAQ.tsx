import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { FAQS } from "@/lib/adminData";

const FAQ = () => {
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const filtered = FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q.toLowerCase()) ||
        f.answer.toLowerCase().includes(q.toLowerCase()),
    );
    const map = new Map<string, typeof FAQS>();
    filtered.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    });
    return Array.from(map.entries());
  }, [q]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 max-w-3xl">
          <div className="text-center space-y-3 mb-10">
            <h1 className="text-4xl font-semibold tracking-tight">Частые вопросы</h1>
            <p className="text-muted-foreground">
              Короткие ответы по работе сервиса, тарифам и безопасности
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Найти ответ…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9 h-11"
            />
          </div>

          <div className="space-y-8">
            {groups.map(([category, items]) => (
              <div key={category}>
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  {category}
                </h2>
                <Accordion type="single" collapsible className="bg-card border rounded-lg">
                  {items.map((f) => (
                    <AccordionItem key={f.id} value={f.id} className="border-b last:border-b-0 px-4">
                      <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {f.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
            {groups.length === 0 && (
              <p className="text-center text-muted-foreground py-10">Ничего не найдено</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
