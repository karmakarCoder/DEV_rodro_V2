"use client";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error";
}

export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  type,
}: AlertModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          {type === "success" ? (
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          ) : (
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          )}
          <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight mb-2 italic">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-bold text-gray-600 mb-6 uppercase text-sm">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            className="w-full bg-black text-white py-4 font-black tracking-widest hover:bg-secondary hover:text-black transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            CLOSE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
