import React, { ReactNode, useState } from "react";
import { Product, ProductInCart } from "../types/productsInterface";

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
  resetCart: () => void;
  updatePriceAndQuantity: (cart: CartState) => CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
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

  const updatePriceAndQuantity = (cart: CartState) => {
    const totalPrice = cart.items.reduce(
      (acc, item) =>
        acc +
        (item.discountPrice !== undefined
          ? item.discountPrice * item.quantity
          : item.price * item.quantity),
      0
    );
    const totalQuantity = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return { ...cart, totalPrice, totalQuantity };
  };

  const addToCart = (product: Product) => {
    const productInCart = cart.items.find((item) => item.id === product.id);
    if (productInCart) {
      const updatedCart = cart.items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return setCart((prev) => {
        return updatePriceAndQuantity({ ...prev, items: updatedCart });
      });
    }
    setCart((prev) => {
      return updatePriceAndQuantity({
        ...prev,
        items: [...prev.items, { ...product, quantity: 1 }],
      });
    });
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart((prev) => {
      return updatePriceAndQuantity({ ...prev, items: updatedCart });
    });
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
    setCart((prev) => {
      return updatePriceAndQuantity({ ...prev, items: updatedCart });
    });
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.items.filter((item) => item.id !== productId);
    setCart((prev) => {
      return updatePriceAndQuantity({ ...prev, items: updatedCart });
    });
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
    setCart((prev) => {
      return updatePriceAndQuantity({ ...prev, items: updatedCart });
    });
  };

  const resetCart = () => {
    setCart({ items: [], totalPrice: 0, totalQuantity: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        reduceQuantity,
        setQuantityOfProduct,
        increaseQuantity,
        resetCart,
        updatePriceAndQuantity,
        setCart,
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
