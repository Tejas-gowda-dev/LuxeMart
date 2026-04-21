import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col font-sans selection:bg-primary selection:text-primary-foreground">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<div className="container py-20 text-center font-heading text-4xl">About LuxeMart</div>} />
            <Route path="/contact" element={<div className="container py-20 text-center font-heading text-4xl">Contact Us</div>} />
            <Route path="/checkout" element={<div className="container py-20 text-center">
              <h1 className="font-heading text-5xl mb-4">Checkout</h1>
              <p className="text-muted-foreground">Checkout logic would go here. In this demo, your order is processing!</p>
            </div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
