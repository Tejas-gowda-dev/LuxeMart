import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/src/store/cartStore";
import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";

export function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Collection", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background h-20">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-xl font-medium tracking-tight uppercase">LuxeMart</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center border-b border-foreground w-48 py-1">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground flex-1">Search the archives...</span>
              <Search className="h-3 w-3" />
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-accent">
                  Bags ({itemCount})
                </span>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 border-r border-border">
          <div className="flex flex-col h-full bg-background p-8">
            <h2 className="font-heading text-2xl mb-12 uppercase">LuxeMart</h2>
            <div className="flex flex-col gap-6">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-widest">Home</Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
