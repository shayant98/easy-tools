import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks/use-media-query";

const MultiEditorLayout = ({ children }: TwoEditorLayoutProps) => {
  const isMobile = useMediaQuery("(min-width: 640px)");

  return (
    <ResizablePanelGroup autoSaveId="resize-persist" direction={isMobile ? "horizontal" : "vertical"} className="flex h-full grow flex-col gap-x-2">
      {children.map((child, index) => (
        <div key={`child-${index.toString()}`} className="flex w-full">
          <ResizablePanel key={`resize-${index.toString()}`} defaultSize={100 / children.length} minSize={35} className="h-auto grow md:w-1/2">
            {child}
          </ResizablePanel>
          {index !== children.length - 1 && <ResizableHandle withHandle />}
        </div>
      ))}
    </ResizablePanelGroup>
  );
};

interface TwoEditorLayoutProps {
  children: React.ReactNode[];
}

export default MultiEditorLayout;
