import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import ApiService from "../../apiService/ApiService";

import classes from "./EditProfile.module.scss";

const SignupSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(40),
  image: yup.string().required().url(),
});

export default function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const newApi = new ApiService();

  const onSubmit = (data) => {
    const userInfo = localStorage.getItem("user");
    const token = JSON.parse(userInfo);
    newApi.updatedUser(data, token.token).then((res) => {
      console.log(res);
    })
  };

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
          {errors.username && (
            <p className={classes.error}>{errors.username.message}</p>
          )}
          <h6 className={classes.title}>Email address</h6>
          <input
            {...register("email")}
            className={classes.form}
            type="email"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className={classes.error}>{errors.email.message}</p>
          )}
          <h6 className={classes.title}>Password</h6>
          <input
            {...register("password")}
            className={classes.form}
            placeholder="New password"
            type="password"
          />
          {errors.password && (
            <p className={classes.error}>{errors.password.message}</p>
          )}
          <h6 className={classes.title}>Avatar image (url)</h6>
          <input
            {...register("image")}
            className={classes.form}
            placeholder="Avatar image"
            type="password"
          />
          {errors.image && (
            <p className={classes.error}>{errors.image.message}</p>
          )}
          <button type="submit" className={classes.submit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
