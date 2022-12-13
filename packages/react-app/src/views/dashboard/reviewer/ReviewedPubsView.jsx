import { useNavigate } from "react-router-dom";
import Publifications from "../../../components/dashboard/Publifications";
import { ChevronUpIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";


const ReviewedPubsView = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {};

  const noPubsInfo = {
    text: "Browse Publifications to Review",
    desc: "Review a publification",
    onClick: handleSubmit,
  };

  return (
    <div className="bg-white p-6 m-6 rounded-lg">
      <div className="flex flex-row justify-between space-x-2 py-4">
        <div className="flex flex-row space-x-1 items-center cursor-pointer" onClick={() => navigate("/dashboard/reviewer/review")}>
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </div>
        <div className="flex flex-row space-x-6">
          <div className="flex flex-row space-x-2 items-center">
            <input
              id="approved"
              aria-describedby="approved"
              name="approved"
              type="checkbox"
              class="h-4 w-4 rounded border-textgrey text-primary focus:ring-bgred"
            />
            <span>Approved Publification</span>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <input
              id="revised"
              aria-describedby="revised"
              name="revised"
              type="checkbox"
              class="h-4 w-4 rounded border-textgrey text-primary focus:ring-bgred"
            />
            <span>Revised Publification</span>
          </div>
        </div>
      </div>
      <div className="py-4">
        <Publifications pubs={[]} noPubsInfo={noPubsInfo} />
      </div>
      <div className="sm:hidden text-center text-primary flex flex-row p-3 items-center justify-center">
        <span>Load More</span>
        <ChevronUpIcon className="rotate-180 transform h-5 w-5 focus:outline-none" />
      </div>
    </div>
  );
};

export default ReviewedPubsView;
