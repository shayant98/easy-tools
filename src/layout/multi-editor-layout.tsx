import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import { cn } from "@utils/utils";

const MultiEditorLayout = ({ children }: TwoEditorLayoutProps) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex h-full grow flex-col  gap-x-2 md:flex-row">
      {children.map((child, index) => (
        <>
          <ResizablePanel minSize={index * 10} key={index}>
            {child}
          </ResizablePanel>
          {index !== children.length - 1 && <ResizableHandle withHandle />}
        </>
      ))}
    </ResizablePanelGroup>
  );
};

interface TwoEditorLayoutProps {
  children: React.ReactNode[];
}

export default MultiEditorLayout;
