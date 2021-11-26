import React, { useState } from "react";
import { Redirect } from "react-router";
import { Result, Button } from "antd";

import "antd/dist/antd.css";

export default function Page404() {
  const [redirect, setRedirect] = useState(false);

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
