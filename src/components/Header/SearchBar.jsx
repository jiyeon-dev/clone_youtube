import { CiSearch } from 'react-icons/ci';
import { FaKeyboard } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { SearchWrapper } from '../../assets/wrappers/Header';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const SearchBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useGlobalContext();
  const [isFocus, setIsFocus] = useState(false);

  // re-render 시 url 에 검색어 존재하는 경우 검색창에 검색어 자동 입력
  const [params] = useSearchParams();
  const pSearchQuery = params.get('search_query');
  useEffect(() => {
    if (pSearchQuery) {
      setSearchQuery(pSearchQuery);
    }
  }, []);

  // 검색 submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    else navigate(`/results?search_query=${searchQuery}`);
  };

  return (
    <SearchWrapper>
      <form data-focus={isFocus} onSubmit={handleSubmit}>
        <span>
          <CiSearch size={20} />
        </span>

        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          placeholder="검색"
          autoComplete="false"
          value={searchQuery}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>

        <button type="button" className="btn keyboard-btn" disabled>
          <FaKeyboard size={20} />
        </button>
        <button
          type="button"
          className="btn clear-btn"
          onClick={() => setSearchQuery('')}
        >
          <MdClose size={24} />
        </button>
      </form>

      <button type="submit" className="btn search-btn" onClick={handleSubmit}>
        <CiSearch size={24} />
      </button>
    </SearchWrapper>
  );
};
export default SearchBar;
