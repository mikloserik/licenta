function getT2m(zoom, alg) {
  var xhttp; 
  
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      markers = JSON.parse(xhttp.responseText);

      if (document.cookie.includes("user=loged")) {
          addToSp();
          addToUv();
          addToTcwv();

          getUserLocations();
      }
      addToT2m();
    }
  };
  xhttp.open("GET", "code/backend/xhr/getAll.php", true);
  xhttp.send();
}

function getUserLocations() {
  var xhttp; 
  
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      locations = JSON.parse(xhttp.responseText);

      for ( var i=0; i < locations.length; ++i ) 
      {
        searchIcon = L.ExtraMarkers.icon({
          shape: 'circle',
          markerColor: 'black'
        });

        m = getNearestMarker(locations[i].latitude, locations[i].longitude);

        L.marker( [locations[i].latitude, locations[i].longitude], {icon: searchIcon} )
          .bindPopup( '<div id="popup">' +
            '<p>' + locations[i].name + '</p>' +
            '<table>' + 
            '<tr><td><img src="t2m.png" height="15" width="15"></td><td>Temperature:</td><td>'+(m.t2m - 273).toFixed(2)+' °C</td></tr>' + 
            '<tr><td><img src="ps.png" height="15" width="15"><td>Athm pressure:</td><td>'+(m.sp / 1000).toFixed(2)+' KPa</td></tr>' +
            '<tr><td><img src="uv.png" height="17" width="17"><td>UV Radiation:</td><td>'+(parseFloat(m.uv).toFixed(4))+'</td></tr>' +
            '<tr><td><img src="tcwv.png" height="15" width="10"><td>Water Vapour:</td><td>'+(parseFloat(m.tcwv).toFixed(2))+' cm</td></tr>' +
            '</table></div>' )
          .addTo(locationsS);
      }
    }
  };
  xhttp.open("GET", "code/backend/xhr/getLocations.php", true);
  xhttp.send();
}