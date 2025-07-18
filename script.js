// Crée la carte
const map = L.map('map').setView([46.5, 2.5], 6);  // Coordonnées centrées sur la France

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste de tes randonnées
const randos = [
    {
        nom: "GR 49 - 5J - 08/2024",
        fichier: "gpx/gr49_0.gpx",
        couleur: "green"
    },
];

// Charge chaque fichier GPX
randos.forEach(rando => {
    new L.GPX(rando.fichier, {
        async: true,
        polyline_options: {
            color: rando.couleur
        }
    }).on('loaded', function(e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);
});
