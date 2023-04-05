import TabbedLayout from "@layout/TabbedLayout";
import FromBase64 from "modules/Base64/FromBase64";
import ToBase64 from "modules/Base64/toBase64";

const ImageToBase64 = () => {
  return (
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
  );
};

export default ImageToBase64;
