<?php
/////////////////////////////////////////////////////////////////////

function sendEmail($senders, $recipients, $subject, $body){
	global $test_qs;
	$result = 0;
	$debug = isset($test_qs);	
	$server = my_server_url();
	if ($server == 'https://yolofolio2.cetl.hku.hk:18443'){
		// send confirmation email
		$transport = Swift_SmtpTransport::newInstance('smtproam.hku.hk', 25)
			->setUsername('yfolio@hku.hk')
			->setPassword('rnquXky0rn')
		;
		// Create the Mailer using your created Transport
		$mailer = Swift_Mailer::newInstance($transport);
		//$logger = new \Swift_Plugins_Loggers_EchoLogger(); $mailer->registerPlugin(new \Swift_Plugins_LoggerPlugin($logger));	// testing only
		$message = Swift_Message::newInstance($subject)
			->setFrom($senders)
			->setTo($recipients)
			->setBody($body)
		;
		// Send the message
		$result = $mailer->send($message);
	} else {
		$tmp = "sendEmail: recipients=$recipients subject=$subject body=$body";
		if ($debug){
			echo "$tmp<br><br>";
		} else {
			wlog($tmp);
		}
	}
	return $result;
}

/////////////////////////////////////////////////////////////////////

function sendEmail_confirmation($username, $email, $secret_token){
	$sender = array('yfolio@hku.hk' => 'Yolofolio');
	$recipients = $email;
	$server = my_server_url();
	$url = "$server/login.php?email=$email&secret_token=$secret_token";
	$subject = 'Yolofolio Account Confirmation';
	$body = "Dear $username,\r\n\r\nThank you for signing up with Yolofolio. Please click the following link to continue:\r\n\t$url\r\n\r\nBest regards,\r\n\r\nYolofolio Team";
	sendEmail($sender, $recipients, $subject, $body);	
}

/////////////////////////////////////////////////////////////////////

function sendEmail_forgotpwd($username, $email, $secret_token){
	$sender = array('yfolio@hku.hk' => 'Yolofolio');
	$recipients = $email;
	$server = my_server_url();
	$url = "$server/login.php?reset_pwd=$secret_token&email=$email";
	$subject = 'Yolofolio Reset Password Request';
	$body = "Dear $username,\r\n\r\nWe have received a request to reset your password. " .
					"Please click the following link to continue:\r\n\t$url\r\n\r\n".
					"In case if the request is not made by you, please contact us.\r\n\r\n".
					"Best regards,\r\n Yolofolio Team";
	sendEmail($sender, $recipients, $subject, $body);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendEmail_invitation($user, $user_types, $activity){
	global $database, $error, $type, $email, $pwd, $error, $output, $secret, $template_user, $user_id;
	//print_json($user);
	$user_email = $user->email;
	
	// get coordinator (by user_id)
	$documents1 = databaseRead($database, 'users', ['user_id' => $user_id]);
	if ($documents1 && sizeof($documents1) > 0){
		$coor = $documents1[0];
		$sender = array('yfolio@hku.hk' => 'Yolofolio');
		$recipients = $user_email;
		$action = $user->confirmed_email ? 'log in' : 'sign up';
		$server = my_server_url();
		$qs_name = $user->confirmed_email ? 'loginemail' : 'signupemail' ;
		$url = "$server/login.php?$qs_name=$user_email";
		$subject = "Yolofolio Invitation: $activity->title";
		$body = "Hello,\r\n\r\n"
						."$coor->username would like to invite you to be $user_types in the activity named:\r\n\r\n"
						."     $activity->title\r\n\r\n"
						."You may check this out after you " . $action . " via this link:\r\n\r\n"
						."     $url\r\n\r\n"
						."\r\n\r\n"
						."Best regards,\r\n\r\n"
						."Yolofolio Team";
		sendEmail($sender, $recipients, $subject, $body);		
		
	} else {
		$error = 'Coordinator does not exist.'; // impossible
	}
}


?>