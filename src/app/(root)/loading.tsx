import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className=" w-full px-20">
			<div className="">
				<div className="flex items-center gap-3">
					<Skeleton className="h-8 w-1/4 rounded " />
					<Skeleton className="h-9 w-9 rounded " />
				</div>

				<Skeleton className="mt05 mt-3 mb-5 h-5 w-1/3 rounded" />
			</div>
			<ToolButtons
				first={
					<div className="flex gap-2">
						<Skeleton className="h-9 w-20 rounded " />
						<Skeleton className="h-9 w-20 rounded " />
						<Skeleton className="h-9 w-20 rounded " />
					</div>
				}
				second={
					<div className="flex gap-2">
						<Skeleton className="h-9 w-20 rounded " />
						<Skeleton className="h-9 w-9 rounded " />
						<Skeleton className="h-9 w-9 rounded " />
					</div>
				}
			/>

			<div className="flex gap-2">
				<Skeleton className="w-1/2 rounded" />
				<Skeleton className="h-56 w-1/2 rounded " />
			</div>
		</div>
	);
};

export default Loading;
