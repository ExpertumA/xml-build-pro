import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileCode2 } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isDashboard = location.pathname.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FileCode2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">XML Expert</span>
        </Link>

        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Возможности
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Тарифы
            </Link>
          </nav>
        )}

        {!isAuthPage && (
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Войти</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Начать работу</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
