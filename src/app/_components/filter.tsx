import React from "react";
import { TFilter } from "../page";

export default function Filter({ filter }: { filter: TFilter }) {
  const { sortFilter, setsortFilter, brand, filterRating } = filter;
  return (
    <div className="join max-w-full flex flex-row justify-center m-5">
      <select
        className="select select-bordered join-item"
        value={sortFilter}
        onChange={(e) => setsortFilter(parseInt(e.target.value))}
      >
        <option disabled value={0}>
          Sort by
        </option>
        <option value={1}>Newest - Oldest</option>
        <option value={2}>Most Popular</option>
        <option value={3}>Price: Low-High</option>
        <option value={4}>Price: High-Low</option>
        <option value={5}>Oldest - Newest</option>
      </select>
      <select
        className="select select-bordered join-item"
        value={brand}
        onChange={(e) => filterRating(parseInt(e.target.value))}
      >
        <option value={0}>Rating</option>
        <option value={1}>⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={5}>⭐⭐⭐⭐⭐</option>
      </select>
    </div>
  );
}
