import { cn } from "@/lib/utils";
import { AlertOctagon } from "lucide-react";
import { useState } from "react";

const Container = ({
	children,
	errorMessage,
	className,
	style,
}: ContainerProps) => {
	const [showFullError, setshowFullError] = useState(false);
	return (
		<div
			style={style}
			className={cn(
				className,
				"relative h-full overflow-auto rounded-md border border-slate-500 p-1 md:p-6 dark:border-slate-700",
			)}
		>
			{children}
			<button
				type="button"
				onClick={() => setshowFullError(!showFullError)}
				className={`absolute top-5 right-5 flex cursor-pointer items-center gap-2 rounded-full bg-destructive p-2 text-xs shadow ${
					errorMessage === undefined || errorMessage?.trim().length === 0
						? "scale-0"
						: ""
				} origin-center duration-100`}
			>
				{showFullError && (
					<p className={"ml-2 text-destructive-foreground text-xs"}>
						{errorMessage}
					</p>
				)}

				<AlertOctagon className="text-destructive-foreground text-xs hover:scale-200" />
			</button>
		</div>
	);
};

interface ContainerProps {
	className?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
	errorMessage?: string;
}

export default Container;
