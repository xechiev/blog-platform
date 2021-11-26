import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Pagination } from "antd";
import Post from "../post/Post";
import { getPostsData } from "../../redux/asyncActions/asyncActions";
import { loggedIn, setPage, setLoading } from "../../redux/actions/actions";
import classes from "./PostList.module.scss";

const PostList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { dataPosts, totalCount, currentPage, isLoading } = state;
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    dispatch(setLoading(false));
    if (localStorage.getItem("user")) {
      const userInfo = localStorage.getItem("user");
      const info = JSON.parse(userInfo);
      const { token } = info;
      dispatch(getPostsData(token, curPage));
      dispatch(loggedIn(true));
    } else {
      dispatch(getPostsData());
    }
  }, [currentPage]);

  const nextPage = (p) => {
    dispatch(setPage(p));
    setCurPage(p);
  };
  return (
    <div className={classes.wrapper}>
      {isLoading ? (
        <>
          <ul className={classes.postList}>
            {dataPosts.map((post) => (
              <li className={classes.post} key={Math.random()}>
                <Link to={`/articles/${post.slug}`}>
                  <Post {...post} />
                </Link>
              </li>
            ))}
          </ul>
          <div className={classes.footer}>
            {dataPosts.length > 5 ? (
              <Pagination
                page={currentPage}
                pageSize={5}
                total={totalCount}
                onChange={(page) => nextPage()}
              />
            ) : (
              " "
            )}
          </div>
        </>
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          className={classes.spin}
        />
      )}
    </div>
  );
};

export default PostList;
