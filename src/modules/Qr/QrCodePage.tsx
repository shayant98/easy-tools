import BaseLayout from "@layout/BaseLayout";
import TabbedLayout from "@layout/TabbedLayout";
import { QrCodeGenerator, QrDecoder } from "modules/Qr";

const QrPage = () => {
  return (
    <BaseLayout title="QR Code Generator" desc="Generate QR Codes for your website, or decode QR Codes to get the data inside them.">
      <TabbedLayout
        defaultTab="qr-generator"
        options={[
          {
            value: "qr-generator",
            label: "QR Code Generator",
            child: <QrCodeGenerator />,
          },
          {
            value: "qr-decoder",
            label: "QR Code Decoder",
            child: <QrDecoder />,
          },
        ]}
      />
    </BaseLayout>
  );
};

export default QrPage;
