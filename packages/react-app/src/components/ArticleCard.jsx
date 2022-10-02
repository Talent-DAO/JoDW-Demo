import React from "react";
import { useNavigate } from "react-router-dom";
import articleImg from "../assets/article_img.png";
import authorImg from "../assets/author.png";

const ArticleCard = article => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-4 rounded-lg bg-white space-y-3 shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center cursor-pointer" onClick={() => navigate("/author")}>
          <img alt="author" src={authorImg} width={30} height={30}></img>
          <div className="flex flex-col items-start">
            <div className="pl-2 text-md text-darkgray font-bold">Author James St</div>
            <div className="pl-2 text-md text-darkgray">Oxford Author, Harvard Scholar</div>
          </div>
        </div>
      </div>
      <img
        className="rounded-xl cursor-pointer w-full h-84 bg-cover bg-center"
        src={articleImg}
        alt=""
        onClick={() => navigate("/article")}
      />
      <div className="text-md text-darkgray font-bold text-left">Metaverse, NFT & DEFI, the New Wave</div>
      <div className="border border-darkgray rounded-lg font-bold text-lg w-32 py-2 self-center cursor-pointer">
        VIEW
      </div>
    </div>
  );
};

export default ArticleCard;
