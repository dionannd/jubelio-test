import { useEffect, useState } from 'react';

const useMediaQuery = (minWidth: number) => {
  const [state, setState] = useState({
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    isDesiredWidth:
      typeof window !== 'undefined' && window?.innerWidth < minWidth,
  });

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      const isDesiredWidth = currentWindowWidth < minWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.windowWidth]);

  return state.isDesiredWidth;
};

export default useMediaQuery;
