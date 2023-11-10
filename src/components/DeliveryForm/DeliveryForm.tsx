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
}

interface DeliveryFormProps {
  submitSuccessfulHandler: () => void;
}

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
            <option value="">Select a country</option>
            <option value="al">Albania</option>
            <option value="at">Austria</option>
            <option value="be">Belgium</option>
            <option value="ba">Bosnia and Herzegovina</option>
            <option value="bg">Bulgaria</option>
            <option value="hr">Croatia</option>
            <option value="cy">Cyprus</option>
            <option value="cz">Czech Republic</option>
            <option value="dk">Denmark</option>
            <option value="ee">Estonia</option>
            <option value="fi">Finland</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
            <option value="gr">Greece</option>
            <option value="hu">Hungary</option>
            <option value="is">Iceland</option>
            <option value="ie">Ireland</option>
            <option value="it">Italy</option>
            <option value="lv">Latvia</option>
            <option value="lt">Lithuania</option>
            <option value="lu">Luxembourg</option>
            <option value="mk">North Macedonia</option>
            <option value="mt">Malta</option>
            <option value="md">Moldova</option>
            <option value="me">Montenegro</option>
            <option value="nl">Netherlands</option>
            <option value="no">Norway</option>
            <option value="pl">Poland</option>
            <option value="pt">Portugal</option>
            <option value="ro">Romania</option>
            <option value="rs">Serbia</option>
            <option value="sk">Slovakia</option>
            <option value="si">Slovenia</option>
            <option value="es">Spain</option>
            <option value="se">Sweden</option>
            <option value="ch">Switzerland</option>
            <option value="ua">Ukraine</option>
            <option value="gb">United Kingdom</option>
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
          disabled={isCartEmpty}
          name="Send"
          className={classes.button}
          type="submit"
        />
      </div>
    </form>
  );
};
