import { Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="sticky top-[100vh] flex w-full items-center justify-center gap-x-1 py-5 text-center text-sm ">
			Built by{" "}
			<a
				href="https://www.shayantsital.com"
				target={"_blank"}
				rel="noreferrer"
				className="hover:text-gray-100"
			>
				Shayant Sital
			</a>
			<a
				href="https://www.github.com/shayant98"
				target={"_blank"}
				rel="noreferrer"
			>
				<Github className="hover:text-gray-100" />
			</a>
			- <span className="font-bold text-destructive">BETA </span> -
			<Link
				className="duration-200 hover:text-green-600"
				target={"_blank"}
				href={"https://www.buymeacoffee.com/shayant"}
			>
				Support the development 🍵
			</Link>
		</footer>
	);
};

export default Footer;
