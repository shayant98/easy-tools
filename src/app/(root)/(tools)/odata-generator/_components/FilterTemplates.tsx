"use client";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle } from "lucide-react";
import { useMemo } from "react";

const FilterTemplates = ({ onClick }: { onClick: (type: string) => void }) => {
	const tempaltes = useMemo(
		() => [
			{
				name: "Default",
				type: "default",
			},
		],
		[],
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button>
					<PlusCircle className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="grid gap-4">
				<div className="space-y-2">
					<h4 className="font-medium leading-none">Properties</h4>
					<p className="text-slate-500 text-sm dark:text-slate-400">
						Choose one of the predefined templates to get started
					</p>
				</div>
				<div className="flex flex-col gap-2">
					{tempaltes.map((template) => (
						<Button
							key={`filter-temp-${template.type}`}
							onClick={() => onClick(template.type)}
							variant={"default"}
						>
							{template.name}
						</Button>
					))}

					{/* <Button onClick={() => addFilter("date-between")} variant={"default"} >
                            Date between
                          </Button> */}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default FilterTemplates;
