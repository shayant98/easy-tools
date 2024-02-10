import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

interface TabbedLayoutProps {
  defaultTab?: string;
  options: {
    value: string;
    label: string;
    child: React.ReactNode;
  }[];
}

const TabbedLayout = ({ options, defaultTab }: TabbedLayoutProps) => {
  return (
    <Tabs className="flex grow   flex-col" defaultValue={defaultTab}>
      <TabsList className="shrink self-start">
        {options.map((option) => (
          <TabsTrigger key={`tab-${option.value}`} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent className="flex grow flex-col border-0 p-0" key={`tab-content-${option.value}`} value={option.value}>
          {option.child}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedLayout;
