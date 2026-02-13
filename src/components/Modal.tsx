import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  showsDescription?: boolean;
  showsTitle?: boolean;
  hasError?: boolean;
  children: React.ReactNode;
}
export function Modal({
  open,
  onOpenChange,
  title = "",
  description = "",
  showsDescription = true,
  showsTitle = true,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[calc(100vw-10rem)] max-h-[calc(100vh-10rem)] overflow-y-auto bg-[#1a1a1a] text-white border-[#33353F]">
        <DialogHeader>
          <DialogTitle
            className={`${!showsTitle ? "sr-only" : "text-3xl mb-2"}`}
          >
            {title}
          </DialogTitle>

          <DialogDescription
            className={`${!showsDescription ? "sr-only" : ""}`}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
