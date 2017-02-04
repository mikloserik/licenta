
var map = L.map( 'map', {
    center: [54.54, 20.19],
    minZoom: 3,
    maxZoom: 10,
    zoom: 3
});

map.on('moveend', handleMove);

function handleZoomOut(evt) {
  clearLayers();
}

function handleMove(evt) { 
    clearLayers();
}

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiZXJpa21pa2xvcyIsImEiOiJjaXFsN2YyZWYwMDAwaHRubXY5YmtxaG80In0.Oy26NmXQHPM1fl-71S-LNA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'erikmiklos.0ld5n3a1',
    accessToken: 'sk.eyJ1IjoiZXJpa21pa2xvcyIsImEiOiJjaXFsN2YyZWYwMDAwaHRubXY5YmtxaG80In0.Oy26NmXQHPM1fl-71S-LNA'
}).addTo( map );

var t2mS = L.layerGroup();
var t2m = [];

var spS = L.layerGroup();
var sp = [];

var uvS = L.layerGroup();
var uv = [];

var tcwvS = L.layerGroup();
var tcwv = [];

var locationsS = L.layerGroup();
locationsS.addTo(map);

getT2m(3, "client");

if (document.cookie.includes("user=loged")) {
  var meteo = {
    "Temperature °C": t2mS,
    "Athm Pressure KPa": spS,
    "UV Radiation": uvS,
    "Water Vapour cm": tcwvS,
  };
} else {
  var meteo = {
    "Temperature °C": t2mS,
  };
}

L.control.layers(meteo).addTo(map);

function clearLayers() {
  t2m = [];
  t2mS.clearLayers();
  addToT2m();

  if (document.cookie.includes("user=loged")) {
    sp = [];
    spS.clearLayers();
    addToSp();
    uv = [];
    uvS.clearLayers();
    addToUv();
    tcwv = [];
    tcwvS.clearLayers();
    addToTcwv();
  }
}

function addToT2m() {
  clusterKMeans();

  for ( var i=0; i < clusters.length; ++i ) 
  {
    t2mIcon = L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: parseInt(clusters[i].t2m - 273).toString(),
      shape: 'square',
      markerColor: 'blue'
    });

    if(document.cookie.includes("user=loged")){
      t2m.push(L.marker( [clusters[i].lat, clusters[i].lon], {icon: t2mIcon, title: parseInt(clusters[i].t2m - 273).toString()} )
        .bindPopup( '<div id="popup"><table>' + 
          '<tr><td><img src="t2m.png" height="15" width="15"></td><td>Temperature:</td><td>'+(clusters[i].t2m - 273).toFixed(2)+' °C</td></tr>' + 
          '<tr><td><img src="ps.png" height="15" width="15"><td>Athm pressure:</td><td>'+(clusters[i].sp / 1000).toFixed(2)+' KPa</td></tr>' +
          '<tr><td><img src="uv.png" height="17" width="17"><td>UV Radiation:</td><td>'+(clusters[i].uv.toFixed(4))+'</td></tr>' +
          '<tr><td><img src="tcwv.png" height="15" width="10"><td>Water Vapour:</td><td>'+(clusters[i].tcwv.toFixed(2))+' cm</td></tr>' +
          '</table></div>' )
      );
    } else {
      t2m.push(L.marker( [clusters[i].lat, clusters[i].lon], {icon: t2mIcon, title: parseInt(clusters[i].t2m - 273).toString()} ));
    }
  }

  for ( var i=0; i < t2m.length; ++i ) 
  {
    t2m[i].addTo(t2mS);
  }
  
}

function addToSp() {
  clusterKMeans();

  for ( var i=0; i < clusters.length; ++i ) 
  {
    spIcon = L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: parseInt(clusters[i].sp / 1000).toString(),
      shape: 'square',
      markerColor: 'yellow'
    });


    sp.push(L.marker( [clusters[i].lat, clusters[i].lon], {icon: spIcon, title: parseInt(clusters[i].sp / 1000).toString()} )
      .bindPopup( '<div id="popup"><table>' + 
        '<tr><td><img src="t2m.png" height="15" width="15"></td><td>Temperature:</td><td>'+(clusters[i].t2m - 273).toFixed(2)+' °C</td></tr>' + 
        '<tr><td><img src="ps.png" height="15" width="15"><td>Athm pressure:</td><td>'+(clusters[i].sp / 1000).toFixed(2)+' KPa</td></tr>' +
        '<tr><td><img src="uv.png" height="17" width="17"><td>UV Radiation:</td><td>'+(clusters[i].uv.toFixed(4))+'</td></tr>' +
        '<tr><td><img src="tcwv.png" height="15" width="10"><td>Water Vapour:</td><td>'+(clusters[i].tcwv.toFixed(2))+' cm</td></tr>' +
        '</table></div>' )
    );
  }

  for ( var i=0; i < sp.length; ++i ) 
  {
    sp[i].addTo(spS);
  }
}

function addToUv() {
  clusterKMeans();

  for ( var i=0; i < clusters.length; ++i ) 
  {
    uvIcon = L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: parseFloat(clusters[i].uv).toFixed(2).toString(),
      shape: 'square',
      markerColor: 'purple'
    });


    uv.push(L.marker( [clusters[i].lat, clusters[i].lon], {icon: uvIcon, title: parseFloat(clusters[i].uv).toFixed(2).toString()} )
      .bindPopup( '<div id="popup"><table>' + 
        '<tr><td><img src="t2m.png" height="15" width="15"></td><td>Temperature:</td><td>'+(clusters[i].t2m - 273).toFixed(2)+' °C</td></tr>' + 
        '<tr><td><img src="ps.png" height="15" width="15"><td>Athm pressure:</td><td>'+(clusters[i].sp / 1000).toFixed(2)+' KPa</td></tr>' +
        '<tr><td><img src="uv.png" height="17" width="17"><td>UV Radiation:</td><td>'+(clusters[i].uv.toFixed(4))+'</td></tr>' +
        '<tr><td><img src="tcwv.png" height="15" width="10"><td>Water Vapour:</td><td>'+(clusters[i].tcwv.toFixed(2))+' cm</td></tr>' +
        '</table></div>' )
    );
  }

  for ( var i=0; i < uv.length; ++i ) 
  {
    uv[i].addTo(uvS);
  }
}

function addToTcwv() {
  clusterKMeans();

  for ( var i=0; i < clusters.length; ++i ) 
  {
    tcwvIcon = L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: parseInt(clusters[i].tcwv).toString(),
      shape: 'square',
      markerColor: 'blue-dark',
    });


    tcwv.push(L.marker( [clusters[i].lat, clusters[i].lon], {icon: tcwvIcon, title: parseInt(clusters[i].tcwv).toString()} )
      .bindPopup( '<div id="popup"><table>' + 
        '<tr><td><img src="t2m.png" height="15" width="15"></td><td>Temperature:</td><td>'+(clusters[i].t2m - 273).toFixed(2)+' °C</td></tr>' + 
        '<tr><td><img src="ps.png" height="15" width="15"><td>Athm pressure:</td><td>'+(clusters[i].sp / 1000).toFixed(2)+' KPa</td></tr>' +
        '<tr><td><img src="uv.png" height="17" width="17"><td>UV Radiation:</td><td>'+(clusters[i].uv.toFixed(4))+'</td></tr>' +
        '<tr><td><img src="tcwv.png" height="15" width="10"><td>Water Vapour:</td><td>'+(clusters[i].tcwv.toFixed(2))+' cm</td></tr>' +
        '</table></div>' )
    );
  }

  for ( var i=0; i < tcwv.length; ++i ) 
  {
    tcwv[i].addTo(tcwvS);
  }
}
