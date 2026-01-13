import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FileCode2, 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
  Menu,
  X,
  Receipt,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Обзор", href: "/dashboard", icon: LayoutDashboard },
  { name: "Документы", href: "/dashboard/documents", icon: FileText },
  { name: "Документооборот", href: "/dashboard/document-flow", icon: Receipt },
  { name: "Подписка", href: "/dashboard/billing", icon: CreditCard },
  { name: "Компания", href: "/dashboard/company", icon: Building2 },
  { name: "Настройки", href: "/dashboard/settings", icon: Settings },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col border-r border-border bg-card">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileCode2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">XML Expert</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">ИИ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Иван Иванов</p>
                <p className="text-xs text-muted-foreground truncate">ivan@company.ru</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileCode2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">XML Expert</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background pt-16">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground mt-4"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Выйти
            </Button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
