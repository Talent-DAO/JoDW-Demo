import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRightImage from "../assets/ArrowRight.png";
import authorImage from "../assets/author.png";
import lineImage from "../assets/line.png";
import partnershipImage from "../assets/partnership.png";
import { Footer, LatestArticles, Newsletter, Splash } from "../components";
import { GET_LATEST_ARTICLES } from "../graphql/queries/lens";
import { dataURLtoFile, getBgColorForCategory, getTextColorForCategory } from "../utils/utils";

const server = "https://tdao-api.herokuapp.com";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @returns react component
 */
function Home({ address }) {
  const [articles, setArticles] = useState(null);

  const { loadingArticles, loadArticlesError } = useQuery(GET_LATEST_ARTICLES, {
    onCompleted: data => {
      let articleData = data.posts.map(post => {
        return {
          id: post.id,
          author: {
            handle: post.profileId.handle,
            image: post.profileId.imageURI,
            walletId: post.profileId.owner,
          },
          timestamp: post.timestamp,
        };
      });
      setArticles(articleData);
    },
  });

  // Featured Author State
  const [authorName, setAuthorName] = useState("");
  const [authorImageSrc, setAuthorImageSrc] = useState("");
  const [authorAboutme, setAuthorAboutme] = useState("");
  const [authorTwitter, setAuthorTwitter] = useState("");
  const [authorLinkedin, setAuthorLinkedin] = useState("");
  const [authorCategories, setAuthorCategories] = useState([]);
  const [authorWalletId, setAuthorWalletId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${server}/api/authors`);
        if (res.data.success) {
          // randomly choose author just for test
          const length = res.data.data.length;
          // index set for a random author
          const index = Math.floor(Math.random() * length);
          const featuredAuthor = res.data.data[index];

          setAuthorName(featuredAuthor?.username);
          setAuthorAboutme(featuredAuthor?.aboutme);
          setAuthorTwitter(featuredAuthor?.twitter);
          setAuthorLinkedin(featuredAuthor?.linkedin);
          setAuthorCategories(featuredAuthor?.popularCategories);
          setAuthorWalletId(featuredAuthor?.walletId);

          if (featuredAuthor.authorImage.data !== "" && featuredAuthor.authorImage.filename !== "") {
            var file = dataURLtoFile(featuredAuthor?.authorImage?.data, featuredAuthor?.authorImage?.filename);
            var source = URL.createObjectURL(file);
            setAuthorImageSrc(source);
          }
        }
      } catch (e) {
        console.error("Error occurred in useEffect() for api/authors", e);
      }
    };

    init();
  }, [address]);

  return (
    <div>
      <div className="mx-auto pt-4 max-w-xl md:max-w-4xl xl:max-w-7xl overflow-hidden">
        <Splash address={address} />
        <div className="mx-4 flex flex-row items-center pt-6">
          <div className="pr-2">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#D8D8D8" />
              <path
                d="M18 21.3271C22.3386 21.3271 26 22.0403 26 24.792C26 27.5446 22.3146 28.2326 18 28.2326C13.6624 28.2326 10 27.5194 10 24.7677C10 22.015 13.6854 21.3271 18 21.3271ZM18 8C20.9391 8 23.294 10.3814 23.294 13.3526C23.294 16.3238 20.9391 18.7062 18 18.7062C15.0619 18.7062 12.706 16.3238 12.706 13.3526C12.706 10.3814 15.0619 8 18 8Z"
                fill="#B41C2E"
              />
            </svg>
          </div>
          <div className="text-black font-semibold text-2xl">
            Got Talent? <span className="text-primary">Join Us.</span>
          </div>
        </div>

        {/* Latest Articles Component Section */}
        {!loadingArticles && articles ? <LatestArticles articles={articles} /> : <div>Loading...</div>}
        {/* Featured Author & Updates Section  */}
        <div className="pt-16 grid grid-cols-1 xl:grid-cols-2">
          <div className="mx-4 flex flex-col">
            <div className="text-3xl xl:text-4xl font-bold text-left">
              Featured Author
              <img className="pt-2" alt="featured author" src={lineImage}></img>
            </div>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 items-stretch">
              <div
                className="rounded-2xl p-2 mr-0 md:mr-8 ml-0 md:ml-4"
                style={{ boxShadow: "2px 0px 9px rgba(0, 0, 0, 0.15)" }}
              >
                <img
                  src={authorImageSrc}
                  alt="none"
                  className="rounded-xl w-full h-full cursor-pointer"
                  onClick={() => navigate(`/author/${authorWalletId}`)}
                ></img>
              </div>
              <div className="flex flex-col items-start text-left py-2">
                <div className="text-primary text-base hidden md:inline lg:inline">Author</div>
                <div
                  className="pt-2 text-3xl xl:text-4xl font-bold cursor-pointer"
                  onClick={() => navigate(`/author/${authorWalletId}`)}
                >
                  {authorName}
                </div>
                <div className="pt-4 text-base xl:text-sm text-darkgray hidden md:block">{authorAboutme}</div>
                <div className="pt-4 flex flex-wrap items-center text-lg">
                  {authorCategories?.map(category => (
                    <div
                      key={Math.random()}
                      className="cursor-pointer rounded-lg px-3 py-1 mr-4 mb-4"
                      style={{
                        background: getBgColorForCategory(category),
                        color: getTextColorForCategory(category),
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex flex-row items-center text-md">
                  <div
                    className="cursor-pointer rounded-lg text-green px-3 py-1 mr-4"
                    style={{ background: "rgba(60, 188, 0, 0.22)" }}
                  >
                    History
                  </div>
                  <div
                    className="cursor-pointer rounded-lg text-purple px-3 py-1"
                    style={{ background: "rgba(113, 1, 255, 0.22)" }}
                  >
                    Romance
                  </div>
                </div>
                <div className="pt-4 flex flex-row items-center text-md">
                  <div
                    className="rounded-full bg-primary text-white text-md px-8 py-2 cursor-pointer whitespace-nowrap"
                    onClick={() => navigate(`/author/${authorWalletId}`)}
                  >
                    Visit Page
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* DAO Updates: todo: what to post here so it's fresh */}
          <div className="mx-4 mt-4 md:mt-0 flex flex-col">
            <div className="text-3xl xl:text-4xl font-bold text-left">
              DAO Updates
              <img className="pt-2" src={lineImage} alt="DAO Updates"></img>
            </div>
            <div
              className="relative mt-8 rounded-2xl overflow-hidden"
              style={{ boxShadow: "2px 0px 9px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="relative">
                  <img className="w-full h-full" src={partnershipImage} alt="partnershipImage"></img>
                  <div className="absolute bottom-10 left-10">
                    <div className="text-2xl font-bold text-white text-left">TalentDAO partners with Consensys</div>
                  </div>
                </div>
                <div className="p-6 flex flex-col">
                  <div className="text-left text-base xl:text-sm text-darkgray">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in{" "}
                  </div>
                  <div className="flex flex-row justify-between lg:flex-col">
                    <div className="pt-4 flex flex-row items-center text-primary font-semibold text-xl cursor-pointer">
                      <div className="pr-2">Read more</div>
                      <img className="pt-1" src={arrowRightImage} alt="right arrow"></img>
                    </div>
                    <img className="w-8 pt-4" src={authorImage} alt="author"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter Signup Component */}
        <div className="mt-10">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}

export default Home;
