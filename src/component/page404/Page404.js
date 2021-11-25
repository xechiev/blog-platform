import React from "react";
import { useHistory } from "react-router";

import { Result, Button } from "antd";

import "antd/dist/antd.css";

export default function Page404() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/articles");
  };
  return (
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
  );
}
