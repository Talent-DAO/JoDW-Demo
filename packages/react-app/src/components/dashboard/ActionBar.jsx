const ActionBar = ({ image, title, desc, onClick }) => {
  return (
    <div className="flex flex-row bg-white rounded-xl p-4 space-x-4 items-center shadow-xl">
      {Array.isArray(image) ? (
        <div className="flex pr-4">
          {image.map(src => {
            return <img src={src} className="-mr-6 border-white rounded-full border-2" />;
          })}
        </div>
      ) : (
        <img src={image} className="border border-white rounded-full border-4" />
      )}
      <div className="flex flex-col">
        <span className="text-textgrey font-mont">{desc}</span>
        <a className="text-black text-lg font-bold font-mont" onClick={onClick}>
          {title}
        </a>
      </div>
    </div>
  );
};

export default ActionBar;
