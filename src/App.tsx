import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UpdatingPage from "./pages/UpdatingPage";
import BackToTop from "@/components/BackToTop";   // ✅ Add this

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* 🌟 Universal component */}
        <BackToTop />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<Index />} />

          {/* SERVICE LEARN MORE ROUTES */}
          <Route path="/services/:serviceId" element={<UpdatingPage />} />

          {/* 404 FALLBACK */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
