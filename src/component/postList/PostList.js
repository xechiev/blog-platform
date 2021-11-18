import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import Post from "../post/Post";

import Pagin from "../pagin/Pagin";
import { getPostsData } from "../../redux/asyncActions/asyncActions";
import { loggedIn } from "../../redux/actions/actions";
import classes from "./PostList.module.scss";

const PostList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const { dataPosts, totalCount, currentPage } = state;
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const userInfo = localStorage.getItem("user");
      const info = JSON.parse(userInfo);
      const { token } = info;
      dispatch(getPostsData(token, currentPage));
      dispatch(loggedIn(true));
    } else {
      dispatch(getPostsData());
    }
  }, [dataPosts.length, curPage]);

  const onChange = (p) => {
    setCurPage(p * 5 - 5);
  };
  return (
    <div className={classes.wrapper}>
      <ul className={classes.postList}>
        {dataPosts.map((post) => (
          <li className={classes.post} key={Math.random()}>
            <Post {...post} />
          </li>
        ))}
      </ul>
      {/* {totalCount >= 5 ? Pagin(totalCount, 1, currentPage, onChange) : " "} */}
      <Pagination
        current={currentPage}
        pageSize={5}
        total={totalCount}
        onChange={(page) => {
          const updated_offset = page * 5 - 5;
          // set_offset(page, updated_offset);
        }}
      />
    </div>
  );
};

export default PostList;
