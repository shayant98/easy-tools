import BaseLayout from "@/layout/BaseLayout";
import TabbedLayout from "@/layout/TabbedLayout";
import FromBase64 from "./_components/from-base64-image";
import FromBase64String from "./_components/from-base64-string";
import ToBase64 from "./_components/to-base64-image";
import ToBase64String from "./_components/to-base64-string";

export const metadata = {
	title: "Tools | Base64 converter",
	description: "Convert images to base64 and vice versa.",
};

const ImageToBase64 = () => {
	return (
		<BaseLayout title="Base64" desc="Base64 tools">
			<TabbedLayout
				defaultTab="to"
				options={[
					{
						label: "Image to Base64",
						value: "to",
						child: <ToBase64 />,
					},
					{
						label: "Image from Base64",
						value: "from",
						child: <FromBase64 />,
					},
					{
						label: "String to Base64",
						value: "fromString",
						child: <ToBase64String />,
					},
					{
						label: "String from Base64",
						value: "toString",
						child: <FromBase64String />,
					},
				]}
			/>
		</BaseLayout>
	);
};

export default ImageToBase64;
