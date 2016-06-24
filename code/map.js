// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var map = L.map( 'map', {
    center: [54.54, 20.19],
    minZoom: 1,
    maxZoom: 8,
    zoom: 3
});

map.on('zoomend', handleZoomOut);

function handleZoomOut(evt) {
	console.log(evt.target, map.getZoom());

  if (document.getElementById("algorithm").value == "server") {
    zoom = map.getZoom();
    t2m.clearLayers();
    tcwv.clearLayers();
    sp.clearLayers();
    aluvp.clearLayers();
    getT2m(zoom);
    getTcwv(zoom);
    getSp(zoom);
    getAluvp(zoom);
  }
}

L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
    subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

var myURL = jQuery( 'script[src$="map.js"]' ).attr( 'src' ).replace( 'map.js', '' );

var t2m = L.markerClusterGroup({
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

var tcwv = L.markerClusterGroup({
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

    return L.divIcon({html: '<div><span>' + n + 'cm</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)});
  }
});

var sp = L.markerClusterGroup({
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

    return L.divIcon({html: '<div><span>' + n + 'KPa</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)});
  }
});

var aluvp = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    var markers = cluster.getAllChildMarkers();
    var n = 0;
    for (var i = 0; i < markers.length; i++) {
      if(n < markers[i].options.title){
        n = markers[i].options.title;
      }
    }

    var c = ' marker-cluster-';
    if (n < 0) {
      c += 'small';
    } else if (n < 10) {
      c += 'medium';
    } else {
      c += 'large';
    }

    return L.divIcon({html: '<div><span>' + n + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)});
  }
});

getT2m(3);
getTcwv(3);
getSp(3);
getAluvp(3);

var meteo = {
    "Temperature": t2m,
    "Water vapour": tcwv,
    "Pressure": sp,
    "UV radiation": aluvp
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
  t2m.clearLayers();
  tcwv.clearLayers();
  sp.clearLayers();
  aluvp.clearLayers();
  getT2m(zoom);
  getTcwv(zoom);
  getSp(zoom);
  getAluvp(zoom);
}