import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAccount, useNetwork } from "wagmi";
import "./App.css";
import { Footer, Navbar } from "./components";
import LensLogin from "./components/lens/LensLogin";
import { fetchUserStart, userWalletUpdated } from "./features/user/userSlice";
import { accountUpdated, chainUpdated } from "./features/web3/web3Slice";
import {
  AboutView,
  AdvancedSearchView, AuthorView,
  ContactView,
  GovernanceView,
  HomeView, LensArticleView, PrivacyPolicyView,
  PublisherView, ReviewerView, SearchView,
  SubgraphView, SubmitLensView, SubmitView, TermsOfServiceView,
  TokenView,
  UserView, WalletConnectModalView
} from "./views";

const App = ({ ...props }) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const dispatch = useDispatch();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuOpen = (state: any) => {
    setUserMenuOpen(state);
  };

  useEffect(() => {
    if (chain)
      dispatch(chainUpdated(chain));
  }, [chain, dispatch]);

  useEffect(() => {
    dispatch<any>(fetchUserStart());
    if (address) {
      dispatch<any>(accountUpdated(address));
      dispatch<any>(userWalletUpdated(address));
    }
  }, [address, dispatch]);

  return (
    <div className="App container-2xl mx-auto">
      <Navbar userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
      {address ? (
        <>
          <Routes>
            <Route index element={<HomeView />} />
            <Route path="lens-login" element={<LensLogin />} />
            <Route path="/browse" />
            <Route path="/about" element={<AboutView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/author/:walletId" element={<AuthorView />} />
            <Route path="/reviewer/:walletId" element={<ReviewerView />} />
            <Route path="/publisher/:walletId" element={<PublisherView />} />
            <Route path="/publication/:id" element={<LensArticleView />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/advancedsearch" element={<AdvancedSearchView />} />
            <Route
              path="/user"
              element={<UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
            >
              <Route
                path="/user/submissions"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/author"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/publications"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/notifications"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/publisher"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/rewards"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/reputation"
                element={
                  <UserView userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
            </Route>
            <Route path="/debug" />
            <Route path="/submit/:walletId" element={<SubmitView />} />
            <Route path="/submit-lens" element={<SubmitLensView />} />
            <Route path="/termsofservice" element={<TermsOfServiceView />} />
            <Route path="/privacypolicy" element={<PrivacyPolicyView />} />
            <Route path="/subgraph" element={<SubgraphView subgraphUri={props.subgraphUri} />} />
            <Route path="/token" element={<TokenView />} />
            <Route path="/governance" element={<GovernanceView />} />
            <Route path="/request-feature" />
          </Routes>
          <Footer />
        </>
      ) : (
        <WalletConnectModalView />
      )}
    </div>
  );
};

export default App;
