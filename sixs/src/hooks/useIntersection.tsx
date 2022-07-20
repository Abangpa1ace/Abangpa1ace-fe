import { useCallback, useEffect, useState } from "react"
import throttle from 'lodash/throttle';

type OptionType = {
  root?: null,
  rootMargin?: string;
  threshold?: number;
  onIntersect: () => void;
}

const useIntersection = ({
  root,
  rootMargin = '0px',
  threshold = 0.5,
  onIntersect,
}: OptionType) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const ioCallback: IntersectionObserverCallback = useCallback(throttle(
    async ([entry], io) => {
      if (entry.isIntersecting) {
        document.body.style.overflow = 'hidden';
        io.unobserve(entry.target)
        await onIntersect();
        await io.observe(entry.target);
        return document.body.style.overflow = 'auto';
      }
    }, 1000),
  [])

  useEffect(() => {
    if (!target) return;
    const io: IntersectionObserver = new IntersectionObserver(ioCallback, { root, rootMargin, threshold })
    io.observe(target);
    return () => io.disconnect();
  }, [target, root, rootMargin, threshold, onIntersect])

  return { setTarget }
}

export default useIntersection;