import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { getStorage, setStorage } from "../utilities/storage"

type ReturnType = {
  initScroll: () => void;
}

const useScrollSave = (): ReturnType => {

  const handleScroll = debounce(() => setStorage('scrollY', window.scrollY, false), 500)
  
  const initScroll = async () => {
    const y: number = getStorage('scrollY', false) || 0;
    const top = y > document.documentElement.clientHeight / 2 ? y : 0;
    await window.scrollTo({ top });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return { initScroll }
}

export default useScrollSave;