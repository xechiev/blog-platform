import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Result, Button } from "antd";
import { loggedIn } from "../../redux/actions/actions";

import "antd/dist/antd.css";

export default function Page404() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedIn(true));
    }
  }, [dispatch]);

  const handleClick = () => {
    setRedirect(true);
  };
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Button type="primary" onClick={handleClick}>
            Back Home
          </Button>
        )}
      />
      {redirect && <Redirect to="/" />}
    </>
  );
}
