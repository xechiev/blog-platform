import React from "react";
import { Pagination } from "antd";

import "antd/dist/antd.css";

import classes from "./Pagin.module.scss";

export default function Pagin(total, num, current, func) {
  return (
    <div className={classes.wrapper}>
      <Pagination
        total={total}
        defaultCurrent={num}
        current={current}
        onChange={(page) => func(page)}
        className={classes.pagination}
      />
    </div>
  );
}
