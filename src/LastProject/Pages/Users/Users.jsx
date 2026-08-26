import { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineUserGroup } from "react-icons/hi";
import AddUserModal from "./AddUserModal";
import { useLocalStorageState } from "../../Hooks/useLocalStorageState";

const initialUsers = [
    { id: 1, name: 'حسام محمدیان', email: "hesam@example.com", phone: "09159121020" },
    { id: 2, name: "حسین مهدوی", email: "hossein@example.com", phone: "09159121021" },
    { id: 3, name: "حسن یوسفی", email: "hasan@example.com", phone: "09159121022" },
    { id: 4, name: "حسین احمدی", email: "ahmadi@example.com", phone: "09159121023" },
    { id: 5, name: "نیکان داوری", email: "nikan@example.com", phone: "09159121024" },
    { id: 6, name: "علیرضا فیضی", email: "alireza@example.com", phone: "09159121025" },
];

const avatarColors = ["bg-indigo-500", "bg-amber-500", "bg-green-500", "bg-red-500", "bg-sky-500", "bg-pink-500"];

const Users = () => {
    const [users, setUsers] = useLocalStorageState("admin-panel:users", initialUsers);
    const [modalUser, setModalUser] = useState(undefined);
    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return users;
        return users.filter((u) =>
            u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
        );
    }, [users, search]);

    const handleSave = (user) => {
        setUsers((prev) => {
            const exists = prev.some((u) => u.id === user.id);
            return exists ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user];
        });
        setModalUser(undefined);
    };

    const handleDelete = (id) => {
        if (confirm("آیا از حذف این کاربر مطمئن هستید؟")) {
            setUsers((prev) => prev.filter((u) => u.id !== id));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl font-bold">کاربران</h1>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="جستجوی نام یا ایمیل"
                        className="inputs sm:w-64"
                    />
                    <button onClick={() => setModalUser(null)} className="btn-primary">
                        <FaUserPlus />
                        <span>افزودن کاربر</span>
                    </button>
                </div>
            </div>

            {modalUser !== undefined && (
                <AddUserModal user={modalUser} onClose={() => setModalUser(undefined)} onSave={handleSave} />
            )}

            {filteredUsers.length === 0 ? (
                <div className="table-wrap flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                    <HiOutlineUserGroup className="text-4xl" />
                    <span>کاربری یافت نشد</span>
                </div>
            ) : (
                <>
                    {/* Desktop / tablet: table */}
                    <div className="table-wrap hidden sm:block">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    <th className="p-3">آیدی</th>
                                    <th className="p-3">اسم</th>
                                    <th className="p-3">ایمیل</th>
                                    <th className="p-3">شماره تماس</th>
                                    <th className="p-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr className="border-t border-slate-200 dark:border-slate-700" key={user.id}>
                                        <td className="p-3">{user.id}</td>
                                        <td className="p-3 name-cell">
                                            <span className="flex items-center gap-2 justify-center">
                                                <span className={`size-7 shrink-0 rounded-full text-white text-xs flex items-center justify-center ${avatarColors[index % avatarColors.length]}`}>
                                                    {user.name.charAt(0)}
                                                </span>
                                                {user.name}
                                            </span>
                                        </td>
                                        <td className="p-3 truncate">{user.email}</td>
                                        <td className="p-3">{user.phone}</td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => setModalUser(user)} className="text-indigo-600 hover:text-indigo-800 cursor-pointer" aria-label="ویرایش">
                                                    <HiOutlinePencil />
                                                </button>
                                                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 cursor-pointer" aria-label="حذف">
                                                    <HiOutlineTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: card list */}
                    <div className="flex flex-col gap-3 sm:hidden">
                        {filteredUsers.map((user, index) => (
                            <div key={user.id} className="card-surface p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className={`size-9 shrink-0 rounded-full text-white text-sm flex items-center justify-center ${avatarColors[index % avatarColors.length]}`}>
                                        {user.name.charAt(0)}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="font-medium truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
                                    <span className="text-slate-500 dark:text-slate-400">{user.phone}</span>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setModalUser(user)} className="text-indigo-600 cursor-pointer" aria-label="ویرایش">
                                            <HiOutlinePencil />
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 cursor-pointer" aria-label="حذف">
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;
