import {useDarkMode} from "../Hooks/useDarkMode";
import {FiSun,FiMoon} from "react-icons/fi";
const DarkMode = () => {
    const {setDark,setLight}=useDarkMode();
    return (
        <span className='cursor-pointer inline-flex items-center text-xl transition-transform duration-300 dark:rotate-90'>
            <FiMoon className='dark:hidden' onClick={setDark} />
            <FiSun className='hidden dark:inline' onClick={setLight} />
        </span>
    );
};

export default DarkMode;