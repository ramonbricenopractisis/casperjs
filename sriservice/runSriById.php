<?php
	header("Access-Control-Allow-Origin: *"); 
	ini_set('display_startup_errors',1);
	ini_set('display_errors',1);
	$dbname='administrador_practisis';
	include("db.class.php");
	$gbd = new DBConn($dbname);

	$dateSri = $_GET['dateSri'];
	$rucSri = $_GET['rucSri'];
	$passSri = $_GET['passSri'];
	$idEmpresaSri = $_GET['idEmpresaSri'];
	echo shell_exec("/usr/bin/phantomjs --web-security=no facturas.js ".$rucSri." ".$passSri." ".$idEmpresaSri." '".$dateSri."'");
	echo "<script>window.location.href='https://www.practisis.online/contabilidad/?modulo=administrador&index=parametrizar';</script>";

?>