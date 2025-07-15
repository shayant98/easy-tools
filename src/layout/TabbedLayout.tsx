import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
		<Tabs className="flex flex-col" defaultValue={defaultTab}>
			<TabsList className="w-min">
				{options.map((option) => (
					<TabsTrigger key={`tab-${option.value}`} value={option.value}>
						{option.label}
					</TabsTrigger>
				))}
			</TabsList>
			<div className="mt-10">
				{options.map((option) => (
					<TabsContent key={`tab-content-${option.value}`} value={option.value}>
						{option.child}
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
};

export default TabbedLayout;
