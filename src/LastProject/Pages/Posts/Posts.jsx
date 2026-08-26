import { useMemo, useState } from "react";
import { HiOutlineTrash, HiOutlineDocumentText } from "react-icons/hi";
import Badge from "../../Components/Badge";
import { useLocalStorageState } from "../../Hooks/useLocalStorageState";

const initialPosts = [
    { id: 1, title: "معرفی محصولات جدید فروشگاه", author: "حسام محمدیان", status: "منتشر شده", date: "1404/05/12" },
    { id: 2, title: "راهنمای خرید کیف چرم", author: "حسین مهدوی", status: "منتشر شده", date: "1404/05/10" },
    { id: 3, title: "تخفیف‌های ویژه تابستان", author: "حسن یوسفی", status: "پیش‌نویس", date: "1404/05/08" },
    { id: 4, title: "بررسی جدیدترین ساعت‌های مچی", author: "نیکان داوری", status: "منتشر شده", date: "1404/05/05" },
    { id: 5, title: "مصاحبه با تیم طراحی محصول", author: "علیرضا فیضی", status: "پیش‌نویس", date: "1404/05/01" },
];

const statusTone = { "منتشر شده": "green", "پیش‌نویس": "amber" };

const Posts = () => {
    const [posts, setPosts] = useLocalStorageState("admin-panel:posts", initialPosts);
    const [search, setSearch] = useState("");

    const filteredPosts = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return posts;
        return posts.filter((p) => p.title.toLowerCase().includes(term) || p.author.toLowerCase().includes(term));
    }, [posts, search]);

    const handleDelete = (id) => {
        if (confirm("آیا از حذف این پست مطمئن هستید؟")) {
            setPosts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">پست ها</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">تعداد کل: {posts.length}</p>
                </div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="جستجوی عنوان یا نویسنده"
                    className="inputs sm:w-64"
                />
            </div>

            {filteredPosts.length === 0 ? (
                <div className="table-wrap flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                    <HiOutlineDocumentText className="text-4xl" />
                    <span>پستی یافت نشد</span>
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
                                    <th className="p-3">نویسنده</th>
                                    <th className="p-3">تاریخ</th>
                                    <th className="p-3">وضعیت</th>
                                    <th className="p-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <tr className="border-t border-slate-200 dark:border-slate-700" key={post.id}>
                                        <td className="p-3">{post.id}</td>
                                        <td className="p-3">{post.title}</td>
                                        <td className="p-3">{post.author}</td>
                                        <td className="p-3">{post.date}</td>
                                        <td className="p-3">
                                            <Badge tone={statusTone[post.status]}>{post.status}</Badge>
                                        </td>
                                        <td className="p-3">
                                            <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800 cursor-pointer" aria-label="حذف">
                                                <HiOutlineTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: card list */}
                    <div className="flex flex-col gap-3 sm:hidden">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="card-surface p-4 flex flex-col gap-2">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="font-medium">{post.title}</p>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-600 cursor-pointer shrink-0" aria-label="حذف">
                                        <HiOutlineTrash />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                    <span>{post.author} · {post.date}</span>
                                    <Badge tone={statusTone[post.status]}>{post.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Posts;
