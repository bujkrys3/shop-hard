import React, { ReactNode, useEffect, useState } from "react";
import { Product, ProductInCart } from "../utils/types/productsInterface";

export interface CartContextInterface {
  cart: {
    items: ProductInCart[];
    totalPrice: number;
    totalQuantity: number;
    discountCode?: string;
  };
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  reduceQuantity: (productId: number) => void;
  setQuantityOfProduct: (productId: number, quantity: number) => void;
  increaseQuantity: (productId: number) => void;
  addDiscountPriceInCart: (discountCode: string) => void;
  removeDiscountPriceInCart: () => void;
  resetCart: () => void;
}

interface CartState {
  items: ProductInCart[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const CartContext = React.createContext<CartContextInterface | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>(initialState);

  const updatePriceAndQuantity = () => {
    setCart((prevCart) => {
      const totalPrice = prevCart.items.reduce(
        (acc, item) =>
          acc +
          (item.discountPrice !== undefined
            ? item.discountPrice * item.quantity
            : item.price * item.quantity),
        0
      );
      const totalQuantity = prevCart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      return { ...prevCart, totalPrice, totalQuantity };
    });
  };

  useEffect(() => {
    updatePriceAndQuantity();
  }, [cart.items]);

  const addToCart = (product: Product) => {
    const productInCart = cart.items.find((item) => item.id === product.id);
    if (productInCart) {
      const updatedCart = cart.items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return setCart({ ...cart, items: updatedCart });
    }
    setCart({
      ...cart,
      items: [...cart.items, { ...product, quantity: 1 }],
    });
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart({ ...cart, items: updatedCart });
  };

  const reduceQuantity = (productId: number) => {
    const productInCart = cart.items.find((item) => item.id === productId);
    if (!productInCart) return;
    if (productInCart.quantity <= 1) {
      return removeFromCart(productId);
    }
    const updatedCart = cart.items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart({ ...cart, items: updatedCart });
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.items.filter((item) => item.id !== productId);
    setCart({ ...cart, items: updatedCart });
  };

  const setQuantityOfProduct = (productId: number, quantity: number) => {
    const productInCart = cart.items.find((item) => item.id === productId);
    if (!productInCart) return;
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    const updatedCart = cart.items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart({ ...cart, items: updatedCart });
  };

  const addDiscountPriceInCart = (discountCode: string) => {
    const discount = Number(discountCode.split("_")[1]);
    const updatedCart = cart.items.map((item) => {
      const discountPrice = item.price - (item.price * discount) / 100;
      return { ...item, discountPrice };
    });
    setCart({ ...cart, items: updatedCart });
  };

  const removeDiscountPriceInCart = () => {
    const updatedCart = cart.items.map((item) => {
      delete item.discountPrice;
      return { ...item };
    });
    setCart({ ...cart, items: updatedCart });
  };

  const resetCart = () => {
    setCart(initialState);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addDiscountPriceInCart,
        addToCart,
        removeFromCart,
        reduceQuantity,
        setQuantityOfProduct,
        increaseQuantity,
        removeDiscountPriceInCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
