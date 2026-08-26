import { useMemo, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineClipboardList } from "react-icons/hi";
import Badge from "../../Components/Badge";
import AddTaskModal from "./AddTaskModal";
import { useLocalStorageState } from "../../Hooks/useLocalStorageState";

const initialTasks = [
    { id: 1, title: "طراحی صفحه فرود محصول جدید", assignee: "حسام محمدیان", priority: "high", status: "in-progress", dueDate: "1404/05/20" },
    { id: 2, title: "بررسی باگ‌های گزارش‌شده کاربران", assignee: "حسین مهدوی", priority: "high", status: "todo", dueDate: "1404/05/18" },
    { id: 3, title: "نگارش محتوای پست وبلاگ", assignee: "حسن یوسفی", priority: "medium", status: "todo", dueDate: "1404/05/22" },
    { id: 4, title: "تست نهایی سبد خرید", assignee: "نیکان داوری", priority: "medium", status: "done", dueDate: "1404/05/10" },
    { id: 5, title: "به‌روزرسانی مستندات API", assignee: "علیرضا فیضی", priority: "low", status: "done", dueDate: "1404/05/05" },
];

const priorityMeta = {
    low: { label: "کم", tone: "slate" },
    medium: { label: "متوسط", tone: "amber" },
    high: { label: "بالا", tone: "red" },
};

const statusFilters = [
    { value: "all", label: "همه" },
    { value: "todo", label: "در انتظار" },
    { value: "in-progress", label: "در حال انجام" },
    { value: "done", label: "انجام شده" },
];

const Tasks = () => {
    const [tasks, setTasks] = useLocalStorageState("admin-panel:tasks", initialTasks);
    const [statusFilter, setStatusFilter] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);

    const filteredTasks = useMemo(() => {
        if (statusFilter === "all") return tasks;
        return tasks.filter((t) => t.status === statusFilter);
    }, [tasks, statusFilter]);

    const toggleDone = (id) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t)));
    };

    const handleDelete = (id) => {
        if (confirm("آیا از حذف این تسک مطمئن هستید؟")) {
            setTasks((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const handleSave = (task) => {
        setTasks((prev) => [...prev, task]);
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl font-bold">تسک ها</h1>
                <button onClick={() => setModalOpen(true)} className="btn-primary self-start sm:self-auto">
                    <HiOutlinePlus />
                    <span>افزودن تسک</span>
                </button>
            </div>

            <div className="flex flex-row flex-wrap gap-2">
                {statusFilters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setStatusFilter(f.value)}
                        className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${statusFilter === f.value ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {modalOpen && <AddTaskModal onClose={() => setModalOpen(false)} onSave={handleSave} />}

            {filteredTasks.length === 0 ? (
                <div className="table-wrap flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                    <HiOutlineClipboardList className="text-4xl" />
                    <span>تسکی یافت نشد</span>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="card-surface p-4 flex flex-row items-center gap-3">
                            <input
                                type="checkbox"
                                checked={task.status === "done"}
                                onChange={() => toggleDone(task.id)}
                                className="size-5 accent-indigo-600 cursor-pointer shrink-0"
                                aria-label="انجام شد"
                            />
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium ${task.status === "done" ? "line-through text-slate-400" : ""}`}>{task.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{task.assignee} · سررسید {task.dueDate}</p>
                            </div>
                            <Badge tone={priorityMeta[task.priority].tone}>{priorityMeta[task.priority].label}</Badge>
                            <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-800 cursor-pointer shrink-0" aria-label="حذف">
                                <HiOutlineTrash />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tasks;
