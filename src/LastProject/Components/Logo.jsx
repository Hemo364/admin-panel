import { LuGauge } from "react-icons/lu";

const Logo = ({ expanded, Icon = LuGauge }) => {
    return (
        <div
            className={`mx-auto my-3 rounded-2xl shrink-0 flex items-center justify-center shadow-lg shadow-indigo-500/30 bg-linear-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white transition-all duration-300 ${expanded ? "size-20" : "size-12"}`}
        >
            <Icon className={`transition-all duration-300 ${expanded ? "text-4xl" : "text-2xl"}`} />
        </div>
    );
};

export default Logo;
