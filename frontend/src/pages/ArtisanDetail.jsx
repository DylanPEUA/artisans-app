import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import RatingStars from "../components/RatingStars";
import ContactForm from "../components/ContactForm";

/**
 * ArtisanDetail
 * Page affichant les détails complets d'un artisan
 * Récupère les données depuis l'API en fonction de l'ID
 */
export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Récupère les détails de l'artisan au montage du composant
   */
  useEffect(() => {
    let mounted = true;

    const fetchArtisan = async () => {
      try {
        const response = await api.get(`/artisans/${id}`);
        if (mounted) {
          setArtisan(response.data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Erreur chargement artisan:", err);
          setError("Impossible de charger les détails de l'artisan");
          setArtisan(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArtisan();

    return () => { mounted = false; };
  }, [id]);

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="container py-5">
        <p>Chargement…</p>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error || "Artisan non trouvé"}
        </div>
      </div>
    );
  }

  // Extraction des données
  const rating = Number(artisan.rating) || 0;
  const specialityName = artisan.speciality?.name || "Non spécifiée";

  return (
    <main className="container py-5">
      {/* === Section Entête === */}
      <div className="row mb-5">
        {/* Photo */}
        <div className="col-md-4 mb-4">
          <div 
            className="rounded" 
            style={{ 
              backgroundColor: "#E8E8E8", 
              height: "400px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#999",
              fontSize: "18px"
            }}
          >
            Photo
          </div>
        </div>

        {/* Informations artisan */}
        <div className="col-md-8 mb-4">
          {/* Nom */}
          <h1 
            className="fw-bold mb-3" 
            style={{ fontSize: "32px", color: "#384050" }}
          >
            {artisan.name}
          </h1>

          {/* Note et avis */}
          <div className="mb-3">
            <RatingStars value={rating} />
          </div>

          {/* Spécialité */}
          <p 
            className="mb-3 small" 
            style={{ color: "#0074C7" }}
          >
            {specialityName}
          </p>

          {/* Coordonnées */}
          <div 
            className="mb-4 small" 
            style={{ color: "#384050" }}
          >
            <p className="mb-1">{artisan.city || "Non spécifiée"}</p>
            {artisan.phone && <p className="mb-0">{artisan.phone}</p>}
            {artisan.email && <p className="mb-0">{artisan.email}</p>}
          </div>

          {/* Description */}
          <p style={{ color: "#384050", lineHeight: "1.6" }}>
            {artisan.description || "Pas de description disponible"}
          </p>
        </div>
      </div>

      <hr />

      {/* === Section Contact et À propos === */}
      <div className="row mt-5">
        {/* Formulaire de contact */}
        <div className="col-md-6 mb-4">
          <h2 className="fw-bold mb-4">
            Formulaire de contact :
          </h2>
          <ContactForm 
            artisanId={artisan.id} 
            artisanName={artisan.name} 
          />
        </div>

        {/* À propos */}
        <div className="col-md-6 mb-4">
          <h2 className="fw-bold mb-4">
            À propos :
          </h2>
          <p style={{ color: "#384050", lineHeight: "1.6" }}>
            {artisan.description || "Pas d'information supplémentaire disponible"}
          </p>
        </div>
      </div>
    </main>
  );
}