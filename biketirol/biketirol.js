

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen


let myMap = L.map("map", {
    fullscreenControl: true,
});


let tirolTrack = L.featureGroup();

let markerGroup = L.featureGroup().addTo(myMap);


const myLayers = {
    osm: L.tileLayer(          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),


    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],                          // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"    // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution
        }
    ),



    map_sommer: L.tileLayer(
         "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>"
        }
    ),

    map_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>"
        }
    ),

    map_ortho: L.tileLayer(
         "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>"
        }
    ),
    
      gdi_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
        }
    ),  
    

};



// Layergruppen für die Elektronische Karte Tirol definieren
const mapSommer = L.layerGroup([
    myLayers.map_sommer,
    myLayers.gdi_nomenklatur
]);
const mapWinter = L.layerGroup([
    myLayers.map_winter,
    myLayers.gdi_nomenklatur
]);
const mapOrtho = L.layerGroup([
    myLayers.map_ortho,
    myLayers.gdi_nomenklatur
]);




let myMapControl = L.control.layers({       
    
    "Openstreetmap": myLayers.osm,
    "Basemap": myLayers.geolandbasemap,
    "Sommerkarte": myLayers.map_sommer,
    "Winterkarte": myLayers.map_winter,
 //   "Orthophoto": myLayers.map_ortho,
    "Sommerkarte" : mapSommer,
    "Winterkarte" : mapWinter,
    "Orthophoto" : mapOrtho,
}, {
     "Beschriftung" : myLayers.gdi_nomenklatur,
     "Route": tirolTrack,
    "Start und Ziel" : markerGroup,
    });

myMap.addControl(myMapControl); 
myMap.addLayer(myLayers.geolandbasemap); 


//#######################

//Popup-Marker für Endpunkt der Etappe: VERSION1
const ende = [47.227615, 11.375384];
let endePopup = `<h3>Ziel: Mutters</h3><a href = 'http://www.mutters.tirol.gv.at'> Weitere Information zu Mutters </a>`
    L.marker(ende,
    {
        icon: L.icon({
            iconUrl: 'images/ende.png',
            iconAnchor: [16, 37],
       })
}).addTo(markerGroup).bindPopup(endePopup);

//Startmarker Mieders VERSION 2
//Die Marker funktionieren nur in google chrome, wieso? 
L.marker([47.163884, 11.378995],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    "<h3>Start: Mieders</h3> <a href = 'http://www.mieders.net'> Weitere Informationen zu Mieders </a>"
).addTo(markerGroup);


//Popup-Marker für Startpunkt der Etappe: funkt. nicht in firefox
/*const start = [47.163884, 11.378995];
let startPopup = `<h3>Start: Mieders</h3> <a href = 'http://www.mieders.net'> Weitere Informationen zu Mieders </a>`
L.marker(start, 
         {
    icon: L.icon({
 iconUrl: 'images/start.png',
        iconAnchor: [16, 37]
})
}).addTo(markerGroup).bindPopup(startPopup);
*/
myMap.addLayer(markerGroup);

myMap.setView([47.163884, 11.378995], 11); 

myMapControl.expand();      

L.control.scale({           
    maxWidth: 200,         
    metric: true,         
    imperial: false,       
    position: "bottomleft" 

}).addTo(myMap);            

//myMap.addLayer(tirolTrack);






//VERSUCH: keine funktion - wieso? 
/*
let geojsonTrack = L.geoJSON(etappenTrack).addTo(tirolTrack);
karte.fitBounds(geojsonTrack.getBounds())
*/
/*

// GPX Track direkt laden und auf Ausschnitt zoomen VERSION 1
let gpxTrack = new L.GPX("data/etappe07.gpx", {
    async: true
}).addTo(tirolTrack);
gpxTrack.on('loaded', function(evt) {
    myMap.fitBounds(evt.target.getBounds());
});

*/

// VERSION 2

//Das einzig funktionierende... aber nicht in jedem Browser.
let gpxTrack = new L.GPX("data/etappe23.gpx", {
    async : true, 
}).addTo(tirolTrack);
gpxTrack.on('loaded', function(evt) {
     let track =evt.target; 
     console.log("get_distance",       track.get_distance().toFixed(0))
    console.log("get_elevation_min",  track.get_elevation_min().toFixed(0))
    console.log("get_elevation_max",  track.get_elevation_max().toFixed(0))
    console.log("get_elevation_gain", track.get_elevation_gain().toFixed(0))
    console.log("get_elevation_loss", track.get_elevation_loss().toFixed(0))
    myMap.fitBounds(track.getBounds());    
});

//Zahlenwerte ausgeben lassen: 
gpxTrack.on("loaded", function(evt) {
 console.log("get_distance",evt.target.get_distance().toFixed(0))
 console.log("get_elevation_max",evt.target.get_elevation_max().toFixed(0)) 
 console.log("get_elevation_min",evt.target.get_elevation_min().toFixed(0))
 console.log("get_elevation_gain",evt.target.get_elevation_gain().toFixed(0))
 console.log("get_elevation_loss",evt.target.get_elevation_loss().toFixed(0))

let laenge =evt.target.get_distance().toFixed(0);
    
document.getElementById("laenge").innerHTML = laenge;
    
document.getElementById("get_distance").innerHTML = track.get_distance().toFixed(0);
    
document.getElementById("get_elevation_min").innerHTML = track.get_elevation_min().toFixed(0);
    
document.getElementById("get_elevation_max").innerHTML = track.get_elevation_max().toFixed(0);
    
document.getElementById("get_elevation_gain").innerHTML = track.get_elevation_gain().toFixed(0);
    
document.getElementById("get_elevation_loss").innerHTML = track.get_elevation_loss().toFixed(0);
    
});



