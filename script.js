const map = L.map('map').setView([50.5, 10], 4); // Centre approximatif de l'Europe, zoom 4

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des randos à charger
const randos = [
  {
    nom: "GR49",
    fichier: "gpx/gr49_0.gpx",
    couleur: "red"
  }
];

// Chargement et affichage des GPX avec couleur
randos.forEach(rando => {
  omnivore.gpx(rando.fichier)
    .on('ready', function() {
      this.eachLayer(layer => {
        layer.setStyle({ color: rando.couleur });
      });
      map.fitBounds(this.getBounds()); // Ajuste la vue sur la rando chargée
    })
    .addTo(map);
});
