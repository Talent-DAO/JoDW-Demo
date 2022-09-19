import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";

const highlight = {
  marginLeft: 4,
  marginRight: 8,
  padding: 4,
  borderRadius: 4,
  fontWeight: "bolder",
};

function Subgraph({ subgraphUri }) {
  function graphQLFetcher(graphQLParams) {
    return fetch(subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const GET_TRANSACTION_BY_ID = `
    query {
      transactions(ids: ["fOI7gtDPUF5dWj_67shRx5r1YDRT5YOdcvPiNquQSaQ"]) {
        edges {
          node {
            id
            anchor
            tags {
              name
              value
            }
            data {
              size
              type
            }
            quantity {
              winston
              ar
            }
          }
        }
      }
    }
  `;

  const [networkInfo, setNetworkInfo] = useState();
  let request = require("request");
  let options = {
    method: "GET",
    url: "https://arweave.net/info",
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
    }
    console.log("Arweave network height is: ", body);
    setNetworkInfo(body);
  });

  return (
    <>
      <div style={{ margin: "auto", paddingBottom: 64 }}>
        <div style={{ margin: 32, height: 600, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={GET_TRANSACTION_BY_ID} />
        </div>
      </div>

      <div style={{ padding: 64, ...highlight }}>{networkInfo}</div>
    </>
  );
}

export default Subgraph;
