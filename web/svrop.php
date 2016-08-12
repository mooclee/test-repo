<?php
/////////////////////////////////////////////////////////
// svrop.php
// type:
//	- image (dataurl)
//	- whb: for multiple bigboard
//	- timeline: for recording and playback
/////////////////////////////////////////////////////////

ini_set('display_errors', 1);
error_reporting(E_ALL);

// recaptcha
require_once __DIR__ . '\recaptcha-master\src\autoload.php';
include "recaptcha.php";

// swiftmailer
require_once "swiftmailer-5.x/lib/swift_required.php";

// common
include "common.php";

// mongodb queue
//require_once '/videoboard/php/thirdparty/vendor/autoload.php';
//use DominionEnterprises\Mongo\Queue;

$debug_svrop = 0;


if (!isset($_REQUEST['type'])){

	wlog('Error: no type');
	
} else {

	date_default_timezone_set('Asia/Hong_Kong');
	
	$type = ''; $email = ''; $pwd = '';
	if (isset($_REQUEST['type'])){
		$type = $_REQUEST['type'];
	}
	if (isset($_REQUEST['email'])){
		$email = $_REQUEST['email'];
	}
	if (isset($_REQUEST['pwd'])){
		$pwd = $_REQUEST['pwd'];
	}
	if ($debug_svrop){
		wlog($user . ',' . $type . '...start');
	}
	$output = array();
	$error = '';
	switch ($type){
		case 'login':								logIn();	break;
		case 'signup':							signUp(); break;
	}
	$output['error'] = $error;
	echo json_encode($output);
	if ($debug_svrop){
		wlog($user.','.$type.'...finish');
	}
}


/////////////////////////////////////////////////////////

function getFolder($room, $type, $createIfNone){
	global $room; 
	
	// GET CURRENT DIRECTORY
	$folder = getcwd() . SLASH . 'rooms';
	if (!is_dir($folder) && $createIfNone){
		mkdir($folder, 0777, true);
		chmod($folder, 0777);
	}
	
	// ADD ROOM
	if ($room){
		$folder .= SLASH . $room;
		if (!is_dir($folder) && $createIfNone){
			mkdir($folder, 0777, true);
			chmod($folder, 0777);
		}
	}
	
	// ADD TYPE
	if ($type){
		$folder .= SLASH . $type;
		if (!is_dir($folder)){
			mkdir($folder, 0777, true);
			chmod($folder, 0777);
		}
	}
	
	// ADD FINAL SLASH
	$folder .= SLASH;
	return $folder;
}

/////////////////////////////////////////////////////////
// without creation
function getFolder2($room, $type){
	global $room; 
	$folder = getcwd() 
		. SLASH . 'rooms'
		. SLASH . $room
		. SLASH . $type
		. SLASH;
	return $folder;
}

/////////////////////////////////////////////////////////////////////

function getLeadingZero($index, $total){
	$s = $index . '';
	$size = strlen($total);
	while (strlen($s) < $size){
		$s = "0" . $s;
	}
	return $s;
}

/////////////////////////////////////////////////////////////////////

function create_guid(){
	//if (function_exists('com_create_guid')){
	//	return com_create_guid();
	//} else 
	{
		mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
		$charid = strtoupper(md5(uniqid(rand(), true)));
		$hyphen = chr(45);// "-"
		$uuid =
				//chr(123)// "{"
				substr($charid, 0, 8)//.$hyphen
				.substr($charid, 8, 4)//.$hyphen
				.substr($charid,12, 4)//.$hyphen
				.substr($charid,16, 4)//.$hyphen
				.substr($charid,20,12)
				//.chr(125);// "}"
		;
		return $uuid;
	}
}

/////////////////////////////////////////////////////////////////////

function signUp(){
	global $database, $error, $type, $email, $pwd, $error, $output, $secret;
	$name = ''; $gender = ''; $birthday = ''; $resp = ''; $captcha = 0;
	if (isset($_POST['g-recaptcha-response'])){
		$resp = $_POST['g-recaptcha-response'];
	}
	if ($resp == ''){
		
		$error = 'reCaptcha is not set';
		
	} else {
		
		$recaptcha = new \ReCaptcha\ReCaptcha($secret);
		$result = $recaptcha->verify($resp, $_SERVER['REMOTE_ADDR']);
		if (!$result->isSuccess()){
			$error = 'reCaptcha is failed';
		} else {
			if (isset($_REQUEST['name'])){
				$name = $_REQUEST['name'];
			}	
			if (isset($_REQUEST['gender'])){
				$gender = $_REQUEST['gender'];
			}	
			if (isset($_REQUEST['birthday'])){
				$birthday = $_REQUEST['birthday'];
			}	
			if ($name == ''){
				
				$error = 'name is not defined';
				
			} else if ($email == ''){
				
				$error = 'user is not defined';
				
			} else if ($pwd == ''){
				
				$error = 'password is not defined';
				
			} else if ($gender == ''){
				
				$error = 'gender is not defined';
				
			} else {
				$manager = new MongoDB\Driver\Manager("mongodb://mongodb:27017");
				$query = new MongoDB\Driver\Query(['email'=>$email], []);	// filter, options
				$res = $manager->executeQuery("$database.users", $query);
				$documents = $res->toArray();
				$found = sizeof($documents);
				if ($found){
					
					$error = 'This email has already been signed up.';
					
				} else {
					
					// insert to the database
					$secret_token = create_guid();
					$datetime = getDateTime();
					$document1 = ['email' => $email, 'pwd' => $pwd, 'name' => $name, 'gender' => $gender, 'birthday' => $birthday, 'confirmed_email'=> 0, 'secret_token' => $secret_token, 'last_send_confirm' => $datetime];
					$bulk = new MongoDB\Driver\BulkWrite;
					$_id1 = $bulk->insert($document1);
					$manager = new MongoDB\Driver\Manager('mongodb://mongodb:27017');
					$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
					$result = $manager->executeBulkWrite("$database.users", $bulk, $writeConcern);
					
					// Send Email
					sendConfirmEmail($name, $email, $secret_token);
				}
			}
		}
	}
}

/////////////////////////////////////////////////////////////////////

function sendConfirmEmail($name, $email, $secret_token){
	$sender = array('yfolio@hku.hk' => 'Yolofolio');
	$recipients = $email;
	$server = $_SERVER['HTTP_HOST'];
	$url = "http://$server/login.php?secret_token=$secret_token";
	$subject = 'Yolofolio Account Confirmation';
	$body = "Dear $name,\r\n\r\nThank you for signing up with Yolofolio. Please click the following link to continue:\r\n\t$url\r\n\r\nBest regards,\r\n\r\nYolofolio Team";
	sendEmail($sender, $recipients, $subject, $body);	
}

/////////////////////////////////////////////////////////////////////

function logIn(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	if ($email == ''){
		$error = 'user is not defined';
	} else if ($pwd == ''){
		$error = 'password is not defined';
	} else {
		// find user from database
		$manager = new MongoDB\Driver\Manager("mongodb://mongodb:27017");
		$query = new MongoDB\Driver\Query(['email'=>$email], []);	// filter, options
		$res = $manager->executeQuery("$database.users", $query);
		$documents = $res->toArray();
		$found = sizeof($documents);
		if (!$found){
			$error = 'The email is not found.';
		} else if ($found > 1){
			$error = 'The email has more than one occurence.';
		} else {
			$user = json_decode(json_encode($documents[0]), true);
			if ($user['confirmed_email'] == 0){
				//print_r($documents);	// debug
				$error = 'This account is not confirmed yet.';
				// check last send time
				$last_send_confirm = $user['last_send_confirm'];
				$next_send_confirm = new DateTime($last_send_confirm);
				date_add($next_send_confirm, date_interval_create_from_date_string('1 hour'));
				$next_send_confirm2 = date_format($next_send_confirm, 'Y-m-d H:m:s');
				$now = getDateTime();
				//echo $now . '+' . $next_send_confirm2;
				if ($now > $next_send_confirm2){
					
					// UPDATE THE SEND TIME
					$bulk = new MongoDB\Driver\BulkWrite;
					$bulk->update(['email' => $email], ['$set' => ['last_send_confirm' => $now]]);					
					$manager = new MongoDB\Driver\Manager('mongodb://mongodb:27017');
					$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 1000);
					$result = $manager->executeBulkWrite("$database.users", $bulk, $writeConcern);
					
					// RESEND EMAIL
					$error .= ' A confirmation email is resent.';
					$name = $user['name'];
					$email = $user['email'];
					$secret_token = $user['secret_token'];
					sendConfirmEmail($name, $email, $secret_token);					
					
				} else {
					$error .= ' Your confirmation email was sent on ' . $last_send_confirm . ' and resend can only be processed 1 hour after this time.';
				}
			} else if ($user['pwd'] != $pwd){
				$error = 'Wrong password.';
			}
		}
	}
}

?>
