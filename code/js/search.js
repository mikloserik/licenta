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

if(document.cookie.includes("user=loged")){
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
      var marker = L.marker([
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ]);
 
      group.addLayer(marker);
      addUserLocation(
        place.geometry.location.lat(), 
        place.geometry.location.lng(), 
        document.getElementById('searchBox').value
      );

    });

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

function addUserLocation(lat, lon, name){
  var xhttp; 
  
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          result = xhttp.responseText;

          if (result == "OK") {
            locationsS.clearLayers();
            getUserLocations();
          } 
      }
    };
    xhttp.open("GET", "code/backend/xhr/addLocation.php?lon=" + lon + "&lat=" + lat + "&name=" + name, true);
    xhttp.send();
}