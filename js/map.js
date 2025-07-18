// Initialise la carte centrée sur l'Europe avec un zoom large
const map = L.map('map').setView([46, 6], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Charge le fichier trips.json et place les marqueurs
fetch('trips.json')
  .then(response => response.json())
  .then(trips => {
    trips.forEach(trip => {
      const marker = L.marker([trip.lat, trip.lon]).addTo(map);
      marker.bindPopup(`
        <strong>${trip.nom}</strong><br/>
        Distance : ${trip.distance}<br/>
        Dénivelé : ${trip.denivele}<br/>
        <a href="${trip.detailPage}">Voir détails</a>
      `);
    });
  })
  .catch(err => console.error('Erreur chargement trips.json', err));
