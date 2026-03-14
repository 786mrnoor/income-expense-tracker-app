
import { useEffect } from 'react';

const TITLE = 'Transaction Management';
export default function useTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${TITLE}`;
    } else {
      document.title = TITLE;
    }
  }, [title]);
}
