import React from "react";
import { ProductInCart } from "../../utils/types/productsInterface";
import { useCart } from "../../context/CartContext";

interface PropsCartProduct {
  product: ProductInCart;
}

export const CartProduct = ({ product }: PropsCartProduct) => {
  const { increaseQuantity, reduceQuantity, setQuantityOfProduct } = useCart();
  return (
    <>
      <img src={product.image} alt={product.title} />
      <p>{product.title}</p>
      <input
        type="number"
        onChange={(e) => {
          setQuantityOfProduct(product.id, Number(e.target.value));
        }}
        value={product.quantity}
      ></input>
      <button
        onClick={() => {
          increaseQuantity(product.id);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          reduceQuantity(product.id);
        }}
      >
        -
      </button>
    </>
  );
};
