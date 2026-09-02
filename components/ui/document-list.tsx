import { FileText, Eye } from "lucide-react";

export interface DocumentAttachment {
  name: string;
  size: string;
  url?: string;
}

export function DocumentList({
  documents,
  emptyMessage = "No documents attached yet.",
}: {
  documents?: DocumentAttachment[];
  emptyMessage?: string;
}) {
  const items = documents && documents.length > 0 ? documents : [];

  if (items.length === 0) {
    return <p className="text-sm text-[#6B7280]">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((doc, index) => (
        <div
          key={`${doc.name}-${index}`}
          className="flex items-center justify-between rounded-[10px] border border-[#F3F4F6] px-4 py-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <FileText className="h-4 w-4 text-gray-500" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#161616]">
                {doc.name}
              </p>
              <p className="text-xs text-[#6B7280]">{doc.size}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Preview ${doc.name}`}
            title={doc.url ? `Open ${doc.name}` : "Preview unavailable"}
            disabled={!doc.url}
            onClick={() => {
              if (doc.url)
                window.open(doc.url, "_blank", "noopener,noreferrer");
            }}
            className="text-gray-400 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
