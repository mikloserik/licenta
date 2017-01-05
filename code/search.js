var GoogleSearch = L.Control.extend({
  onAdd: function() {
    var container = document.createElement("div");
    container.id = 'searchBoxContainer';

    var element = document.createElement("input");

    element.id = "searchBox";

    container.appendChild(element);

    return container;
  }
});

if(document.cookie == "user=loged"){
  (new GoogleSearch).addTo(map);
  var input = document.getElementById("searchBox");
  var searchBox = new google.maps.places.SearchBox(input);


  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    var group = L.featureGroup();

    map.removeLayer(group);

    places.forEach(function(place) {
      // Create a marker for each place.
      console.log(places);
      console.log(place.geometry.location.lat() + " / " + place.geometry.location.lng());
      /*var marker = L.marker([
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ]);*/

      searchIcon = L.ExtraMarkers.icon({
        shape: 'circle',
        markerColor: 'black'
      });

      m = getNearestMarker(place.geometry.location.lat(), place.geometry.location.lng());

      var marker = L.marker( [place.geometry.location.lat(), place.geometry.location.lng()], {icon: searchIcon} )
        .bindPopup( '<div id="popup"><table>' + 
          '<tr><td><img src="t2m.png" height="15" width="15"></td><td>Temperature:</td><td>'+(m.t2m - 273).toFixed(2)+' °C</td></tr>' + 
          '<tr><td><img src="ps.png" height="15" width="15"><td>Athm pressure:</td><td>'+(m.sp / 1000).toFixed(2)+' KPa</td></tr>' +
          '<tr><td><img src="uv.png" height="17" width="17"><td>UV Radiation:</td><td>'+(parseFloat(m.uv).toFixed(4))+'</td></tr>' +
          '<tr><td><img src="tcwv.png" height="15" width="10"><td>Water Vapour:</td><td>'+(parseFloat(m.tcwv).toFixed(2))+' cm</td></tr>' +
          '</table></div>' )
      ;

      group.addLayer(marker);
    });

    group.addTo(map);
    map.fitBounds(group.getBounds());
  });
}

function getNearestMarker(lat, lon){
  minD = 1000;
  minKey = null;
  for(var ii=0; ii < markers.length; ++ii) {
    latD = Math.abs(markers[ii].lat - lat);
    lonD = Math.abs(markers[ii].lon - lon);

    d = Math.sqrt(latD * latD + lonD * lonD);
    
    if(d < minD){
      minD = d;
      minKey = ii;
    }
  }

  return markers[minKey];
}

function addMarker(lat, lon, username){
  var xhttp; 
  
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          result = xhttp.responseText;

          if (result == "OK") {
            searchS.clearLayers();
            getSearch(username);
          } 
      }
    };
    xhttp.open("GET", "code/addSearch.php?lon=" + lon + "&lat=" + lat + "&usename=" + username, true);
    xhttp.send();
}

function removeMarker(lat, lon, username){
  var xhttp; 
  
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          result = xhttp.responseText;

          if (result == "OK") {
            searchS.clearLayers();
            getSearch(username);
          } 
      }
    };
    xhttp.open("GET", "code/addSearch.php?lon=" + lon + "&lat=" + lat + "&usename=" + username, true);
    xhttp.send();
}

/*var searchS = L.layerGroup();
getSearch(username); // if logged in*/


// TO DO
// add php files: getSearch, addSearch, removeSearch
// add button add/remove to pop up
// implement loged in logic