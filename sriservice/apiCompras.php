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

	$first = 1;
	$two = 2;
	$three = 3;
	$four = 4;
	$five = 5;
  $six = 6;
  $seven = 7;
  $eight = 8;
  $nine = 9;
  $ten = 10;
  $eleven = 11;
  $twelve = 12;

	$dates = array("first" => $first, "two" => $two, "three" => $three, "four" => $four, "five" => $five, "six" => $six, "seven" => $seven, "eight" => $eight, "nine" => $nine, "ten" => $ten, "eleven" => $eleven, "twelve" => $twelve);

	foreach ($dates as $key => $value) {
		try{
			$sql='SELECT id, password_sri, ruc FROM empresas WHERE auto_sri ORDER BY id';
			$stmt = $gbd -> prepare($sql);
			$stmt -> execute();
			while($rowkey = $stmt->fetch(PDO::FETCH_ASSOC)){
				$id = $rowkey['id'];
				$ruc = $rowkey['ruc'];
				$password = $rowkey['password_sri'];
				echo shell_exec('phantomjs --web-security=no facturas.js '.$ruc.' '.$password.' '.$id.' '.$value.'');
			}
		}catch(PDOException $e){
			echo $e;
		}
	}
?>
