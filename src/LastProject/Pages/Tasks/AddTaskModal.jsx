import { useState } from "react";
import Modal from "../../Components/Modal";

const AddTaskModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: "",
        assignee: "",
        priority: "medium",
        dueDate: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.assignee.trim()) {
            setError("عنوان و مسئول تسک الزامی است");
            return;
        }
        onSave({
            id: Date.now(),
            title: formData.title.trim(),
            assignee: formData.assignee.trim(),
            priority: formData.priority,
            dueDate: formData.dueDate || "-",
            status: "todo",
        });
    };

    return (
        <Modal title="افزودن تسک" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm">عنوان تسک</label>
                    <input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        type="text"
                        className="inputs"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">مسئول</label>
                    <input
                        value={formData.assignee}
                        onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                        type="text"
                        className="inputs"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">اولویت</label>
                    <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="inputs"
                    >
                        <option value="low">کم</option>
                        <option value="medium">متوسط</option>
                        <option value="high">بالا</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">تاریخ سررسید</label>
                    <input
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        type="text"
                        placeholder="مثلاً 1404/06/01"
                        className="inputs"
                    />
                </div>

                {error && <span className="text-xs text-red-600">{error}</span>}

                <div className="flex flex-row gap-2 justify-end pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                    <button type="submit" className="btn-primary">افزودن تسک</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddTaskModal;
