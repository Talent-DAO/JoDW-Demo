import NoPublification from "./NoPublification";
import SubmissionCard from "../SubmissionCard";

const Publifications = ({ pubs, noPubsInfo }) => {
  return (
    <div>
      <div>
        {pubs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            <SubmissionCard />
            <SubmissionCard />
            <SubmissionCard />
            <SubmissionCard />
            <SubmissionCard />
            <SubmissionCard />
            <SubmissionCard />
            <SubmissionCard />
          </div>
        ) : (
          <NoPublification noPubsInfo={noPubsInfo} />
        )}
      </div>
    </div>
  );
};

export default Publifications;
