const ImageButton = ({ image, text, onClick, Icon }) => {
  return (
    <div
      className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:text-primary bg-bgred text-primary cursor-pointer justify-center"
      onClick={onClick}
    >
      {image ? <img src={image} className="mx-3 flex-shrink-0 h-3 w-4" /> : <Icon className="w-5 mx-3 h-5" />}
      <span>{text}</span>
    </div>
  );
};

export default ImageButton;
