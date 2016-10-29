// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var map = L.map( 'map', {
    center: [54.54, 20.19],
    minZoom: 3,
    maxZoom: 10,
    zoom: 3
});

map.on('zoomend', handleZoomOut);

function handleZoomOut(evt) {
  //zoom = map.getZoom();
  //t2mS.clearLayers();
  //t2m = [];
  //getT2m(zoom, 'server');
  clusterKMeans();
}

/*L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );*/

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiZXJpa21pa2xvcyIsImEiOiJjaXFsN2YyZWYwMDAwaHRubXY5YmtxaG80In0.Oy26NmXQHPM1fl-71S-LNA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'erikmiklos.0ld5n3a1',
    accessToken: 'sk.eyJ1IjoiZXJpa21pa2xvcyIsImEiOiJjaXFsN2YyZWYwMDAwaHRubXY5YmtxaG80In0.Oy26NmXQHPM1fl-71S-LNA'
}).addTo( map );

//var myURL = jQuery( 'script[src$="map.js"]' ).attr( 'src' ).replace( 'map.js', '' );

var t2mC = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    var markers = cluster.getAllChildMarkers();
    var n = 0;
    for (var i = 0; i < markers.length; i++) {
      n += markers[i].options.title;
    }
    n = parseInt(n / markers.length);

    var c = ' marker-cluster-';
    if (n < 0) {
      c += 'small';
    } else if (n < 10) {
      c += 'medium';
    } else {
      c += 'large';
    }

    return L.divIcon({html: '<div><span>' + n + '°C</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)});
  }
});

var t2mS = L.layerGroup();

var t2m = [];


getT2m(3, "client");

var meteo = {
    "Temperature": t2mS,
};


var algorithm = {
  "Client side": 1,
  "Server side": 2
}

var algorithm = L.control({position: 'topright'});
algorithm.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'select algorithm');
    div.innerHTML = '<select id="algorithm" onchange="clearLayers()"><option value="client">Client side clustering</option><option value="server">Server side clustering</option></select>';
    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
};
algorithm.addTo(map);

L.control.layers(meteo).addTo(map);

function clearLayers() {
  zoom = map.getZoom();
  t2mS.clearLayers();
  t2m = [];
  getT2m(zoom, 'client');
}

function addToT2m() {
  for ( var i=0; i < markers.length; ++i ) 
  {
    t2mIcon = L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: parseInt(markers[i].value - 273) + '°C',
      shape: 'circle',
      markerColor: 'blue'
    });

    t2m.push(L.marker( [markers[i].lat, markers[i].lon], {icon: t2mIcon, title: parseInt(markers[i].value - 273)} ));
      //.bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
      //.addTo( t2m );
  }

  for ( var i=0; i < t2m.length; ++i ) 
  {
    t2m[i].addTo(t2mS);
  }
}
