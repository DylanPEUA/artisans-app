// src/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import api from "../services/api"; // si tu utilises l'API
// fallback si pas d'API
const LOCAL_CATEGORIES = [
  { name: "Sculpture", slug: "sculpture" },
  { name: "Ebeniste", slug: "ebeniste" },
  { name: "Cordonnier", slug: "cordonnier" },
  { name: "Couture", slug: "couture" },
  { name: "Maroquinerie", slug: "maroquinerie" },
  { name: "Ferronnerie", slug: "ferronnerie" },
  { name: "Lutherie", slug: "lutherie" },
  { name: "Tailleur de pierre", slug: "tailleur-de-pierre" },
  { name: "Verrerie", slug: "verrerie" },
];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    // Essaie de charger depuis l'API /categories si disponible
    api.get("/categories")
      .then((res) => {
        if (mounted && Array.isArray(res.data) && res.data.length) setCategories(res.data);
      })
      .catch(() => {
        // fallback local
        if (mounted) setCategories(LOCAL_CATEGORIES);
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  return (
    <main className="container py-4">
      <h1 className="h4 mb-4">Choisissez une catégorie</h1>

      {loading ? (
        <p>Chargement…</p>
      ) : (
        <div className="row gx-4 gy-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug || c.name} category={c} />
          ))}
        </div>
      )}
    </main>
  );
}