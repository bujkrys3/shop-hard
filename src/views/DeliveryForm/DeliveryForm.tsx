import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { NavBar } from "../../components/NavBar/NavBar";
import classes from "./DeliveryForm.module.scss";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { useDiscount } from "../../context/DiscountContext";

interface FormData {
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export const DeliveryForm: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const { cart, resetCart } = useCart();
  const { removeDiscountPrice } = useProducts();
  const { removeDiscountCode } = useDiscount();

  const onSubmit = (data: FormData) => {
    console.log(data, cart);
    resetCart();
    removeDiscountPrice();
    removeDiscountCode();
    reset();
  };

  const isCartEmpty = useMemo(() => {
    return cart.items.length === 0;
  }, [cart.items.length]);

  return (
    <div>
      <NavBar />
      <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.delivery}>
          <div className={classes.delivery__input}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: true,
                pattern: {
                  value: /\b([A-Z][a-z]+)+/g,
                  message: "Invalid name",
                },
              })}
            />
          </div>
          {errors.name && (
            <span className={classes.delivery__error}>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className={classes.delivery}>
          <div className={classes.delivery__input}>
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              {...register("surname", {
                required: true,
                pattern: {
                  value: /\b([A-Z][a-z]+)+/g,
                  message: "Invalid surname",
                },
              })}
            />
          </div>
          {errors.surname && (
            <span className={classes.delivery__error}>
              {errors.surname.message}
            </span>
          )}
        </div>
        <div className={classes.delivery}>
          <div className={classes.delivery__input}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\w+.\w+/g,
                  message: "Invalid email",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className={classes.delivery__error}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className={classes.delivery}>
          <div className={classes.delivery__input}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              {...register("address", {
                required: true,
                pattern: {
                  value: /\b([A-Z][a-z]+)+/g,
                  message: "Invalid surname",
                },
              })}
            />
          </div>
          {errors.address && (
            <span className={classes.delivery__error}>
              {errors.address.message}
            </span>
          )}
        </div>

        <div className={classes.delivery}>
          <div className={classes.delivery__input}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /\d/g,
                  message: "Invalid phone number",
                },
                minLength: {
                  value: 8,
                  message: "To short phone number",
                },
                maxLength: {
                  value: 10,
                  message: "To long phone number",
                },
              })}
            />
          </div>
          {errors.phoneNumber && (
            <span className={classes.delivery__error}>
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className={classes.buttons}>
          <Button
            name="Back"
            onClick={() => {
              navigate("/cart");
            }}
            className={classes.button}
          />
          <Button
            disabled={isCartEmpty}
            name="Send"
            className={classes.button}
            type="submit"
          />
        </div>
        {isSubmitSuccessful && (
          <span className={classes.delivery__success}>
            Your order has been sent
          </span>
        )}
      </form>
    </div>
  );
};
