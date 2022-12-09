const Connections = ({ reviewed, approved, rejected }) => {
  return (
    <div className="bg-white text-lg rounded-lg p-4 divide-y divide-bordergrey">
      <div className="font-bold font-mont pb-4">Connections</div>
      <div className="text-textgrey space-y-4 pt-4">
        {reviewed ? (
          <div className="flex flex-row justify-between items-center">
            <span>Reviewed Same</span>
            <span>{reviewed}</span>
          </div>
        ) : null}
        {approved ? (
          <div className="flex flex-row justify-between items-center">
            <span>Approved Same</span>
            <span>{approved}</span>
          </div>
        ) : null}
        {rejected ? (
          <div className="flex flex-row justify-between items-center">
            <span>Rejected Same</span>
            <span>{rejected}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Connections;
