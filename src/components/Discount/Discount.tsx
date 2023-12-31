import React from "react";
import classes from "./Discount.module.scss";
import { useDiscount } from "../../context/DiscountContext";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";
import { Button } from "../Button/Button";

interface ErrorMessageProps {
  errors: FieldErrors<FieldValues>;
  name: string;
}

const ErrorMessage = ({ errors, name }: ErrorMessageProps) => {
  return (
    <div className={classes.error}>
      {errors[name] && <span>{String(errors[name]!.message)}</span>}
    </div>
  );
};

export const Discount = () => {
  const { discount, addUsedDiscountCode, removeDiscountCode } = useDiscount();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const addDiscount = (data: FieldValues) => {
    const { discountCode } = data;
    const isDiscount = discount.discountCode.some(
      (disc: string) => disc === discountCode
    );
    if (!isDiscount) {
      setError("discountCode", {
        type: "manual",
        message: "Invalid discount code",
      });
      return;
    }
    addUsedDiscountCode(discountCode);
    reset();
  };

  return (
    <form className={classes.wrapper}>
      {discount.usedDiscount === "" && (
        <div className={classes.discount}>
          <label className={classes.discount__label} htmlFor="discountCode">
            Discount code
          </label>
          <input
            className={classes.discount__input}
            id="discountCode"
            type="string"
            {...register("discountCode")}
          />
          <Button
            className={classes.discount__button}
            name="Add discount"
            onClick={handleSubmit((data) => {
              addDiscount(data);
            })}
          />
        </div>
      )}
      {discount.usedDiscount && (
        <div className={classes.discountInfo}>
          <p>Used discount code:</p>
          <div className={classes.discountInfo__code}>
            <p>{discount.usedDiscount}</p>
            <Button
              className={classes.discountInfo__button}
              name="X"
              onClick={() => {
                removeDiscountCode();
              }}
            />
          </div>
        </div>
      )}
      <ErrorMessage errors={errors} name="discountCode" />
    </form>
  );
};
