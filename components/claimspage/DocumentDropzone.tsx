"use client";

import { useRef, useState, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";

interface DocumentDropzoneProps {
	label: string;
	file: File | null;
	onFileSelect: (file: File | null) => void;
	accept?: string;
}

export default function DocumentDropzone({
	label,
	file,
	onFileSelect,
	accept,
}: DocumentDropzoneProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const dropped = e.dataTransfer.files?.[0];
		if (dropped) onFileSelect(dropped);
	};

	return (
		<div>
			<p className="font-body! text-xs font-medium text-dark-text mb-1.5">
				{label}
			</p>
			<div
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors ${
					isDragging
						? "border-brand-red bg-brand-red/5"
						: "border-card-border bg-white"
				}`}
			>
				<UploadCloud className="w-5 h-5 text-body-text" />
				<p className="font-body! text-sm text-body-text">
					{file ? (
						<span className="text-dark-text font-medium">{file.name}</span>
					) : (
						<>
							Drag &amp; drop file here or{" "}
							<button
								type="button"
								onClick={() => inputRef.current?.click()}
								className="font-medium text-brand-red hover:underline"
							>
								choose file
							</button>
						</>
					)}
				</p>
				<input
					ref={inputRef}
					type="file"
					accept={accept}
					className="hidden"
					onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
				/>
			</div>
		</div>
	);
}
