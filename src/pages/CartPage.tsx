import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCartStore } from "../store/cartStore";
import { Separator } from "../components/ui/separator";
import { motion, AnimatePresence } from "motion/react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();
  const shipping = total > 0 ? 15 : 0;
  const tax = total * 0.08;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-40 text-center flex flex-col items-center">
        <p className="text-[10px] uppercase font-bold tracking-widest mb-12">Shopping Bag</p>
        <h1 className="font-heading text-6xl italic mb-12">Your archives are empty.</h1>
        <Link to="/products">
          <Button className="bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-[10px] h-12 px-12">Discover Objects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-border py-20">
         <div className="container mx-auto px-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-4">Items Selection</p>
            <h1 className="font-heading text-7xl md:text-8xl tracking-tight">Current Selection</h1>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Cart Items */}
        <div className="flex-1 bg-border grid grid-cols-1 gap-[1px]">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-background p-8 flex gap-8 items-center"
              >
                <div className="h-32 w-32 flex-shrink-0 bg-[#EFEFEF] p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex flex-col gap-2 max-w-sm">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{item.category}</p>
                    <Link to={`/product/${item.id}`} className="hover:underline">
                      <h3 className="font-sans font-bold uppercase text-xs tracking-tight">{item.title}</h3>
                    </Link>
                    <div className="flex items-center gap-4 mt-2">
                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></button>
                       <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></button>
                       <Separator orientation="vertical" className="h-4 mx-2" />
                       <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground">Remove</button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                     <p className="font-heading italic text-2xl text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                     <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">${item.price.toFixed(2)} / unit</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside className="w-full lg:w-96 border-l border-border p-12 bg-background flex flex-col gap-12 sticky top-20 h-fit">
            <div>
               <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-8 text-muted-foreground">Order Summary</p>
               <div className="flex flex-col gap-4 text-xs">
                  <div className="flex justify-between uppercase tracking-widest text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase tracking-widest text-muted-foreground">
                    <span>Delivery</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase tracking-widest text-muted-foreground">
                    <span>Processing</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-6 mt-2 flex justify-between items-end">
                    <span className="text-[10px] uppercase font-bold tracking-widest">Total cost</span>
                    <span className="font-heading text-4xl italic text-accent">${(total + shipping + tax).toFixed(2)}</span>
                  </div>
               </div>
            </div>

            <Link to="/checkout" className="w-full">
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-[10px] h-14">
                Begin Checkout
              </Button>
            </Link>
            
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed text-center">
              Free shipping on orders over $500. <br /> Secure payment processing.
            </p>
        </aside>
      </div>
    </div>
  );
}
