import { useMemo, useState } from "react";
import { HiOutlineCheck, HiOutlineX, HiOutlineTrash, HiOutlineChatAlt2 } from "react-icons/hi";
import Badge from "../../Components/Badge";
import { useLocalStorageState } from "../../Hooks/useLocalStorageState";

const initialComments = [
    { id: 1, author: "زهرا کریمی", post: "معرفی محصولات جدید فروشگاه", content: "خیلی مفید بود، ممنون از توضیحات کامل.", status: "approved", date: "1404/05/13" },
    { id: 2, author: "امیر رستمی", post: "راهنمای خرید کیف چرم", content: "قیمت‌ها رو هم اضافه کنید لطفاً.", status: "pending", date: "1404/05/12" },
    { id: 3, author: "مریم صادقی", post: "تخفیف‌های ویژه تابستان", content: "لینک تخفیف کار نمی‌کنه!", status: "pending", date: "1404/05/11" },
    { id: 4, author: "کاربر ناشناس", post: "بررسی جدیدترین ساعت‌های مچی", content: "تبلیغ سایت دیگه...", status: "spam", date: "1404/05/09" },
    { id: 5, author: "سینا قاسمی", post: "مصاحبه با تیم طراحی محصول", content: "عالی بود، منتظر مصاحبه بعدی هستیم.", status: "approved", date: "1404/05/02" },
];

const statusMeta = {
    approved: { label: "تأیید شده", tone: "green" },
    pending: { label: "در انتظار", tone: "amber" },
    spam: { label: "اسپم", tone: "red" },
};

const filters = [
    { value: "all", label: "همه" },
    { value: "pending", label: "در انتظار" },
    { value: "approved", label: "تأیید شده" },
    { value: "spam", label: "اسپم" },
];

const Comments = () => {
    const [comments, setComments] = useLocalStorageState("admin-panel:comments", initialComments);
    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");

    const filteredComments = useMemo(() => {
        const term = search.trim().toLowerCase();
        return comments.filter((c) => {
            const matchesStatus = statusFilter === "all" || c.status === statusFilter;
            const matchesSearch = !term || c.author.toLowerCase().includes(term) || c.content.toLowerCase().includes(term);
            return matchesStatus && matchesSearch;
        });
    }, [comments, statusFilter, search]);

    const setStatus = (id, status) => {
        setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    };

    const handleDelete = (id) => {
        if (confirm("آیا از حذف این کامنت مطمئن هستید؟")) {
            setComments((prev) => prev.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl font-bold">کامنت ها</h1>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="جستجوی نویسنده یا متن"
                    className="inputs sm:w-64"
                />
            </div>

            <div className="flex flex-row flex-wrap gap-2">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setStatusFilter(f.value)}
                        className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${statusFilter === f.value ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {filteredComments.length === 0 ? (
                <div className="table-wrap flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                    <HiOutlineChatAlt2 className="text-4xl" />
                    <span>کامنتی یافت نشد</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {filteredComments.map((comment) => (
                        <div key={comment.id} className="card-surface p-4 flex flex-col gap-2">
                            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.author}</span>
                                    <span className="text-xs text-slate-400">روی «{comment.post}»</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge tone={statusMeta[comment.status].tone}>{statusMeta[comment.status].label}</Badge>
                                    <span className="text-xs text-slate-400">{comment.date}</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{comment.content}</p>
                            <div className="flex items-center gap-3 pt-1">
                                {comment.status !== "approved" && (
                                    <button onClick={() => setStatus(comment.id, "approved")} className="text-green-600 hover:text-green-800 cursor-pointer flex items-center gap-1 text-sm">
                                        <HiOutlineCheck /> تأیید
                                    </button>
                                )}
                                {comment.status !== "spam" && (
                                    <button onClick={() => setStatus(comment.id, "spam")} className="text-amber-600 hover:text-amber-800 cursor-pointer flex items-center gap-1 text-sm">
                                        <HiOutlineX /> اسپم
                                    </button>
                                )}
                                <button onClick={() => handleDelete(comment.id)} className="text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1 text-sm">
                                    <HiOutlineTrash /> حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;
