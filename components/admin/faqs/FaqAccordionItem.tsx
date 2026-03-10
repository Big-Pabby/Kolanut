"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FaqAccordionItemProps {
  faq: FaqItem;
  isFirst?: boolean;
  defaultOpen?: boolean;
  onEdit?: (faq: FaqItem) => void;
  onDelete?: (faq: FaqItem) => void;
}

export default function FaqAccordionItem({
  faq,
  isFirst = false,
  defaultOpen = false,
  onEdit,
  onDelete,
}: FaqAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        borderTop: isFirst ? "none" : "1px solid #e5e7eb",
        paddingTop: isFirst ? 0 : 20,
      }}
    >
      <div className="flex items-start" style={{ gap: 40 }}>
        {/* Question + Answer */}
        <div className="flex flex-col flex-1" style={{ gap: 8 }}>
          <p
            style={{
              color: "#161616",
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
            }}
          >
            {faq.question}
          </p>
          {isOpen && (
            <p
              style={{
                color: "#4b5563",
                fontSize: 16,
                fontWeight: 400,
                fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              {faq.answer}
            </p>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center shrink-0" style={{ gap: 24 }}>
          {/* Expand / Collapse button */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ width: 16, height: 16 }}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              /* Minus — horizontal line */
              <span
                style={{
                  display: "block",
                  width: 16,
                  height: 2,
                  backgroundColor: "#4b5563",
                  borderRadius: 1,
                }}
              />
            ) : (
              /* Plus icon from figma */
              <img
                src="/icons/admin/faq-plus.svg"
                alt="expand"
                style={{ width: 16, height: 16, filter: "brightness(0) saturate(100%) invert(35%) sepia(7%) saturate(728%) hue-rotate(176deg) brightness(94%) contrast(88%)" }}
              />
            )}
          </button>

          {/* 3-dot context menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical size={16} color="#4b5563" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 z-20 mt-1 flex flex-col overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    minWidth: 130,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <button
                    className="text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: "#374151", fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif" }}
                    onClick={() => { setMenuOpen(false); onEdit?.(faq); }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-left px-4 py-2.5 text-sm hover:bg-red-50 transition-colors"
                    style={{ color: "#af060d", fontFamily: "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif" }}
                    onClick={() => { setMenuOpen(false); onDelete?.(faq); }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
