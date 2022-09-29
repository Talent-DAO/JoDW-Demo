import { notification } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataURLtoFile } from "../utils/utils";
import authorimg from "../assets/author.png";

const ArticleMintCard = ({ article, tx, writeContracts, readContracts, address }) => {
  const [author, setAuthor] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (article === undefined || article === null) return;
    var data = dataURLtoFile(article?.cover?.data, article?.cover?.filename);
    setCoverImage(URL.createObjectURL(data));
  }, [article]);

  useEffect(() => {
    if (!author) return;
    if (author?.authorImage?.data.length === 0 || author?.authorImage?.filename.length === 0) {
      setAuthorImage(null);
    } else {
      var image = dataURLtoFile(author?.authorImage?.data, author?.authorImage?.filename);
      var authorSrc = URL.createObjectURL(image);
      setAuthorImage(authorSrc);
    }
  }, [author]);

  const mintIPNFT = async () => {
    tx(
      writeContracts?.TalentDaoManager?.mintArticleNFT(
        address,
        "https://myipfslocation.com",
        ethers.utils.parseEther("10"),
      ),
      async update => {
        console.log("📡 Transaction Update:", update);
        if (update.status === 1) {
          notification.open({
            message: "Success",
            description: "You have purchased an Article IP NFT 😍",
            icon: "🚀",
          });
          // now to remove the item from this author...
          changeAuthors();
          // need to make sure the Arweave TxId follows the article
        }
      },
    );
  };

  const changeAuthors = async () => {
    //
  };

  return (
    <div
      className="rounded-2xl bg-white flex flex-col space-y-4 border-2 border-lightgrey" >
      <img className="rounded-2xl w-full h-60" src={coverImage} alt="cover"></img>
      <div className="flex flex-col px-4">

        <div className="text-xl font-bold text-left pb-2 font-mont">{article?.title}</div>
        <div className="grid grid-rows-2 gap-2 text-left">
          <div className="row-span-1 flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center cursor-pointer " onClick={() => navigate("/author")}>
              {authorImage ? (
                <img alt="author" src={authorImage} width={30} height={30}></img>
              ) : (
                <img alt="author" src={authorimg} width={30} height={30}></img>
              )}
              <div className="pl-2 text-lg text-darkgray">{author?.username}</div>
            </div>
            <p className="font-mont">Dan Eke. 2 weeks ago</p>
          </div>
          <div className="row-span-1">
            <p className="font-mont">12:20 AM . June 22, 2022</p>
          </div>
          {/* <div
          className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => navigate(`/article/${article._id}`)}
        >
          VIEW
        </div>
        <div
          className="border border-primary py-2 rounded-xl cursor-pointer"
          style={{ backgroundColor: "rgba(180, 28, 46, 0.15)" }}
          onClick={() => mintIPNFT()}
        >
          MINT
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ArticleMintCard;
