function getT2m() {

  alert('huhu');

  var xhttp; 
  
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      return xhttp.responseText;
    }
  };
  xhttp.open("GET", "db/getT2m.php?", true);
  xhttp.send();
}