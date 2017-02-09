<?php

function notifyToken(){
	global $debug_svrop, $input, $output, $error, $database, $user_id, $col_usr, $col_act;	
	$platform = getQs('platform');
	$token = getQs('token');
	if (!$user_id){
		$error = "invalid user_id";
	} else if (!$token){
		$error = "invalid token: $token";
	} else if ($platform != 'ios' && $platform != 'android'){
		$error = "invalid platform: $platform";
	} else {
		$filters = ['user_id' => $user_id];
		$set = [ "token_$platform" => $token];
		$update = ['$set' => $set ];
		$result = databaseUpdate($database, $col_usr, $filters, $update);
	}
}

//////////////////////////////////////////////////////////

function sendNotificationToMobile($token_android, $token_ios, $msg){
	$payload = create_payload_json($msg);
	// first send to android
	if (isset($token_android) && $token_android){
		$user_mobile_info = ['user_device_type'=>"Android", 'user_mobile_token'=>[$token_android]];
		send_mobile_notification_request($user_mobile_info, $payload);
	}
	// second send to ios
	if (isset($token_ios) && $token_ios){
		$user_mobile_info = ['user_device_type'=>"iOS", 'user_mobile_token'=>$token_ios];
		send_mobile_notification_request($user_mobile_info, $payload);
	}
}

//////////////////////////////////////////////////////////

/*
function check_gcm_result($result, $devicelist) {
	if($val->error=="InvalidRegistration") {
		// need to remove this id from db
		array_push($rv, array('action' => 'delete', 'id' => $devicelist[$count]));						
		print "Error - Need to remove device id '{$devicelist[$count]}' from db\n";
		// tobeadded(alan): remove id from db
	} else {
		// may need to resend to this id
		array_push($rv, array('action' => 'resend', 'id' => $devicelist[$count]));					
		print "Error - Need to resend to device id '{$devicelist[$count]}'\n";				
		// tobeadded(alan): update id from db
	}
}
*/
?>
