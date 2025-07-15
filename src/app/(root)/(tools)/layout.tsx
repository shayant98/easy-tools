const ToolLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="mb-5 flex h-full flex-1 flex-col px-4 lg:px-20">
			{children}
		</main>
	);
};

export default ToolLayout;
