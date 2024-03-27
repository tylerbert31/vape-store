"use client";
import { unstable_noStore as noStore } from "next/cache";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "./_components/navbar";
import Filter from "./_components/filter";
import ProductCard, { ProductLoadingCard } from "./_components/product_card";
import NoResults from "./_components/no_results";
import Footer from "./_components/footer";

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
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [sortFilter, setsortFilter] = useState<number>(0);
  const [rating, filterRating] = useState<number>(0);
  const [empty, isEmpty] = useState<Boolean>(false);
  const queryParams = new URLSearchParams(searchParams.toString());
  const search = queryParams.get("search");

  const filter: TFilter = {
    sortFilter,
    setsortFilter,
    rating,
    filterRating,
  };

  useEffect(() => {
    if (Boolean(sortFilter)) {
      queryParams.set("sort", sortFilter.toString());
      queryParams.set("rating", rating.toString());
      if (search) {
        queryParams.set("search", search);
      }
    }

    fetch(`/api/products?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        if (data.products.length == 0) {
          isEmpty(true);
        }
      });

    router.push(`?${queryParams.toString()}`);
  }, [sortFilter, rating]);

  useLayoutEffect(() => {
    const sort = searchParams.get("sort");
    const rating = searchParams.get("rating");
    setsortFilter(sort ? parseInt(sort) : 0);
    filterRating(rating ? parseInt(rating) : 0);
  }, []);

  return (
    <main className="p-0 m-0 flex flex-col items-center bg-base-300">
      <div className="max-w-screen-sm w-full min-w-[400px]">
        <Navbar />
        <Filter filter={filter} />
        <div className=" grid grid-cols-2 md:grid-cols-3 justify-items-center gap-x-3 gap-y-5 m-4 mb-8 min-h-[500px]">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!products.length &&
            !empty &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProductLoadingCard key={i} />
            ))}
          {empty && <NoResults />}
        </div>
        <Footer />
      </div>
    </main>
  );
}
