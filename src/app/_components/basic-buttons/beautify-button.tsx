import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";
import { toast } from "sonner";

const BeautifyButton = ({
	value,
	setValue,
}: { value: string; setValue: (value: string) => void }) => {
	const handleBeatify = async () => {
		try {
			if (value.trim().length < 1) {
				toast.error("Please enter JSON first");
				return;
			}
			const beatified = JSON.stringify(JSON.parse(value), null, 2);

			setValue(beatified);
		} catch (error: unknown) {}
	};

	return (
		<Button
			variant={"secondary"}
			size={"icon"}
			onClick={() => {
				void handleBeatify();
			}}
		>
			<Flower className="h-4 w-4" />
		</Button>
	);
};

export default BeautifyButton;
