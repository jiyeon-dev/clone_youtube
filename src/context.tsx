import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isYouTubeApiReady, setIsYouTubeApiReady] = useState(false);

  // Youtube API 추가
  const initializeYouTubeApi = () => {
    if (!isYouTubeApiReady) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsYouTubeApiReady(true);
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
        searchQuery,
        setSearchQuery,
        isYouTubeApiReady,
        initializeYouTubeApi,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

/**
 * chip 비디오 검색 조건 저장
 */
const SearchContext = createContext({});
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchOption, setSearchOption] = useState({});

  return (
    <SearchContext.Provider
      value={{
        searchOption,
        setSearchOption,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
