/* eslint-disable no-undef */
/* eslint-disable no-console */
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import { QueryResult, useQuery } from "@apollo/client";
import article_back from "../assets/article_back.png";
import author_pro from "../assets/author_pro.png";
import ethereum from "../assets/ethereum.png";
import matic from "../assets/matic.png";
import { SimilarPublicationCard } from "../components";
import { GET_ARTICLE_DETAILS } from "../graphql/queries/lens";
import { getLensArticleData } from "../helpers/graphql/articles";
import { useAccount } from "wagmi";
pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

type TTabType = {
  detail: string;
  history: string;
  author: string;
}

const tabType: TTabType = {
  detail: "details",
  history: "history",
  author: "authors",
};

const dateTimeFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const LensArticle = () => {
  const { address } = useAccount();
  const [tab, setTab] = useState(tabType.detail);
  const [article, setArticle] = useState<any>(null);
  const [author, setAuthor] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);

  const { id } = useParams();

  const { loadingArticle }: any = useQuery(GET_ARTICLE_DETAILS, {
    variables: { id },
    onError: error => {
      // dispatch(getPublicationDetailsFailure(error));
      console.log("error => ", error);
    },
    onCompleted: data => {
      getLensArticleData(data.post)
        .then((artdata) => {
          console.log(artdata);
          setArticle(artdata);
        });
      // dispatch(getPublicationDetailsSuccess(data.post));
    },
  });

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

  return (
    <div>
      {!loadingArticle && article && (
        <div className="p-4 sm:p-8 md:p-10 xl:p-20 overflow-hidden">
          <div className="flex flex-col 2xl:flex-row items-start justify-between text-left space-x-8">
            <div className="pt-4 flex flex-col items-start space-y-4">
              <div className="flex flex-col-reverse lg:flex-col items-start space-y-4">
                <div className="pt-4 text-5xl lg:text-7xl font-bold">{article.content.name}</div>
                <div className="rounded-full p-2 w-full bg-gray flex flex-row items-center">
                  <img src={article.author.image ? article.author.image : author_pro} className="w-20 rounded-full" alt="author pro"></img>
                  <div className="pl-4 flex flex-col place-content-between">
                    <div className="text-3xl font-bold">{article.author.handle}</div>
                    <div className="text-darkgray font-bold text-sm">{"dummy"}</div>
                  </div>
                </div>
              </div>
              <img className="lg:hidden rounded-2xl w-full" src={article_back} alt="article back"></img>
              <div className="lg:hidden text-lg text-left">{article.content.content}</div>
              <div className="lg:hidden text-primary text-left font-bold">Read more</div>
              <div className="border-b w-full border-gray">
                <ul className="flex cursor-pointer font-bold mb-0">
                  <li
                    className={
                      tab === tabType.detail
                        ? "py-2 px-6 rounded-t-lg border-b-2 border-primary"
                        : "py-2 px-6 rounded-t-lg"
                    }
                    onClick={() => setTab(tabType.detail)}
                  >
                    Details
                  </li>
                  <li
                    className={
                      tab === tabType.history
                        ? "py-2 px-6 rounded-t-lg border-b-2 border-primary"
                        : "py-2 px-6 rounded-t-lg"
                    }
                    onClick={() => setTab(tabType.history)}
                  >
                    History
                  </li>
                  <li
                    className={
                      tab === tabType.author
                        ? "py-2 px-6 rounded-t-lg border-b-2 border-primary"
                        : "py-2 px-6 rounded-t-lg"
                    }
                    onClick={() => setTab(tabType.author)}
                  >
                    Authors
                  </li>
                </ul>
              </div>
              {tab === tabType.detail ? (
                <div className="w-full border-b border-gray pb-4 flex flex-col space-y-4">
                  <div className="flex flex-col space-y-4">
                    <div className="text-lg text-darkgray">Blockchain</div>
                    <div className="flex flex-row items-center space-x-4">
                      <div className="rounded-full p-1 bg-gray flex flex-row items-center cursor-pointer">
                        <img src={matic} width={26} height={26} alt="matic"></img>
                        <div className="pl-2 text-lg">Matic (Polygon)</div>
                      </div>
                      <div className="rounded-full p-1 bg-gray flex flex-row items-center cursor-pointer">
                        <img src={ethereum} width={26} height={26} alt="ethereum"></img>
                        <div className="pl-2 text-lg">Ethereum</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="text-lg text-darkgray">Dated</div>
                    <div className="flex flex-row items-center">
                      <div className="rounded-full px-4 py-1 bg-gray flex flex-row items-center">
                        <div className="text-lg">{dateTimeFormat.format(new Date(parseInt(article.timestamp) * 1000))}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : tab === tabType.history ? (
                <div className="flex flex-col text-left">
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={article.author.image ? article.author.image : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-textgrey">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={article.author.image ? article.author.image : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-textgrey">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={article.author.image ? article.author.image : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-textgrey">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-left">
                  <div className="py-4 flex flex-row items-center text-gray space-x-4 cursor-pointer">
                    <img className="rounded-full" src={article.author.image ? article.author.image : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="text-lg text-black">{article.author.handle}</div>
                  </div>
                </div>
              )}
              <div className="flex flex-row items-center space-x-4">
                <Tooltip title="Export Article">
                  <div
                    className="px-8 py-2 bg-primary text-white text-sm rounded-full cursor-pointer"
                    onClick={e => {
                      console.log("Export clicked: ", e);
                    }}
                  >
                    EXPORT
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="hidden 2xl:block mx-auto">
              <img className="rounded-2xl w-full " src={article_back} alt="article back"></img>
            </div>
          </div>

          <div className="hidden lg:block my-8 max-w-screen-lg mx-auto text-lg text-left">{article.content.content}</div>
          <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <SimilarPublicationCard />
            <SimilarPublicationCard />
            <SimilarPublicationCard />
          </div>
        </div>
      )}
    </div>
  );

};

export default LensArticle;
