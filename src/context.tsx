import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppContext.Provider
      value={{ isNavOpen, setIsNavOpen, searchQuery, setSearchQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
