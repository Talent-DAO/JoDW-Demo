import { ApolloProvider } from "@apollo/client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/dist/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import store from "../src/app/store";
import App from "./App";
import { ErrorBoundary } from "./components";
import "./index.css";
import { compositeClient } from "./utils/graphqlClient";
import client, { chains } from "./utils/wagmi";

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ApolloProvider client={compositeClient}>
        <WagmiConfig client={client}>
          <RainbowKitProvider chains={chains}>
            <Router>
              <App />
            </Router>
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root"),
);
