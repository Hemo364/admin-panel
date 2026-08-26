import { useMemo, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineCollection } from "react-icons/hi";
import AddNewItems from "./AddNewItems";
import Badge from "../../Components/Badge";
import { useLocalStorageState } from "../../Hooks/useLocalStorageState";

const initialCategories = [
    { id: 1, title: "کیف و کوله", parent: "", description: "انواع کیف چرم و کوله پشتی", active: true },
    { id: 2, title: "کفش", parent: "", description: "کفش‌های اسپرت و رسمی", active: true },
    { id: 3, title: "ساعت و اکسسوری", parent: "", description: "ساعت مچی و اکسسوری‌های جانبی", active: true },
    { id: 4, title: "کیف چرم دستی", parent: "کیف و کوله", description: "زیرمجموعه کیف و کوله", active: false },
    { id: 5, title: "کفش ورزشی", parent: "کفش", description: "زیرمجموعه کفش", active: true },
    { id: 6, title: "عینک", parent: "", description: "عینک آفتابی و طبی", active: true },
];

const PAGE_SIZE = 4;

const ManageSortingItems = () => {
    const [categories, setCategories] = useLocalStorageState("admin-panel:categories", initialCategories);
    const [search, setSearch] = useState("");
    const [prevSearch, setPrevSearch] = useState("");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const filteredCategories = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return categories;
        return categories.filter((c) => c.title.toLowerCase().includes(term));
    }, [categories, search]);

    const pageCount = Math.max(1, Math.ceil(filteredCategories.length / PAGE_SIZE));

    // Reset to page 1 whenever the search term changes (adjusted during render, not in an effect).
    if (search !== prevSearch) {
        setPrevSearch(search);
        if (page !== 1) setPage(1);
    }

    const safePage = Math.min(Math.max(page, 1), pageCount);
    const pagedCategories = filteredCategories.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const openAddModal = () => {
        setEditingCategory(null);
        setModalOpen(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setModalOpen(true);
    };

    const handleSave = (category) => {
        setCategories((prev) => {
            const exists = prev.some((c) => c.id === category.id);
            return exists ? prev.map((c) => (c.id === category.id ? category : c)) : [...prev, category];
        });
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm("آیا از حذف این دسته مطمئن هستید؟")) {
            setCategories((prev) => prev.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">مدیریت دسته بندی محصولات</h1>

            <div className="flex flex-row gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="inputs sm:w-72"
                    placeholder="قسمتی از عنوان را وارد کنید"
                />
                <button onClick={openAddModal} className="text-2xl text-white bg-green-600 hover:bg-green-700 transition-colors size-10 shrink-0 flex items-center justify-center rounded-lg cursor-pointer" aria-label="افزودن دسته">
                    +
                </button>
            </div>

            {modalOpen && (
                <AddNewItems
                    category={editingCategory}
                    categories={categories}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {pagedCategories.length === 0 ? (
                <div className="table-wrap flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                    <HiOutlineCollection className="text-4xl" />
                    <span>دسته‌ای یافت نشد</span>
                </div>
            ) : (
                <>
                    {/* Desktop / tablet: table */}
                    <div className="table-wrap hidden sm:block">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    <th className="p-3">#</th>
                                    <th className="p-3">عنوان</th>
                                    <th className="p-3">دسته والد</th>
                                    <th className="p-3">وضعیت</th>
                                    <th className="p-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedCategories.map((category) => (
                                    <tr className="border-t border-slate-200 dark:border-slate-700" key={category.id}>
                                        <td className="p-3">{category.id}</td>
                                        <td className="p-3">{category.title}</td>
                                        <td className="p-3">{category.parent || "—"}</td>
                                        <td className="p-3">
                                            <Badge tone={category.active ? "green" : "slate"}>{category.active ? "فعال" : "غیرفعال"}</Badge>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => openEditModal(category)} className="text-indigo-600 hover:text-indigo-800 cursor-pointer" aria-label="ویرایش">
                                                    <HiOutlinePencil />
                                                </button>
                                                <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-800 cursor-pointer" aria-label="حذف">
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
                        {pagedCategories.map((category) => (
                            <div key={category.id} className="card-surface p-4 flex flex-col gap-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="font-medium truncate">{category.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">دسته والد: {category.parent || "—"}</p>
                                    </div>
                                    <Badge tone={category.active ? "green" : "slate"}>{category.active ? "فعال" : "غیرفعال"}</Badge>
                                </div>
                                <div className="flex items-center gap-4 border-t border-slate-200 dark:border-slate-700 pt-2">
                                    <button onClick={() => openEditModal(category)} className="text-indigo-600 cursor-pointer flex items-center gap-1 text-sm">
                                        <HiOutlinePencil /> ویرایش
                                    </button>
                                    <button onClick={() => handleDelete(category.id)} className="text-red-600 cursor-pointer flex items-center gap-1 text-sm">
                                        <HiOutlineTrash /> حذف
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {pageCount > 1 && (
                <div className="flex flex-row items-center justify-center gap-1 text-sm">
                    <button
                        disabled={safePage === 1}
                        onClick={() => setPage(Math.max(1, safePage - 1))}
                        className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        ›
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`size-9 flex items-center justify-center rounded-lg cursor-pointer ${safePage === num ? "bg-indigo-600 text-white" : "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        disabled={safePage === pageCount}
                        onClick={() => setPage(Math.min(pageCount, safePage + 1))}
                        className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        ‹
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageSortingItems;
