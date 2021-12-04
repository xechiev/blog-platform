import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import classNames from "classnames";
import { Alert } from "react-bootstrap";
import ApiService from "../../apiService/ApiService";
import { loggedIn } from "../../redux/actions/actions";

import classes from "./NewArticle.module.scss";

const SignupSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tagList: yup.array().ensure(),
});

export default function NewArticle() {
  const { article, toggleArticle } = useSelector((store) => store);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      tagList: toggleArticle ? article.tagList : [],
    },
    resolver: yupResolver(SignupSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  const [errorTitle, setErrorTitle] = useState(null);
  const [articleSend, setArticleSend] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const params = useParams();
  const { slug } = params;

  const newApi = new ApiService();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedIn(true));
    }
  }, [dispatch]);

  const onSubmit = (data) => {
    const newArr = data.tagList.map((el) => el.val);
    data.tagList = newArr;

    if (toggleArticle) {
      newApi.updatedArticle(data, slug).then((res) => {
        setErrorTitle(false);
        setArticleSend(true);

        if (res === "error") {
          setErrorTitle(true);
        }

        setTimeout(() => {
          setArticleSend(false);
        }, 3000);
      });
    } else {
      newApi.createArticle(data).then((res) => {
        setErrorTitle(false);
        setArticleSend(false);
        if (res === "error") {
          setErrorTitle(true);
        } else {
          setRedirect(`/articles/${res.article.slug}`);
        }
      });
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        {redirect && <Redirect to={redirect} />}
        {articleSend ? (
          <>
            <Alert variant="primary" className={classes.alert}>
              {toggleArticle ? "Article edited!" : "Article created!"}
            </Alert>
          </>
        ) : (
          <>
            <h5 className={classes.name}>
              {toggleArticle ? "Edit article" : "Create new article"}
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h6 className={classes.title}>Title</h6>
              <input
                {...register("title")}
                className={classes.form}
                placeholder="Title"
                defaultValue={toggleArticle ? article.title : ""}
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
                defaultValue={toggleArticle ? article.description : ""}
                placeholder="Title"
              />
              {errors.description && (
                <p className={classes.errors}>{errors.description.message}</p>
              )}
              <h6 className={classes.title}>Text</h6>
              <textarea
                {...register("body")}
                className={classNames(classes.form, classes.textarea)}
                defaultValue={toggleArticle ? article.body : ""}
                placeholder="Text"
              />
              {errors.body && (
                <p className={classes.errors}>{errors.body.message}</p>
              )}
              <h6 className={classes.title}>Tags</h6>
              <div className={classes.tagsBody}>
                <div className={classes.tagGroup}>
                  {fields.map((field, index) => (
                    <li key={field.id}>
                      <input
                        {...register(`tagList[${index}].val`)}
                        className={classes.tags}
                        placeholder="Tag"
                        defaultValue={
                          toggleArticle ? article.tagList[index] : ""
                        }
                      />
                      <button
                        type="button"
                        className={classes.deleteButton}
                        onClick={() => remove(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </div>
                <div>
                  <button
                    type="button"
                    className={classes.addButton}
                    onClick={() => append({})}
                  >
                    Add tag
                  </button>
                </div>
              </div>
              <button type="submit" className={classes.submit}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
