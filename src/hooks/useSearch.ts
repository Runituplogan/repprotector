import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from ".";

export const useSearch = (debounceDelay = 500, queryKey = "q") => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialSearchValue = searchParams.get(queryKey) || "";
  const [search, setSearch] = useState(initialSearchValue);
  const debouncedSearch = useDebounce(search, debounceDelay);

  useEffect(() => {
    const urlSearch = searchParams.get(queryKey) || "";
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const currentUrlSearch = searchParams.get(queryKey) || "";

    if (currentUrlSearch !== debouncedSearch) {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedSearch) {
        params.set(queryKey, debouncedSearch);
      } else {
        params.delete(queryKey);
      }

      params.delete("page");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, pathname]);

  return [search, setSearch] as const;
};
