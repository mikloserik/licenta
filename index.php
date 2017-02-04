<?php
   session_start();
?>

<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
   <head profile="http://gmpg.org/xfn/11">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

      <!--<link rel="stylesheet" type="text/css" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />-->
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />

      <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
      
      <!--<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'></script>
      <script type='text/javascript' src='http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js?2'></script>-->

      <link rel="stylesheet" href="dist/css/leaflet.extra-markers.min.css">
      <script src="dist/js/leaflet.extra-markers.min.js"></script>

      <script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/leaflet.markercluster.js'></script>
      <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.css" />
      <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.Default.css" />

      <link rel="stylesheet" href="http://labs.easyblog.it/maps/leaflet-search/style.css">
      <script src="https://maps.googleapis.com/maps/api/js?v=3&libraries=places&key=AIzaSyDBsZav2dwrP3gnwC3uezhzxUe6mQgMk2w"></script>

      <link rel="stylesheet" type="text/css" href="code/css/style.css">

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

      <title>Weather Monitor</title>
   </head>

   <body>
      
      <div id="map" style="width: 100%; height: 100%; border: 1px solid #AAA;">
         <div class="leaflet-control-container">
            <div class="leaflet-bottom leaflet-left">
               <input class="leaflet-control login" type="button" id="logIn" value="LogIn" onclick="logInPopUp()"/>
               <input class="leaflet-control" type="button" id="logOut" value="LogOut" onclick="logOut()"/>
            </div>  
            <div id="login-form-container" class="leaflet-control login">
               <form id="login-form" class="login">
                  <!--<input type="button" id="close" onclick="closePopUp()" value="x"/>-->
                  <input type="text" name="first_name" placeholder="first name" class="login register"/>
                  <br class="register"/>
                  <span class="error login register" id="error-first_name"></span>
                  <br class="register"/>
                  <input type="text" name="last_name" placeholder="last name" class="login register"/>
                  <br class="register"/>
                  <span class="error login register" id="error-last_name"></span>
                  <br class="register"/> 
                  <input type="text" name="username" placeholder="username" class="login"/>
                  <br/>
                  <span class="error login" id="error-username"></span>
                  <br/>
                  <input type="password" name="password" placeholder="password" class="login"/>
                  <br/>
                  <span class="error login" id="error-password"></span>
                  <br/>
                  <input type="text" name="email" placeholder="email address" class="login register">
                  <br class="register"/>
                  <span class="error login register" id="error-email"></span>
                  <br class="register"/>
                  <input id="login-btn" type="button" name="login" value="Log In" onclick="logInUser()" class="login">
                  <input id="reg-form" type="button" name="show-register" value="Register" onclick="showRegister()" class="login">
                  <input id="reg-btn" type="button" name="register" value="Sign Up" onclick="registerUser()" class="login register">
               </form>
            </div>
         </div> 
      </div>

      <script type="text/javascript" src='code/js/database.js'></script>
      <script type="text/javascript" src='code/js/cluster.js'></script>
      <script type='text/javascript' src='code/js/map.js'></script>
      <script type="text/javascript" src='code/js/search.js'></script>
      <script type="text/javascript" src='code/js/login.js'></script>
   </body>
</html>