import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import discord from "../assets/discord.png";
import menuIconImage from "../assets/menu_icon.png";
import profile from "../assets/profile.png";
import logo from "../assets/talent-logo.png";
import twitterImg from "../assets/twitter.png";
import { getAuthorData } from "../utils/utils";
import CustomConnectButton from "./CustomConnectButton";

function Navbar({ userMenuOpen, handleUserMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { address } = useAccount();

  const [show, setShow] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(userMenuOpen);
  const [twitter, setTwitter] = useState("");

  const goToPage = locationPath => {
    setShow(false);
    setNavPanelOpen(false);
    navigate(locationPath);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
    handleUserMenuOpen(true);
  };

  const handleBrowseByAuthor = () => {
    goToPage("/browse");
  };

  const handleBrowseBySubject = () => {
    goToPage("/browse");
  };

  useEffect(() => {
    if (address === undefined || address === "") return;
    const params = new URLSearchParams([["walletId", address]]);
    const data = getAuthorData(params);
    if (data !== null) {
      setTwitter(data.twitter);
    }
  }, [address]);

  return (
    <div
      className="relative bg-white border-b"
      style={{ position: "sticky", top: "0", zIndex: "2", borderColor: "#c1c1c1" }}
    >
      <nav className="mx-4 sm:mx-8 md:mx-10 xl:mx-20 flex flex-row items-center justify-between">
        <div className="flex items-center py-5">
          <img
            className="cursor-pointer"
            src={logo}
            alt="Talent DAO Logo"
            layout="fixed"
            onClick={() => goToPage("/")}
          />
        </div>
        <div className="hidden xl:flex items-center justify-center font-mont">
          <div className="flex items-center space-x-12">
            <div
              onClick={() => goToPage("/")}
              className={
                location.pathname === "/"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer font-medium"
              }
            >
              Home
            </div>
            <div
              onClick={() => goToPage("/about")}
              className={
                location.pathname === "/about"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer font-medium"
              }
            >
              About
            </div>
            <div
              onClick={() => goToPage("/contact")}
              className={
                location.pathname === "/contact"
                  ? "text-lg text-primary font-semibold cursor-pointer whitespace-nowrap"
                  : "text-lg whitespace-nowrap cursor-pointer font-medium"
              }
            >
              Contact Us
            </div>
            <div className="relative">
              <div
                className={
                  location.pathname === "/browse"
                    ? "text-lg text-primary font-semibold cursor-pointer"
                    : "text-lg cursor-pointer font-medium"
                }
                onClick={() => setShow(!show)}
              >
                Browse
              </div>
              {show && (
                <div
                  className="origin-top-right absolute left-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <div
                      className="text-darkgray block px-4 py-2 text-sm hover:bg-bggrey"
                      onClick={handleBrowseByAuthor}
                    >
                      Browse by Author
                    </div>
                    <div
                      className="text-darkgray block px-4 py-2 text-sm hover:bg-bggrey whitespace-nowrap"
                      onClick={handleBrowseBySubject}
                    >
                      Browse by Subject
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-end space-x-4">
          <div className="flex space-x-8">
            <img
              onClick={() => goToPage("/user/author")}
              className="cursor-pointer"
              src={profile}
              alt="profile icon"
              width={40}
              height={40}
              layout="fixed"
            />
          </div>
          <CustomConnectButton />
        </div>
        <div className="xl:hidden" onClick={() => setNavPanelOpen(!navPanelOpen)}>
          <img src={menuIconImage} alt="menu icon" width={40} height={40} layout="fixed" />
        </div>
      </nav>

      {navPanelOpen && (
        <div className="absolute top-25 w-full h-screen bg-white flex flex-col py-4 px-4 sm:px-8">
          <div className="flex flex-col space-y-4 items-center text-center">
            <div
              onClick={() => goToPage("/")}
              className={
                location.pathname === "/"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              HOME
            </div>
            <div
              onClick={() => goToPage("/about")}
              className={
                location.pathname === "/about"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              ABOUT
            </div>
            <div
              onClick={() => goToPage("/contact")}
              className={
                location.pathname === "/contact"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              CONTACT US
            </div>
            <div
              onClick={() => goToPage("/browse")}
              className={
                location.pathname === "/browse"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              BROWSE
            </div>
            <div className="flex flex-row items-center space-x-4">
              <a href={twitter}>
                <img src={twitterImg} alt="twitter logo" width={40} height={40} layout="fixed" />
              </a>
              <img className="cursor-pointer" src={discord} alt="discord logo" width={40} height={40} layout="fixed" />
              <img
                onClick={() => goToPage("/user/author")}
                className="cursor-pointer"
                src={profile}
                alt="profile icon"
                width={40}
                height={40}
                layout="fixed"
              />
            </div>
            <CustomConnectButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
