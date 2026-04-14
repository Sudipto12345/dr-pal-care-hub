import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/useCart";
import { LanguageProvider } from "@/i18n/LanguageContext";
import CartSheet from "@/components/shop/CartSheet";

import PublicLayout from "@/components/layout/PublicLayout";
import PatientLayout from "@/components/layout/PatientLayout";
import AdminLayout from "@/components/layout/AdminLayout";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Treatments from "./pages/Treatments";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Blog from "./pages/Blog";
import BookAppointment from "./pages/BookAppointment";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrescriptionPreview from "./pages/PrescriptionPreview";

import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions";
import PatientOrders from "./pages/patient/PatientOrders";
import PatientProfile from "./pages/patient/PatientProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminPrescriptions from "./pages/admin/AdminPrescriptions";
import AdminCases from "./pages/admin/AdminCases";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminNewPrescription from "./pages/admin/AdminNewPrescription";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartSheet />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/treatments" element={<Treatments />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/prescription/:id" element={<PrescriptionPreview />} />

              <Route element={<PatientLayout />}>
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/appointments" element={<PatientAppointments />} />
                <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
                <Route path="/patient/orders" element={<PatientOrders />} />
                <Route path="/patient/profile" element={<PatientProfile />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/patients" element={<AdminPatients />} />
                <Route path="/admin/appointments" element={<AdminAppointments />} />
                <Route path="/admin/prescriptions" element={<AdminPrescriptions />} />
                <Route path="/admin/cases" element={<AdminCases />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
