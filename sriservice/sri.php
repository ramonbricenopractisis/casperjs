<?php

	session_start();
	header("Access-Control-Allow-Origin: *");
	error_reporting(1);
	$dbname='administrador_practisis';
	include("db.class.php");
	$gbd = new DBConn($dbname);
	$ca = $_POST['ca'];
	$tipoComprobante = $_POST['tipoComprobante'];
	$ruc = $_POST['ruc'];
	$companyId = (String)$_POST['companyId'];
	$date = $_POST['date'];

	try{
		$sqlSelect = "SELECT count(claveacceso) as cuantos FROM compraselectronicas WHERE claveacceso = '".$ca."'";
		$stmtSelect = $gbd -> prepare($sqlSelect);
		$stmtSelect -> execute();
		$rowkey = $stmtSelect->fetch(PDO::FETCH_ASSOC);
		if ($rowkey['cuantos'] > 0) {
			echo $ca.'CA REPETIDO';
		}else{
			$sql = "INSERT INTO compraselectronicas (claveacceso, id_empresa, id_cliente, procesado, id_email, id_compra, tipodocumento) VALUES ('".$ca."', '".$companyId."', '".$ruc."', false, 0, 0, ".$tipoComprobante.")";
			$stmt = $gbd -> prepare($sql);
			$stmt ->execute();
			// $sql = "INSERT INTO compraselectronicas1 (claveacceso, id_empresa, id_cliente, procesado, id_email, id_compra, tipodocumento, date_correct) VALUES ('".$ca."', replace('".$companyId."', ' ', ''), '".$ruc."', false, 0, 0, ".$tipoComprobante.", ".$date.")";
			// $stmt = $gbd -> prepare($sql);
			// $stmt ->execute();
		}
	}catch(PDOException $e){
		echo $e;
	}

?>
