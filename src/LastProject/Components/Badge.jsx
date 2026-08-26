const tones = {
    green: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
    red: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

const Badge = ({ tone = "slate", children }) => {
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone] ?? tones.slate}`}>
            {children}
        </span>
    );
};

export default Badge;
