'use client'

import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const [value, setValue] = useState(query);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuery = value.trim();

    const url = new URL("/search", "http://localhost:3000");
    if (newQuery) {
      url.searchParams.set("query", newQuery);
    }

    if (categoryId) {
      url.searchParams.set("categoryId", categoryId);
    }

    if (!newQuery) {
      url.searchParams.delete("query");
    }

    router.push(url.toString());
  };

  return (
    <form
      className="flex w-full max-w-[600px]"
      onSubmit={handleSearch} // ✅ dùng onSubmit ở đây
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
        />
        {
          value!=='' ?     <div 
          onClick={()=>setValue("")}
          className="absolute top-[.8rem] cursor-pointer right-[1rem]">
          <X className="size-4"/>
        </div> : ""
        }
    
      </div>

      <button
        type="submit"
        disabled={!value.trim()}
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-4" />
      </button>
    </form>
  );
};
