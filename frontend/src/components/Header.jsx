import React, { useState } from 'react';

export default function Header() {
  const menuItems = ['Bâtiment', 'Services', 'Fabrication', 'Alimentation'];
  const searchSuggestions = ['Alix Marchand', 'Martin Lefen', 'Jeanne Peau', 'Alain Gerter', 'Lara Picart'];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <header className="d-flex align-items-center justify-content-between p-3 border-bottom">

      {/* Logo */}
      <div className="d-flex flex-column text-end pe-3" style={{ lineHeight: '1.2' }}>
        <h1 className="h3 mb-0 fw-bolder" style={{ color: '#384050' }}>
          Trouve ton artisan !
        </h1>
        <p className="mb-0 fw-bolder" style={{ color: '#0074C7' }}>
          Avec la région<br />Auvergne-Rhône-Alpes
        </p>
      </div>

      {/* Menu */}
      <nav className='d-flex align-items-center justify-content-center gap-3 p-3 flex-grow-1'>
        {menuItems.map((item) => (
          <button
            key={item}
            className="btn-custom"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Search bar */}
      <div className="position-relative" style={{ minWidth: '200px' }}>
        <div className="d-flex align-items-center gap-2 p-2 border rounded bg-white">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
            alt="Icône de recherche"
            style={{ width: '20px' }}
          />
          <input
            type="text"
            className="form-control border-0 p-0"
            placeholder="Rechercher"
            aria-label="Rechercher"
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && (
          <ul className="list-group position-absolute w-100 mt-2" style={{ zIndex: 1000 }}>
            {searchSuggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="list-group-item"
                onMouseDown={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

    </header>

  );
}