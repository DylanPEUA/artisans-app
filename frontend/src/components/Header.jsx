import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

/**
 * Header
 * Composant d'en-tête principal avec logo, menu de navigation,
 * barre de recherche et menu mobile.
 *
 * @returns {JSX.Element} En-tête de l'application
 */
export default function Header() {
  const menuItems = ['Bâtiment', 'Services', 'Fabrication', 'Alimentation'];
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [artisans, setArtisans] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  /**
   * Récupère les 5 premiers artisans de l'API au focus de la barre de recherche
   */
  const handleSearchFocus = async () => {
    setShowSuggestions(true);
    try {
      const response = await api.get('/artisans');
      setArtisans(response.data.slice(0, 5));
    } catch (error) {
      console.error('Erreur lors de la récupération des artisans:', error);
    }
  };

  /**
   * Cache les suggestions avec un délai pour éviter le flickering
   */
  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  /**
   * Remplit le champ de recherche avec le nom de l'artisan sélectionné
   * @param {string} artisanName - Nom de l'artisan
   */
  const handleArtisanClick = (artisanName) => {
    setSearchValue(artisanName);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* === En-tête principal === */}
      <header className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <LogoSection />
        <DesktopMenu menuItems={menuItems} />
        <SearchBar 
          searchValue={searchValue}
          artisans={artisans}
          showSuggestions={showSuggestions}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={(e) => setSearchValue(e.target.value)}
          onArtisanClick={handleArtisanClick}
        />
        <HamburgerButton showMenu={showMenu} setShowMenu={setShowMenu} />
      </header>

      {/* === Menu mobile === */}
      {showMenu && <MobileMenu menuItems={menuItems} setShowMenu={setShowMenu} />}
    </>
  );
}

// ==================== COMPOSANTS ====================

/**
 * LogoSection
 * Affiche le logo cliquable qui redirige vers la page d'accueil
 *
 * @returns {JSX.Element} Section du logo
 */
function LogoSection() {
  const navigate = useNavigate();

  return (
    <div 
      className="d-flex align-items-center ps-3" 
      style={{ cursor: 'pointer' }} 
      onClick={() => navigate('/')}
    >
      <img
        src="/src/img/Logo.png"
        alt="Logo Trouve ton artisan"
        style={{ height: '150px', width: 'auto' }}
      />
    </div>
  );
}

/**
 * DesktopMenu
 * Affiche le menu de navigation des catégories (visible sur desktop)
 *
 * @param {string[]} menuItems - Liste des catégories
 * @returns {JSX.Element} Menu de navigation desktop
 */
function DesktopMenu({ menuItems }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <nav className="d-none d-md-flex align-items-center justify-content-center gap-3 p-3 flex-grow-1">
      {menuItems.map((item) => (
        <button
          key={item}
          className="btn-custom"
          aria-label={`Catégorie ${item}`}
          onClick={() => handleCategoryClick(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

/**
 * SearchBar
 * Barre de recherche avec suggestions d'artisans
 *
 * @param {string} searchValue - Valeur actuelle de la recherche
 * @param {Object[]} artisans - Liste des 5 premiers artisans
 * @param {boolean} showSuggestions - Affiche les suggestions
 * @param {Function} onFocus - Callback au focus
 * @param {Function} onBlur - Callback au blur
 * @param {Function} onChange - Callback au changement
 * @param {Function} onArtisanClick - Callback au clic sur un artisan
 * @returns {JSX.Element} Barre de recherche
 */
function SearchBar({ 
  searchValue, 
  artisans, 
  showSuggestions, 
  onFocus, 
  onBlur, 
  onChange, 
  onArtisanClick 
}) {
  const navigate = useNavigate();

  const handleArtisanNavigate = (artisanId) => {
    navigate(`/artisans/${artisanId}`);
    onArtisanClick('');
  };

  return (
    <div className="position-relative" style={{ minWidth: '150px', maxWidth: '250px' }}>
      {/* === Conteneur de la barre === */}
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

      {/* === Liste des artisans === */}
      {showSuggestions && artisans.length > 0 && (
        <ul className="list-group position-absolute w-100 mt-2" style={{ zIndex: 1000 }}>
          {artisans.map((artisan) => (
            <li
              key={artisan.id}
              className="list-group-item"
              onMouseDown={() => handleArtisanNavigate(artisan.id)}
              style={{ cursor: 'pointer' }}
            >
              {artisan.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * HamburgerButton
 * Bouton hamburger pour afficher/masquer le menu mobile
 *
 * @param {boolean} showMenu - État du menu mobile
 * @param {Function} setShowMenu - Fonction pour modifier l'état
 * @returns {JSX.Element} Bouton hamburger
 */
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

/**
 * MobileMenu
 * Menu de navigation des catégories pour mobile
 *
 * @param {string[]} menuItems - Liste des catégories
 * @param {Function} setShowMenu - Fonction pour masquer le menu
 * @returns {JSX.Element} Menu mobile
 */
function MobileMenu({ menuItems, setShowMenu }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setShowMenu(false);
  };

  return (
    <nav 
      className="d-md-none w-100" 
      style={{ backgroundColor: '#F1F8FC', borderBottom: '2px solid #384050' }}
    >
      <div className="d-flex flex-column gap-2 p-3">
        {menuItems.map((item) => (
          <button
            key={item}
            className="btn-custom w-100"
            aria-label={`Catégorie ${item}`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}