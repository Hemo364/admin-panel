const accents = {
    amber: "bg-amber-500",
    red: "bg-red-500",
    green: "bg-green-500",
    indigo: "bg-indigo-500",
};

const DashboardCard = ({ accent = "indigo", Icon, number, title, desc, Nweek, Nmonth }) => {
    return (
        <div className="card-surface p-5 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-start">
                <div>
                    <h4 className="text-2xl font-bold">{number}</h4>
                    <h2 className="text-sm font-medium mt-1">{title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
                </div>
                <span className={`rounded-full p-3 text-white text-lg ${accents[accent] ?? accents.indigo}`}>{Icon}</span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                <span>{Nweek} در هفته گذشته</span>
                <span>{Nmonth} در ماه گذشته</span>
            </div>
        </div>
    );
};

export default DashboardCard;
