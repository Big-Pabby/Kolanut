"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

interface ImageUploadTileProps {
	file: File | null;
	onFileSelect: (file: File | null) => void;
}

export default function ImageUploadTile({
	file,
	onFileSelect,
}: ImageUploadTileProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<button
			type="button"
			onClick={() => inputRef.current?.click()}
			className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-card-border bg-white px-2 py-4 text-center hover:border-brand-red/50 transition-colors"
		>
			<Upload className="w-4 h-4 text-body-text" />
			<span className="font-body! text-xs font-medium text-brand-red">
				{file ? file.name : "Click to upload"}
			</span>
			<span className="font-body! text-[10px] text-body-text">
				PNG, JPG max 3MB
			</span>
			<input
				ref={inputRef}
				type="file"
				accept="image/png,image/jpeg"
				className="hidden"
				onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
			/>
		</button>
	);
}
