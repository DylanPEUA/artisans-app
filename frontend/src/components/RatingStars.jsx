import React from 'react';

/**
 * Affiche la note en étoiles et la valeur numérique.
 * value: nombre décimal ex: 4.5
 * max: nombre d'étoiles (par défaut 5)
 */
export default function RatingStars({ value = 0, max = 5 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = max - full - (half ? 1 : 0);

  const stars = [];
  for (let i = 0; i < full; i++) stars.push(<span key={`full-${i}`} aria-hidden>★</span>);
  if (half) stars.push(<span key="half" aria-hidden>☆</span>);
  for (let i = 0; i < empty; i++) stars.push(<span key={`empty-${i}`} aria-hidden>☆</span>);

  return (
    <div className="rating-stars" aria-label={`Note : ${value} sur ${max}`} style={{ color: '#FFC107', fontSize: 14, lineHeight: 1 }}>
      <span aria-hidden style={{ marginRight: 6 }}>{stars}</span>
      <span className="small text-muted" style={{ color: '#6B7280' }}>{value.toFixed(1)}</span>
    </div>
  );
}