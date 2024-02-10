import { Button } from "@components/ui/button";
import { IoThumbsDown, IoThumbsUp } from "react-icons/io5";

const Feedback = () => {
  return (
    <>
      <Button variant={"subtle"} size="sm">
        <IoThumbsDown />
      </Button>
      <Button variant={"subtle"} size="sm">
        <IoThumbsUp />
      </Button>
    </>
  );
};

export default Feedback;
