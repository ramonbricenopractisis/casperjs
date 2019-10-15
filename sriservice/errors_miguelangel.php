<?php

	session_start();
	header("Access-Control-Allow-Origin: *"); 
	error_reporting(1);
	$dbname='administrador_practisis';
	include("db.class.php");
	$gbd = new DBConn($dbname);
	require('PHPM/class.smtp.php');
	require('PHPM/class.phpmailer.php');
	$error = $_POST['error'];
	$companyId = $_POST['companyId'];
	$companyRuc = $_POST['companyRuc'];
	$sriPassword = $_POST['sriPassword'];
	$date = date('Y-m-d');

	try {
		$sqlSelect = "SELECT count(id) as cuantos, error FROM srierrors WHERE error = '".$error."' and companyId = '".$companyId."' and fecha = '".$date."' group by srierrors.error";
		$stmtSelect = $gbd -> prepare($sqlSelect);
		$stmtSelect -> execute();
		$rowkey = $stmtSelect->fetch(PDO::FETCH_ASSOC);
		$count = $rowkey['cuantos'];
		$errorDb = $rowkey['error'];
		if ($count > 0) {
			echo $errorDb.'YA SE ENVIO EL ERROR';
		}else{
			$errorToSend = $_POST['error'];
			if ($errorToSend == 1) {
				$errorToSend = 'No se ingreso a la facturacion';
			}else if($errorToSend == 2){
				$errorToSend = 'Recuperacion de clave';
			}else if($errorToSend == 3){
				$errorToSend = 'No se logro iniciar sesion con estos datos';
			}else if($errorToSend == 5){
				$errorToSend = 'No se paso el captcha';
			}else{
				$errorToSend = 'No se ingreso al sistema del SRI';
			}

			$sql = "INSERT INTO srierrors (error, companyId, companyRuc, fecha) VALUES ('".$error."', '".$companyId."', '".$companyRuc."', '".$date."')";
			$stmt = $gbd -> prepare($sql);
			$stmt ->execute();
			$msg = $errorToSend.'--Empresa:(ID PRACTISIS) => '.$_POST['companyId'].'--RUCSRI => '.$_POST['companyRuc'].'--PASSWORDSRI => '.$_POST['sriPassword'];
			$mail = new PHPMailer();
			//$mail->IsSMTP();
			$mail->SMTPAuth = true;
			$mail->SMTPSecure = "ssl";
			$mail->Host = "smtp.gmail.com"; 
			$mail->Port = 465;
			$mail->setFrom('ramon@practisis.com', 'SRI ERROR PHANTOMJS RAMON');
			$mail->addAddress('ramon@practisis.com', 'PRACTISIS');
			$mail->Subject  = 'ERROR SRI';
			$mail->Body     = $msg;
			if(!$mail->send()) {
			  echo 'Message was not sent.';
			  echo 'Mailer error: ' . $mail->ErrorInfo;
			} else {
			  echo 'Message has been sent.';
			}
		}
	} catch (PDOException $e) {
		echo $e;
	}

	

?>