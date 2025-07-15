import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";
import QrScanner from "qr-scanner";
import { useCallback, useEffect, useRef, useState } from "react";
const QrCameraDialog = () => {
	const videoRef = useRef(null);
	const [cameras, setCameras] = useState<QrScanner.Camera[]>([]);
	const [hasCamera, sethasCamera] = useState(false);

	const checkForCamera = useCallback(async () => {
		const hasCamera = await QrScanner.hasCamera();
		sethasCamera(hasCamera);

		if (!hasCamera) {
			return;
		}

		setCameras(await QrScanner.listCameras());

		if (cameras.length === 0) {
			sethasCamera(false);
			return;
		}
	}, [cameras]);

	useEffect(() => {
		checkForCamera().catch(() => {
			console.log("Error checking for camera");
		});
	}, [checkForCamera]);

	useEffect(() => {
		let scanner: QrScanner | null = null;
		if (!videoRef.current) return;

		scanner = new QrScanner(
			videoRef.current,
			() => {
				console.log("decoded");
			},
			{
				onDecodeError: () => {
					console.log("error");
				},
				returnDetailedScanResult: true,
				preferredCamera: "environment",
				maxScansPerSecond: 2,
				highlightScanRegion: true,
			},
		);

		scanner
			.start()
			.then(() => console.log("started"))
			.catch(console.error);

		return () => {
			if (scanner) scanner.destroy();
		};
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild disabled={!hasCamera}>
				<Button disabled={!hasCamera} className="mr-1" size={"sm"}>
					<Camera className="mr-2 h-4 w-4" /> Camera
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className="mt-10">
					<Select>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Camera" />
							</SelectTrigger>
							<SelectContent>
								{cameras.map((camera) => (
									<SelectItem key={camera.id} value={camera.id}>
										{camera.label} - TTTT
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</Select>
				</div>
				<video className="h-32 w-32 bg-green-300" ref={videoRef} />
			</DialogContent>
		</Dialog>
	);
};

export default QrCameraDialog;
