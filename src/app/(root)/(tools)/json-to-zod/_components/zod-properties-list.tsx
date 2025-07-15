import { Accordion } from "@/components/ui/accordion";
import type { ZodKeyMappedObject } from "@/utils/zod";
import { Reorder } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import ZodPropertiesListItem from "./zod-properties-list-item";

const ZodPropertiesList = ({
	mappedObject,
	setMappedObject,
}: {
	mappedObject: ZodKeyMappedObject[];
	setMappedObject: Dispatch<SetStateAction<ZodKeyMappedObject[]>>;
}) => {
	return (
		<Accordion type="single" collapsible>
			<Reorder.Group
				values={mappedObject}
				onReorder={setMappedObject}
				className="flex flex-col gap-3"
				layoutScroll
			>
				{mappedObject.map((item) => {
					return (
						<ZodPropertiesListItem
							key={item.id}
							item={item}
							setMappedObject={setMappedObject}
						/>
					);
				})}
			</Reorder.Group>
		</Accordion>
	);
};

export default ZodPropertiesList;
