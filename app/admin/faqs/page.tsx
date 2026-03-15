"use client";

import { useState } from "react";
import FaqAccordionItem, {
  FaqItem,
} from "@/components/admin/faqs/FaqAccordionItem";
import { FAQDialog } from "@/components/admin/faqs/FaqDialog";
import {
  useFaqs,
  useCreateFaq,
  useUpdateFaq,
  useDeleteFaq,
  CreateFaqPayload,
  UpdateFaqPayload,
} from "./hooks/useFaqs";

const CATEGORIES = [
  "General",
  "Payment",
  "Insurance Policy",
  "Claims",
] as const;
type Category = (typeof CATEGORIES)[number];

function countByCategory(cat: Category, faqs: FaqItem[]) {
  return faqs.filter((f) => f.category === cat).length;
}

export default function AdminFaqsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingFaq, setDeletingFaq] = useState<FaqItem | null>(null);

  // Use the FAQ hook for data fetching
  const { data: faqs = [], isLoading: loading, error } = useFaqs();
  const createFaq = useCreateFaq();
  const updateFaq = useUpdateFaq();
  const deleteFaq = useDeleteFaq();

  const visibleFaqs = faqs.filter((f) => f.category === activeCategory);

  const handleAddFaq = (data: {
    id?: number;
    category: string;
    question: string;
    answer: string;
  }) => {
    if (editingFaq) {
      // Update existing FAQ
      const payload: UpdateFaqPayload = {
        originalQuestion: editingFaq.question,
        category: data.category,
        question: data.question,
        answer: data.answer,
      };
      updateFaq.mutate(payload);
    } else {
      // Create new FAQ
      const payload: CreateFaqPayload = {
        category: data.category,
        question: data.question,
        answer: data.answer,
      };
      createFaq.mutate(payload);
    }
    setEditingFaq(null);
  };

  const handleEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setDialogOpen(true);
  };

  const handleDeleteFaq = (faq: FaqItem) => {
    setDeletingFaq(faq);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletingFaq) {
      deleteFaq.mutate(deletingFaq.question);
    }
    setShowDeleteDialog(false);
    setDeletingFaq(null);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingFaq(null);
    }
  };

  return (
    <div className="flex flex-col" style={{ padding: "24px 40px", gap: 24 }}>
      {/* Header card */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: "#fefefe",
          border: "1px solid #f3f4f6",
          borderRadius: 8,
          padding: "16px",
          gap: 16,
        }}
      >
        {/* Title + button row */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col" style={{ gap: 4 }}>
            <h1
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "var(--font-merriweather), Merriweather, serif",
              }}
            >
              Frequently asked questions
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontWeight: 400,
                fontFamily:
                  "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Create and manage properties
            </p>
          </div>

          <button
            className="flex items-center justify-center px-5 py-2.5 transition-opacity hover:opacity-90"
            onClick={() => setDialogOpen(true)}
            style={{
              backgroundColor: "#af060d",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily:
                "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
              border: "none",
              borderRadius: 24,
              whiteSpace: "nowrap",
            }}
          >
            Add New FAQ
          </button>
        </div>

        {/* Category tabs */}
        <div
          className="flex items-center"
          style={{
            gap: 8,
            backgroundColor: "#f9fafb",
            borderRadius: 8,
            padding: "4px",
            width: "fit-content",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center transition-all"
                style={{
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  boxShadow: isActive
                    ? "0px 1px 2px rgba(18, 26, 43, 0.06), 0px 1px 2px rgba(18, 26, 43, 0.10)"
                    : "none",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#af060d" : "#6b7280",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {cat}
                </span>
                <span
                  className="border border-[#E5E7EB] bg-[#F9FAFB] w-[22px] h-[22px] flex justify-center items-center rounded-full"
                  style={{
                    color: "#374151",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {countByCategory(cat, faqs)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ list */}
      <div
        className="flex flex-col bg-white p-4 border border-[#F3F4F6] rounded-[8px]"
        style={{ gap: 20 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p style={{ color: "#6b7280", fontSize: 14 }}>Loading FAQs...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8">
            <p style={{ color: "#af060d", fontSize: 14 }}>
              {error?.message || "Failed to load FAQs"}
            </p>
          </div>
        ) : visibleFaqs.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              No FAQs found for this category
            </p>
          </div>
        ) : (
          visibleFaqs.map((faq, idx) => (
            <FaqAccordionItem
              key={faq.id}
              faq={faq}
              isFirst={idx === 0}
              defaultOpen={idx % 2 === 0}
              onEdit={handleEditFaq}
              onDelete={handleDeleteFaq}
            />
          ))
        )}
      </div>

      {/* FAQ Dialog */}
      <FAQDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={handleAddFaq}
        initialData={editingFaq}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowDeleteDialog(false)}
          />
          <div
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 24,
              maxWidth: 400,
              width: "90%",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex flex-col items-center" style={{ gap: 16 }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#fef2f2",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6H5H21"
                    stroke="#af060d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z"
                    stroke="#af060d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="flex flex-col"
                style={{ gap: 8, textAlign: "center" }}
              >
                <h3
                  style={{
                    color: "#111827",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Delete FAQ
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  Are you sure you want to delete this FAQ? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex w-full flex-col" style={{ gap: 12 }}>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleteFaq.isPending}
                  className="w-full py-3 rounded-full text-white font-medium transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: "#af060d",
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  {deleteFaq.isPending ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="w-full py-3 rounded-full font-medium transition-all hover:bg-gray-50"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    color: "#374151",
                    fontFamily:
                      "HelveticaNeue, Helvetica Neue, Helvetica, sans-serif",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
