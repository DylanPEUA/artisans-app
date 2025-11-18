import React from "react";

export default function Home() {
  // Données des étapes pour trouver un artisan
  const steps = [
    {
      id: 1,
      title: "Choisir la catégorie d'artisanat",
      description:
        "Parcourez les différentes catégories d'artisans disponibles (menuiserie, poterie, bijouterie, couture, etc.) afin de trouver le domaine qui correspond à votre besoin ou à votre projet.",
    },
    {
      id: 2,
      title: "Choisir un artisan",
      description:
        "Consultez la liste d'artisans proposés dans la catégorie choisie. Chaque fiche présente leurs spécialités, leurs réalisations et leurs coordonnées.",
    },
    {
      id: 3,
      title: "Le contacter via le formulaire",
      description:
        "Une fois votre artisan sélectionné, utilisez le formulaire intégré au site pour envoyer votre demande ou poser vos questions.",
    },
    {
      id: 4,
      title: "Une réponse sera apportée sous 48h",
      description:
        "Après l'envoi de votre message, l'artisan ou notre équipe vous répondra sous 48h.",
    },
  ];

  // Données des artisans du mois
  const artisans = [
    {
      id: 1,
      name: "Alix Marchand",
      category: "Sculpteuse",
      rating: 4.8,
      reviews: 24,
      address: {
        street: "20 rue des Arts-et-Métiers",
        city: "Grenoble",
        zip: "38026"
      }
    },
    {
      id: 2,
      name: "Martin Lefen",
      category: "Ébéniste",
      rating: 4.9,
      reviews: 32,
      address: {
        street: "30 avenue Jean Mermoz",
        city: "Clermont-Ferrand",
        zip: "63100"
      }
    },
    {
      id: 3,
      name: "Jeanne Peau",
      category: "Cordonnière",
      rating: 4.7,
      reviews: 18,
      address: {
        street: "3 rue de Genève",
        city: "Lyon",
        zip: "69006"
      }
    },
  ];

  return (
    <>
      {/* Section des étapes */}
      <section className="container py-5 steps-section">
        {/* Titre principal */}
        <h2 className="fw-bold text-start mb-5">
          Comment trouver mon artisan ?
        </h2>

        {/* Grille des étapes (2 colonnes) */}
        <div className="row gx-4 gy-5 justify-content-center">
          {steps.map((step) => (
            <div key={step.id} className="col-md-5">
              {/* Conteneur flexbox : numéro + carte */}
              <div className="step-item d-flex gap-3 align-items-center">
                {/* Grand numéro à gauche */}
                <div className="step-number">{step.id}</div>

                {/* Carte avec description */}
                <div className="step-card p-4 flex-grow-1 text-center">
                  <h3 className="fw-bold mb-4">{step.title}</h3>
                  <p className="mb-0 small">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton d'action centré */}
        <div className="text-center mt-5">
          <button className="btn-custom">Trouver mon artisan</button>
        </div>
      </section>

      {/* Section des artisans du mois */}
      <section className="container py-5 steps-section">
        {/* Titre principal */}
        <h2 className="fw-bold text-start mb-5">
          Les trois artisans du mois
        </h2>

        {/* Grille des artisans (3 colonnes) */}
        <div className="row gx-4 gy-5 justify-content-center">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="col-md-4">
              {/* Carte artisan */}
              <div className="artisan-card rounded overflow-hidden shadow">

                {/* Contenu de la carte */}
                <div className="p-4" style={{ backgroundColor: '#F1F8FC' }}>

                  {/* Nom de l'artisan */}
                  <h3 className="h6 fw-bold mb-2" style={{ color: '#384050' }}>
                    {artisan.name}
                  </h3>

                  {/* Catégorie */}
                  <p className="mb-3 small" style={{ color: '#0074C7' }}>
                    {artisan.category}
                  </p>

                  {/* Note et avis */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="stars" style={{ color: '#FFC107' }}>
                      ★ {artisan.rating}
                    </div>
                    <span className="small text-muted">({artisan.reviews} avis)</span>
                  </div>

                  {/* Adresse */}
                  <div className="mb-3 small" style={{ color: "#384050" }}>
                    <div>{artisan.address.street}</div>
                    <div>{artisan.address.zip} {artisan.address.city}</div>
                    <div>{artisan.address.country}</div>
                  </div>

                  {/* Bouton de contact */}
                  <button className="btn-custom w-100">
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
