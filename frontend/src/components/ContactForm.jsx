import React, { useState } from "react";

/**
 * ContactForm
 * Formulaire de contact pour envoyer un message à un artisan
 * @param {number} artisanId - ID de l'artisan destinataire
 * @param {string} artisanName - Nom de l'artisan destinataire
 */
export default function ContactForm({ artisanId, artisanName }) {
  // États du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  /**
   * Met à jour les champs du formulaire
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Envoie le formulaire et affiche un message de confirmation
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé:", { artisanId, artisanName, ...formData });
    setSubmitted(true);
    
    // Réinitialise le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  // Affichage du message de confirmation
  if (submitted) {
    return (
      <div className="alert alert-success" role="alert">
        ✅ Merci! Votre message a été envoyé à {artisanName}.
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 rounded"
      style={{ backgroundColor: "#0074C7", color: "white" }}
    >
      {/* === Champ Nom === */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nom
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Votre nom"
        />
      </div>

      {/* === Champ Email === */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Votre email"
        />
      </div>

      {/* === Champ Téléphone === */}
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Téléphone
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Votre téléphone"
        />
      </div>

      {/* === Champ Message === */}
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          className="form-control"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Votre message…"
        />
      </div>

      {/* === Bouton Envoyer === */}
      <button 
        type="submit" 
        className="btn w-100"
        style={{ 
          backgroundColor: isHovering ? "#2d3a47" : "#384050",
          color: "#F1F8FC",
          transition: "all 0.3s ease",
          transform: isHovering ? "scale(1.02)" : "scale(1)",
          cursor: "pointer"
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Envoyer
      </button>
    </form>
  );
}
