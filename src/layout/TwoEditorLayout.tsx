import { cn } from "@utils/utils";

const TwoEditorLayout = ({ children, classNameForFirst, classNameForSecond }: TwoEditorLayoutProps) => {
  if (children.length !== 2) {
    throw new Error("TwoEditorLayout requires exactly two children");
  }
  return (
    <div className="flex flex-col md:flex-row  gap-x-2 grow">
      <div className={cn(" md:w-1/2 grow", classNameForFirst)}>{children[0]}</div>
      <div className={cn("md:w-1/2 grow", classNameForSecond)}>{children[1]} </div>
    </div>
  );
};

interface TwoEditorLayoutProps {
  children: React.ReactNode[];
  classNameForFirst?: string;
  classNameForSecond?: string;
}

export default TwoEditorLayout;
