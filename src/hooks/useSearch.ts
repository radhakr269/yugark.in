import { useState } from 'react';

export function useSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);

  return { isOpen, openSearch, closeSearch };
}
