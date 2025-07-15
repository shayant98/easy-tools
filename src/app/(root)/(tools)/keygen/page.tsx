import BaseLayout from "@/layout/BaseLayout";
import Keys from "@/modules/keyGen/Keys";

/**
 * Renders the Key Generator page.
 */
const Page = () => {
	return (
		<BaseLayout title="Key Generator" desc="" toolId={13}>
			<Keys />
		</BaseLayout>
	);
};

export default Page;
