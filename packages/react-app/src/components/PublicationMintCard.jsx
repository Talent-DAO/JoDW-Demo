/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataURLtoFile } from "../utils/utils";
import authorimg from "../assets/author.png";

const PublicationMintCard = ({ publication }) => {
  const [author, setAuthor] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (publication === undefined || publication === null) return;
    var data = dataURLtoFile(publication?.cover?.data, publication?.cover?.filename);
    setCoverImage(URL.createObjectURL(data));
  }, [publication]);

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
    // todo:
  };

  return (
    <div
      className="rounded-2xl bg-white flex flex-col space-y-4 border-2 border-bordergrey" >
      <img className="rounded-t-2xl w-full h-60" src={coverImage} alt="cover"></img>
      <div className="flex flex-col px-4">

        <div className="text-xl font-bold text-left pb-2 font-mont text-darkblack">{publication?.title}</div>
        <div className="grid grid-rows-2 gap-2 text-left">
          <div className="row-span-1 flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center cursor-pointer " onClick={() => navigate("/author")}>
              {authorImage ? (
                <img alt="author" src={authorImage} width={30} height={30}></img>
              ) : (
                <img alt="author" src={authorimg} width={30} height={30}></img>
              )}
              <div className="pl-2 text-lg text-darkblack">{author?.username}</div>
            </div>
            <p className="font-mont text-darkblack">Dan Eke - 2 weeks ago</p>
          </div>
          <div className="row-span-1">
            <p className="font-mont text-darkblack">12:20 AM . June 22, 2022</p>
          </div>
          {/* <div
          className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => navigate(`/publication/${publication._id}`)}
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

export default PublicationMintCard;
