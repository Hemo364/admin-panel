import SalesChart from './SalesChart.jsx';
import DashboardCard from './DashboardCard';
import { HiUsers, HiDocumentText, HiChatAlt2, HiClipboardList } from "react-icons/hi";

const lowStockItems = [
    { id: 1, category: 'دسته شماره ۱', title: 'محصول کیف چرم', status: 'پایان یافته' },
    { id: 2, category: 'دسته شماره ۲', title: 'محصول کفش اسپرت', status: 'پایان یافته' },
    { id: 3, category: 'دسته شماره ۳', title: 'محصول ساعت مچی', status: 'پایان یافته' },
    { id: 4, category: 'دسته شماره ۴', title: 'محصول عینک آفتابی', status: 'پایان یافته' },
    { id: 5, category: 'دسته شماره ۵', title: 'محصول کوله پشتی', status: 'پایان یافته' },
];

const Dashboard = () => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
                <DashboardCard
                    accent="amber"
                    Icon={<HiClipboardList />}
                    number={"7"}
                    title={"سبد خرید امروز"}
                    desc={"سبد های خرید مانده امروز"}
                    Nweek={"13"}
                    Nmonth={"18"}
                />
                <DashboardCard
                    accent="red"
                    Icon={<HiChatAlt2 />}
                    number={"5"}
                    title={"سفارشات مانده امروز"}
                    desc={"سفارشات معلق و فاقد پرداختی"}
                    Nweek={"9"}
                    Nmonth={"16"}
                />
                <DashboardCard
                    accent="green"
                    Icon={<HiDocumentText />}
                    number={"45"}
                    title={"سفارشات امروز"}
                    desc={"سفارشات کامل و دارای پرداختی"}
                    Nweek={"263"}
                    Nmonth={"1038"}
                />
                <DashboardCard
                    accent="indigo"
                    Icon={<HiUsers />}
                    number={"1,500,000"}
                    title={"درآمد امروز"}
                    desc={"جمع مبلغ پرداختی (تومان)"}
                    Nweek={"6,380,000"}
                    Nmonth={"22,480,000"}
                />
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold'>محصولات رو به اتمام</h3>
                    <div className="table-wrap hidden sm:block">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    <th className="p-3">#</th>
                                    <th className="p-3">دسته</th>
                                    <th className="p-3">عنوان</th>
                                    <th className="p-3">وضعیت</th>
                                    <th className="p-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowStockItems.map((item) => (
                                    <tr className="border-t border-slate-200 dark:border-slate-700" key={item.id}>
                                        <td className="p-3">{item.id}</td>
                                        <td className="p-3">{item.category}</td>
                                        <td className="p-3">{item.title}</td>
                                        <td className="p-3">{item.status}</td>
                                        <td className="p-3 text-red-600 font-bold cursor-pointer">×</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col gap-2 sm:hidden">
                        {lowStockItems.map((item) => (
                            <div key={item.id} className="card-surface p-3 flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{item.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.category} · {item.status}</p>
                                </div>
                                <button className="text-red-600 font-bold cursor-pointer shrink-0" aria-label="حذف">×</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold'>روند فروش</h3>
                    <SalesChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
