import React, { useState } from 'react';

export default function Header() {
  // Éléments du menu de navigation
  const menuItems = ['Bâtiment', 'Services', 'Fabrication', 'Alimentation'];
  
  // Suggestions de recherche prédéfinies
  const searchSuggestions = ['Alix Marchand', 'Martin Lefen', 'Jeanne Peau', 'Alain Gerter', 'Lara Picart'];
  
  // États pour gérer l'affichage et la valeur de la barre de recherche
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  // État pour gérer l'affichage du menu hamburger
  const [showMenu, setShowMenu] = useState(false);

  // Affiche les suggestions au focus de l'input
  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  // Cache les suggestions au blur de l'input (avec délai pour éviter le flickering)
  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Remplir l'input avec la suggestion cliquée et cache la liste
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* Header principal */}
      <header className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <LogoSection />
        <DesktopMenu menuItems={menuItems} />
        <SearchBar 
          searchValue={searchValue}
          searchSuggestions={searchSuggestions}
          showSuggestions={showSuggestions}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={(e) => setSearchValue(e.target.value)}
          onSuggestionClick={handleSuggestionClick}
        />
        <HamburgerButton showMenu={showMenu} setShowMenu={setShowMenu} />
      </header>

      {/* Menu mobile déroulant */}
      {showMenu && <MobileMenu menuItems={menuItems} setShowMenu={setShowMenu} />}
    </>
  );
}

// ==================== COMPOSANTS ==================== 

// Composant du logo
function LogoSection() {
  return (
    <div className="d-flex flex-column text-end ps-3" style={{ lineHeight: '1.2', minWidth: '200px' }}>
      <h1 className="h5 mb-0 fw-bolder" style={{ color: '#384050' }}>
        Trouve ton artisan !
      </h1>
      <p className="mb-0 fw-bolder" style={{ color: '#0074C7', fontSize: '0.8rem' }}>
        Avec la région<br />Auvergne-Rhône-Alpes
      </p>
    </div>
  );
}

// Menu desktop
function DesktopMenu({ menuItems }) {
  return (
    <nav className="d-none d-md-flex align-items-center justify-content-center gap-3 p-3 flex-grow-1">
      {menuItems.map((item) => (
        <button
          key={item}
          className="btn-custom"
          aria-label={`Catégorie ${item}`}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

// Barre de recherche
function SearchBar({ 
  searchValue, 
  searchSuggestions, 
  showSuggestions, 
  onFocus, 
  onBlur, 
  onChange, 
  onSuggestionClick 
}) {
  return (
    <div className="position-relative" style={{ minWidth: '150px', maxWidth: '250px' }}>
      <div 
        className="d-flex align-items-center gap-2 p-2"
        style={{
          borderRadius: '25px',
          border: '2px solid #384050',
          backgroundColor: '#F1F8FC'
        }}
      >
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
          alt="Icône de recherche"
          style={{ width: '20px' }}
        />
        <input
          type="text"
          className="form-control border-0 p-0"
          placeholder="Rechercher"
          style={{ backgroundColor: '#F1F8FC', fontSize: '0.9rem' }}
          onFocus={onFocus}
          onBlur={onBlur}
          value={searchValue}
          onChange={onChange}
        />
      </div>

      {/* Liste des suggestions */}
      {showSuggestions && (
        <ul className="list-group position-absolute w-100 mt-2" style={{ zIndex: 1000 }}>
          {searchSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="list-group-item"
              onMouseDown={() => onSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Bouton hamburger
function HamburgerButton({ showMenu, setShowMenu }) {
  return (
    <button
      className="d-md-none btn btn-link ms-2 p-0"
      onClick={() => setShowMenu(!showMenu)}
      aria-label="Menu de navigation"
      style={{ color: '#384050', textDecoration: 'none' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  );
}

// Menu mobile
function MobileMenu({ menuItems, setShowMenu }) {
  return (
    <nav className="d-md-none w-100" style={{ backgroundColor: '#F1F8FC', borderBottom: '2px solid #384050' }}>
      <div className="d-flex flex-column gap-2 p-3">
        {menuItems.map((item) => (
          <button
            key={item}
            className="btn-custom w-100"
            aria-label={`Catégorie ${item}`}
            onClick={() => setShowMenu(false)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}