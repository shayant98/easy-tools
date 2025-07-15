"use client";

import Container from "@/components/Container/Container";
import { Textarea } from "@/components/ui/textarea";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { useEffect, useState } from "react";

const FromBase64String = () => {
	const [input, setinput] = useState("");
	const [output, setoutput] = useState("");

	useEffect(() => {
		if (!input) return;
		setoutput(Buffer.from(input, "base64").toString());
		return () => {
			setoutput("");
		};
	}, [input]);

	return (
		<MultiEditorLayout>
			<Container>
				<Textarea
					value={input}
					onChange={(e) => setinput(e.target.value)}
					placeholder="Enter your base64 string here..."
				/>
			</Container>
			<Container>
				<Textarea
					value={output}
					onChange={(e) => setoutput(e.target.value)}
					placeholder="Your decoded string will appear here..."
				/>
			</Container>
		</MultiEditorLayout>
	);
};

export default FromBase64String;
