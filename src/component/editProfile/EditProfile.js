import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ApiService from "../../apiService/ApiService";

import classes from "./EditProfile.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  email: yup.string().required().email(),
  image: yup.string().url(),
});

export default function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const newApi = new ApiService();

  const userInfo = localStorage.getItem("user");
  const info = JSON.parse(userInfo);
  const { email, username, image, token } = info;

  const onSubmit = (data) => {
    newApi.updatedUser(data, token).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.user));
      setProfileUpdated(true);
      setTimeout(() => {
        setRedirect(true);
        setProfileUpdated(false);
      }, 1500);
    });
  };

  return (
    <div className={classes.body}>
      {profileUpdated ? (
        <>
          <Alert variant="primary" className={classes.alert}>
            Your profile has been updated!
          </Alert>
          {redirect && <Redirect to="/articles" />}
        </>
      ) : (
        <div className={classes.wrapper}>
          <h5 className={classes.name}>Edit Profile</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className={classes.title}>Username</h6>
            <input
              {...register("username")}
              className={classes.form}
              defaultValue={username}
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
              defaultValue={email}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className={classes.error}>{errors.email.message}</p>
            )}
            <h6 className={classes.title}>Avatar image (url)</h6>
            <input
              {...register("image")}
              className={classes.form}
              placeholder="Avatar image"
              defaultValue={image}
              type="text"
            />
            {errors.image && (
              <p className={classes.error}>{errors.image.message}</p>
            )}
            <button type="submit" className={classes.submit}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
