

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

let steigung = L.featureGroup().addTo(myMap); //Featuregroup für die Steigung des Profils

const myLayers = {
    osm: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
    "Sommerkarte": mapSommer,
    "Winterkarte": mapWinter,
    "Orthophoto": mapOrtho,
}, {
        "Beschriftung": myLayers.gdi_nomenklatur,
        "Route": tirolTrack,
        "Start und Ziel": markerGroup,
        "Steigung": steigung,

    });

myMap.addControl(myMapControl);
myMap.addLayer(myLayers.geolandbasemap);
myMap.addLayer(tirolTrack);

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
L.marker([47.163884, 11.378995], {
    icon: L.icon({
        iconUrl: 'images/start.png',
        iconAnchor: [16, 37],
        popupAnchor: [0, -37],
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

//Das einzig funktionierende... aber nicht in jedem Browser.
let gpxTrack = new L.GPX("data/etappe23.gpx", {
    async: true,
}).addTo(tirolTrack);         //-> würde den Track zum Layer Control dazu fügen, aber ist ja durch steigung schon drinnen
gpxTrack.on('loaded', function (evt) {
    let track = evt.target;
    /*    console.log("get_distance",      track.get_distance().toFixed(0))
       console.log("get_elevation_min",  track.get_elevation_min().toFixed(0))
       console.log("get_elevation_max",  track.get_elevation_max().toFixed(0))
       console.log("get_elevation_gain", track.get_elevation_gain().toFixed(0))
       console.log("get_elevation_loss", track.get_elevation_loss().toFixed(0))
      */
    myMap.fitBounds(track.getBounds());
});

//Zahlenwerte ausgeben lassen: 
gpxTrack.on("loaded", function (evt) {
    console.log("get_distance", evt.target.get_distance().toFixed(0))
    console.log("get_elevation_max", evt.target.get_elevation_max().toFixed(0))
    console.log("get_elevation_min", evt.target.get_elevation_min().toFixed(0))
    console.log("get_elevation_gain", evt.target.get_elevation_gain().toFixed(0))
    console.log("get_elevation_loss", evt.target.get_elevation_loss().toFixed(0));

    // let laenge =evt.target.get_distance().toFixed(0);

    //document.getElementById("laenge").innerHTML = laenge;

    document.getElementById("get_distance").innerHTML = gpxTrack.get_distance().toFixed(0);

    document.getElementById("get_elevation_min").innerHTML = gpxTrack.get_elevation_min().toFixed(0);

    document.getElementById("get_elevation_max").innerHTML = gpxTrack.get_elevation_max().toFixed(0);

    document.getElementById("get_elevation_gain").innerHTML = gpxTrack.get_elevation_gain().toFixed(0);

    document.getElementById("get_elevation_loss").innerHTML = gpxTrack.get_elevation_loss().toFixed(0);

});


//Höhenprofil definieren und style festlegen: 
let profil = L.control.elevation(
    {
        position: "bottomright",
        theme: "steelblue-theme",
        collapsed: true, //lässt das Profil aus und einschalten
    });
profil.addTo(myMap);


//Linie zu Karte hinzufügen: über console.log wird die Höhe gesucht, die für Steigung gebraucht wird 
gpxTrack.on("addline", function (evt) {
    profil.addData(evt.line);
    console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0]);
    console.log(evt.line.getLatLngs()[0].lng);
    console.log(evt.line.getLatLngs()[0].lat);
    console.log(evt.line.getLatLngs()[0].meta);
    console.log(evt.line.getLatLngs()[0].meta.ele);

     //Alle Segmente der Steigungslinie hinzufügen:
     let steigungLinie = evt.line.getLatLngs();
     for (i = 1; i < steigungLinie.length; i++)
     //Schleife für die Erstellung der Linie zw. Punkten, bei i=0 kann keine linie gemacht werden
     {
         let p1 = steigungLinie[i - 1];         //definiert den nullten Punkt als ersten Punkt
         let p2 = steigungLinie[i];          //definiert den aktuellen Punkt als zweiten Punkt
        
         //Berechung der Distanz zwischen Punkten: 
         let distance = myMap.distance(
             [p1.lat, p1.lng],
             [p2.lat, p2.lng],
         );
 
         // Berechnung des Unterschiedes von einem Punkt zum nächsten:
         let delta = p2.meta.ele - p1.meta.ele;

         //Berechnung der Steigung in % : >>> Bedingung ? Ausdruck 1 : (sonst)  Ausdruck 2
       
        let prozent = (distance > 0)  ?  (delta / distance * 100.0).toFixed(1) : 0;

        //Farbe der Steigungswerten zuordnen: 
        //Grün:         http://colorbrewer2.org/#type=sequential&scheme=YlGn&n=4
        //Rot:           http://colorbrewer2.org/#type=sequential&scheme=Reds&n=3
        let farbe = 
        prozent > 10  ?  "#de2d26" :
        prozent > 6 ?  "#fc9272" :
     //   prozent > 2  ?  "#fee0d2" :
        prozent > 0  ?  "#ffffcc" :
        //prozent > -2  ?  "#c2e699" :
        prozent > -6  ?  "#78c679" :
        prozent > -10  ?  "#238443" : "#238443";
        
       
       // console.log(p1.lat, p1.lng, p2.lat, p2.lng, distance, delta, prozent);
 
       //Segmente zwischen Punkten als linie mit farbe darstellen:
         let segment = L.polyline(
             [
                 [p1.lat, p1.lng],
                 [p2.lat, p2.lng],
             ],
             {
                 color: farbe,        //Farbe-Variable von oben
                 weight: "4", 
                 opacity :"1"
             }
         ).addTo(steigung);
     }
});
profil.addTo(myMap);

