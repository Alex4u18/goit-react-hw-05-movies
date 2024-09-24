import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function Header({ onSearch }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);

    if (searchQuery && !searchHistory.includes(searchQuery)) {
      const updatedHistory = [searchQuery, ...searchHistory].slice(0, 5); 
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
    setSearchQuery(''); 
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleHistoryClick = query => {
    setSearchQuery(query);
    setDropdownVisible(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/movies" className={styles.link}>
          Movies
        </Link>
      </nav>

      {location.pathname === '/movies' && (
        <div className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder=" "
              className={styles.customInput}
              id="searchInput"
            />
            <label htmlFor="searchInput" className={styles.customLabel}>
              Search for movies...
            </label>
          </div>

          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>

          <div className={styles.historyContainer}>
            <button onClick={toggleDropdown} className={styles.historyButton}>
              ▼
            </button>

            {dropdownVisible && (
              <ul className={styles.dropdown}>
                {searchHistory.length > 0 ? (
                  searchHistory.map((query, index) => (
                    <li
                      key={index}
                      className={styles.historyItem}
                      onClick={() => handleHistoryClick(query)}
                    >
                      {query}
                    </li>
                  ))
                ) : (
                  <li className={styles.noHistory}>No search history</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
