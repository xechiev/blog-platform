import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Pagination } from "antd";
import Post from "../post/Post";
import { getPostsData } from "../../redux/asyncActions/asyncActions";
import { loggedIn, setPage, setLoading } from "../../redux/actions/actions";
import classes from "./PostList.module.scss";

const PostList = () => {
  const dispatch = useDispatch();
  const { dataPosts, totalCount, currentPage, isLoading } = useSelector((store) => store);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedIn(true));
    }
    dispatch(setLoading(false));
    dispatch(getPostsData(curPage));
  }, [dispatch, curPage]);

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
                <Post {...post} />
              </li>
            ))}
          </ul>
          <div className={classes.footer}>
            {dataPosts.length > 5 ? (
              <Pagination
                page={currentPage}
                pageSize={5}
                total={totalCount}
                onChange={() => nextPage()}
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
