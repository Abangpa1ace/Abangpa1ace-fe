import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { getStorage, setStorage } from "../utilities/storage"

type OptionType = {
  behavior?: 'smooth' | 'auto' | 'instant'
}

const useScrollSave = (option?: OptionType) => {

  const handleScroll = debounce(() => setStorage('scrollY', window.scrollY, false), 500)
  
  const initScroll = () => {
    const y: number = getStorage('scrollY', false) || 0;
    const top = y > document.documentElement.clientHeight / 2 ? y : 0;
    window.scrollTo({ top });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    initScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
}

export default useScrollSave;