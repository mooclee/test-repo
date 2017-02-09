<?php

// https://github.com/mongodb/mongo-php-driver

/////////////////////////////////////////////////////////
// svrop.php
// type:
//	- image (dataurl)
//	- whb: for multiple bigboard
//	- timeline: for recording and playback
/////////////////////////////////////////////////////////

$sPresent = "Present";
$col_usr = 'users';
$col_act = 'activities';

// common
include "common.php";
include "database.php";
include "svrop_xeditable.php";
include "svrop_activity.php";
include "svrop_assessment.php";
include "svrop_impression.php";
include "svrop_email.php";
include "svrop_img.php";
include "svrop_uploader.php";
include "svrop_notify.php";

//echo my_server_url(); exit();
include "svrop_test.php";

if (file_exists('recaptcha.php')){
	// full version
	include "database_templates.php";
	include "recaptcha.php";
	// recaptcha
	require_once __DIR__ . '\recaptcha-master\src\autoload.php';
	// swiftmailer
	require_once "swiftmailer-5.x/lib/swift_required.php";
}

// ERROR HANDLING
ini_set('display_errors', 1);
error_reporting(E_ALL);

// WRITE ERROR LOG
ini_set("log_errors", 1);
ini_set("error_log", $logfile);
//error_log( "Hello, errors!" );

// DEBUGGING
$debug_svrop = 2;
if ($debug_svrop >= 3){
	echo "*****<br/>";
	echo "METHOD=".var_export($_SERVER['REQUEST_METHOD'], true)."<br>";
	echo "GET=".var_export($_GET, true)."<br>";
	echo "POST=".var_export($_POST, true)."<br>";
	echo "*****"."<br>";
} else if ($debug_svrop >= 2){
	wlog('*****');
	wlog("METHOD=".var_export($_SERVER['REQUEST_METHOD'], true));
	wlog("GET=".var_export($_GET, true));
	wlog("POST=".var_export($_POST, true));
	wlog('*****');
}
$type = getQS('type');
if (!$type){

	echo('no type');
	
} else {
	
	$act_id = getQS('act_id');
	if ($act_id){
		$act_id = intval($act_id);
	}
	$user_id = getQS('user_id');
	if ($user_id){
		$user_id = intval($user_id);
	}
	$email = getQS('email');
	$pwd = getQS('pwd');
	$reset_pwd = getQS('reset_pwd');
	
	if ($debug_svrop){
		wlog($user . ',' . $type . '...start');
	}
	$output = array();
	$error = '';
	$nooutput = 0;
	switch ($type){
		//case 'find_doc':						findDoc();									break;	// dangerous
		
		case 'login':								logIn();										break;
		case 'signup':							signUp(); 									break;
		case 'xeditable':						xEditable();								break;
		case 'dl_img':							$nooutput = downloadImg();	break;
		case 'ul_img':							uploadImg();	 							break;
		case 'show_skills':					showSkills();								break;
		case 'profile_order':				profileOrder();							break;
		case 'activity_sharing':		activitySharing();					break;
		case 'new_sequence':				newSequence();							break;
		case 'find_field':					find_field();								break;
		case 'check_users':					checkUsers();								break;
		case 'get_userdoc':					getUserDoc();								break;
		case 'reset_pwd':						resetPwd();									break;
		case 'get_ntwk':						getNtwk();									break;
		
		// MEDIA
		case 'ul_media':						uploadMedia();							break;		
		case 'get_media':						getMedia();									break;
		case 'remove_media':				removeMedia();							break;
		
		// ACTIVITY
		case 'save_activity':				saveActivity();							break;
		case 'get_activity':				getActivity();							break;
		case 'delete_activity':			deleteActivity();						break;
		case 'publish_activity':		publishActivity();					break;
		
		// WORK-FLOW
		case 'save_peerassessors':	savePeerAssessors();				break;
		case 'save_assessment':			saveAssessment();						break;
		case 'submit_impression':		submitImpression();					break;
		
		// NOTIFICATION
		case 'notify_token':				notifyToken();							break;
		
		default:
			$error = 'wrong type';
			break;
	}
	//$output['1'] = md5(1);	$output['2'] = md5(2);	$output['3'] = md5(3);
	
	if ($nooutput == 0){
		$output['server_time'] = getDateTime();
		$output['error'] = $error;
		echo json_encode($output);
	}
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

function logIn(){
	global $database, $error, $type, $email, $pwd, $error, $output, $reset_pwd;
	if ($email == ''){
		$error = 'user is not defined';
	} else if ($pwd == ''){
		$error = 'password is not defined';
	} else {
		// find user from database
		$documents = databaseRead($database, 'users', ['email'=>$email]);
		$found = sizeof($documents);
		if (!$found){
			$error = 'The email is not found.';
		} else if ($found > 1){
			$error = 'The email has more than one occurence.';	// IMPOSSIBLE!
		} else {
			
			$user = json_decode(json_encode($documents[0]), true);
			if ($user['confirmed_email'] == 0){
				
				$next_send_confirm = checkNextSendConfirm($user);
				if ($next_send_confirm){
					
					// UPDATE THE SEND TIME
					$result = databaseUpdate($database, 'users', ['email' => $email], ['$set' => ['next_send_confirm' => $next_send_confirm]]);
					
					// RESEND EMAIL
					$username = $user['username'];
					$email = $user['email'];
					$secret_token = $user['secret_token'];
					sendEmail_confirmation($username, $email, $secret_token);					
					$error = 'A confirmation email is resent.';
				} else {
					// TRY AGAIN LATER
					$error = 'Your confirmation email was just sent earlier. Try again later.';
				}
			}	else if ($reset_pwd != ""){
				
				// check if it equal to secret_token
				if ($user['secret_token'] != $reset_pwd){
					$error = 'Invalid reset password. You may request it again.';
				} else {
					// successful after reset password
				}
			} else if ($user['pwd'] != $pwd){
				$error = 'Wrong password.';
				//$error = 'Wrong password. ' . $user['pwd'] . ' ' . $pwd;
			} else {
					// successful login with current password
			}
				
		}
	}
}
/*
				// check last send time
				$send_confirm = 0;
				$last_send_confirm = '';
				if (isset($user['last_send_confirm']) && $user['last_send_confirm'] != ''){
					$last_send_confirm = $user['last_send_confirm'];
					$next_send_confirm = new DateTime($last_send_confirm);
					date_add($next_send_confirm, date_interval_create_from_date_string('1 hour'));
					$next_send_confirm2 = date_format($next_send_confirm, 'Y-m-d H:m:s');
					//echo $now . '+' . $next_send_confirm2;
					if ($now > $next_send_confirm2){
						$send_confirm = 1;
					}
				} else {
					$send_confirm = 1;
				}
				if ($send_confirm){

*/
///////////////////////////////////////////////////////////////////////////////////////////////////////

function showSkills(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	//print_r($_REQUEST);
	$label = $_REQUEST['label'];
	$show = $_REQUEST['show'] == 1 ? 1:0;
	$field = "skills.$label.show";
	//echo "$field=>$show";
	$res = databaseUpdate($database, 'users', ['email' => $email], ['$set' => [$field => $show]]);
}

/////////////////////////////////////////////////////

function lang_sort($a, $b){
	return -strcmp($a["language"], $b["language"]);
}
function date_sort($a, $b){
	return strcmp($a["language"], $b["language"]);
}
/////////////////////////////////////////////////////

function updatePosLoc($type1, $user){
	global $database, $error, $user_id, $email, $pwd, $error, $output, $debug_svrop, $sPresent;
	// update position and locaiton for the latest data
	//$criteria = ['email' => $email];
	$filters = ['user_id' => $user_id];
	$pos = ''; $loc ='';
	switch ($type1){
		case 'work':
		case 'education':
			$arr = ['work', 'education'];
			foreach ($arr as $type2){
				$item_arr = $user['profile'][$type2];
				//foreach ($item_arr as $key => $item){
				for ($i = sizeof($item_arr) - 1; $i >= 0 ; $i--){	// reverse order (latest first);
					$item = $item_arr[$i];
					//print_r($item);
					if ($item['end'] == $sPresent){
						
						switch ($type2){
							
							case 'work':
								// calculate the period (this will be false information when time is passed)
								//$period = getPeriod($item['start'] . '-01');
								//$pos = $item['title'] . $period;
								$pos = $item['title'];
								$loc = $item['company'];
								if (isset($item['location']) && $item['location']){
									$loc .= ', ' . $item['location'];
								}
								break;
								
							case 'education':
								// calculate the year (assume the school year begin in sept)
								$year = getSchoolYear($item['start'] . '-09-01');
								$pos = $item['degree'];
								if (isset($item['field']) && $item['field']){
									$pos .= ', ' . $item['field'];
								}
								$pos .= $year;
								$loc = $item['school'];
								//if (isset($item['location']) && $item['location']){
								//	$loc .= ', ' . $item['location'];
								//}
								break;
								
						}
						break;
					}
				}
				if ($pos != '' || $loc != ''){
					break;
				}
			}
			// even if no pos and loc, update them to empty in database
			$update = ['$set' => ["position" => $pos, "location" => $loc]];
			$result = databaseUpdate($database, 'users', $filters, $update);
			$output['position'] = $pos;
			$output['location'] = $loc;
			break;
	}
}

/////////////////////////////////////////////////////

function profileOrder(){
	global $database, $error, $type, $email, $pwd, $error, $output, $debug_svrop;
	$order = getQS('order');
	if (!$order) $order = '0';
	//isset($_REQUEST['order']) ? $_REQUEST['order'] : '0';
	//$order = json_decode($order, true);
	//print_r($order);
	$criteria = ['email' => $email];
	$update = ['$set' => ["profile.order" => $order]];
	$result = databaseUpdate($database, 'users', $criteria, $update);
	$output['order'] = $order;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
db.getCollection('users').update(
    {
        'email': 'alantypoon@gmail.com', 'profile.activity.act_id': 1
    },
    {
        '$set': {
            'profile.activity.$.sharing': '1'
        }
    }
);
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////

function activitySharing(){
	global $database, $error, $type, $email, $pwd, $error, $output, $user_id, $col_usr;
	$act_id = intval($_REQUEST['act_id']);
	$sharing = $_REQUEST['sharing'];
	$criteria = ['user_id' => $user_id, 'profile.activity.act_id' => $act_id];
	$update = ["profile.activity.$.sharing" => $sharing];
	$output['sharing'] = $sharing;
	$res = databaseUpdate($database, $col_usr, $criteria, ['$set' => $update]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function find_field(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	$arr = array();
	$collection = isset($_REQUEST['collection']) ? $_REQUEST['collection'] : '';
	$searchkey = isset($_REQUEST['q']) ? $_REQUEST['q'] : '';
	//$searchkey = 'hku';
	if ($searchkey != ''){
		$manager = new MongoDB\Driver\Manager("mongodb://mongodb:27017");
		if (!checkDatabase($manager, $database) && !checkCollection($manager, $database, $collection)){
			
			//echo "databaseRead: $database, $collection";
			$documents = 0;
			switch ($collection){
			
				case 'skills':
					$arr = datadbaseFind($manager, $database, $collection, 'names', '^'.$searchkey);
					break;
					
				case 'users':
				case 'users_activities':
					
					//////////////////////////////////
					// USERS
					//////////////////////////////////
					$collection1 = 'users';
					if (strpos($searchkey, '@') === false){
						// NORMAL SEARCH
						$documents = datadbaseFind($manager, $database, $collection1, 'username', '^'.$searchkey);
						if (!$documents){
							$documents = datadbaseFind($manager, $database, $collection1, 'email', $searchkey);
						}
					} else {
						// EMAIL SEARCH
						$documents = datadbaseFind($manager, $database, $collection1, 'email', $searchkey);
					}
					foreach ($documents as $key => $value){
						array_push($arr,
							array(
								'user_id' => $value->user_id,
								'img_id' => $value->img_id,
								'username' => $value->username,
								'email' => $value->email
							)
						);
					}
					//////////////////////////////////
					// ACTIVITIES
					//////////////////////////////////
					if ($collection == 'users_activities' && !$documents){
						$collection1 = 'activities';
						// NORMAL SEARCH
						$documents = datadbaseFind($manager, $database, $collection1, 'title', $searchkey);
						foreach ($documents as $key => $value){
							array_push($arr,
								array(
									'act_id' => $value->act_id,
									'img_id' => $value->img_id,
									'title' => $value->title,
									//'email' => $value->email
								)
							);
						}
					}
					
					break;
			}
		}
		$output['results'] = $arr;
	}
}

////////////////////////////////////////////////////////////////////////////

function getUserDoc(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	$user_id = intval(getQS('user_id'));
	$options = getQS('options');
	if (!$user_id){
		$error = "no user_id";
	} else {
		if (!$options){
			$options = [];
		}
		$documents = databaseRead($database, 'users', ['user_id' => $user_id], $options);
		if ($documents && sizeof($documents) > 0){
			$output['user'] = $documents[0];
		} else {
			$error = "no such a user";
		}
	}
}


/////////////////////////////////////////////////////
// fixed for various type of input 20161009

function item_sort($a, $b){
	global $sPresent;
	if (isset($a['end'])){
		if ($a['end'] == $sPresent && $b['end'] != $sPresent){
			return 1;
		} else if ($a['end'] != $sPresent && $b['end'] == $sPresent){
			return -1;
		}
	}
	// both present or both not present
	if (isset($a['start'])){
		return strcmp($a["start"], $b["start"]);	
	} else if (isset($a['date'])){
		return strcmp($a["date"], $b["date"]);	
	} else {
		return 0;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////

function resetPwd(){
	global $database, $error, $type, $email, $pwd, $error, $output, $secret, $template_user;
	if (isset($_REQUEST['email'])){
		$username = $_REQUEST['email'];
	}	
	if ($email == ''){
		$error = 'user is not defined';
	} else {
		$documents = databaseRead($database, 'users', ['email'=>$email]);
		$size = $documents ? sizeof($documents) : 0;
		$output['num_of_users'] = $size;
		//echo $size;
		if ($size == 0){
			$error = "We cannot find the email <b>$email</b> in our accounts.";
		} else if ($size > 1){
			$error = 'More than one of this email has been registered. Please contact system administrator';
		} else {
			$user = json_decode(json_encode($documents[0]), true);
			$next_send_confirm = checkNextSendConfirm($user);
			if ($next_send_confirm){
				// UPDATE USER INFORMATION
				$result = databaseUpdate($database,	'users',	['email' => $email], ['$set' =>
					[
						'secret_token' => create_guid(),
						'next_send_confirm' => $next_send_confirm,
					]
				]);
				// Send Email
				sendEmail_forgotpwd($username, $email, $secret_token);
			} else {
				// TRY AGAIN LATER
				$error = 'Your request was just sent earlier. Try again later.';
			}
		}
	}
}

/*
			$now = getDateTime();
			$send_confirm = 0;
			$send_confirm = 1;	// for testing only
			if (isset($user['last_send_confirm'])){
				$last_send_confirm = $user['last_send_confirm'];
				$next_send_confirm = new DateTime($last_send_confirm);
				date_add($next_send_confirm, date_interval_create_from_date_string('1 hour'));
				$next_send_confirm2 = date_format($next_send_confirm, 'Y-m-d H:m:s');
				//echo $now . '+' . $next_send_confirm2;
				if ($now > $next_send_confirm2){
					$send_confirm = 1;
				}
			} else {
				$send_confirm = 1;
			}
			//if ($send_confirm){
*/
////////////////////////////////////////////////////////////////////////////////////////////////
// findDoc (dangerous)
// - find mongodb sub document thru the find function
// 
// http://stackoverflow.com/questions/15081463/how-to-write-mongo-query-to-find-sub-document-with-condition
// https://docs.mongodb.com/v3.2/reference/method/db.collection.find/#examples
// http://php.net/manual/en/class.mongodb-driver-query.php
// - $options = [ 'projection' => ['_id' => 0],];
// e.g. db.getCollection('users').find({user_id:1}, {_id:0, 'profile.education':1}) // query, projection
// https://github.com/mongodb/mongo-php-driver/issues/238
////////////////////////////////////////////////////////////////////////////////////////////////
function findDoc(){
	global $debug_svrop, $input, $output, $error, $database;
	$collection = isset($_REQUEST['collection']) ? $_REQUEST['collection'] : '';
	$key_field = isset($_REQUEST['key_field']) ? $_REQUEST['key_field'] : '';
	$key_value = isset($_REQUEST['key_value']) ? $_REQUEST['key_value'] : '';
	$path =  isset($_REQUEST['path']) ? $_REQUEST['path'] : '';
	
	$criteria = [$key_field => intval($key_value)];
	$options = [];
	if ($path != ''){
		$options = [ 'projection' => ['_id' => 0, $path => 1] ];
	}
	$documents = databaseRead($database, $collection, $criteria, $options);
	if ($documents && sizeof($documents) > 0){
		$output['doc'] = json_decode(json_encode($documents[0]), true);
	}
	$output['items'] = sizeof($documents);
	$output['debug'] = "collection=$collection key_field=$key_field key_value=$key_value path=$path";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function newSequence(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	$field = getQS('field');
	$new_seq = datadbaseFindAndInc($database, 'sequences', $field);
	$output['new_seq'] = $new_seq;
}

///////////////////////////////////////////////////////////////////////////////////////////

function getNewSequenceID($id_name, $collection){
	global $database, $error, $type, $email, $pwd, $error, $output;
	$new_id = 0;
	$retry = 1000;
	while ($retry-- > 0){
		// generate a new id
		$new_id = intval(datadbaseFindAndInc($database, 'sequences', $id_name));
		if (is_nan($new_id) || $new_id == 0){
			// impossible
			$new_id = 0;
		} else {
			// check if this is used already
			$documents = databaseRead($database, $collection, [$id_name => $new_id]);
			if (!$documents || !sizeof($documents)){
				// not used yet
				wlog("generate new $id_name=$new_id on $database $collection");
				break;
			} else {
				wlog("WARNING duplicate $id_name=$new_id from $database $collection");
			}
		}
	}
	return intval($new_id);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function getNtwk(){
	global $debug_svrop, $input, $output, $error, $database;
	$arr = [];
	$documents = databaseRead($database, 'users', [], [ 'projection' => ['_id' => 0, "user_id" => 1, "username" => 1, "position" => 1, "location" => 1, 'img_id' => 1 ] ]);
	$doc = json_decode(json_encode($documents), true);
	$output['users'] = $doc;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	"impression" : {
			"panelists" : {
					"peer_assessors" : [ 
							2, 
							3, 
							8, 
							15
					]
			},

*/

function savePeerAssessors(){
	global $debug_svrop, $input, $output, $error, $database, $user_id;
	$act_id = intval(getQS('act_id'));
	$ass_id = intval(getQS('ass_id'));	// if = 0, impression
	$selected = getQS('selected');
	if (gettype($selected) == 'string'){
		$selected = json_decode($selected, true);
	}
	$collection = "users";
	$filters = ['user_id' => $user_id, 'profile.activity.act_id' => $act_id];
	if ($ass_id == 0){
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// impression (ass_id=0) (done)
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$sets = ['$set' => ['profile.activity.$.impression.panelists.peer_assessors' => $selected ] ];
		$result = databaseUpdate($database, $collection, $filters, $sets);
		// testing
		//$documents = databaseRead($database, $collection, $filters, [ 'projection' => ['_id' => 0, 'profile.activity.$.impression.panelists.peer_assessors' => 1 ] ]);
		//$output['users'] = json_decode(json_encode($documents), true);
		
	} else {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// assessment (done)
		// http://stackoverflow.com/questions/14855246/multiple-use-of-the-positional-operator-to-update-nested-arrays
		// https://pythonolyk.wordpress.com/2016/01/17/mongodb-update-nested-array-using-positional-operator/
		// db.getCollection('users').update(
		//    { user_id:1, 'profile.activity.act_id':4},
		//    { $set:{ 'profile.activity.$.assessments.0.panelists.peer_assessors' : [1,2,3]}}
		// ))		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$index = $ass_id - 1;
		$sets = ['$set' => ['profile.activity.$.assessments.'.$index.'.panelists.peer_assessors' => $selected ] ];
		$result = databaseUpdate($database, $collection, $filters, $sets);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUserByID($users, $user_id){
	$user = 0;
	if (is_array($users)){
		for ($i = 0; $i < sizeof($users); $i++){
			$user2 = $users[$i];
			$user_id2 = $user2['user_id'];
			if ($user_id == $user_id2){
				$user = $user2;
				break;
			}
		}
	} else if (isset($users[$user_id])){
		$user = $users[$user_id];
	}
	return $user;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getActivityByID($activities, $act_id){
	$activity = 0;
	if (is_array($activities)){
		for ($i = 0; $i < sizeof($activities); $i++){
			$activity2 = $activities[$i];
			$act_id2 = $activity2['act_id'];
			if ($act_id == $act_id2){
				$activity = $activity2;
				break;
			}
		}
	} else if (isset($$activities[$act_id])){
		$activity = $$activities[$act_id];
	}
	return $activity;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////


function checkUsers(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	
	$debug_checkuser = 0;
	
	$users1 = getQs('users');
	if (!$users1){
		$error = "no users";
	} else {
		if (gettype($users1) == 'string'){
			$users1 = json_decode($users1, true);
		}
		//var_dump($users1); exit();
		//print_r($users1);
		//$users1 = array(1,2,3, 'alan@gmail.com');
		$output_user = 0;
		$output_users = [];
		
		foreach ($users1 as $key => $value){
			
			// FOR EACH INPUT VALUE
			$user_id = 0;
			$documents = 0;
			if (gettype($value) && strpos($value, '@') == FALSE){
				////////////////////////////////////////////////////////////////////////////////////
				// case 1: it is not an email: i.e. user_id
				////////////////////////////////////////////////////////////////////////////////////
				$user_id = intval($value);
				if ($debug_checkuser){
					echo "case 1: user_id=$user_id<br/>";
				}
				// find the user from the database
				$documents = databaseRead($database, 'users', ['user_id' => $user_id]);
				if ($documents && sizeof($documents)){
					$user = $documents[0];
					$output_user = array(
						'user_id' 	=> $user_id,
						'img_id' 		=> $user->img_id,
						'username' 	=> $user->username,
						'email' 		=> $user->email,
						'position' 	=> isset($user->position)?$user->position:'',
						'location' 	=> isset($user->location)?$user->location:'',
					);
				}
			} else {
				// case 2: it is an email
				$documents = databaseRead($database, 'users', ['email' => $value]);
				if ($documents && sizeof($documents)){
					////////////////////////////////////////////////////////////////////////////////////
					// case 2A: the email already exists, find its user_id
					////////////////////////////////////////////////////////////////////////////////////
					$user = $documents[0];
					$user_id = intval($user->user_id);
					if ($debug_checkuser){
						echo "case 2A: email=$value user_id=$user_id<br/>";
					}
					$output_user = array(
						'user_id' 	=> $user_id,
						'img_id' 		=> $user->img_id,
						'username' 	=> $user->username,
						'email' 		=> $user->email,
						'position' 	=> isset($user->position)?$user->position:'',
						'location' 	=> isset($user->location)?$user->location:'',
					);
				} else {
					////////////////////////////////////////////////////////////////////////////////////
					// case 2B: it doesn't exists
					////////////////////////////////////////////////////////////////////////////////////
					if ($debug_checkuser){
						echo "case 2B: new email=$value<br/>";
					}
					// give an empty user with only an email 
					$output_user = array(
						'user_id' => 0,
						'username' => $value,
						'email' => $value,
						'position' => '(Unregistered)'
					);
				}
			}
			// no id
			if ($output_user){
				
				//var_dump($output_user);
				
				// is this user already in the output array?
				// check duplicate http://stackoverflow.com/questions/6661530/php-multi-dimensional-array-search				
				$user_id = intval($output_user['user_id']);
				
				$key = array_search($user_id, array_column($output_users, 'user_id'));
				if ($key === FALSE){
					// no duplication
					array_push($output_users, $output_user);
				}
			}
		}
		$output['users'] = $output_users;
	}
}

/////////////////////////////////////////////////////////////////////

function signUp(){
	global $database, $error, $type, $email, $pwd, $error, $output, $secret, $template_user, $user_id;
	$username = ''; $gender = ''; $birthday = ''; $resp = ''; $captcha = 0;
	if (isset($_REQUEST['g-recaptcha-response'])){
		$resp = $_REQUEST['g-recaptcha-response'];
	}
	if ($resp == ''){
		
		$error = 'reCaptcha is not set';
		
	} else {
		
		$recaptcha = new \ReCaptcha\ReCaptcha($secret);
		
		$result = $recaptcha->verify($resp, $_SERVER['REMOTE_ADDR']);
		if (!$result->isSuccess()){
			$error = 'reCaptcha is failed: ' . $_SERVER['REMOTE_ADDR'];
		} else {
			
			// check other params
			$username = getQs('name');
			$gender = getQs('gender');
			$birthday = getQs('bithday');
			if ($username == ''){
				
				$error = 'username is not defined';
				
			} else if ($email == ''){
				
				$error = 'user is not defined';
				
			} else if ($pwd == ''){
				
				$error = 'password is not defined';
				
			} else if ($gender == ''){
				
				$error = 'gender is not defined';

			} else if ($birthday == ''){
				
				$error = 'birthday is not defined';
				
			} else {
				
				//
				$filters = ['email' => $email];
				$documents = databaseRead($database, $col_usr, $filters);
				if (!$documents || !sizeof($documents)){
					// create a new user
					$user = jsonclone($template_user);
					$user->user_id = getNewSequenceID('user_id', 'users');
				} else {
					// load the old user
					$user = $documents[0];
				}
				// update user information
				//$user->user_id_md5 = md5($user_id);
				$user->email = $email;
				$user->pwd = $pwd;
				$user->username = $username;
				$user->gender = $gender;
				$user->birthday = $birthday;
				$user->confirmed_email = 0;
				$user->secret_token = create_guid();
				$user->next_send_confirm = getNextSendConfirm();
				// insert or update database
				$result = databaseInsertOrUpdate($database, $col_usr, $filters, $user);
				// send confirmation
				sendEmail_confirmation($username, $email, $user->secret_token);
			}
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////

function getNextSendConfirm(){
	$datetime = new DateTime(getDateTime());
	date_add($datetime, date_interval_create_from_date_string('1 hour'));
	$next_send_confirm = date_format($next_send_confirm, 'Y-m-d H:m:s');
	return $next_send_confirm;
}

/////////////////////////////////////////////////////////////////////////////////////

function checkNextSendConfirm($user){
	$out = 0;
	$next_send_confirm = isset($user['next_send_confirm']) ? $user['next_send_confirm'] : 0;
	if (!$next_send_confirm || $next_send_confirm > getDateTime()){
		$out = $next_send_confirm;
	}
	return $out;
}

?>
