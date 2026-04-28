import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Wrench,
  ShieldCheck,
  Send,
  Bug,
  FileCode2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Обзор", href: "/admin", icon: LayoutDashboard },
  { name: "Очередь заявок", href: "/admin/queue", icon: Inbox },
  { name: "Manual queue", href: "/admin/manual", icon: Wrench },
  { name: "QA", href: "/admin/qa", icon: ShieldCheck },
  { name: "Публикация", href: "/admin/publish", icon: Send },
  { name: "Bug tracker", href: "/admin/bugs", icon: Bug },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/30">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col border-r border-border bg-card">
          <div className="flex h-16 items-center justify-between gap-2 px-6 border-b border-border">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <FileCode2 className="h-4 w-4 text-background" />
              </div>
              <span className="font-semibold">XML Expert</span>
            </Link>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              Admin
            </Badge>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/admin" && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
                <span className="text-sm font-medium">МС</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Мария Соколова</p>
                <p className="text-xs text-muted-foreground truncate">QA-инженер</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => navigate("/dashboard")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Выйти из админки
            </Button>
          </div>
        </div>
      </aside>

      <div className="lg:hidden sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <FileCode2 className="h-4 w-4 text-background" />
          </div>
          <span className="font-semibold">XML Expert · Admin</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background pt-16">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:bg-secondary"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
