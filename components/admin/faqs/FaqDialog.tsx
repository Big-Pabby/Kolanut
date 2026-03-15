"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const FAQ_CATEGORIES = [
  { value: "General", label: "General" },
  { value: "Payment", label: "Payment" },
  { value: "Insurance Policy", label: "Insurance Policy" },
  { value: "Claims", label: "Claims" },
];

interface FAQDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: {
    id?: number;
    category: string;
    question: string;
    answer: string;
  }) => void;
  initialData?: {
    id: number;
    category: string;
    question: string;
    answer: string;
  } | null;
}

export function FAQDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: FAQDialogProps) {
  const isEditMode = !!initialData;
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Populate form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    } else if (!open) {
      // Reset form when dialog closes (for add mode)
      setCategory("");
      setQuestion("");
      setAnswer("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (!category || !question.trim() || !answer.trim()) return;
    onSubmit?.({ id: initialData?.id, category, question, answer });
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setCategory("");
    setQuestion("");
    setAnswer("");
  };

  const handleCancel = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[520px] p-4 gap-0 rounded-[12px]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight font-heading">
            {isEditMode ? "Edit FAQ" : "Add new FAQ"}
          </DialogTitle>
        </DialogHeader>

        {/* Form fields */}
        <div className="flex flex-col gap-5">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-800">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="!h-11 w-full rounded-[10px] border border-gray-200 bg-white text-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="rounded-[10px]">
                {FAQ_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-800">
              Question
            </Label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
              className="h-11 rounded-[10px] border border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent"
            />
          </div>

          {/* Answer */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-800">Answer</Label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              rows={5}
              className="rounded-[10px] border border-gray-200 bg-white placeholder:text-gray-400 resize-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-7">
          <Button
            onClick={handleSubmit}
            disabled={!category || !question.trim() || !answer.trim()}
            className="w-full h-12 rounded-full text-white font-medium text-base tracking-wide transition-all"
            style={{
              background: "linear-gradient(135deg, #c8102e 0%, #a50d26 100%)",
            }}
          >
            {isEditMode ? "Save Changes" : "Add new FAQ"}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full h-12 rounded-full border border-gray-300 text-gray-700 font-medium text-base hover:bg-gray-50 transition-all"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
