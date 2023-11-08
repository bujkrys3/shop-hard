import React, { ReactNode, useState, useContext, createContext } from "react";

interface FilterContextInterface {
  filterData: any;
  setFilterData: (data: any) => void;
}

const FilerContext = createContext<FilterContextInterface | null>(null);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterData, setFilterData] = useState({
    price: {
      from: "",
      to: "",
    },
    sortBy: "lowerPrice",
  });

  return (
    <FilerContext.Provider value={{ filterData, setFilterData }}>
      {children}
    </FilerContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilerContext);
  if (context === null) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
