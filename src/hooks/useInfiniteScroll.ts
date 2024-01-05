import { MutableRefObject, useRef, useEffect, useCallback } from 'react';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

interface InfiniteScrollProps {
  root?: Element | null;
  rootMargin?: string; // root 의 margin 값
  // target element 가 root 와 몇 % 교차했을 때, callback 을 실행할지 결정하는 값
  target: MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
  targetArray: Array<any>; // 관찰을 할 Array
  // 리스트의 갯수중 불러올 시점 (pageSize가 20이고 endPoint가 5라면, 15번째 리스트 아이템을 관찰)
  endPoint?: number;
}

const useInfiniteScroll = (
  onIntersect: IntersectHandler,
  options?: InfiniteScrollProps,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const opt = Object.assign(
    {
      root: null,
      target: ref,
      threshold: 1,
      rootMargin: '20px',
      endPoint: 1,
    },
    options,
  );

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!opt.target || !opt.target.current) return;

    // 다시 관측할 마지막 요소
    const newLastChild: Element =
      opt.target.current.children[
        opt.target.current.children.length - opt.endPoint
      ];

    if (newLastChild) {
      const observer = new IntersectionObserver(callback, opt);
      observer.observe(newLastChild);
      return () => observer.disconnect();
    }
  }, [opt, callback]);

  return ref;
};

export default useInfiniteScroll;
