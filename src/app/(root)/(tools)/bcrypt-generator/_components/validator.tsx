"use client";

import Container from "@/components/Container/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as bcrypt from "bcryptjs";
import { ArrowRight, Eraser } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BcryptValidator = () => {
	const [validateHash, setValidateHash] = useState("");
	const [string, setstring] = useState("");
	const [hash, setHash] = useState("");

	const handleCheck = async () => {
		if (validateHash === "") {
			return;
		}
		if (string === "") {
			return;
		}

		const match = await bcrypt.compare(string, hash);

		if (match) {
			toast.success("Hash is valid");
			return;
		}
		toast("hash is invalid");
	};

	const handleClear = () => {
		setHash("");
		setstring("");
		setValidateHash("");
	};

	return (
		<Container>
			<div className="mt-3">
				<Label>Hash</Label>
				<Input
					placeholder="Hash"
					value={validateHash}
					onChange={(e) => setValidateHash(e.target.value)}
				/>
			</div>
			<div className="mt-3">
				<Label>String to check against</Label>
				<Input
					placeholder="String to check against"
					value={string}
					onChange={(e) => setstring(e.target.value)}
				/>
			</div>
			<div className="flex justify-end gap-x-3 pt-3">
				<Button variant={"ghost"} onClick={handleClear}>
					<Eraser className="mr-2 h-4 w-4" />
					Clear
				</Button>
				<Button onClick={handleCheck}>
					<ArrowRight className="mr-2 h-4 w-4" />
					<span>Validate</span>
				</Button>
			</div>
		</Container>
	);
};

export default BcryptValidator;
