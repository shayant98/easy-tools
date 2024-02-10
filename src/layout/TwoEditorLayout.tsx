import { cn } from "@utils/utils";

const TwoEditorLayout = ({ children, classNameForFirst, classNameForSecond }: TwoEditorLayoutProps) => {
  if (children.length !== 2) {
    throw new Error("TwoEditorLayout requires exactly two children");
  }
  return (
    <div className="flex h-full grow flex-col  gap-x-2 md:flex-row">
      <div className={cn(" grow md:w-1/2", classNameForFirst)}>{children[0]}</div>
      <div className={cn("grow md:w-1/2", classNameForSecond)}>{children[1]} </div>
    </div>
  );
};

interface TwoEditorLayoutProps {
  children: React.ReactNode[];
  classNameForFirst?: string;
  classNameForSecond?: string;
}

export default TwoEditorLayout;
