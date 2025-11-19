import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import ArtisanCard from "../components/ArtisanCard";

// fallback data si pas d'API
const LOCAL_ARTISANS = [
  { id: 1, name: "Alix Marchand", category: "Sculpture", rating: 4.5, reviews: 12, address: { street: "20 rue des Arts-et-Métiers", city: "Grenoble", zip: "38026" } },
  { id: 2, name: "Martin Lefen", category: "Ebeniste", rating: 4.7, reviews: 20, address: { street: "30 avenue Jean Mermoz", city: "Clermont-Ferrand", zip: "63100" } },
  { id: 3, name: "Jeanne Peau", category: "Cordonnier", rating: 4.2, reviews: 8, address: { street: "3 rue de Genève", city: "Lyon", zip: "69006" } },
];

export default function Category() {
  const { categoryName } = useParams(); // ex: "menuiserie"
  const decoded = categoryName ? decodeURIComponent(categoryName) : null;
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!decoded) {
      // si pas de param, rediriger vers liste de catégories ou afficher message
      setArtisans([]);
      setLoading(false);
      return;
    }

    // Requête API : on suppose endpoint /artisans?category=menuiserie (case-insensitive selon serveur)
    api.get("/artisans", { params: { category: decoded } })
      .then((res) => {
        if (mounted) {
          // si API renvoie vide, tu peux fallback sur LOCAL_ARTISANS filtrés
          const data = Array.isArray(res.data) ? res.data : [];
          if (data.length) setArtisans(data);
          else {
            // fallback local filtering (insensible à la casse)
            const fallback = LOCAL_ARTISANS.filter(a => (a.category || "").toLowerCase() === (decoded || "").toLowerCase());
            setArtisans(fallback);
          }
        }
      })
      .catch(() => {
        if (mounted) {
          const fallback = LOCAL_ARTISANS.filter(a => (a.category || "").toLowerCase() === (decoded || "").toLowerCase());
          setArtisans(fallback);
        }
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [decoded]);

  return (
    <main className="container py-4">
      {!decoded ? (
        <>
          <h1 className="h4">Catégories</h1>
          <p>Choisissez une catégorie pour voir les artisans.</p>
          <Link to="/category" className="btn-custom">Voir les catégories</Link>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h4 mb-0">Artisans — {decoded}</h1>
            <Link to="/category" className="btn btn-outline-secondary">Retour aux catégories</Link>
          </div>

          {loading ? (
            <p>Chargement…</p>
          ) : artisans.length === 0 ? (
            <p>Aucun artisan trouvé pour la catégorie <strong>{decoded}</strong>.</p>
          ) : (
            <div className="row gx-4 gy-4">
              {artisans.map(a => (
                // ArtisanCard attend un objet artisan comme dans Home
                <ArtisanCard key={a.id} artisan={a} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}