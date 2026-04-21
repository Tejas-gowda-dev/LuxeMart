import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Box, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/product/ProductCard";
import { fetchProducts } from "../services/api";
import { Product } from "../types";
import { Skeleton } from "../components/ui/skeleton";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 8)); // Display top 8 featured
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full border-b border-border flex items-center justify-center p-8 text-center bg-background">
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8"
          >
            Object & Essence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-7xl md:text-[10rem] leading-[0.8] mb-12 tracking-tight"
          >
            Aesthete <br /> Curated.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/products">
              <Button size="lg" className="h-14 px-12 bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-xs">
                View The Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
           <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Latest Arrivals</p>
           <h2 className="font-heading text-4xl mb-12 italic">The Season's Best</h2>
        </div>

        <div className="border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-border gap-[1px]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background p-12 flex flex-col gap-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))
          ) : (
            products.map((product) => (
              // @ts-ignore
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="bg-muted px-4 py-32 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
           <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Our Philosophy</p>
           <h3 className="font-heading text-5xl leading-tight italic max-w-2xl">"Design is not just what it looks like and feels like. Design is how it works."</h3>
           <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-lg">
             We believe in the power of well-made objects to transform everyday life. Our collection is curated with an eye for timeless form, impeccable material, and soul.
           </p>
           <Button variant="link" className="uppercase tracking-[0.2em] text-[10px] font-bold underline-offset-8">
             Read Our Story
           </Button>
        </div>
      </section>
    </div>
  );
}
