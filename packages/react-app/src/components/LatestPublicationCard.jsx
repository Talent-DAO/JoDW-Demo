// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import authorimg from "../assets/author.png";
import etherImage from "../assets/ethereum.png";
import heartImage from "../assets/heart.png";
import talentImage from "../assets/talent.png";
// import { dataURLtoFile } from "../utils/utils";

export const LatestPublicationCard = ({ key, id, publication }) => {
  const navigate = useNavigate();
  const { address } = useAccount();

  return (
    <div key={key} className="flex flex-col justify-center mx-2 my-4">
      <div className="rounded-2xl shadow-lg max-w-sm p-4" style={{ background: "#F1F1F1" }}>
        <a href="#!">
          {publication.authorimg && (
            <img
              className="rounded-xl cursor-pointer w-full h-32 bg-cover bg-center"
              src={publication.authorimg}
              alt=""
              onClick={() => navigate("/publication/" + id)}
            />
          )}
        </a>
        <div className="pt-4 flex flex-col">
          <div className="h-10 flex flex-row justify-between items-start">
            <div className="text-xl text-left font-bold cursor-pointer" onClick={() => navigate("/publication/" + id)}>
              {publication && publication.content.name}
            </div>
            <div className="flex flex-row items-center">
              <img src={talentImage} className="-mr-2" alt="talent"></img>
              <img src={etherImage} alt="ethereum"></img>
            </div>
          </div>
          <div className="pt-8 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center cursor-pointer" onClick={() => navigate("/author/" + address)}>
              {publication.author.image ? (
                <img alt="author" src={publication.author.image} width={30} height={30}></img>
              ) : (
                <img alt="author" src={authorimg} width={30} height={30}></img>
              )}
              <div className="pl-2 text-lg text-darkgray">{publication?.author.handle}</div>
            </div>
            <img src={heartImage} alt="heart"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPublicationCard;
