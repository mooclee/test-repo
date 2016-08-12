<?php

function getSelectMethod($selected){
	global $method_arr;
	$s = '<div class="ui-widget assessment_method">' . '<select class="assessment_combobox">';
	for ($i = 0; $i < sizeof($method_arr); $i++){
		$name = $method_arr[$i];
		$option_selected = $selected == $name ? ' selected' : ''; 
		$s .= '<option'.$option_selected.'>'.$name.'</option>';
	}
	$s .= '</select></div>';
	return $s;
}

/////////////////////////////////////////////////////////////////////

function getSelectSkill($selected){
	global $skill_arr;
	$s = '<div class="ui-widget div_skills">' . '<select class="skill_combobox">';
	for ($i = 0; $i < sizeof($skill_arr); $i++){
		$name = $skill_arr[$i];
		$option_selected = $selected == $name ? ' selected' : ''; 
		$s .= '<option'.$option_selected.'>'.$name.'</option>';
	}
	$s .= '</select></div>';
	return $s;
}

/////////////////////////////////////////////////////////////////////

function wlog($str) {
	return;
	global $logfile;
	// log to the output
	$log_str = getDateTime() . " {$str}\r\n";
	//echo $log_str . '<br/>';
	// log to file
	echo $logfile;
	if (($fp = fopen($logfile, 'a+')) !== false) {
		fputs($fp, $log_str);
		fclose($fp);
	} else {
		echo 'error in wlog';
	}
}

/////////////////////////////////////////////////////////////////////

function mychmod($path){
/*
	global $error;
	try {
		//chmod($path, 0755);
		if (is_dir($path)){
			$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
			foreach($iterator as $item){
				chmod($item, 0755);
			}
		} else if (file_exists($path)){
			chmod($path, 0755);
		}
	} catch (Exception $e) {		
		//wlog('Caught exception: '.$path.' '.$e->getMessage().' \n');
		$error = 'Caught exception: '.$path.' '.$e->getMessage();
		wlog($error);
	}
*/	
}

/////////////////////////////////////////////////////////////////////

function getDateTime(){
	return date('Y-m-d H:m:s', time());
}

/////////////////////////////////////////////////////////////////////

function sendEmail($senders, $recipients, $subject, $body){
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
	return $result;
}

$database = "yolofolio";

define('SLASH', DIRECTORY_SEPARATOR);

$logfile = getcwd() . SLASH . 'svrop.log';
mychmod($logfile);

//$def_ext = 'png';
$def_ext = 'jpg';
$jpg_quality = 94;

$method_arr = Array(
	'Abstract', ///Dissertation/Essay/Reviews',
	'Application',///Report',
	'Blog',
	'Case Study',
	'Concept Map',
	'Journal',///Daily or Weekly Logbooks',
	'Learning contract',
	'MCQ',
	'Participation',
	'Porfolio',
	'Poster',
	'Presentation',
	'Reflective Piece',
	'Survey',
	'Wikis'
);
///////////////////////////////////////////////////////////////////////////////

$skill_arr = Array(
	'',
	'Collaboration',
	'Communication',
	'Creativity',
	'Critical Thinking',
	'Information Technology',
	'Leadingship',
	'Numeracy',
	'Organization',
	'Problem Solving',
	'Self-management',
	'Study',
	'Teamwork',
);

?>

