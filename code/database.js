function getT2m(zoom, alg) {
  var xhttp; 
  
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      markers = JSON.parse(xhttp.responseText);

      for ( var i=0; i < markers.length; ++i ) 
      {
        t2mIcon = L.ExtraMarkers.icon({
          icon: 'fa-number',
          number: parseInt(markers[i].value - 273) + '°C',
          markerColor: 'blue'
        });

        L.marker( [markers[i].lat, markers[i].lon], {icon: t2mIcon, title: parseInt(markers[i].value - 273)} )
          //.bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
          .addTo( t2m );
      }
    }
  };
  xhttp.open("GET", "code/getT2m.php?zoom=" + zoom + "&alg=" + alg, true);
  xhttp.send();
}

function getTcwv(zoom) {
  var xhttp2; 
  
  xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function() {
    if (xhttp2.readyState == 4 && xhttp2.status == 200) {
      markers2 = JSON.parse(xhttp2.responseText);

      for ( var i=0; i < markers2.length; ++i ) 
      {
        t2mIcon = L.ExtraMarkers.icon({
          icon: 'fa-number',
          number: parseInt(markers2[i].value) + 'cm',
          markerColor: 'white'
        });

        L.marker( [markers2[i].lat, markers2[i].lon], {icon: t2mIcon, title: parseInt(markers2[i].value)} )
          //.bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
          .addTo( tcwv );
      }
    }
  };
  xhttp2.open("GET", "code/getTcwv.php?zoom=" + zoom, true);
  xhttp2.send();
}

function getSp(zoom) {
  var xhttp; 
  
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      markers = JSON.parse(xhttp.responseText);

      for ( var i=0; i < markers.length; ++i ) 
      {
        spIcon = L.ExtraMarkers.icon({
          icon: 'fa-number',
          number: parseInt(markers[i].value/1000) + 'KPa',
          markerColor: 'yellow'
        });

        L.marker( [markers[i].lat, markers[i].lon], {icon: spIcon, title: parseInt(markers[i].value/1000)} )
          //.bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
          .addTo( sp );
      }
    }
  };
  xhttp.open("GET", "code/getSp.php?zoom=" + zoom, true);
  xhttp.send();
}

function getAluvp(zoom) {
  var xhttp; 
  
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      markers = JSON.parse(xhttp.responseText);

      for ( var i=0; i < markers.length; ++i ) 
      {
        spIcon = L.ExtraMarkers.icon({
          icon: 'fa-number',
          number: markers[i].value,
          markerColor: 'purple'
        });

        L.marker( [markers[i].lat, markers[i].lon], {icon: spIcon, title: markers[i].value} )
          //.bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
          .addTo( aluvp );
      }
    }
  };
  xhttp.open("GET", "code/getAluvp.php?zoom=" + zoom, true);
  xhttp.send();
}