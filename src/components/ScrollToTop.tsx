import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** On navigation, scroll to the #hash target if there is one, otherwise to the top. */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  // `key` changes on every click, so re-clicking the same section link still scrolls.
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}
