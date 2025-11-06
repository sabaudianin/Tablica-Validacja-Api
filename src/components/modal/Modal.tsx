import type { ModalProps } from "../../types/types";

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-4 ">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm "
          >
            CLOSE
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
