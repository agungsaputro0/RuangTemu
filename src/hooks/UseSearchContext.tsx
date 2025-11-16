// SearchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchState {
  location: string;
  date: Date | null;
  range: [Date, Date] | null;
  guest: number;
  category: string | null;
}

interface SearchContextType {
  search: SearchState;
  setSearch: (state: Partial<SearchState>, fromButton?: boolean) => void;
  isSearchSet: boolean;
  resetSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearchState] = useState<SearchState>({
    location: "",
    date: null,
    range: null,
    guest: 1,
    category: null,
  });

  const [isSearchSet, setIsSearchSet] = useState(false);

  const setSearch = (state: Partial<SearchState>, fromButton = false) => {
    setSearchState((prev) => ({ ...prev, ...state }));
    setIsSearchSet(fromButton);
  };

  const resetSearch = () => {
    setSearchState({
      location: "",
      date: null,
      range: null,
      guest: 1,
      category: null,
    });
    setIsSearchSet(false);
  };

  return (
    <SearchContext.Provider value={{ search, setSearch, isSearchSet, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
