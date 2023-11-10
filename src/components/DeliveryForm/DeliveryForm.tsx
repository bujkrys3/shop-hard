import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import classes from "./DeliveryForm.module.scss";
import { Button } from "../Button/Button";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { useDiscount } from "../../context/DiscountContext";

interface FormData {
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  email: string;
  countriesSelect: string;
  street: string;
  city: string;
  houseNumber: string;
  directional: string;
}

interface DeliveryFormProps {
  submitSuccessfulHandler: () => void;
}

const countries = [
  { code: "+44", country: "United Kingdom" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  { code: "+31", country: "Netherlands" },
  { code: "+32", country: "Belgium" },
  { code: "+41", country: "Switzerland" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+45", country: "Denmark" },
  { code: "+358", country: "Finland" },
  { code: "+353", country: "Ireland" },
  { code: "+352", country: "Luxembourg" },
  { code: "+43", country: "Austria" },
  { code: "+30", country: "Greece" },
  { code: "+420", country: "Czech Republic" },
  { code: "+36", country: "Hungary" },
  { code: "+48", country: "Poland" },
  { code: "+421", country: "Slovakia" },
  { code: "+386", country: "Slovenia" },
  { code: "+385", country: "Croatia" },
];

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  submitSuccessfulHandler,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { cart, resetCart } = useCart();
  const { removeDiscountPrice } = useProducts();
  const { removeDiscountCode } = useDiscount();

  const onSubmit = (data: FormData) => {
    console.log(data, cart);
    resetCart();
    removeDiscountPrice();
    removeDiscountCode();
    submitSuccessfulHandler();
    reset();
  };

  const isCartEmpty = useMemo(() => {
    return cart.items.length === 0;
  }, [cart.items.length]);

  return (
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
          <span className={classes.delivery__error}>{errors.name.message}</span>
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
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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
          <label htmlFor="countriesSelect">Country</label>
          <select
            id="countriesSelect"
            {...register("countriesSelect", {
              required: true,
            })}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        {errors.countriesSelect && (
          <span className={classes.delivery__error}>
            {errors.countriesSelect.message}
          </span>
        )}
      </div>
      <div className={classes.delivery}>
        <div className={classes.delivery__input}>
          <label htmlFor="address">City</label>
          <input
            id="city"
            {...register("city", {
              required: true,
              pattern: {
                value: /\b([A-Z][a-z]+)+/g,
                message: "Invalid city",
              },
            })}
          />
        </div>
        {errors.city && (
          <span className={classes.delivery__error}>{errors.city.message}</span>
        )}
      </div>
      <div className={classes.delivery}>
        <div className={classes.delivery__input}>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            {...register("street", {
              required: true,
              pattern: {
                value: /\b([A-Z][a-z]+)+/g,
                message: "Invalid street",
              },
            })}
          />
        </div>
        {errors.street && (
          <span className={classes.delivery__error}>
            {errors.street.message}
          </span>
        )}
      </div>
      <div className={classes.delivery}>
        <div className={classes.delivery__input}>
          <label htmlFor="address">House number</label>
          <input
            id="houseNumber"
            {...register("houseNumber", {
              required: true,
              pattern: {
                value: /^\d+([a-zA-Z])?(\/\d+)?$/g,
                message: "Invalid house number",
              },
              minLength: {
                value: 1,
                message: "To short number",
              },
              maxLength: {
                value: 7,
                message: "To long number",
              },
            })}
          />
        </div>
        {errors.houseNumber && (
          <span className={classes.delivery__error}>
            {errors.houseNumber.message}
          </span>
        )}
      </div>
      <div className={classes.delivery}>
        <div className={classes.delivery__input}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className={classes.delivery__phone}>
            <select
              id="directional"
              {...register("directional", {
                required: true,
              })}
            >
              {countries.map((country) => (
                <option key={country.country} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
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
                  value: 7,
                  message: "To short phone number",
                },
                maxLength: {
                  value: 9,
                  message: "To long phone number",
                },
              })}
            />
          </div>
        </div>
        {errors.phoneNumber && (
          <span className={classes.delivery__error}>
            {errors.phoneNumber.message}
          </span>
        )}
      </div>
      <div className={classes.buttons}>
        <Button
          disabled={isCartEmpty}
          name="Send"
          className={classes.button}
          type="submit"
        />
      </div>
    </form>
  );
};
