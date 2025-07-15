import { Button } from "@/components/ui/button";
import { IoThumbsDown, IoThumbsUp } from "react-icons/io5";

const Feedback = () => {
	return (
		<>
			<Button variant={"ghost"} size="sm">
				<IoThumbsDown />
			</Button>
			<Button variant={"ghost"} size="sm">
				<IoThumbsUp />
			</Button>
		</>
	);
};

export default Feedback;
