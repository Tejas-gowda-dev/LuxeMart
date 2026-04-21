import React from "react";
import { useEffect, useState, useMemo } from "react";
import { fetchProducts, fetchCategories } from "../services/api";
import { Product } from "../types";
import { ProductCard } from "../components/product/ProductCard";
import { Skeleton } from "../components/ui/skeleton";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="border-b border-border py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
           <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">The Complete Collection</p>
           <h1 className="font-heading text-7xl md:text-8xl tracking-tight">Object & Essence</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border p-8 flex flex-col gap-12 bg-background shrink-0">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-muted-foreground">Search</p>
            <div className="relative">
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <input
                placeholder="Find an object..."
                className="w-full bg-transparent border-b border-foreground py-2 text-xs focus:outline-none placeholder:text-muted-foreground/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
             <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-muted-foreground">Categories</p>
             <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`text-xs text-left uppercase tracking-widest hover:text-accent transition-colors ${!selectedCategory ? 'font-bold underline underline-offset-4' : 'text-muted-foreground'}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs text-left uppercase tracking-widest hover:text-accent transition-colors ${selectedCategory === cat ? 'font-bold underline underline-offset-4' : 'text-muted-foreground'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          <div>
             <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6 text-muted-foreground">Sort By</p>
             <div className="flex flex-col gap-3">
                {[
                  { id: 'featured', label: 'Featured' },
                  { id: 'price-asc', label: 'Price: Low-High' },
                  { id: 'price-desc', label: 'Price: High-Low' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id as any)}
                    className={`text-xs text-left uppercase tracking-widest hover:text-accent transition-colors ${sortBy === option.id ? 'font-bold' : 'text-muted-foreground'}`}
                  >
                    {option.label}
                  </button>
                ))}
             </div>
          </div>
        </aside>

        {/* Main Product Grid */}
        <div className="flex-1 bg-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-background p-12 flex flex-col gap-4 h-full">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              // @ts-ignore
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full bg-background flex flex-col items-center justify-center py-40 gap-6">
               <p className="font-heading text-4xl italic text-muted-foreground">Empty Archives</p>
               <Button variant="outline" className="uppercase tracking-widest text-[10px]" onClick={() => {
                 setSearchQuery("");
                 setSelectedCategory(null);
               }}>Reset Exploration</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
