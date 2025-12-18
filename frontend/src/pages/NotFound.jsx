/**
 * NotFound
 * Affiche une page d'erreur 404 avec une image illustrative
 * et un message simple.
 *
 * @returns {JSX.Element} Page 404
 */
export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '20px',
      backgroundColor: '#F1F8FC'
    }}>
      {/* === Titre === */}
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#384050'
      }}>
        Page non trouvée
      </h1>

      {/* === Image 404 === */}
      <img 
        src="/src/img/kostiantyn-li-Fi_nhg5itCw-unsplash.jpg" 
        alt="Error 404"
        style={{
          width: '300px',
          height: 'auto',
          borderRadius: '8px'
        }}
      />
    </div>
  );
}