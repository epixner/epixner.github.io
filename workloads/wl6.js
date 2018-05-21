let myMap = L.map("mapdiv"); 

let markerGroup = L.featureGroup();

/*L.featureGroup([marker1, marker2, polyline])
    .bindPopup('Hello world!')
    .on('click', function() { alert('Clicked on a member of the group!'); })
    .addTo(map);
*/

let myLayers = {
    
      OSM: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
         {subdomains : ["a","b","c"], 
       attribution : "Datenquelle: openstreetmap.org"
         }), 
    
    BasemapHighDPI: L.tileLayer( "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpg", 
        {subdomains : ["maps1","maps2","maps3"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"}
    ),
    
    BasemapOrthofoto30cm: L.tileLayer(
 "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpg", 
        {subdomains : ["maps","maps1","maps2","maps3","maps4"],
       attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"}
    )};

myMap.addLayer(markerGroup);
// der Karte hinzufügen
 
myMap.addLayer(myLayers.BasemapHighDPI);
//zeigt den Layer auf der Karte an, ohne das zuerst was ausgewählt werden muss

myMap.setView([47.387131, 11.133717] ,11);
// http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers

let mapControl = L.control.layers({
   // "Openstreetmap" : myLayers.OSM,
    "Grundkarte HD" : myLayers.BasemapHighDPI,
    "Orthofoto" : myLayers.BasemapOrthofoto30cm
    },
    {
    "Marker" : markerGroup 
    }, 
    {
        collapsed: true
                             
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
    opacity: 0.8,
    draggable: true
};
//Konstante mit Werten für die Markeroptionen wie Transparenz

const gehren= [47.387131, 11.133717];
const hafele= [47.312079, 11.383623];
const munde= [47.346295, 11.080385];
const rauth= [47,345649, 11,104836];
const wannig=[47.336922, 10.862333];
const nasser=[47.344376, 10.849554];
const puitegg=[47.394844, 11.152817];

L.marker(gehren, {title:"Gehrenspitze, T=0,6°C, 26.04.2018"}, markerOptions).bindPopup("<p>Gehrenspitze</p> <img style ='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png'/>").addTo(markerGroup); 

L.marker(hafele, {title:"Hafelekar. T=1,6°C, 26.04.2018"}, markerOptions).bindPopup("<p>Hafelekar</p> <img style ='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png'/>").addTo(markerGroup);

L.marker(munde, {title:"Hohe Munde, T=k.A., 26.04.2018"}, markerOptions).bindPopup("<p>Hohe Munde</p> <img style ='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png'/>").addTo(markerGroup);



L.marker(rauth, {title:"Rauthhütte"}, markerOptions).bindPopup("<p>Rauthhütte Hohe Munde</p> <img style ='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png'/>").addTo(markerGroup);

L.marker(wannig, {title:"Wannig Nassereith"}, markerOptions);
//.bindPopup("<p>Wannig Nassereith</p> <img style ='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png'/>").addTo(markerGroup);

L.marker(nasser, {title:"Nassereith"}, markerOptions);
//.bindPopup("<p>Nassereither Alm</p> <img style ='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png'/>").addTo(markerGroup);

L.marker(puitegg, {title:"Puitegg"}, markerOptions).addTo(markerGroup);


/*
const rauth=[47.345909, 11.104943];

const rossh=[47.342025, 11.227903];

const seegru=[47.3063819943737, 11.3779335010812];
const dalfaz=[47.448514, 11.751511];
const erfurt=[47.441861 , 11.762127];
const agetw=[47.069889 ,10.862306 ];
const griesk=[47.0839527777778 ,11.0273833333333 ];
const griesk2=[47.1010555555556 ,11.0230388888889 ];
const falkaun=[47.071488 ,10.76282 ];
const hornt1=[47.099611 ,11.15541667 ];
const hornt2=[47.0960000187559, 11.1623888694066];
const lamps1=[47.153491, 11.120722];
const lamps2=[47.156075, 11.095642];
const rotersc=[47.04, 10.7181];
const schlicker=[47.154432,11.303207 ];
const seirl=[47.0339, 10.8528 ];
const lämmerb=[47.181266, 11.751717];
const rastk=[47.192132, 11.767481];
const sonnt1=[47.2750109996958, 11.7520860028295];
const sonnt2=[47.271989, 11.755802];
const tuxer=[47.093149, 11.648053];
const tuxer2=[47.089717, 11.648987 ];
const wands1=[47.121858, 11.661969];
const wands2=[47.120752, 11.658062];

*/


myMap.fitBounds(markerGroup.getBounds());
//skaliert die Karte auf die Anzahl der Marker


myMap.setView(markerGroup, 16);

//L.marker(awsdata, markerOptions).addTo(markerGroup);

/*let Marker = L.marker(awsdata).addTo(markerGroup);
Marker.bindPopup("<p>Patscherkofel</p> <img style ='width:200px' src='https://apps.tirol.gv.at/luft/patscherkofel.jpg'/>")
*/

/*Marker für jede Wetterstation mit Popup mit folgendem Inhalt:
Name der Station
Temperatur und Datum der Messung
Link zur aktuellen Grafik*/
