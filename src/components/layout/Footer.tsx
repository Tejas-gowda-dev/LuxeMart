import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-2xl tracking-tight uppercase">LuxeMart</h2>
            <p className="text-xs text-muted-foreground leading-relaxed tracking-wider uppercase">
              Curated objects for the <br /> modern aesthete.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-foreground">Archives</p>
            <ul className="flex flex-col gap-3">
              <li><Link to="/products" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">All Objects</Link></li>
              <li><Link to="/about" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">Our Story</Link></li>
              <li><Link to="/contact" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">Journal</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-foreground">Inquiry</p>
            <ul className="flex flex-col gap-3">
              <li><Link to="/contact" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">Support</Link></li>
              <li><Link to="#" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">Shipping</Link></li>
              <li><Link to="#" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">Returns</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-foreground">Newsletter</p>
            <div className="flex border-b border-foreground py-1">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent text-[10px] uppercase tracking-widest w-full focus:outline-none placeholder:text-muted-foreground/50"
              />
              <button className="text-[10px] uppercase font-bold tracking-widest px-2">Join</button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">© {new Date().getFullYear()} LUXEMART. ALL ARCHIVES RESERVED.</p>
          <div className="flex gap-6">
             <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Instagram</span>
             <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
