import { toast } from "sonner";

export function useClipboard() {
	const copy = async (value: string) => {
		try {
			if (!navigator.clipboard) {
				throw new Error("Clipboard not available");
			}

			if (!value || value.trim().length < 1) {
				return;
			}

			await navigator.clipboard.writeText(value);
			toast.success("Copied to clipboard");
		} catch (error) {
			console.error("Failed to copy!", error);
		}
	};

	return { copy };
}
