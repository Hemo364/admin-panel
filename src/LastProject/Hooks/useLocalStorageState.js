import { useState } from "react";

export const useLocalStorageState = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setPersistedValue = (next) => {
        setValue((prev) => {
            const resolved = typeof next === "function" ? next(prev) : next;
            try {
                localStorage.setItem(key, JSON.stringify(resolved));
            } catch {
                // ignore write errors (e.g. storage full/blocked)
            }
            return resolved;
        });
    };

    return [value, setPersistedValue];
};
