// src/hooks/useInfiniteScroll.js
import { useEffect } from 'react';

const useInfiniteScroll = (fetchData) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        fetchData();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchData]);
};
export default useInfiniteScroll;