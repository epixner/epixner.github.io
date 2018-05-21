let myBikeMap = L.map("mapdiv");
// http://leafletjs.com/reference-1.3.0.html#map-l-map 

let wienBike = L.markerClusterGroup(
    {
        spiderfyOnMaxZoom: true,
        //When you click a cluster at the bottom zoom level we spiderfy it so you can see all of its markers. 
        showCoverageOnHover: true,
        //When you mouse over a cluster it shows the bounds of its markers.
        zoomToBoundsOnClick: true
        //When you click a cluster we zoom to its bounds.
    }
);

// der Karte hinzufügen
let myLayers = {
    // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer

    OSM: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains: ["a", "b", "c"],
            // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution: "Datenquelle:  <a href='https://www.openstreetmap.org'>basemap.at</a>"
            // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution   
        }
    ),

    BasemapGrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
        }
    ),

    GeolandBasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    GeolandBasemapOverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",

        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    BasemapHighDPI: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpg",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    BasemapOrthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpg",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
};

myBikeMap.addLayer(myLayers.GeolandBasemap);
// http://leafletjs.com/reference-1.3.0.html#map-addlayer


let mapControl = L.control.layers({
    "Openstreetmap": myLayers.OSM,
    "Grundkarte": myLayers.GeolandBasemap,
    "Grundkarte HD": myLayers.BasemapHighDPI,
    "Orthofoto": myLayers.BasemapOrthofoto30cm
},
    {
        "Beschriftung": myLayers.GeolandBasemapOverlay,
        "Citybike-Terminals": wienBike,

    },
    {
        collapsed: true
        //        http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed                              
    });

myBikeMap.addControl(mapControl);
myBikeMap.addLayer(wienBike);

//myBikeMap.setView([47.267,11.383] ,10);
// http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers

let mapScale = L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: 'bottomleft'
}).addTo(myBikeMap);


//myBikeMap.addControl(mapScale);

const markerOptions = {
    opacity: 0.7,
    draggable: true
};
//Konstante mit Werten für die Markeroptionen


//let geoWien = L.geoJSON(wien).addTo(wienBike); 

async function addGeojson(urlBike) {
    //URL vo nSpaziergang etc. 
    const response = await fetch(urlBike);
    // holt url 

    const wiendata = await response.json();
    //console.log("GeoJson: ", wiendata);

    const geojson = L.geoJSON(wiendata, {
        style: function (feature) {
            return { color: "ff000" };
        },

        pointToLayer: function (geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "icons/citybike.png"
                    //setzt einen eigenen marker anstatt des standard icons 
                })
            });
        }
    });

    geojson.bindPopup(function (layer) {
        const props = layer.feature.properties;
        const popupName =
            `<h4> Citybike-Terminal: ${props.STATION}</h4>
             <p>ID: ${props.SE_SDO_ROWID}</p>
             <p>Bezirk: ${props.BEZIRK}</p>`;
        // gibt den Namen des popups in den text des popups 
        //gibt die Bemerkung ins Popup
        //  const popupText3 = `<h1> +layer.feature.properties.name+</h1>`;
        return (popupName);

    });

    wienBike.addLayer(geojson)
    myBikeMap.addLayer(wienBike);
    myBikeMap.fitBounds(wienBike.getBounds());

    const hash = new L.Hash(myBikeMap);
    //plugin leaflet hash

    myBikeMap.addControl(new L.Control.Search(
        {
            layer: wienBike,
            propertyName: 'STATION'
            //suchfeld in der property "Station"
        }));
}


const urlBike =
    "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json"

addGeojson(urlBike);



