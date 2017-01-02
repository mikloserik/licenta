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

(new GoogleSearch).addTo(map);
var input = document.getElementById("searchBox");
var searchBox = new google.maps.places.SearchBox(input);

searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  var group = L.featureGroup();

  places.forEach(function(place) {
    // Create a marker for each place.
    console.log(places);
    console.log(place.geometry.location.lat() + " / " + place.geometry.location.lng());
    var marker = L.marker([
      place.geometry.location.lat(),
      place.geometry.location.lng()
    ]);
    group.addLayer(marker);
  });

  group.addTo(map);
  map.fitBounds(group.getBounds());
});