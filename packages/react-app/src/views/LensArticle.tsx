/* eslint-disable no-undef */
/* eslint-disable no-console */
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import article_back from "../assets/article_back.png";
import author_pro from "../assets/author_pro.png";
import ethereum from "../assets/ethereum.png";
import matic from "../assets/matic.png";
import { SimilarPublicationCard } from "../components";
import { getPublicationDetailsFailure, getPublicationDetailsSuccess } from "../features/publication/publicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { CommentList } from "../components/Comments";
import Title from "antd/lib/typography/Title";
import { usePublicationQuery } from "@jodw/lens";
import { RootState } from "../app/store";
import getPostAsArticle from "../lib/lens/publications/getPostAsArticle";
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
  const [tab, setTab] = useState(tabType.detail);
  const dispatch = useDispatch();

  const { id } = useParams();

  const lensProfile = useSelector((state: RootState) =>
    state.user.user.lensProfile
  );

  const { data: articleData, loading: articleIsLoading, error: articleError } = usePublicationQuery({
    variables: {
      request: {
        publicationId: id,
      },
      reactionRequest: {
        profileId: lensProfile?.id,
      },
      profileId: lensProfile?.id,
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
    if (articleData) {
      dispatch(getPublicationDetailsSuccess(articleData?.publication));
    }
    if (articleError) {
      dispatch(getPublicationDetailsFailure(articleError));
      console.log("error => ", articleError);
    }
  }, [articleData, articleError]);

  useEffect(() => {
    scrollTop();
  }, []);

  const article = articleData && getPostAsArticle(articleData?.publication);

  return (
    <div>
      {!articleIsLoading && article && (
        <div className="p-4 sm:p-8 md:p-10 xl:p-20 overflow-hidden">
          <div className="flex flex-col 2xl:flex-row items-start justify-between text-left space-x-8">
            <div className="pt-4 flex flex-col items-start space-y-4">
              <div className="flex flex-col-reverse lg:flex-col items-start space-y-4">
                <div className="pt-4 text-5xl lg:text-7xl font-bold">{article.title}</div>
                <div className="rounded-full p-2 w-full bg-gray flex flex-row items-center">
                  <img src={article.profile?.picture ? article.profile?.picture : author_pro} className="w-20 rounded-full" alt="author pro"></img>
                  <div className="pl-4 flex flex-col place-content-between">
                    <div className="text-3xl font-bold">{article.profile?.handle}</div>
                    <div className="text-darkgray font-bold text-sm">{"dummy"}</div>
                  </div>
                </div>
              </div>
              <img className="lg:hidden rounded-2xl w-full" src={article_back} alt="article back"></img>
              <div className="lg:hidden text-lg text-left">{article.abstract}</div>
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
                        <div className="text-lg">{dateTimeFormat.format(article.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : tab === tabType.history ? (
                <div className="flex flex-col text-left">
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={article.profile?.picture ? article.profile?.picture : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-textgrey">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={article.profile?.picture ? article.profile?.picture : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-textgrey">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={article.profile?.picture ? article.profile?.picture : author_pro} alt="author pro" width={48} height={48}></img>
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
                    <img className="rounded-full" src={article.profile?.picture ? article.profile?.picture : author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="text-lg text-black">{article.profile?.handle}</div>
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
                <Tooltip title="Like Article">
                  <div
                    className="px-8 py-2 bg-primary text-white text-sm rounded-full cursor-pointer"
                    onClick={e => {
                      console.log("Like clicked", e);
                    }}
                  >
                    <HandThumbUpIcon className="h-6 w-6 text-blue-500" />
                  </div>
                </Tooltip>
                <Tooltip title="Dislike Article">
                  <div
                    className="px-8 py-2 bg-primary text-white text-sm rounded-full cursor-pointer"
                    onClick={e => {
                      console.log("Dislike clicked", e);
                    }}
                  >
                    <HandThumbDownIcon className="h-6 w-6 text-blue-500" />
                  </div>
                </Tooltip>
              </div>
              <div className="">
                <Title>Comments</Title>
                <CommentList comments={[]}/>
              </div>
            </div>
            <div className="hidden 2xl:block mx-auto">
              <img className="rounded-2xl w-full " src={article_back} alt="article back"></img>
            </div>
          </div>

          <div className="hidden lg:block my-8 max-w-screen-lg mx-auto text-lg text-left">
            <a href={article.manuscriptFileURI} target="_blank">{article.manuscriptFileURI}</a>
          </div>
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
