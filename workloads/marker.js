let myMap = L.map("mapdiv"); 
// http://leafletjs.com/reference-1.3.0.html#map-l-map 
let myLayers = {
// http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
    
    OSM: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
         {subdomains : ["a","b","c"], 
          // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
       attribution : "Datenquelle: openstreetmap.org"
         // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution
         }   
    ),
    
    BasemapGrau: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
    ),
   
    GeolandBasemap: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
       {subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"} 
    ),
    GeolandBasemapOverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", 
        {subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"} 
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
    )
    };


myMap.addLayer(myLayers.GeolandBasemap); 
// http://leafletjs.com/reference-1.3.0.html#map-addlayer

myMap.setView([47.267,11.383] ,11);
// http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers

let mapControl = L.control.layers({
    "Openstreetmap" : myLayers.OSM,
    "Grundkarte" : myLayers.GeolandBasemap,
    "Grundkarte HD" : myLayers.BasemapHighDPI,
    "Orthofoto" : myLayers.BasemapOrthofoto30cm,
    "Beschriftung" : myLayers.GeolandBasemapOverlay
    }, 
    {
        collapsed : false
    //        http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed                              
    });

myMap.addControl (mapControl);

L.control.scale ({
    maxWidth:200, 
    metric: true, 
    imperial: false, 
    position: 'bottomleft'
}).addTo(myMap)

// http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
// http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
// http://leafletjs.com/reference-1.3.0.html#control-scale-metric

// myMap.addControl (mapScale);
