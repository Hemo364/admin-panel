import { useCallback,useEffect } from "react";
export const useDarkMode=()=>{
    const setDark=useCallback(()=>{
        document.body.classList.add("dark");
        localStorage.setItem("darkMode","1");
    },[])
    const setLight=useCallback(()=>{
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode","0");
    },[])
    const isDark =useCallback(()=>{
        const status=localStorage.getItem("darkMode");
        return Number(status);
    },[])
    const initDarkMode=useCallback(()=>{
        if(isDark()) setDark();
    },[isDark,setDark])
    useEffect(()=>{
        initDarkMode();
    },[initDarkMode]);

    return{
        setDark,
        setLight,
        isDark,
    }
}