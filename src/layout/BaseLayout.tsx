const BaseLayout = ({ children, title, desc }: BaseLayoutProps) => {
  return (
    <>
      <div className=" pb-5">
        <h1 className="scroll-m-20 text-slate-800 dark:text-slate-100 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
        {desc && (
          <div className="p-2 rounded-md border text-slate-800 dark:text-slate-100 border-slate-400 bg-slate-100 dark:border-slate-800 dark:bg-slate-700 mt-2">
            <p className="text-slate-800 dark:text-slate-100 text-lg ">{desc}</p>
          </div>
        )}
      </div>
      <div className="grow flex flex-col">{children}</div>
    </>
  );
};

interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
  showBackButton?: boolean;
  title?: string;
  desc?: string;
}

export default BaseLayout;
