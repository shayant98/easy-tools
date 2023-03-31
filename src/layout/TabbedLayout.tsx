import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";

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
    <Tabs className="flex flex-col   grow" defaultValue={defaultTab}>
      <TabsList className="self-start shrink">
        {options.map((option) => (
          <TabsTrigger key={`tab-${option.value}`} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent className="grow border-0 flex flex-col p-0" key={`tab-content-${option.value}`} value={option.value}>
          {option.child}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedLayout;
