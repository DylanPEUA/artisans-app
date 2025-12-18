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
  const { categoryName } = useParams(); // ex: "menuiserie" ou ID
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!categoryName) {
        setArtisans([]);
        setLoading(false);
        return;
      }

      try {
        // Récupère d'abord les catégories pour trouver l'ID
        const categoriesRes = await api.get("/categories");
        
        if (!mounted) return;

        if (Array.isArray(categoriesRes.data)) {
          // Cherche la catégorie qui correspond au slug
          const category = categoriesRes.data.find(c => 
            c.name.toLowerCase().replace(/\s+/g, "-") === categoryName.toLowerCase()
          );

          if (category && mounted) {
            setCategoryTitle(category.name);
            
            // Récupère les artisans de cette catégorie
            const artisansRes = await api.get("/artisans", { params: { categoryId: category.id } });
            
            if (mounted) {
              setArtisans(Array.isArray(artisansRes.data) ? artisansRes.data : []);
            }
          } else if (mounted) {
            setArtisans([]);
          }
        }
      } catch (err) {
        console.error("Erreur:", err);
        if (mounted) setArtisans([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => { mounted = false; };
  }, [categoryName]);

  return (
    <main className="container py-4">
      {!categoryName ? (
        <>
          <h1 className="h4">Catégories</h1>
          <p>Choisissez une catégorie pour voir les artisans.</p>
          <Link to="/category" className="btn-custom">Voir les catégories</Link>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h4 mb-0">Artisans — {categoryTitle}</h1>
            <Link to="/category" className="btn btn-outline-secondary">Retour aux catégories</Link>
          </div>

          {loading ? (
            <p>Chargement…</p>
          ) : artisans.length === 0 ? (
            <p>Aucun artisan trouvé pour la catégorie <strong>{categoryTitle}</strong>.</p>
          ) : (
            <div className="row gx-4 gy-4">
              {artisans.map(a => (
                <ArtisanCard key={a.id} artisan={a} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}