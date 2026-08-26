import { NavLink, useLocation } from 'react-router';
import DarkMode from '../../Components/DarkMode';
import { HiMenu, HiUsers, HiDocumentText, HiChatAlt2, HiClipboardList } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { LuGauge } from "react-icons/lu";
import Logo from '../../Components/Logo';

const navItems = [
    { to: "/dashboard", label: "داشبورد", Icon: LuGauge },
    { to: "/ManageSortingItems", label: "مدیریت دسته بندی محصولات", Icon: MdCategory },
    { to: "/users", label: "کاربران", Icon: HiUsers },
    { to: "/posts", label: "پست ها", Icon: HiDocumentText },
    { to: "/comments", label: "کامنت ها", Icon: HiChatAlt2 },
    { to: "/tasks", label: "تسک ها", Icon: HiClipboardList },
];

const SideBar = ({ open, isOpen, mobileOpen, setMobileOpen }) => {
    const expanded = open || mobileOpen;
    const location = useLocation();
    const activeItem = navItems.find((item) => item.to === location.pathname);

    const handleSideBar = () => {
        isOpen(!open);
    }

    const linkClass = ({ isActive }) =>
        `sideBarItems flex items-center gap-3 ${expanded ? "" : "justify-center"} ${isActive ? "bg-indigo-600 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-600" : ""}`;

    return (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <div
                className={`fixed flex shadow-xl flex-col items-center top-0 right-0 z-40 transition-all duration-300 ${open ? "w-64" : "md:w-20 w-64"} h-screen bg-white dark:bg-slate-800 dark:text-slate-300 border-l border-slate-200 dark:border-slate-700 ${mobileOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
            >
                <div className='flex justify-between px-4 w-full items-center h-16 bg-indigo-600 text-white shrink-0'>
                    <h1 className='text-lg font-bold'>{expanded && "پنل مدیریت"}</h1>
                    <div className="flex items-center gap-3">
                        <DarkMode />
                        <HiMenu className='cursor-pointer text-xl hidden md:block' onClick={handleSideBar} />
                        <HiMenu className='cursor-pointer text-xl md:hidden' onClick={() => setMobileOpen(false)} />
                    </div>
                </div>
                <div className='flex flex-col gap-1 p-3 w-full overflow-y-auto'>
                    <Logo expanded={expanded} Icon={activeItem?.Icon} />
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} className={linkClass} onClick={() => setMobileOpen(false)} title={expanded ? undefined : label}>
                            <Icon className="shrink-0 text-lg" />
                            {expanded && <span className="whitespace-nowrap">{label}</span>}
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideBar;
