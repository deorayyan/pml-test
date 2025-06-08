import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import React, { createContext, useContext, useState } from "react";

// Create context with default undefined value
const DialogContext = createContext(undefined);

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "Dialog",
    description: "",
    variant: "default",
    cancelText: "",
    confirmText: "",
    onClose: () => {},
    onConfirm: () => {},
  });

  const openDialog = ({
    title,
    description,
    onClose,
    onConfirm,
    variant,
    cancelText = "Cancel",
    confirmText = "Confirm",
  }) => {
    setDialog({
      isOpen: true,
      title,
      description,
      variant,
      onConfirm,
      onClose,
      cancelText,
      confirmText,
    });
  };

  const closeDialog = () => {
    if (dialog.onClose) dialog.onClose();
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const confirmAction = () => {
    if (dialog.onConfirm) dialog.onConfirm();
    closeDialog();
  };

  React.useEffect(() => {
    // fix window automatically adding "pointer-events: none" somethimes on close
    if (dialog.isOpen === false) {
      setTimeout(() => {
        window.document.body.style.pointerEvents = "";
      }, 200);
    }
  }, [dialog]);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <AlertDialog open={dialog.isOpen} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle variant={dialog.variant}>
              {dialog.title}
            </AlertDialogTitle>
            {dialog?.description && (
              <AlertDialogDescription
                className="pt-6 pb-4"
                asChild={typeof dialog.description !== "string"}
              >
                {dialog.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant={dialog.variant}
              onClick={confirmAction}
              className="px-5"
            >
              {dialog.confirmText}
            </Button>
            {dialog.cancelText && (
              <Button
                variant={
                  dialog.variant === "default" || !dialog.variant
                    ? "outline"
                    : `outline-${dialog.variant}`
                }
                onClick={closeDialog}
                className="px-5"
              >
                {dialog.cancelText}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  );
};

// Hook to use the dialog context
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
