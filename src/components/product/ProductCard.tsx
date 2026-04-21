import React from "react";
import { Product } from "@/src/types";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/src/store/cartStore";
import { Badge } from "../ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative flex flex-col border-b border-r last:border-r-0 border-border bg-background p-6 aspect-[1/1.1] transition-colors hover:bg-white"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative flex-1 mb-6 overflow-hidden bg-[#EFEFEF]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <Badge className="absolute top-4 right-4 rounded-full border-foreground font-sans text-[9px] px-2 py-0 h-5" variant="outline">
            {product.category}
          </Badge>
          
          <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button 
              className="w-full bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-[10px] h-10" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
            >
              Add to Collection
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-semibold tracking-tight uppercase line-clamp-1">
            {product.title}
          </h3>
          <p className="font-heading italic text-accent text-lg">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
