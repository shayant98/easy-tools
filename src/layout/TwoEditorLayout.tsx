const TwoEditorLayout = ({ children }: TwoEditorLayoutProps) => {
  if (children.length !== 2) {
    throw new Error("TwoEditorLayout requires exactly two children");
  }
  return (
    <div className="flex gap-x-2 grow ">
      <div className="w-1/2 grow">{children[0]}</div>
      <div className=" w-1/2 grow">{children[1]} </div>
    </div>
  );
};

interface TwoEditorLayoutProps {
  children: React.ReactNode[];
}

export default TwoEditorLayout;
