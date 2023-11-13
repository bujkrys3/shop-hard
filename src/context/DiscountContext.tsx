import React, { ReactNode, useState } from "react";
import { useProducts } from "./ProductContext";
import { useCart } from "./CartContext";

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

  const { cart, updatePriceAndQuantity, setCart } = useCart();
  const { products, setProducts } = useProducts();

  const addUsedDiscountCode = (discountCode: string) => {
    setDiscount((prev) => {
      return { ...prev, usedDiscount: discountCode };
    });
    addDiscountPriceInCart(discountCode);
    addDiscountPrice(discountCode);
  };

  const removeDiscountCode = () => {
    setDiscount((prev) => {
      return { ...prev, usedDiscount: "" };
    });
    removeDiscountPriceInCart();
    removeDiscountPrice();
  };

  const addDiscountPriceInCart = (discountCode: string) => {
    const discount = Number(discountCode.split("_")[1]);
    const updatedCart = cart.items.map((item) => {
      const discountPrice = item.price - (item.price * discount) / 100;
      return { ...item, discountPrice };
    });
    setCart((prev) => {
      return updatePriceAndQuantity({ ...prev, items: updatedCart });
    });
  };

  const removeDiscountPriceInCart = () => {
    const updatedCart = cart.items.map((item) => {
      delete item.discountPrice;
      return { ...item };
    });
    setCart((prev) => {
      return updatePriceAndQuantity({ ...prev, items: updatedCart });
    });
  };

  const addDiscountPrice = (discountCode: string) => {
    const discount = Number(discountCode.split("_")[1]);
    const updatedCart = products.map((item) => {
      const discountPrice = item.price - (item.price * discount) / 100;
      return { ...item, discountPrice };
    });
    setProducts(updatedCart);
  };

  const removeDiscountPrice = () => {
    const updatedCart = products.map((item) => {
      delete item.discountPrice;
      return { ...item };
    });
    setProducts(updatedCart);
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
