import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="h-full w-full items-center justify-center grow flex">
      <AiOutlineLoading3Quarters size={48} className="animate-spin" />
    </div>
  );
};

export default Loading;
