let myMap = L.map("mapdiv"); 
// http://leafletjs.com/reference-1.3.0.html#map-l-map 

let markerGroup = L.featureGroup();
//neue Variable die featureGroup von leaflet enthält

myMap.addLayer(markerGroup);
// der Karte hinzufügen
let myLayers = {
// http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
    
    OSM: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
         {subdomains : ["a","b","c"], 
          // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
          attribution : "Datenquelle:  <a href='https://www.openstreetmap.org'>basemap.at</a>"
         // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution   
         }
        ),

    BasemapGrau: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
          }
    ),

    GeolandBasemap: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
       {
           subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
         }
    ),
    GeolandBasemapOverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", 
        
        {subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    BasemapHighDPI: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpg", 
        {subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"}
    ),
    BasemapOrthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpg", 
        {subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"}
    )};

 myMap.addLayer(myLayers.GeolandBasemap);
// http://leafletjs.com/reference-1.3.0.html#map-addlayer
myMap.addLayer(markerGroup);

myMap.setView([47.267,11.383] ,11);
// http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers

let mapControl = L.control.layers({
    "Openstreetmap" : myLayers.OSM,
    "Grundkarte" : myLayers.GeolandBasemap,
    "Grundkarte HD" : myLayers.BasemapHighDPI,
    "Orthofoto" : myLayers.BasemapOrthofoto30cm
    },
    {
    "Beschriftung" : myLayers.GeolandBasemapOverlay,
    "Marker" : markerGroup 
    }, 
    {
        collapsed: false
    //        http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed                              
    });

myMap.addControl(mapControl);

let mapScale = L.control.scale ({
    maxWidth:200, 
    metric: true, 
    imperial: false, 
    position: 'bottomleft'
}).addTo(myMap);

// http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
// http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
// http://leafletjs.com/reference-1.3.0.html#control-scale-metric

myMap.addControl(mapScale);

const uni = [47.264, 11.385]; 
const usi = [47.257, 11.356]; 
const technik = [47.263, 11.343]; 
const patscherKoo = [47.208, 11.460];
const patscherBild = "https://apps.tirol.gv.at/luft/patscherkofel.jpg"
const igls =[47.230, 11.409];
// Konstante mit Koordinaten für die Uni - wird im Marker benutzt 

const markerOptions = {
    opacity: 0.7,
    draggable: true
};

//Konstante mit Werten für die Markeroptionen

L.marker(uni, {title:"Universität Innsbruck"}, markerOptions).addTo(markerGroup);
//fügt einen Marker an der gewünschten Stelle ein - in dem Fall markerGroup

L.marker(usi, {title:"USI"}, markerOptions).addTo(markerGroup);

L.marker(technik, {title:"Technik Innsbruck"},markerOptions).addTo(markerGroup);

let patscherMarker = L.marker(patscherKoo, {title:"Patscherkofel"}).addTo(markerGroup);
patscherMarker.bindPopup("<p>Patscherkofel</p> <img style ='width:200px' src='https://apps.tirol.gv.at/luft/patscherkofel.jpg'/>")
/*marker mit Bild vom Patscherkofel: http://leafletjs.com/reference-1.3.0.html#marker-popupopen
andere Variante zu L.marker 
*/

L.marker(igls, {title:"Igls"}, markerOptions).addTo(markerGroup);
//marker von IGLS mit eigenen markerOptionen

myMap.fitBounds(markerGroup.getBounds());
//skaliert die Karte auf die Anzahl der Marker


//Linie erzeugen zwischen 2 positionen: http://leafletjs.com/reference-1.3.0.html#polyline-l-polyline

let latlngs = [
    [47.263, 11.343],
    [47.257, 11.356],
    [47.264, 11.385],
    [47.230, 11.409],
    [47.208, 11.460],
   
];
let strecke = L.polyline(latlngs, {color: 'red'}).addTo(myMap); 

//Polygone zeichnen: 
let Flaeche = L.polygon( [
     // first polygon
      [47.263, 11.343],
      [47.257, 11.356],
      [47.264, 11.385],
      [47.230, 11.409],
      [47.208, 11.460]
  ]).addTo(myMap);