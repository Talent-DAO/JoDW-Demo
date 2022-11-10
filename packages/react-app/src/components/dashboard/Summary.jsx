const Summary = ({ subscribers, publifications, timesCited, noOfComments, tipped, reviewedPubs, reputationScore, publishedPubs }) => {
  return (
    <div className="bg-white text-lg rounded-lg p-4 divide-y divide-bordergrey">
      <div className="font-bold font-mont pb-4">Summary</div>
      <div className="text-textgrey space-y-4 pt-4">
        {subscribers ? (
          <div className="flex flex-row justify-between">
            <span>Subscribers</span>
            <span>{subscribers}</span>
          </div>
        ) : null}
        {publifications ? (
          <div className="flex flex-row justify-between">
            <span>Publifications</span>
            <span>{publifications}</span>
          </div>
        ) : null}
        {timesCited ? (
          <div className="flex flex-row justify-between">
            <span>Times Cited</span>
            <span>{timesCited}</span>
          </div>
        ) : null}
        {noOfComments ? (
          <div className="flex flex-row justify-between">
            <span>No of comments</span>
            <span>{noOfComments}</span>
          </div>
        ) : null}
        {tipped ? (
          <div className="flex flex-row justify-between">
            <span>$TALENTS Tipped</span>
            <span>{tipped}</span>
          </div>
        ) : null}
        {reviewedPubs ? (
          <div className="flex flex-row justify-between">
            <span>Reviewed Publifications</span>
            <span>{reviewedPubs}</span>
          </div>
        ) : null}
        {reputationScore ? (
          <div className="flex flex-row justify-between">
            <span>Reputation Score</span>
            <span>{reputationScore}</span>
          </div>
        ) : null}
        {publishedPubs ? (
          <div className="flex flex-row justify-between">
            <span>Published Publifications</span>
            <span>{publishedPubs}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Summary;
