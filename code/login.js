function logInPopUp() {
	var popup = document.getElementById("login-form-container");
	if (popup.style.display = 'none') {
		popup.style.display = 'block';
	}
	var reg = document.getElementsByClassName("register");
	for (i=0; i < reg.length; i++) {
		reg[i].style.display = 'none';
	}
	document.getElementById('reg-form').style.display = 'block';
	document.getElementById('login-btn').style.display = 'block';
	if (typeof result !== 'undefined' && result != "OK") {
		for(var key in result) {
      		document.getElementById(key).innerHTML = "";
    	}
	}
}

function closePopUp() {
	var popup = document.getElementById("login-form-container");
	popup.style.display = 'none';
}

$('body').click(function(event){ 
	if (event.target.id !== 'login-form-container' && event.target.id !== 'logIn' && event.target.getAttribute('class') !== 'login' && event.target.getAttribute('class') !== 'login register'){
		$('#login-form-container').hide();
	}
});

function showRegister() {
	var reg = document.getElementsByClassName("register");
	for (i=0; i < reg.length; i++) {
		reg[i].style.display = 'block';
	}
	document.getElementById('reg-form').style.display = 'none';
	document.getElementById('login-btn').style.display = 'none';
}

function logInUser() {
	if (typeof result !== 'undefined' && result != "OK") {
		for(var key in result) {
      		document.getElementById(key).innerHTML = "";
    	}
	}
	
	var xhttp; 
  
  	xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
      		result = xhttp.responseText;

      		if (result != "OK") {
      			result = JSON.parse(result);
      			for(var key in result) {
      				document.getElementById(key).innerHTML = result[key];
      			}
      		} else {
      			document.cookie = "user=loged";//"username=" + document.getElementById('username').value;
	      		document.getElementById('logIn').style.display = 'none';
	      		document.getElementById('logOut').style.display = 'block';
	      		$('#login-form-container').hide();
	      		document.getElementsByName('username')[0].value = '';
	      		document.getElementsByName('password')[0].value = '';
	      		location.reload();
	      	}	
    	}
  	};
  	xhttp.open("POST", "code/login.php", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send($('#login-form').serialize());
}

function registerUser() {
	if (typeof result !== 'undefined' && result != "OK") {
		for(var key in result) {
      		document.getElementById(key).innerHTML = "";
    	}
	}

	var xhttp; 
  
  	xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
      		result = xhttp.responseText;

      		if (result != "OK") {
      			result = JSON.parse(result);
      			for(var key in result) {
      				document.getElementById(key).innerHTML = result[key];
      			}
      		} else {
	      		logInPopUp();
	      		document.getElementsByName('first_name')[0].value = '';
	      		document.getElementsByName('last_name')[0].value = '';
	      		document.getElementsByName('email')[0].value = '';
	      	}	
    	}
  	};
  	xhttp.open("POST", "code/register.php", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send($('#login-form').serialize());
}

function logOut() {
	document.cookie = "user=guest";
	document.getElementById('logIn').style.display = 'block';
	document.getElementById('logOut').style.display = 'none';
	location.reload();
}

if(document.cookie == "user=loged"){
	document.getElementById('logIn').style.display = 'none';
	document.getElementById('logOut').style.display = 'block';
} else {
	document.getElementById('logIn').style.display = 'block';
	document.getElementById('logOut').style.display = 'none';
}