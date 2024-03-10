"use client";
import { unstable_noStore as noStore } from "next/cache";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./_components/navbar";
import Filter from "./_components/filter";
import ProductCard, { ProductLoadingCard } from "./_components/product_card";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  size: string;
  stock: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
};

export type TFilter = {
  sortFilter: number;
  setsortFilter: (value: number) => void;
  rating: number;
  filterRating: (value: number) => void;
};

export default function Home() {
  noStore();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [sortFilter, setsortFilter] = useState<number>(0);
  const [rating, filterRating] = useState<number>(0);

  const filter: TFilter = {
    sortFilter,
    setsortFilter,
    rating,
    filterRating,
  };

  useEffect(() => {
    fetch(`/api/products?sort=${sortFilter}&rating=${rating}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
    // console.log("re-rendered");
    if (Boolean(sortFilter)) {
      const newUrl = `/?sort=${sortFilter}&rating=${rating}`;
      router.push(newUrl);
    }
  }, [sortFilter, rating]);

  return (
    <main className="p-0 m-0 flex flex-col items-center bg-base-300">
      <div className="max-w-screen-sm w-full min-w-[400px]">
        <Navbar />
        <Filter filter={filter} />
        <div className=" flex flex-row flex-wrap justify-evenly gap-x-3 gap-y-5 m-4 mb-8">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!products.length &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProductLoadingCard key={i} />
            ))}
        </div>
      </div>
    </main>
  );
}
