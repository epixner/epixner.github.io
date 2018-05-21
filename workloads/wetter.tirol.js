let myMap = L.map("mapdiv"); 
// http://leafletjs.com/reference-1.3.0.html#map-l-map 


let awsgroup = L.featureGroup();
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
    "Wetterstationen" : awsgroup,
     
    }, 
    {
        collapsed: true
    //        http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed                              
    });

myMap.addControl(mapControl);

let mapScale = L.control.scale ({
    maxWidth:200, 
    metric: true, 
    imperial: false, 
    position: 'bottomleft'
}).addTo(myMap);



myMap.addControl(mapScale);


  const markerOptions = {
    opacity: 0.7,
    draggable: true
};

//Konstante mit Werten für die Markeroptionen





  const url = "https://lawine.tirol.gv.at/data/produkte/ogd.geojson"

  async function addGeojson(url)
  {console.log("URL wird geladen", url);
  const response = await fetch(url);
  console.log("response:", response)
  const awsdata = await response.json();
  console.log("GeoJson:", awsdata)
  const geojson = L.geoJSON(awsdata);
 awsgroup.addLayer(geojson); 
 myMap.fitBounds(awsgroup.getBounds());
  }

  addGeojson(url);

  let geojson = L.geoJSON(stationen).addTo(awsgroup); 

  geojson.bindPopup(function(layer){
      const props = layer.feature.properties; 
      const popupText = `<h1> ${props.NAME}</h1>`;
      // gibt den manen des popups in den text des popups 
     // const popupText3 = `<p> ${layer.feature.properties.LT}°C</p>`;
      //gibt die Temperatur aus im Popup
        //  const popupText2 = `<h1> +layer.feature.properties.name+</h1>`;
      return popupText;
    });
  myMap.addLayer(awsgroup);