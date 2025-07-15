import HeaderLayout from "@/layout/header-layout";
import { Form } from "./_components/Form";
export const metadata = { title: "Tool | CSS to Tailwind", description: "Convert CSS to Tailwind" };

const TailwindConverters = () => {
  return (
    <HeaderLayout title="CSS to Tailwind" toolId={9}>
      <Form />
    </HeaderLayout>
  );
};

export default TailwindConverters;
