import React from "react";

export default function Footer() {
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

    return (
        <footer className="w-100" style={footerStyle}>
            <div className="container-fluid">

                <div className="row py-5 align-items-start">
                    
                    {/* Logo */}
                    <div className="col-12 col-md-6 d-flex flex-column text-end pe-md-5">
                        <h1 className="h3 mb-0 fw-bolder" style={{ color: '#f1f8fc' }}>
                            Trouve ton artisan !
                        </h1>
                        <p className="mb-0 fw-bolder" style={{ color: '#384050' }}>
                            Avec la région<br />Auvergne-Rhône-Alpes
                        </p>
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

                {/* ligne des liens centrés */}
                <div className="row pb-4">
                    <div className="col-12 d-flex justify-content-center">
                        <ul className="d-flex justify-content-center align-items-center text-decoration-none list-unstyled m-0 p-0 gap-4">
                            <li><a href="#" className="text-decoration-none" style={{ color: "#F1F8FC" }}>Mentions légales</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: "#F1F8FC" }}>Données personnelles</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: "#F1F8FC" }}>Accessibilité</a></li>
                            <li><a href="#" className="text-decoration-none" style={{ color: "#F1F8FC" }}>Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}