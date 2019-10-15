<?php
	session_start();
	date_default_timezone_set('America/Guayaquil');
	header("Access-Control-Allow-Origin: *");
	ini_set('display_startup_errors',1);
	ini_set('display_errors',1);
	error_reporting(-1);
	ini_set('max_execution_time', 0);
	$dbname='administrador_practisis';
	include("db.class.php");
	$gbd = new DBConn($dbname);
	$emp = '';
	$ruc = '';
	$password = '';
	$date = '';
	if ($_REQUEST['emp']) {
		$emp = $_REQUEST['emp'];
	}
	if ($_REQUEST['ruc']) {
		$ruc = $_REQUEST['ruc'];
	}
	if ($_REQUEST['password']) {
		$password = $_REQUEST['password'];
	}
	if ($_REQUEST['date']) {
		$date = $_REQUEST['date'];
	}
	if ($emp == '') {
		echo "Especificar Empresa";
	}else if ($ruc == '') {
		echo "Especificar RUC";
	}else if ($password == '') {
		echo "Especificar Password";
	}else if ($date == '') {
		echo "Especificar Fecha";
	}else{
			echo shell_exec('phantomjs --web-security=no facturasVentas.js '.$ruc.' '.$password.' '.$emp.' '.$date.'');
	}
?>
