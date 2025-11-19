// src/components/ArtisanCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

/**
 * ArtisanCard
 *  - artisan: { id, name, category, rating, reviews, address: {street, city, zip}}
 */
export default function ArtisanCard({ artisan }) {
  // fallback pour les éléments absents
  const street = artisan.address?.street || '';
  const city = artisan.address?.city || '';
  const zip = artisan.address?.zip || '';

  return (
    <div className="col-md-4">
      {/* Carte artisan : wrapper identique à ta Home */}
      <article className="artisan-card rounded overflow-hidden shadow" style={{ cursor: 'pointer' }}>
        <Link to={`/artisans/${artisan.id}`} className="text-reset text-decoration-none" aria-label={`Voir la fiche de ${artisan.name}`}>
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
              <RatingStars value={Number(artisan.rating) || 0} />
              <span className="small text-muted">({artisan.reviews ?? 0} avis)</span>
            </div>

            {/* Adresse */}
            <div className="mb-3 small" style={{ color: "#384050" }}>
              <div>{street}</div>
              <div>{zip} {city}</div>
            </div>

            {/* Row actions : bouton contacter + lien site si existant */}
            <div className="d-flex gap-2">
              {/* bouton contacter mène aussi à la fiche (ou tu peux lier à une ancre/contact modal) */}
              <Link to={`/artisans/${artisan.id}`} className="btn-custom w-100 d-inline-block text-center" role="button" aria-label={`Contacter ${artisan.name}`}>
                Contacter
              </Link>

            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}
