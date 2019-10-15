<?php

$image = 'http://165.227.110.138/sriservice/captures/'.$_REQUEST['image_url'];
$image = 'captcha24.png';
$botToken = '790769646:AAFPB3DXxBHKl-jEpRHGbEghkoDGBWCAY4U';
$url = 'https://api.telegram.org/bot'.$botToken;

print_r($url.'/sendPhoto?chat_id=772464777&photo=http://165.227.110.138/sriservice/captures/'.$image);

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// $bot_url    = "https://api.telegram.org/bot790769646:AAFPB3DXxBHKl-jEpRHGbEghkoDGBWCAY4U";
// $chat_id = '772464777';
// $url        = $bot_url . "sendPhoto?chat_id=" . $chat_id ;
// $post_fields = array('chat_id'   => $chat_id,
//     'photo'     => new CURLFile(realpath("http://165.227.110.138/sriservice/captures/captcha24.png"))
// ;
//
// $ch = curl_init();
// curl_setopt($ch, CURLOPT_HTTPHEADER, array(
//     "Content-Type:multipart/form-data"
// ));
//
//
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
// $output = curl_exec($ch);
// print_r($output);
?>
