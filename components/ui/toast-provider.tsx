import React, { createContext, useContext, useState } from "react";

interface Toast {
  id: string;
  title: string;
  description: string;
  variant: "success" | "destructive";
}

interface ToastContextProps {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    setToasts((current) => [...current, { id, ...toast }]);

    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3000); // Remove the toast after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded shadow-lg ${
              toast.variant === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            <h4 className="font-bold">{toast.title}</h4>
            <p>{toast.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { ToastProvider, useToast };
