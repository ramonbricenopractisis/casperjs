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

	$five_ago = date('d/m/Y', strtotime('-5 days'));
	$four_ago = date('d/m/Y', strtotime('-4 days'));
	$three_ago = date('d/m/Y', strtotime('-3 days'));
	$two_ago = date('d/m/Y', strtotime('-2 days'));
	$one_ago = date('d/m/Y', strtotime('-1 days'));

	$dates = array("five_ago" => $five_ago, "four_ago" => $four_ago, "three_ago" => $three_ago, "two_ago" => $two_ago, "one_ago" => $one_ago);

	foreach ($dates as $key => $value) {
		try{
			$sql='SELECT id, password_sri, ruc FROM empresas WHERE auto_sri ORDER BY id';
			$stmt = $gbd -> prepare($sql);
			$stmt -> execute();
			while($rowkey = $stmt->fetch(PDO::FETCH_ASSOC)){
				$id = $rowkey['id'];
				$ruc = $rowkey['ruc'];
				$password = $rowkey['password_sri'];
				echo shell_exec('phantomjs --web-security=no facturasVentas.js '.$ruc.' '.$password.' '.$id.' '.$value.'');
			}
		}catch(PDOException $e){
			echo $e;
		}
	}
?>
