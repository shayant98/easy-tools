import BaseLayout from "@layout/BaseLayout";
import TabbedLayout from "@layout/TabbedLayout";
import FromBase64 from "modules/Base64/FromBase64";
import ToBase64 from "modules/Base64/toBase64";

const ImageToBase64 = () => {
  return (
    <BaseLayout showBackButton title="base64">
      <TabbedLayout
        defaultTab="to"
        options={[
          {
            label: "To Base64",
            value: "to",
            child: <ToBase64 />,
          },
          {
            label: "From Base64",
            value: "from",
            child: <FromBase64 />,
          },
        ]}
      />
    </BaseLayout>
  );
};

export default ImageToBase64;
