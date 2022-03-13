<?php
    
session_start();
include("connection.php");

$con = mysqli_connect('45.13.252.52', $database_user, $database_pasw);
mysqli_select_db($con, $database_name);

$name = $_POST['namePlace'];
$description = $_POST['description']; 
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$url = $_POST['url'];
$country = $_POST['countryPlace'];
$city = $_POST['cityPlace'];
$type = $_POST['types'];
$photos = $_POST['photos'];
$insta = $_POST['insta'];

// GET ID
    // if(isset($_SESSION["data-login"])){
    //     $sentencia = "SELECT * FROM $usertable WHERE nameUser = '" . $_SESSION["data-login"] . "';";
    // } else {
    //     $sentencia = "SELECT * FROM $usertable WHERE nameUser = '" . $_COOKIE["data-login"] . "';";
    // }
    // echo $sentencia;
    // $result = mysqli_query($con, $sentencia);
    // $user_row = mysqli_fetch_row($result); 
    // $id = $user_row[0]; 
    // $username = $user_row[1]; 

// FORMAR SENTENCIA INSERT
echo $url . "<br>";
$url = str_replace('"', '%22', $url);
echo $url . "<br>";

$sentencia = 'INSERT photowhere_places VALUES(NULL,    
                                            "'.$name.'", 
                                            "'.$description.'", 
                                            "'.$latitude.'", 
                                            "'.$longitude.'", 
                                            "'.$url.'",
                                            "'.$country.'", 
                                            "'.$city.'", 
                                            "'.$type.'", 
                                            "'.$photos.'", 
                                            "'.$insta.'",
                                            0, 
                                            "'.$id.'", 
                                            NOW());';
echo $sentencia . "<br>";

$output = "2";

if (mysqli_query($con, $sentencia)) {

    $output = "Todo fachero " . $username;

} else {

    $output = "-Error occurred: " . mysqli_error($con);

}


echo $output;

?>