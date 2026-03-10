interface ResourceMetricCardProps {
  label: string;
  count: number | string;
}

export default function ResourceMetricCard({ label, count }: ResourceMetricCardProps) {
  return (
    <div
      className="flex items-center gap-4 flex-1"
      style={{
        backgroundColor: "#fefefe",
        border: "1px solid #f3f4f6",
        borderRadius: 8,
        padding: "24px 16px",
        minWidth: 0,
      }}
    >
      {/* Document icon */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 44,
          height: 44,
          border: "2px solid #af060d",
          borderRadius: 6,
        }}
      >
        <img src="/icons/admin/document.svg" alt="document" style={{ width: 18, height: 22 }} />
      </div>

      {/* Label + Count */}
      <div className="flex flex-col gap-1">
        <span
          style={{
            color: "#4b5563",
            fontSize: 16,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: "#111827",
            fontSize: 24,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          {count}
        </span>
      </div>
    </div>
  );
}
