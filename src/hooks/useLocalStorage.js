import { useState, useEffect } from "react";

export function useLocalStorage (key, defaultVal) {
    const {val, setVal} = useState(defaultVal)

    // 每次只要val变化 就会自动同步到本地ls
    useEffect(() => {
        window.localStorage.setItem(key, val)
    }, [val, key])

    return [val, setVal]
}