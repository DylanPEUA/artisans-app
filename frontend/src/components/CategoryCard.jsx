import React from "react";
import { Link } from "react-router-dom";

/**
 * CategoryCard
 * Props:
 *  - category: { name: string, slug?: string }
 * Rendu minimaliste : nom de la catégorie. Cliquable (Link vers /category/:slug)
 */
export default function CardCategory({ category }) {
  const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="col-md-4">
      <Link to={`/category/${encodeURIComponent(slug)}`} className="text-reset text-decoration-none" aria-label={`Voir les artisans ${category.name}`}>
        <article className="category-card rounded shadow-sm" style={{ background: "#ffffff", padding: "1.25rem" }}>
          <h3 className="h6 fw-bold mb-0" style={{ color: "#0074C7" }}>{category.name}</h3>
        </article>
      </Link>
    </div>
  );
}