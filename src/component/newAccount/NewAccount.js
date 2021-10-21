import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import classNames from "classnames";

import classes from "./NewAccount.module.scss";

const SignupSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(40),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  checkbox: yup.boolean().required().oneOf([true], "Field must be checked"),
});

export default function NewAccount() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <h5 className={classes.name}>Create new account</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className={classes.title}>Username</h6>
          <input
            {...register("username")}
            className={classes.form}
            placeholder="some-username"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <h6 className={classes.title}>Email address</h6>
          <input
            {...register("email")}
            className={classes.form}
            type="email"
            placeholder="alex@example.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <h6 className={classes.title}>Password</h6>
          <input
            {...register("password")}
            className={classes.form}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <h6 className={classes.title}>Repeat Password</h6>
          <input
            {...register("passwordConfirmation")}
            className={classes.form}
            type="password"
          />
          {errors.passwordConfirmation && (
            <p>{errors.passwordConfirmation.message}</p>
          )}
          <div className={classes.line} />
          <label className={classNames(classes.check, classes.option)}>
            <input
              {...register("checkbox")}
              type="checkbox"
              className={classNames(classes.processing, classes.option)}
            />
            <span className={classes.checkBox} />
            <span className={classes.value}>
              I agree to the processing of my personal information
            </span>
          </label>
          {errors.checkbox && <p>{errors.checkbox.message}</p>}
          <button type="submit" className={classes.submit}>
            Create
          </button>
          <span className={classes.haveAccount}>
            Already have an account?
            <Link to="/signIn" className={classes.signIn}>
              Sign In.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
