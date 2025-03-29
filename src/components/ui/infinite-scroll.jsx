import * as React from 'react';

const InfiniteScroll = ({
  isLoading,
  hasMore,
  next,
  threshold = 1,
  root = null,
  rootMargin = '0px',
  reverse,
  children,
}) => {
  const observer = React.useRef(null);

  const observerRef = React.useCallback(
    (element) => {
      let safeThreshold = threshold;
      if (threshold < 0 || threshold > 1) {
        console.warn(
          'threshold should be between 0 and 1. Using default value: 1',
        );
        safeThreshold = 1;
      }
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      if (!element) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            next();
          }
        },
        { threshold: safeThreshold, root, rootMargin },
      );
      observer.current.observe(element);
    },
    [hasMore, isLoading, next, threshold, root, rootMargin],
  );

  const flattenChildren = React.useMemo(() => React.Children.toArray(children), [children]);

  return (
    <>
      {flattenChildren.map((child, index) => {
        if (!React.isValidElement(child)) {
          console.warn('Use a valid element with InfiniteScroll');
          return child;
        }

        const isObserveTarget = reverse ? index === 0 : index === flattenChildren.length - 1;
        const ref = isObserveTarget ? observerRef : null;

        return React.cloneElement(child, { ref });
      })}
    </>
  );
};

export default InfiniteScroll;
