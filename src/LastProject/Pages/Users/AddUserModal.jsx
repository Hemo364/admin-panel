import { useState } from "react";
import Modal from "../../Components/Modal";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^0\d{10}$/;

const AddUserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const nextErrors = {};
        if (!formData.name.trim()) nextErrors.name = "نام الزامی است";
        if (!emailPattern.test(formData.email.trim())) nextErrors.email = "ایمیل معتبر نیست";
        if (!phonePattern.test(formData.phone.trim())) nextErrors.phone = "شماره تماس باید ۱۱ رقم و با ۰ شروع شود";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({
            id: user?.id ?? Date.now(),
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
        });
    };

    return (
        <Modal title={user ? "ویرایش کاربر" : "افزودن کاربر"} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm">نام و نام خانوادگی</label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        type="text"
                        className="inputs"
                    />
                    {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">ایمیل</label>
                    <input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        type="email"
                        className="inputs"
                    />
                    {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm">شماره تماس</label>
                    <input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        type="text"
                        className="inputs"
                    />
                    {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                </div>

                <div className="flex flex-row gap-2 justify-end pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary">انصراف</button>
                    <button type="submit" className="btn-primary">{user ? "ذخیره تغییرات" : "افزودن کاربر"}</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddUserModal;
