// Leaflet Karte initialisieren
let karte = L.map("divKarte");

// Gruppe für GeoJSON Layer definieren
let geojsonGruppe = L.featureGroup().addTo(karte);

// Grundkartenlayer definieren
const grundkartenLayer = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
}

// Map control mit Grundkarten und GeoJSON Overlay definieren
let kartenAuswahl = L.control.layers({
    "Openstreetmap": grundkartenLayer.osm,
    "basemap.at Grundkarte": grundkartenLayer.geolandbasemap,
    "basemap.at grau": grundkartenLayer.bmapgrau,
    "basemap.at Orthofoto": grundkartenLayer.bmaporthofoto30cm,
}, {
    "GeoJSON Layer": geojsonGruppe,
});
karte.addControl(kartenAuswahl);

// Grundkarte "grau" laden
karte.addLayer(grundkartenLayer.bmapgrau)

// Maßstabsleiste metrisch hinzufügen
L.control.scale({
    maxWidth: 200,
    imperial: false,
}).addTo(karte);

// asynchrone Funktion zum Laden eines GeoJSON Layers
async function ladeGeojsonLayer(url) {
    const response = await fetch(url);
    const response_json = await response.json();

    // GeoJSON Geometrien hinzufügen und auf Ausschnitt zoomen
    const geojsonObjekt = L.geoJSON(response_json);
    geojsonGruppe.addLayer(geojsonObjekt);
    karte.fitBounds(geojsonGruppe.getBounds());
}

// den GeoJSON Layer für Grillplätze laden
ladeGeojsonLayer("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:GRILLPLATZOGD&srsName=EPSG:4326&outputFormat=json");


// ##########AB HIER WL 9:   ##########

// den ersten GeoJSON Layer laden
let jsonUrl = wienDatensaetze[0].json;
ladeGeojsonLayer(jsonUrl);

// Auswahlmenü generieren
let layerAuswahl = document.getElementById("layerAuswahl");
for (datensatz of wienDatensaetze) {
    //console.log(datensatz.titel)
    layerAuswahl.innerHTML += `<option value="${datensatz.json}">${datensatz.titel}</option>`
};

// nach Wechsel im Auswahlmenü neuen Datensatz laden
layerAuswahl.onchange = function(evt) {
    //console.log(evt)
    let jsonUrl = evt.target.value;
    ladeGeojsonLayer(jsonUrl);
};

//löschen des bestehende Datensä
layerAuswahl.onchange = function(evt) {
    geojsonGruppe.clearLayers();
    // ...
};

// Datenobjekt vor dem Erzeugen des Menüs alphabetisch nach dem Titel sortieren
wienDatensaetze.sort(function(a,b) {
    if (a.titel < b.titel) {
        return -1;
    } else if (a.titel > b.titel) {
        return 1;
    } else {
        return 0;
    }
});

//POpup mit attributen erzeugen: 
const geojsonObjekt = L.geoJSON(response_json, {
    onEachFeature : function(feature,layer) {
        // Popup mit allen Properties und maximal 600 Pixel Breite hinzufügen
        let popup = "<h3>Attribute</h3>";
        for (attribut in feature.properties) {
            let wert = feature.properties[attribut];
            popup += `${attribut}: ${wert}<br/>`;
             if (wert && wert.toString().startsWith("http:")) {
        // Hyperlink zur angegebenen URL erzeugen
        popup += `${attribut}: <a href="${wert}">Weblink</a><br/>`;
    } else {
        // Attribut und Wert ohne Verlinkung anzeigen
        popup += `${attribut}: ${wert}<br/>`;
    };

        }
        layer.bindPopup(popup, {
            maxWidth : 600,
        });
    }
});

geojsonGruppe.addLayer(geojsonObjekt);
karte.fitBounds(geojsonGruppe.getBounds());



