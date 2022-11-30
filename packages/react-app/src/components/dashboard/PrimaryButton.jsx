const PrimaryButton = ({ text, onClick, Icon }) => {
  return (
    <div className="text-center bg-primary rounded-full text-white px-12 py-3 cursor-pointer flex flex-row items-center justify-center space-x-1" onClick={onClick}>
      {Icon ? <Icon className="w-5 h-5" /> : null}
      <div>{text}</div>
    </div>
  );
};

export default PrimaryButton;
