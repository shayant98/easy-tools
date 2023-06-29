import TabbedLayout from "@layout/TabbedLayout";
import { QrCodeGenerator, QrDecoder } from "modules/Qr";

const QrPage = () => {
  return (
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
  );
};

export default QrPage;
