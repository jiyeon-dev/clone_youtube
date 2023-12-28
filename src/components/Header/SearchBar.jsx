import { CiSearch } from 'react-icons/ci';
import { FaKeyboard } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { SearchWrapper } from '../../assets/wrappers/Header';
import { useState } from 'react';

const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SearchWrapper>
      <form data-focus={isFocus}>
        <span>
          <CiSearch size={20} />
        </span>

        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="검색"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        ></input>

        <button type="button" className="btn keyboard-btn" disabled>
          <FaKeyboard size={20} />
        </button>
        <button type="button" className="btn clear-btn">
          <MdClose size={24} />
        </button>
      </form>

      <button type="button" className="btn search-btn">
        <CiSearch size={24} />
      </button>
    </SearchWrapper>
  );
};
export default SearchBar;
