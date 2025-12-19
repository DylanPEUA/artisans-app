import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Footer
 * Composant de pied de page avec logo, titre et informations de contact
 *
 * @returns {JSX.Element} Pied de page de l'application
 */
export default function Footer() {
  const navigate = useNavigate();

  // === Styles ===
  const footerStyle = {
    backgroundColor: "#0074C7",
  };

  const addressTitleStyle = {
    color: "#F1F8FC",
  };

  const addressTextStyle = {
    color: "#F1F8FC",
    marginTop: "0.5rem",
  };

  const linkStyle = {
    color: "#F1F8FC",
    textDecoration: "none",
  };

  /**
   * Redirige vers la page d'accueil
   */
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <footer className="w-100" style={footerStyle}>
      <div className="container-fluid">

        {/* === Section principale : Logo + Adresse === */}
        <div className="row py-5 align-items-start">
          
          {/* Logo cliquable */}
          <div className="col-12 col-md-6 d-flex flex-column text-start ps-md-0">
            <img
              src="/src/img/Logo.png"
              alt="Logo Trouve ton artisan"
              style={{
                width: '250px',
                height: 'auto',
                objectFit: 'contain',
                paddingLeft: '20px',
                cursor: 'pointer'
              }}
              onClick={handleLogoClick}
            />
          </div>

          {/* Adresse */}
          <div className="col-12 col-md-4 offset-md-2 d-flex flex-column text-md-start text-start mt-4 mt-md-0">
            <h3 className="h5 mb-3 fw-bolder" style={addressTitleStyle}>
              Lyon
            </h3>

            <div style={addressTextStyle}>
              <div>101 cours Charlemagne</div>
              <div>CS 20033</div>
              <div>69269 LYON CEDEX 02</div>
              <div className="mt-2">France</div>
              <div className="mt-2">+33 (0)4 26 73 40 00</div>
            </div>
          </div>

        </div>

        {/* === Section liens centrés === */}
        <div className="row pb-4">
          <div className="col-12 d-flex justify-content-center">
            <ul className="d-flex justify-content-center align-items-center text-decoration-none list-unstyled m-0 p-0 gap-4">
              <li><a href="#" style={linkStyle}>Mentions légales</a></li>
              <li><a href="#" style={linkStyle}>Données personnelles</a></li>
              <li><a href="#" style={linkStyle}>Accessibilité</a></li>
              <li><a href="#" style={linkStyle}>Cookies</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}