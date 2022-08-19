import { useState, useEffect, useRef } from "react";

export function useLocalStorage (key, defaultVal) {
    const [val, setVal] = useState(defaultVal)
    console.log('---useLocalStorage1', key);

    // 每次只要val变化 就会自动同步到本地ls
    useEffect(() => {
        window.localStorage.setItem(key, val)
        console.log('---useLocalStorage2');
    }, [val, key]) // key 只是作为useEffect里面使用，并不是依赖项

    return [val, setVal]
}

export function useWindowScroll () {
  const [y, setY] = useState(0)
  // const isInit = useRef(true)
  // const [isInit, setInit] = useState(true)
  console.log('---scroll---');
  useEffect(() => {
    // if (isInit) { 
    //   setInit(false)
    // } else {
    //   console.log('---scroll-listen---');
    //   window.addEventListener('scroll', () => {
    //     const h = document.documentElement.scrollTop
    //     setY(h)
    //   })
    // }
    console.log('---scroll-listen---');
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollTop
      setY(h)
    })
  }, [])
  return [y]
}

class NouseWindowScroll {
  constructor() {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollTop
      this.setY(h)
    })
  }

  y = 0

  setY = (h) => {
    this.y = h
  }

  getY = () => {
    return this.y
  }
}

export default new NouseWindowScroll()