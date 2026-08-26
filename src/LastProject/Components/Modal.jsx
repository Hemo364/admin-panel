import { HiX } from "react-icons/hi";

const Modal = ({ title, onClose, children, widthClass = "max-w-lg" }) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4"
            onClick={onClose}
        >
            <div
                className={`w-full ${widthClass} max-h-[85vh] overflow-y-auto card-surface`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xl transition-colors"
                        aria-label="بستن"
                    >
                        <HiX />
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
