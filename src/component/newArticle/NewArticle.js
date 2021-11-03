import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Alert } from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import ApiService from "../../apiService/ApiService";
import Button from "../button/Button";
import { toggleArticleComponent } from "../../redux/actions/actions";
import { getWholeArticle } from "../../redux/asyncActions/asyncActions";

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
    reset,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  const state = useSelector((store) => store);
  const { article, isLoggedIn, toggleArticle } = state;

  const [inputList, setInputList] = useState(
    toggleArticle ? article.tagList : []
  );
  const [inputValue, setInputValue] = useState([]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [articleSend, setArticleSend] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    dispatch(getWholeArticle(slug));
    dispatch(toggleArticleComponent(true));
  }, [slug, dispatch]);

  const newApi = new ApiService();

  const onSubmit = (data) => {
    const userInfo = localStorage.getItem("user");
    const token = JSON.parse(userInfo);

    data.tagList = debouncedInputValue;
    newApi.createArticle(data, token.token).then((res) => {
      console.log(data);
      setErrorTitle(false);
      if (res === "error") {
        setErrorTitle(true);
      }
      setArticleSend(true);
      setTimeout(() => {
        setArticleSend(false);
      }, 2000);
    });
    setInputValue([]);
    setInputList([]);
    reset({});
  };

  const handleChange = (e) => setInputValue(inputValue.concat(e.target.value));

  const Input = () => (
    <div className={classes.inputDelete}>
      <input
        type="text"
        className={classes.tags}
        placeholder="Tag"
        onChange={handleChange}
        id={inputList.length}
      />
      {Button("Delete", "F5222D", 40, deleteButtonTag)}
    </div>
  );

  const addButtonTag = () => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  const deleteButtonTag = (e) => {
    const el = e.target.parentNode;
    const elIndex = el.children[0].id;
    setInputList(inputList.filter((input) => input.id !== elIndex));
    console.log(inputList);
  };

  return (
    isLoggedIn && (
      <div className={classes.body}>
        <div className={classes.wrapper}>
          {articleSend ? (
            <Alert variant="primary" className={classes.alert}>
              Article created!
            </Alert>
          ) : (
            <>
              <h5 className={classes.name}>Create new article</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className={classes.title}>Title</h6>
                <input
                  {...register("title")}
                  className={classes.form}
                  placeholder="Title"
                  value={toggleArticle ? article.title : ""}
                />
                {errorTitle && (
                  <Alert variant="danger" className={classes.alert}>
                    Title must be unique!
                  </Alert>
                )}
                {errors.title && (
                  <p className={classes.errors}>{errors.title.message}</p>
                )}
                <h6 className={classes.title}>Short description</h6>
                <input
                  {...register("description")}
                  className={classes.form}
                  value={toggleArticle ? article.description : ""}
                  placeholder="Title"
                />
                {errors.description && (
                  <p className={classes.errors}>{errors.description.message}</p>
                )}
                <h6 className={classes.title}>Text</h6>
                <textarea
                  {...register("body")}
                  className={classNames(classes.form, classes.textarea)}
                  value={toggleArticle ? article.body : ""}
                  placeholder="Text"
                />
                {errors.body && (
                  <p className={classes.errors}>{errors.body.message}</p>
                )}
                <h6 className={classes.title}>Tags</h6>
                <div className={classes.tagsBody}>
                  <div className={classes.tagGroup}>{inputList}</div>
                  <div>{Button("Add tag", "1890FF", 40, addButtonTag)}</div>
                </div>
                <button type="submit" className={classes.submit}>
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    )
  );
}
