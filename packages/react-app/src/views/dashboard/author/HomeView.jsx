import ActionBar from "../../../components/dashboard/ActionBar";
import imageSubmit from "../../../assets/submit.png";
import imageBrowse from "../../../assets/browse.png";
import PublificationView from "./PublificationView";
import Summary from "../../../components/dashboard/Summary";
import TokenStats from "../../../components/dashboard/TokenStats";

const HomeView = () => {
  return (
    <div className="p-6 flex flex-col space-y-4">
      <div className="flex-row space-x-4 hidden md:flex">
        <ActionBar
          title="Submit"
          desc="Make a Submission"
          image={imageSubmit}
          onClick={() => {
            console.log("TIGER");
          }}
        />
        <ActionBar
          title="Browse Publification"
          desc="View publifications"
          image={imageBrowse}
          onClick={() => {
            console.log("TIGER");
          }}
        />
        <ActionBar
          title="View Authors"
          desc="Authors"
          image={[imageBrowse, imageBrowse, imageBrowse]}
          onClick={() => {
            console.log("TIGER");
          }}
        />
      </div>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-6">
          <PublificationView />
        </div>
        <div className="col-span-2 space-y-8">
          <Summary subscribers={10} publifications={45} timesCited={47} noOfComments={69} tipped={6568} />
          <TokenStats talents={43} ethereum={150} nfts={40} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
