import { useState } from "react";
import { useNavigate } from "react-router-dom";
import discord from "../assets/discord-red.png";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import logo from "../assets/talent-logo.png";
import twitter from "../assets/twitter-red.png";

function Footer() {
  const [language, setLanguage] = useState("English");
  const [show, setShow] = useState(false);
  const [talentShow, setTalentShow] = useState(false);
  const [communityShow, setCommunityShow] = useState(false);
  const [communityShow1, setCommunityShow1] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = event => {
    setLanguage(event.target.value);
  };

  return (
    <footer className="mt-14 bg-transparent">
      <div className=" bg-white py-10 flex flex-col space-y-10">
        <div className="flex flex-col lg:flex-row justify-between space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 pb-10 px-10 border-b">
          <img src={logo} alt="logo" className="w-40 h-10"></img>
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 ">
            <div className=" md:w-auto flex flex-col space-y-2">
              <select
                id="select-language"
                name="select-language"
                className="mt-1 block bg-white w-full pl-3 pr-10 py-2 text-md border-2 font-mont font-bold"
                value={language}
                onChange={handleCategoryChange}
              >
                <option value="English" className="font-bold">English</option>
                <option value="French" className="font-bold">French</option>
              </select>
                English
                <div>
                  {show ? (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z" fill="#1F2937" />
                    </svg>
                  ) : (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z" fill="#1F2937" />
                    </svg>
                  )}
                </div>
              </button>
              {show && (
                <div className="absolute w-64 mt-2 px-4 bg-white shadow rounded" id="dropdown">
                  <div className="flex items-center justify-between m-4">
                    <p
                      id="insta3"
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-normal ml-2 text-gray-800"
                    >
                      English
                    </p>
                  </div>
                  <div className="flex items-center justify-between m-4">
                    <p
                      id="insta3"
                      tabIndex="0"
                      className="focus:outline-none text-sm leading-normal ml-2 text-gray-800"
                    >
                      French
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center">
              <img className="mx-2" src={twitter} alt="twitter logo" width={40} height={40} layout="fixed" />
              <img src={discord} alt="discord logo" width={40} height={40} layout="fixed" />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between text-left font-mont max-w-xl md:max-w-4xl lg:max-w-7xl mx-10 lg:mx-auto">
          <div className="hidden lg:flex flex-row space-x-32">
            <div className="flex flex-col space-y-4">
              <div className="text-2xl font-bold pb-4">TALENTDAO</div>
              <div className="text-md font-medium cursor-pointer" onClick={() => navigate("/about")}>
                About
              </div>
              <div
                className="text-md font-medium cursor-pointer whitespace-nowrap"
                onClick={() => navigate("/contact")}
              >
                Contact us
              </div>
              <div className="text-md font-medium cursor-pointer">Subscribe</div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="text-2xl font-bold pb-4">COMMUNITY</div>
              <div className="text-md font-medium cursor-pointer" onClick={() => navigate("/token")}>
                Token
              </div>
              <div className="text-md font-medium cursor-pointer" onClick={() => navigate("/governance")}>
                Governance
              </div>
              <div className="text-md font-medium cursor-pointer" onClick={() => navigate("/suggest-feature")}>
                Suggest feature
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="text-2xl font-bold pb-4">COMMUNITY</div>
              <div className="text-md font-medium cursor-pointer" onClick={() => navigate("/contact")}>
                Contact us
              </div>
              <div className="text-md font-medium cursor-pointer" onClick={() => navigate("/governance")}>
                Join us
              </div>
            </div>
          </div>
          <div className="flex lg:hidden flex-col space-y-4">
            <div className="flex flex-row justify-between items-center" onClick={() => setTalentShow(!talentShow)}>
              <div className="text-xl font-bold font-mont">TALENTDAO</div>
              {talentShow === false ? (
                <img className="w-4" src={plus} alt="plus sign"></img>
              ) : (
                <img className="w-4" src={minus} alt="munus sign"></img>
              )}
            </div>
            {talentShow && (
              <>
                <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate("/about")}>
                  About
                </div>
                <div
                  className="text-lg font-semibold cursor-pointer whitespace-nowrap"
                  onClick={() => navigate("/contact")}
                >
                  Contact us
                </div>
                <div className="text-lg font-semibold cursor-pointer">SUBSCRIBE</div>
              </>
            )}
            <div
              className="flex flex-row justify-between items-center"
              onClick={() => setCommunityShow(!communityShow)}
            >
              <div className="text-xl font-bold">COMMUNITY</div>
              {communityShow === false ? (
                <img className="w-4" src={plus} alt="plus sign"></img>
              ) : (
                <img className="w-4" src={minus} alt="minus sign"></img>
              )}
            </div>
            {communityShow && (
              <>
                <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate("/about")}>
                  About
                </div>
                <div
                  className="text-lg font-semibold cursor-pointer whitespace-nowrap"
                  onClick={() => navigate("/contact")}
                >
                  Contact us
                </div>
                <div className="text-lg font-semibold cursor-pointer">Subscribe</div>
              </>
            )}
            <div
              className="flex flex-row justify-between items-center"
              onClick={() => setCommunityShow1(!communityShow1)}
            >
              <div className="text-xl font-bold">COMMUNITY</div>
              {communityShow1 === false ? (
                <img className="w-4" src={plus} alt="plus sign"></img>
              ) : (
                <img className="w-4" src={minus} alt="minus sign"></img>
              )}
            </div>
            {communityShow1 && (
              <>
                <div
                  className="text-lg font-semibold cursor-pointer whitespace-nowrap"
                  onClick={() => navigate("/contact")}
                >
                  Contact us
                </div>
                <div className="text-lg font-semibold cursor-pointer">Join us</div>
              </>
            )}
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
