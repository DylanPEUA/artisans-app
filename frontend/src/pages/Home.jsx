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

  return (
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
  );
}
