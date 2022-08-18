import { useState, useEffect } from "react";

export function useLocalStorage (key, defaultVal) {
    const [val, setVal] = useState(defaultVal)
    console.log('---useLocalStorage1');

    // 每次只要val变化 就会自动同步到本地ls
    useEffect(() => {
        window.localStorage.setItem(key, val)
        console.log('---useLocalStorage2');
    }, [val, key])

    return [val, setVal]
}

export function useWindowScroll () {
  const [y, setY] = useState(0)
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollTop
    setY(h)
  })
  return [y]
}