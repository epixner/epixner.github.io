

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen


let myMap = L.map("map");    

const tirolGroup = L.featureGroup();

let markerGroup = L.featureGroup();

let myLayers = {
    osm: L.tileLayer(  // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    map_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

    map_ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80"
        , {

            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    
      gdi_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", 
          {
        attribution : "Datenquelle: <a href ='https://www.tirol.gv.at/data/nutzungsbedingungen/'> Land Tirol - data.tirol.gv.at </a>",
        pane: "overlayPane"                         
        }
    ),  

};

myMap.addLayer(myLayers.geolandbasemap);    // http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl = L.control.layers({       // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap": myLayers.osm,
    "Basemapt": myLayers.geolandbasemap,
    "Sommerkarte": myLayers.map_sommer,
    "Winterkarte": myLayers.map_winter,
    "Orthofoto": myLayers.map_ortho,

}, {
        "Beschriftung" : myLayers.gdi_nomenklatur,
        "Route": tirolGroup,
    });

//Popup-Marker für Endpunkt der Etappe:
const ende = [47.227615, 11.375384];
let endePopup = `<h3>Ziel: Mutters</h3><a href = 'http://www.mutters.tirol.gv.at'> Weitere Information zu Mutters </a>`
    L.marker(ende,
    {
        icon: L.icon({
            iconUrl: 'images/ende.png',
            iconAnchor: [16, 37]
       })
}).addTo(markerGroup).bindPopup(endePopup);


//Popup-Marker für Startpunkt der Etappe:
const start = [47.163884, 11.378995];
let startPopup = `<h3>Start: Mieders</h3> <a href = 'http://www.mieders.net'> Weitere Informationen zu Mieders </a>`
L.marker(start, 
         {
    icon: L.icon({
 iconUrl: 'images/start.png',
        iconAnchor: [16, 37]
})
}).addTo(markerGroup).bindPopup(startPopup);

myMap.addLayer(markerGroup);

myMap.addControl(myMapControl);     

myMap.setView([47.267, 11.380], 11); 

myMapControl.expand();      

L.control.scale({           
    maxWidth: 200,         
    metric: true,         
    imperial: false,       
    position: "bottomleft" 

}).addTo(myMap);            

myMap.addLayer(tirolGroup);



let gpxTrack = new L.GPX("data/etappe23.gpx", {
    async : true, 
}).addTo(tirolGroup);
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

    myMap.fitBounds(evt.target.getBounds());
});

myMap.addControl(new L.Control.Fullscreen(map)); 











