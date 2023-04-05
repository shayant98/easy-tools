import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="grow items-center  text-center justify-center w-full">
      <AiOutlineLoading3Quarters className="animate-spin w-full " size={300} />
    </div>
  );
};

export default Loading;
