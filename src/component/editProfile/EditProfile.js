import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import classes from "./EditProfile.module.scss";

const SignupSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(40),
  avatar: yup.string().required().url(),
});

export default function EditProfile() {
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
        <h5 className={classes.name}>Edit Profile</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className={classes.title}>Username</h6>
          <input
            {...register("username")}
            className={classes.form}
            placeholder="John Doe"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <h6 className={classes.title}>Email address</h6>
          <input
            {...register("email")}
            className={classes.form}
            type="email"
            placeholder="john@example.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <h6 className={classes.title}>Password</h6>
          <input
            {...register("password")}
            className={classes.form}
            placeholder="New password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <h6 className={classes.title}>Avatar image (url)</h6>
          <input
            {...register("avatar")}
            className={classes.form}
            placeholder="Avatar image"
            type="password"
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
          <button type="submit" className={classes.submit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
