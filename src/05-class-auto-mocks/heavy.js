import React, { useEffect, useState } from "react";
import { Fetcher } from "./fetcher";

const fetcher = new Fetcher();

export const Heavy = ({ endpoint }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetcher
      .fetch(endpoint)
      .then(async (response) => {
        setData(await response.text());
      })
      .catch((error) => {
        setData(new Error(error));
      });
  }, []);

  return data ? <div>Done: {data}</div> : <div>loading...</div>;
};
