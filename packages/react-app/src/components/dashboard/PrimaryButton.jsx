const PrimaryButton = ({ text, onClick }) => {
  return (
    <div className="text-center bg-primary rounded-full text-white px-12 py-3 cursor-pointer" onClick={onClick}>
      {text}
    </div>
  );
};

export default PrimaryButton;
