import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import { Star, ShoppingBag, Heart, Share2, ArrowLeft, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "../components/ui/separator";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row gap-12">
        <Skeleton className="aspect-square w-full md:w-1/2" />
        <div className="flex flex-col gap-6 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)} className="text-[10px] uppercase font-bold tracking-widest p-0 h-fit hover:bg-transparent">
              <ArrowLeft className="mr-2 h-3 w-3" />
              Return to archives
            </Button>
            <div className="flex gap-4">
               <Share2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
               <Heart className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-130px)]">
         {/* Image Content */}
         <div className="flex-1 bg-[#EFEFEF] p-12 md:p-24 flex items-center justify-center lg:border-r lg:border-border">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.image}
              alt={product.title}
              className="max-h-[60vh] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
         </div>

         {/* Product Details Sidebar */}
         <aside className="w-full lg:w-[450px] p-8 md:p-12 flex flex-col gap-12 bg-background overflow-y-auto">
            <div className="flex flex-col gap-4">
               <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground">{product.category}</p>
               <h1 className="font-heading text-5xl md:text-6xl tracking-tight leading-[0.9]">{product.title}</h1>
               <div className="flex items-center gap-2 mt-2">
                 <Star className="h-3 w-3 fill-accent text-accent" />
                 <span className="text-[10px] uppercase tracking-widest font-bold">{product.rating.rate} / {product.rating.count} reviews</span>
               </div>
            </div>

            <div className="flex flex-col gap-8">
               <p className="font-heading italic text-4xl text-accent border-b border-border pb-8">${product.price.toFixed(2)}</p>
               <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                 {product.description}
               </p>
            </div>

            <div className="flex flex-col gap-4">
               <Button 
                 className="w-full bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-xs h-16" 
                 onClick={() => addItem(product)}
               >
                 Add to Collection — ${product.price.toFixed(2)}
               </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-8 border-t border-border">
               <div className="flex gap-4 items-start">
                  <Truck className="h-4 w-4 text-accent" />
                  <div className="flex flex-col gap-1">
                     <p className="text-[10px] uppercase font-bold tracking-widest">Global Dispatch</p>
                     <p className="text-[9px] text-muted-foreground uppercase leading-relaxed tracking-wider">Ships from our Paris atelier within 48 hours.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <div className="flex flex-col gap-1">
                     <p className="text-[10px] uppercase font-bold tracking-widest">Lifetime Authenticity</p>
                     <p className="text-[9px] text-muted-foreground uppercase leading-relaxed tracking-wider">Each object is documented and verified by our curators.</p>
                  </div>
               </div>
            </div>
         </aside>
      </div>
    </div>
  );
}
