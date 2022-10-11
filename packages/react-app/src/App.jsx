import "antd/dist/antd.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAccount } from "wagmi";
import "./App.css";
import { Navbar, Footer } from "./components";
import {
  AboutView,
  AdvancedSearchView,
  ArticleView,
  AuthorDashboard,
  AuthorView,
  ContactView,
  GovernanceView,
  HomeView,
  PrivacyPolicyView,
  PublisherView,
  SearchView,
  SubgraphView,
  SubmitView,
  TermsOfServiceView,
  TokenView,
  UserView,
  ReviewerView,
  WalletConnectModalView,
} from "./views";

const App = ({ ...props }) => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardApp {...props} />} />
      <Route path="/*" element={<Website {...props} />} />
    </Routes>
  );
};

const DashboardApp = ({ ...props }) => {
  return (
    <Routes>
      <Route path="/author" element={<AuthorDashboard />} />
      <Route path="/reviewer" element={<AuthorDashboard />} />
      <Route path="/publisher" element={<AuthorDashboard />} />
    </Routes>
  );
};

const Website = ({ ...props }) => {
  const { address } = useAccount();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuOpen = state => {
    setUserMenuOpen(state);
  };

  return (
    <div className="App container-2xl mx-auto">
      <Navbar userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
      {address ? (
        <>
          <Routes>
            <Route index element={<HomeView address={address} />} />
            <Route path="/browse" />
            <Route path="/about" element={<AboutView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/author/:walletId" element={<AuthorView address={address} />} />
            <Route path="/reviewer/:walletId" element={<ReviewerView address={address} />} />
            <Route path="/publisher/:walletId" element={<PublisherView address={address} />} />
            <Route path="/article/:id" element={<ArticleView address={address} />} />
            <Route path="/search" element={<SearchView address={address} />} />
            <Route path="/advancedsearch" element={<AdvancedSearchView address={address} />} />
            <Route
              path="/user"
              element={
                <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
              }
            >
              <Route
                path="/user/submissions"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/author"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/articles"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/notifications"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/publisher"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/rewards"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
              <Route
                path="/user/reputation"
                element={
                  <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
                }
              />
            </Route>
            <Route path="/debug" />
            <Route path="/submit/:walletId" element={<SubmitView address={address} />} />
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
