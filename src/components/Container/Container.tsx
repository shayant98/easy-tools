const Container = ({ children }: ContainerProps) => {
  return <div className="rounded-md flex flex-col border p-6 h-full border-slate-500 dark:border-slate-700">{children}</div>;
};

interface ContainerProps {
  children: React.ReactNode;
}

export default Container;
