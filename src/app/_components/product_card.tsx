import React from "react";
import { Product } from "../page";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      key={product.id}
      className="card card-compact w-44 max-h-64 bg-base-100 shadow-xl active:scale-[0.98] transition-all"
    >
      <figure>
        <img src={product.image} alt="Shoes" className=" max-h-48" />
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate text-base">{product.name}</h2>
        <div>₱{product.price + " "}⭐⭐⭐⭐</div>
      </div>
    </div>
  );
}

export function ProductLoadingCard() {
  return (
    <div className="card card-compact w-44 max-h-64 bg-base-100 shadow-xl animate-pulse">
      <figure>
        <div className="bg-base-200 h-48 w-full"></div>
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate text-sm text-ellipsis bg-base-200">
          Loading...
        </h2>
      </div>
    </div>
  );
}
