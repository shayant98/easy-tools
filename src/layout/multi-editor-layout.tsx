import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";

const MultiEditorLayout = ({ children }: TwoEditorLayoutProps) => {
  return (
    <ResizablePanelGroup autoSaveId="resize-persist" direction="horizontal" className="flex h-full grow flex-col  gap-x-2 md:flex-row">
      {children.map((child, index) => (
        <>
          <ResizablePanel key={`resize-${index}`} defaultSize={100 / children.length} minSize={35} className="grow md:w-1/2">
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
