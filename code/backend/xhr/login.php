<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/var/www/LICENTA/code/backend/");

require_once ("controller/UserController.php");

$controller = new UserController();

echo $controller->loginAction();

return;