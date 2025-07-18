// couleurParType est déjà défini dans colors.js

// Initialise la carte centrée sur l'Europe
const map = L.map('map').setView([46, 6], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Charge trips.json et place les marqueurs avec couleur selon type
fetch('trips.json')
  .then(response => response.json())
  .then(trips => {
    trips.forEach(trip => {
      const couleur = couleurParType[trip.type] || "gray"; // gris par défaut

      const marker = L.circleMarker([trip.lat, trip.lon], {
        radius: 8,
        fillColor: couleur,
        color: couleur,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(`
        <strong>${trip.nom}</strong><br/>
        Distance : ${trip.distance}<br/>
        Dénivelé : ${trip.denivele}<br/>
        <a href="${trip.detailPage}">Voir détails</a>
      `);
    });
  })
  .catch(err => console.error('Erreur chargement trips.json', err));
