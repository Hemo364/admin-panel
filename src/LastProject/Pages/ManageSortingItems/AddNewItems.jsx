import { useState } from "react";
import Modal from "../../Components/Modal";

const AddNewItems = ({ category, categories, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: category?.title ?? "",
        parent: category?.parent ?? "",
        description: category?.description ?? "",
        active: category?.active ?? true,
    });
    const [error, setError] = useState("");

    const parentOptions = categories.filter((c) => c.id !== category?.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError("عنوان دسته الزامی است");
            return;
        }
        onSave({
            id: category?.id ?? Date.now(),
            title: formData.title.trim(),
            parent: formData.parent,
            description: formData.description.trim(),
            active: formData.active,
        });
    };

    return (
        <Modal title={category ? "ویرایش دسته محصولات" : "افزودن دسته محصولات"} onClose={onClose} widthClass="max-w-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm">عنوان دسته</label>
                    <input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        type="text"
                        className="inputs"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">دسته والد</label>
                    <select
                        value={formData.parent}
                        onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                        className="inputs"
                    >
                        <option value="">بدون والد</option>
                        {parentOptions.map((c) => (
                            <option key={c.id} value={c.title}>{c.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">توضیحات</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="inputs h-28 resize-none"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm">وضعیت فعال</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:size-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>

                {error && <span className="text-xs text-red-600">{error}</span>}

                <div className="flex flex-row gap-2 justify-end pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                    <button type="submit" className="btn-primary">{category ? "ذخیره تغییرات" : "ذخیره"}</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddNewItems;
