import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileCode2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <FileCode2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">XML Expert</span>
            </Link>
            <h1 className="text-2xl font-semibold">Создать аккаунт</h1>
            <p className="text-muted-foreground mt-2">
              Начните работу с XML Expert
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Название компании</Label>
              <Input
                id="company"
                type="text"
                placeholder="ООО «Компания»"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Минимум 8 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-relaxed">
                Я принимаю{" "}
                <a href="#" className="text-primary hover:underline">
                  условия использования
                </a>{" "}
                и{" "}
                <a href="#" className="text-primary hover:underline">
                  политику конфиденциальности
                </a>
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!agreed}>
              Создать аккаунт
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-white text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Готово для экспертизы
          </h2>
          <p className="text-white/80 text-lg">
            Автоматическая проверка по XSD-схемам Минстроя РФ. 
            Загрузите первый документ бесплатно.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
