// src/components/ArtisanCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

/**
 * ArtisanCard
 * Affiche une carte artisan avec ses informations principales
 * @param {Object} artisan - Objet artisan avec id, name, specialty/speciality, etc.
 */
export default function ArtisanCard({ artisan }) {
  if (!artisan || !artisan.id) {
    return null; // Ne pas afficher si les données sont manquantes
  }

  // Récupère le nom de la spécialité (l'API retourne un objet)
  const specialityName = artisan.speciality?.name || 'Non spécifiée';
  const city = artisan.city || 'Non spécifiée';
  const rating = Number(artisan.rating) || 0;
  const reviews = artisan.reviews ?? 0;

  return (
    <div className="col-md-4">
      <article className="artisan-card rounded overflow-hidden shadow" style={{ cursor: 'pointer' }}>
        <Link 
          to={`/artisans/${artisan.id}`} 
          className="text-reset text-decoration-none" 
          aria-label={`Voir la fiche de ${artisan.name}`}
        >
          <div className="p-4" style={{ backgroundColor: '#F1F8FC' }}>

            {/* Nom de l'artisan */}
            <h3 className="h6 fw-bold mb-2" style={{ color: '#384050' }}>
              {artisan.name}
            </h3>

            {/* Spécialité */}
            <p className="mb-3 small" style={{ color: '#0074C7' }}>
              {specialityName}
            </p>

            {/* Note et avis */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <RatingStars value={rating} />
              <span className="small text-muted">({reviews} avis)</span>
            </div>

            {/* Adresse */}
            <div className="mb-3 small" style={{ color: "#384050" }}>
              <div>{city}</div>
            </div>

            {/* Bouton contacter */}
            <Link 
              to={`/artisans/${artisan.id}`} 
              className="btn-custom w-100 d-inline-block text-center" 
              role="button" 
              aria-label={`Contacter ${artisan.name}`}
            >
              Contacter
            </Link>

          </div>
        </Link>
      </article>
    </div>
  );
}
