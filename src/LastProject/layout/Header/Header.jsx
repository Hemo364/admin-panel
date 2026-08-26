import moment from "moment-jalaali";
import { HiMenu } from "react-icons/hi";

const daysInWeek = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه"
]
const monthInYear = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
]
const Header = ({ open, mobileOpen, setMobileOpen }) => {
    const now = moment();
    const date = `${daysInWeek[now.day()]} ${now.jDate()} ${monthInYear[now.jMonth()]} ${now.jYear()}`;
    const time = now.format("HH:mm");
    return (
        <header className={`fixed flex flex-row justify-between items-center transition-all duration-300 top-0 right-0 left-0 h-16 z-20 bg-white dark:bg-slate-800 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 px-4 ${open ? "md:pr-64" : "md:pr-20"}`}>
            <button
                className="md:hidden text-2xl text-slate-600 dark:text-slate-300 cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="باز کردن منو"
            >
                <HiMenu />
            </button>
            <div className="hidden sm:flex flex-row gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>{date}</span>
                <span>{time}</span>
            </div>
            <h2 className='font-medium'>مدیر سیستم</h2>
        </header>
    );
};

export default Header;
