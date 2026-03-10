"use client";

interface AdminHeaderProps {
  userName?: string;
  userInitials?: string;
}

export default function AdminHeader({
  userName = "Mauteen Adeleke",
  userInitials = "MA",
}: AdminHeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-end gap-4 px-6"
      style={{ left: 210, height: 64, backgroundColor: "#fefefe", borderBottom: "1px solid #f3f4f6" }}
    >
      {/* Bell icon */}
      <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
        <img src="/icons/admin/bell.svg" alt="Notifications" style={{ width: 16, height: 18, color: "#af060d" }} />
      </button>

      {/* Avatar + Name */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "#af060d",
            border: "1.5px solid #af060d",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "Gilroy-Medium, HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              letterSpacing: "-0.14px",
            }}
          >
            {userInitials}
          </span>
        </div>
        <span
          style={{
            color: "#111827",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            letterSpacing: "-0.14px",
          }}
        >
          {userName}
        </span>
      </div>
    </header>
  );
}
