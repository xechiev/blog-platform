import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Alert } from "react-bootstrap";
import ApiService from "../../apiService/ApiService";
import Button from "../button/Button";

import classes from "./NewArticle.module.scss";

const SignupSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tagList: yup.array().ensure(),
});

export default function NewArticle() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const [inputList, setInputList] = useState([]);
  const [inputValue, setInputValue] = useState([]);

  const newApi = new ApiService();

  const onSubmit = (data) => {
    data.tagList = inputValue;
    newApi.registerUser(data);
    console.log(data);
  };

  const handleChange = (e) => setInputValue(inputValue.concat(e.target.value));

  const Input = () => (
    <input
      type="text"
      className={classes.tags}
      placeholder="Tag"
      onChange={handleChange}
    />
  );

  const addButtonTag = () => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        <h5 className={classes.name}>Create new article</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className={classes.title}>Title</h6>
          <input
            {...register("title")}
            className={classes.form}
            placeholder="Title"
          />
          {errors.title && (
            <p className={classes.errors}>{errors.title.message}</p>
          )}
          <h6 className={classes.title}>Short description</h6>
          <input
            {...register("description")}
            className={classes.form}
            placeholder="Title"
          />
          {errors.description && (
            <p className={classes.errors}>{errors.description.message}</p>
          )}
          <h6 className={classes.title}>Text</h6>
          <textarea
            {...register("body")}
            className={classNames(classes.form, classes.textarea)}
            placeholder="Text"
          />
          {errors.body && (
            <p className={classes.errors}>{errors.body.message}</p>
          )}
          <h6 className={classes.title}>Tags</h6>
          <div className={classes.tagsBody}>
            <input
              type="text"
              className={classes.tags}
              placeholder="Tag"
              onChange={handleChange}
            />
            {Button("Delete", "F5222D", 40)}
            {Button("Add tag", "1890FF", 40, addButtonTag)}
          </div>
          {inputList}
          <button type="submit" className={classes.submit}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
