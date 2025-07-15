import BaseLayout from "@/layout/BaseLayout";
import { Form } from "@/modules/CssToTailwind";

export const metadata = {
  title: "Tool | CSS to Tailwind",
  description: "Convert CSS to Tailwind",
};

const TailwindConverters = () => {
  return (
    <BaseLayout title="CSS to Tailwind" toolId={9}>
      <Form />
    </BaseLayout>
  );
};

export default TailwindConverters;
