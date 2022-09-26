import { SiTypescript } from "react-icons/si";

const ToolCard = () => {
  return (
    <div className="flex flex-col items-center rounded bg-gray-900  h-full p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
      <SiTypescript className="text-7xl" />
      <h3 className="text-2xl mt-5">JSON To Typescript</h3>
      <span className="text-sm">Generate Typescript classes from JSON</span>
    </div>
  );
};

export default ToolCard;
