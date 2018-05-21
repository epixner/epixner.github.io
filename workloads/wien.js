let myMap = L.map("mapdiv"); 
// http://leafletjs.com/reference-1.3.0.html#map-l-map 


let wienSpazieren = L.featureGroup();


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
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    BasemapOrthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpg", 
        {subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),};

 myMap.addLayer(myLayers.GeolandBasemap);
// http://leafletjs.com/reference-1.3.0.html#map-addlayer


let mapControl = L.control.layers({
    "Openstreetmap" : myLayers.OSM,
    "Grundkarte" : myLayers.GeolandBasemap,
    "Grundkarte HD" : myLayers.BasemapHighDPI,
    "Orthofoto" : myLayers.BasemapOrthofoto30cm
    },
    {
    "Beschriftung" : myLayers.GeolandBasemapOverlay,
    "Sehenswürdigkeiten" : wienSpazieren,
     
    }, 
    {
        collapsed: true
    //        http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed                              
    });

myMap.addControl(mapControl);
myMap.addLayer(wienSpazieren);

//myMap.setView([47.267,11.383] ,10);
// http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers

let mapScale = L.control.scale ({
    maxWidth:200, 
    metric: true, 
    imperial: false, 
    position: 'bottomleft'
}).addTo(myMap);


//myMap.addControl(mapScale);

  const markerOptions = {
    opacity: 0.7,
    draggable: true
};
//Konstante mit Werten für die Markeroptionen


//let geoWien = L.geoJSON(wien).addTo(wienSpazieren); 

async function addGeojson(url) {
    //URL vo nSpaziergang etc. 
    const response = await fetch(url); 
    // holt url 
    
    const wiendata = await response.json();
    console.log("GeoJson: ", wiendata);

    const geojson = L.geoJSON (wiendata, {
        style: function(feature){
            return {color: "ff000"};
        },

         pointToLayer: function(geoJsonPoint, latling) {
            return L.marker(latling, {
                icon: L.icon ({
                    iconUrl: "icons/marker2.png"
                })
            });
        }
    });
    
    geojson.bindPopup(function(layer){
    const props = layer.feature.properties; 
    const popupName = `<h5> ${props.NAME}</h5>`;
    // gibt den Namen des popups in den text des popups 
   // const popupInfo = `<p> ${props.WEITERE_INF}</p>`;
    //gibt die Bemerkung ins Popup
  //  const popupText3 = `<h1> +layer.feature.properties.name+</h1>`;
    return (popupName);
   
        
});

    
    wienSpazieren.addLayer(geojson)
  //  myMap.addLayer(wienSpazieren);
    myMap.fitBounds(wienSpazieren.getBounds());
    
}

const url = 
      "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"

addGeojson(url);



    