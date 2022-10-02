/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContractWrite } from "wagmi";
import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twitter.png";
import followImage from "../assets/add.png";
import emailImage from "../assets/email.png";
import arrowRightImage from "../assets/arrow.png";
import verifiedImage from "../assets/verified.png";
import infoImage from "../assets/info.png";
import { ArticleMintCard, Footer } from "../components";
import { dataURLtoFile, getAuthorData } from "../utils/utils";
import MessageModal from "../components/MessageModal";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const server = "https://tdao-api.herokuapp.com";

const Reviewer = ({ tx, readContracts, writeContracts, address }) => {
  const navigate = useNavigate();
  const { walletId } = useParams();
  const [author, setAuthor] = useState(null);
  const [articles, setArticles] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [memberSince, setMemberSince] = useState(0);
  const [readers, setReaders] = useState([]);
  const [timesCited, setTimesCited] = useState(0);
  const [tipDropDown, setTipDropDown] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [token, setToken] = useState("ETH");
  const [loading, setLoading] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const handleSubmitMessage = ({title, message}) => {
    console.log('Message modal submit: ', title, message);
  };

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
  }

  const scrollTop = () => {
    document.documentElement.scrollTo({
      // @ts-ignore
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollTop();
  }, []);

  const getArticles = async () => {
    try {
      const params = new URLSearchParams([["walletId", walletId]]);
      const articleResponse = await axios.get(server + "/api/articles", { params });
      if (articleResponse.data.success) {
        setArticles(articleResponse.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubscribeChange = () => {
    let list = [...readers];
    if (list.includes(walletId)) {
      list.forEach((element, index, object) => {
        if (element === walletId) {
          object.splice(index, 1);
        }
      });
    } else {
      list.push(walletId);
    }

    setReaders(list);
  };

  useEffect(async () => {
    if (walletId === undefined || walletId === "") return;
    const params = new URLSearchParams([["walletId", walletId]]);
    const data = await getAuthorData(params);
    setAuthor(data);
    getArticles();
  }, [walletId]);

  useEffect(async () => {
    if (author === undefined || author === null) return;
    const cover =
      author?.coverImage?.data !== "" ? dataURLtoFile(author?.coverImage?.data, author?.coverImage?.filename) : "";
    const image = author?.authorImage?.data
      ? dataURLtoFile(author?.authorImage?.data, author?.authorImage?.filename)
      : "";
    setCoverImage(cover !== "" ? URL.createObjectURL(cover) : null);
    setAuthorImage(image !== "" ? URL.createObjectURL(image) : null);

    const date = new Date(author.createdAt);
    const today = new Date();
    const diff = parseInt((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    setMemberSince(diff);

    let list = [];
    if (!author?.readers.includes(",")) {
      if (author.readers !== "") list.push(author.readers);
    } else {
      list = author.readers.split(",");
      list.forEach((element, index, object) => {
        if (element === "") object.splice(index, 1);
      });
    }

    setReaders(list);
    setTimesCited(author.times_cited);
  }, [author]);

  useEffect(async () => {
    try {
      const res = await axios.put(server + "/api/author_readers", {
        walletId: walletId,
        readers: readers.join(","),
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  }, [readers]);

  useEffect(() => {
    putTimesCited();
  }, [timesCited]);

  const putTimesCited = async () => {
    const times = timesCited + 1;
    try {
      const res = await axios.put(server + "/api/author_times", {
        walletId: walletId,
        timesCited: times,
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!tipDropDown) return;
  }, [tipDropDown]);

  // Set up the contract values

  // Contract interactions
  const { write: tipAuthor, isLoading, isSuccess } = useContractWrite({
    addressOrName: "",
    contractInterface: [],
    functionName: "",
  });

  return (
    <>
      {author && articles && (
        <div style={{ backgroundColor: "#FAFAFA" }} >
          <div className="mx-auto pt-4 max-w-xl md:max-w-4xl xl:max-w-7xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              <div className="col-span-2 space-y-8">
                <div className="rounded-2xl flex flex-col bg-white border border-lightgrey">
                  <img src={coverImage} alt="article cover" className="rounded-2xl w-full h-80 bg-gray"></img>
                  <div className="flex flex-col px-12 pb-12 space-y-8">
                    <div className="flex flex-col md:flex-row items-center md:justify-between">
                      <img
                        src={authorImage}
                        alt="the author"
                        className="rounded-full outline-white bg-white border-4 border-white w-28 lg:w-48 h-28 lg:h-48 -mt-14 lg:-mt-28"
                        style={{ outlineStyle: "solid", outlineWidth: "4px", outlineOffset: "0" }}
                      />
                      <div className="mt-6 pt-4 lg:pt-0 flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
                        <div
                          className="w-32 py-3 rounded-full bg-primary text-white font-semibold flex flex-row items-center justify-center cursor-pointer font-mont"
                          onClick={() => handleSubscribeChange()}
                        >
                          <img className="pr-1" src={followImage} />
                          Follow
                        </div>
                        <div
                          className="flex flex-row w-32 py-3 rounded-full cursor-pointer text-primary font-semibold font-mont justify-center border border-primary"
                          style={{ backgroundColor: "rgba(180, 28, 46, 0.15)" }}
                          onClick={e => {
                            setTipDropDown(!tipDropDown);
                            setMessageModalOpen(true);
                          }}
                        >
                          <img className="pr-1" src={emailImage} />
                          Message
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full space-y-4">
                      <div className="flex flex-col text-center lg:text-left">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row text-4xl font-bold self-start">
                            {author.username}
                            {/* <div className="ml-2">
                              <img src={verifiedImage} />
                            </div> */}
                          </div>
                          <div className="flex flex-row items-center space-x-4 self-start">
                            <div className="cursor-pointer">
                              <img src={twitter} width={40} alt="twitter"></img>
                            </div>
                            <div className="cursor-pointer">
                              <img src={linkedin} width={40} alt="linkedin"></img>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg text-center lg:text-left" style={{ color: "#909090" }}>{author.bio}</div>
                      <div className="flex flex-row space-x-3">
                        <div
                          className="rounded-lg px-6 py-2 text-green font-mont"
                          style={{ backgroundColor: "rgba(60, 188, 0, 0.22)" }}
                        >
                          History
                        </div>
                        <div
                          className="rounded-lg px-6 py-2 text-purple font-mont"
                          style={{ backgroundColor: "rgba(113, 1, 255, 0.22)" }}
                        >
                          Romance
                        </div>
                        <div
                          className="rounded-lg px-6 py-2 text-cyan font-mont"
                          style={{ backgroundColor: "rgba(0, 130, 114, 0.22)" }}
                        >
                          Nature
                        </div>
                        <div className="rounded-lg px-6 py-2 text-red font-mont" style={{ backgroundColor: "rgba(255, 1, 1, 0.22)" }}>
                          Sci-Fi
                        </div>
                      </div>
                    </div>

                    <div className="w-full space-x-8">
                      <div className="col-span-6 text-left rounded-xl py-4 flex flex-col space-y-2">
                        <div className="text-lg font-bold font-mont">Summary</div>
                        <div className="text-lg" style={{ color: "#909090" }}>
                          {author.aboutme}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl flex flex-col bg-white border border-lightgrey p-12 space-y-6">
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl font-bold font-mont">Reviewed Publification</div>
                    {articles.length > 5 && (
                      <div className="flex flex-row rounded-2xl text-lg items-center text-primary font-semibold cursor-pointer space-x-2">
                        <span>See all</span>
                        <img src={arrowRightImage} alt="right arrow"></img>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
                    {articles.map((article, index) => (
                      <ArticleMintCard
                        key={index}
                        article={article}
                        tx={tx}
                        writeContracts={writeContracts}
                        readContracts={readContracts}
                        address={address}
                      ></ArticleMintCard>
                    ))} 
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col bg-white rounded-2xl px-8 py-10 border border-lavender space-y-4 font-mont">
                    <div className="flex justify-between">
                      <div className="text-darkgrey">Total Reviewed</div>
                      <div className="text-darkgray">24</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-darkgrey">Approved</div>
                      <div className="text-darkgray">20</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-darkgrey">Revised</div>
                      <div className="text-darkgray">20</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-darkgrey">Followers</div>
                      <div className="text-darkgray">11</div>
                    </div>
                  </div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-2xl bg-white px-8 py-3 text-left text-lg font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 border border-lavender items-center">
                          <span className="font-mont font-bold">Rewards</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-purple-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col bg-white border border-lavender rounded-b-2xl px-8 py-10 text-sm text-darkgrey space-y-6">
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row text-darkgrey font-mont items-center space-x-1">
                              <span>
                                Staking Rewards
                              </span>
                              <div className="cursor-pointer">
                                <img src={infoImage}/>
                              </div>
                            </div>
                            <div className="text-darkgray font-bold font-mont">40,000 TALENT</div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row text-darkgrey font-mont items-center space-x-1">
                              <span>
                                Delegate rewards
                              </span>
                              <div className="cursor-pointer">
                                <img src={infoImage}/>
                              </div>
                            </div>
                            <div className="text-darkgray font-bold font-mont">10,000 TALENT</div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row text-darkgrey font-mont items-center space-x-1">
                              <span>
                                TALENT Earnings
                              </span>
                              <div className="cursor-pointer">
                                <img src={infoImage}/>
                              </div>
                            </div>
                            <div className="text-darkgray font-bold font-mont">42,000 TALENT</div>
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row text-darkgrey font-mont items-center space-x-1">
                              <span>
                                Estimated rewards
                              </span>
                              <div className="cursor-pointer">
                                <img src={infoImage}/>
                              </div>
                            </div>
                            <div className="text-darkgray font-bold font-mont">42,000 TALENT</div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-2xl bg-white px-8 py-3 text-left text-lg font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 border border-lavender items-center">
                          <span className="font-mont font-bold">Reputation</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-purple-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col bg-white border border-lavender rounded-b-2xl px-8 py-10 text-sm text-darkgrey space-y-6">
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row text-darkgrey font-mont items-center space-x-1">
                              <span>
                                Reputation Score
                              </span>
                              <div className="cursor-pointer">
                                <img src={infoImage}/>
                              </div>
                            </div>
                            <div className="text-darkgray font-bold font-mont">75%</div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
            <div className="mx-4 md:mx-0">
              <Footer></Footer>
            </div>
            <MessageModal open={messageModalOpen} onClose={handleCloseMessageModal} onSubmit={handleSubmitMessage} withTitle={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Reviewer;
