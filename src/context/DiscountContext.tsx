import React, { ReactNode, useState } from "react";

const initialDiscountState = {
  usedDiscount: "",
  discountCode: ["DISCOUNT_5", "DISCOUNT_10", "DISCOUNT_15", "DISCOUNT_20"],
};

interface DiscountContextInterface {
  discount: {
    usedDiscount: string;
    discountCode: string[];
  };
  addUsedDiscountCode: (discountCode: string) => void;
  removeDiscountCode: () => void;
}

const DiscountContext = React.createContext<DiscountContextInterface | null>(
  null
);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
  const [discount, setDiscount] = useState(initialDiscountState);

  const addUsedDiscountCode = (discountCode: string) => {
    setDiscount({ ...discount, usedDiscount: discountCode });
  };

  const removeDiscountCode = () => {
    setDiscount({ ...discount, usedDiscount: "" });
  };

  return (
    <DiscountContext.Provider
      value={{ discount, addUsedDiscountCode, removeDiscountCode }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => {
  const context = React.useContext(DiscountContext);
  if (!context) {
    throw new Error("useDiscount must be used within a DiscountProvider");
  }
  return context;
};
