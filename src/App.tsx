import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardUpload from "./pages/DashboardUpload";
import DashboardBillingDocuments from "./pages/DashboardBillingDocuments";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardProjectNew from "./pages/DashboardProjectNew";
import DashboardProjectDetail from "./pages/DashboardProjectDetail";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardCompany from "./pages/DashboardCompany";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQueue from "./pages/admin/AdminQueue";
import AdminManualQueue from "./pages/admin/AdminManualQueue";
import AdminQA from "./pages/admin/AdminQA";
import AdminPublish from "./pages/admin/AdminPublish";
import AdminBugs from "./pages/admin/AdminBugs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/documents" element={<Navigate to="/dashboard/projects" replace />} />
          <Route path="/dashboard/documents/:id" element={<Navigate to="/dashboard/projects" replace />} />
          <Route path="/dashboard/upload" element={<DashboardUpload />} />
          <Route path="/dashboard/projects" element={<DashboardProjects />} />
          <Route path="/dashboard/projects/new" element={<DashboardProjectNew />} />
          <Route path="/dashboard/projects/:id" element={<DashboardProjectDetail />} />
          <Route path="/dashboard/billing-documents" element={<DashboardBillingDocuments />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/dashboard/company" element={<DashboardCompany />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/queue" element={<AdminQueue />} />
          <Route path="/admin/manual" element={<AdminManualQueue />} />
          <Route path="/admin/qa" element={<AdminQA />} />
          <Route path="/admin/publish" element={<AdminPublish />} />
          <Route path="/admin/bugs" element={<AdminBugs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
