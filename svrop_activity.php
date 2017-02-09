<?php

//////////////////////////////////////////////////////////////

function saveActivity(){
	global $database, $error, $type, $email, $pwd, $error, $output, $user_id, $act_id, $test_qs;
		
	$debug_save = isset($test_qs);
	$debug_save = 0; // testing
	
	$activity = getQS('activity');
	$publish = getQS('publish') == 1;
	if (!$activity){
		
		$error = 'no activity';
		
	} else {
		
		$activity = json_decode(getQS('activity'), false);	// true will convert assoc array into number array (true use obj[name], false use obj->name)
		
		if ($debug_save){
			echo "<b>save activity</b>"; print_json($activity);
		}
		$act_id = intval($activity->act_id);
		if ($act_id){
			$documents = databaseRead($database, 'activities', ['act_id' => $act_id]);
			if (!$documents){
				$error = 'activity not found';
			} else {
				// remove the activity
				$result = databaseDelete($database, 'activities', ['act_id' => $act_id]);
				// reinsert the activity
				$activity->act_id = $act_id;
				$result = databaseInsert($database, 'activities', $activity);
			}
		} else if (!$act_id){
			// get the new act_id
			$act_id = getNewSequenceID('act_id', 'activities');
			// create the activity
			$activity->act_id = $act_id;
			$result = databaseInsert($database, 'activities', $activity);
		}
		if (!$error){
			// coordinator
			$user_id = intval($activity->coordinator_id);
			updateActivityToUser($user_id, $activity, 'coordinator');//, 1, 0, 0);
			$output['user_id'] = $user_id;
		}
		if ($publish){
			publishActivity($act_id);
		}
		$output['act_id'] = $act_id;
		
	}
}


////////////////////////////////////////////////////////////////////////////

function getActivity(){
	global $database, $error, $type, $email, $pwd, $error, $output, $col_usr, $col_act;
	$act_id = getQS('act_id');
	if (!$act_id){
		$error = "no act_id";
	} else {
		$act_id = intval($act_id);
		$documents = databaseRead($database, $col_act, ['act_id' => $act_id]);
		if ($documents && sizeof($documents) > 0){
			$act_doc = $documents[0];
			
			// add coordinator's username
			$user_id = $act_doc->coordinator_id;
			$documents = databaseRead($database, $col_usr, ['user_id' => intval($user_id)], ['projection'=>['_id'=>0, 'username'=>1]]);
			if ($documents && sizeof($documents) > 0){
				$usr_doc = $documents[0];
				$act_doc->coordinator_username = $usr_doc->username;
			}
			
			// output by json
			$output['activity'] = $act_doc;
			
		} else {
			$error = "no such an activity $act_id";
		}
	}
}

/////////////////////////////////////////////////////

function deleteActivity(){
	global $database, $error, $type, $email, $pwd, $error, $output;
	$act_id = getQS('act_id');
	if (!$act_id){
		$error = "no act_id";
	} else {
		$act_id = intval($act_id);
		$output['act_id'] = $act_id;
		$documents = databaseRead($database, 'activities', ['act_id' => $act_id]);
		if ($documents && sizeof($documents) > 0){
			// remove from users
			removeActivityFromUser($act_id);
			// remove from activities
			databaseDelete($database, 'activities', ['act_id' => $act_id]);
		} else {
			$error = "no such an activity";
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

function removeActivityFromUser($act_id){
	global $database, $error, $type, $email, $pwd, $error, $output, $template_user_activity;
	$act_id = intval($act_id);
	
	// METHOD 1: READ ALL THE USERS
	$documents = databaseRead($database, 'users', []);
	$users = [];
	for ($i = 0; $i < sizeof($documents); $i++){
		$user = json_decode(json_encode($documents[$i]), true);
		$activities = $user['profile']['activity'];
		
		// LOOP THRU ALL THE ACTIVITIES
		foreach ($activities as $index => $activity){
			$act_id2 = intval($activity['act_id']);
			if ($act_id2 == $act_id){
				$user_id = intval($user['user_id']);
				
				// FOR LOGGING PURPOSE
				array_push($users, $user_id);
				
				// REMOVE DOCUMENT FROM THE ARRAY WORK
				$criteria = ['user_id' => $user_id];
				$update = ['$pull' => 
					[
						"profile.activity" =>
							[
								'act_id' => $act_id
							]
					]
				];
				$result = databaseUpdate($database, 'users', $criteria, $update);
				break;
			}
		}
	}
	$output['users'] = join(', ', $users);
	
	// METHOD 2: FIND ALL THE RELATED USERS FROM THE ACTIVITY (USE LESS RESOURCES)
	
	// 2.1 RECALC THE SKILLS.$.USR_FINAL_SCORE BASE ON ITS UACT
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateActivityToUser($user_id, $activity, $role){
	global $database, $error, $type, $email, $pwd, $error, $output, $template_user_activity;
	$act_id = intval($activity->act_id);
	//$act_id = 1;
	
	// UPDATE THE COORDINATOR WITH THIS ACTIVITY
	$documents = databaseRead($database, 'users', ['user_id' => $user_id]);
	if ($documents && sizeof($documents) > 0){
		$user = json_decode(json_encode($documents[0]), false);
		$activities = $user->profile->activity;	// is an array
		$user_activity = 0;
		$index = -1;
		
		// UPDATE ACTIVITIES
		foreach ($activities as $index_temp => $activity_temp){
			if ($activity_temp->act_id == $act_id){
				$index = intval($index_temp);
				// CREATE WITH THE TEMPLATE
				$user_activity = $activity_temp;
				break;
			}
		}
		if (!$user_activity){
			//$user_activity = jsonclone($template_user_activity);
			$user_activity = new stdClass();
			$user_activity->assessments = new stdClass();
			$user_activity->impression = new stdClass();
			$user_activity->impression->skills = new stdClass();
			$user_activity->published = 0;
		}		
		// UPDATE USER ACTIVITY
		$user_activity->act_id		= $act_id;
		$user_activity->title			= $activity->title;
		$user_activity->act_type	= $activity->act_type;
		$user_activity->start			= $activity->start;
		$user_activity->end				= $activity->end;
		
		//$act_skills = getActSkills($activity);
		$impression_skills = $activity->impression->skills;
		foreach ($impression_skills as $skill_name => $x){
			//print_json($user_activity->impression->skills);
			//echo $skill_name;
			$user_activity->impression->skills->$skill_name = [
				'usr_part_score' => 0,
				'assessors' => new stdClass(),
			];
		}		
		if ($index == -1){
			array_push($activities, $user_activity);			// CREATE
		} else {
			$activities[$index] = $user_activity;					// EDIT
		}
		$result = databaseUpdate($database, 'users', ['user_id' => $user_id], ['$set' => ['profile.activity' => $activities]]);
		$output['index'] = $index;
		
		// UPDATE USER STAT		
	} else {
		$error = "no user_id";
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getActSkills($activity){
	$skills = [];
	// get from impression
	$impression_skills = $activity->impression->skills;
	foreach ($impression_skills as $skill_name => $x){
		$skills[$skill_name] = 1;
	}
	// get from assessment
	foreach ($activity->assessment->assessments as $i => $x){
		//getSkills($assessment['skills'], $skills);
		foreach ($x->skills as $skill_name => $y){
			$skills[$skill_name] = 1;
		}
	}
	return hash2numArr($skills);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/*
//
// for post-delete activity 
//
function calcUsrFinalScore($usr_doc, $skill_name){
	$total_final_scores = 0; $total_final_scorers = 0; $score = 0;
	$acts = $usr_doc['profile']['activity'];
	foreach ($acts as $index => $act){
		$skill = getJsonPath($act, ['impression', 'skills', $skill_name]);
		if (isset($skill['usr_part_score'])){
			$score = $skill['usr_part_score'];
		} else {
			$score = 0;
		}
		$total_final_scores += floatval($score);
		$total_final_scorers++;
	}
	$usr_final_score = 0;
	if ($total_scorers){
		$usr_final_score = doubleval(intval(10 * $total_final_scores / $total_final_scorers) / 10.0);
	}
	// method 1: update only the usr_final_score
	$update =  [ '$set' => [ 'skills.' . $skill_name . '.usr_final_score' => $usr_final_score ] ];
	$result = databaseUpdate($database, $col_usr, $filters_usr, $update);
}
*/

//////////////////////////////////////////////////////////////
// http://php.net/manual/en/function.json-decode.php
// https://github.com/codeguy/php-the-right-way/issues/479
//////////////////////////////////////////////////////////////

function publishActivity(){
	global $database, $error, $type, $email, $pwd, $error, $output, $col_act, $col_usr, $act_id, $test_qs;
	global $template_uact_ass_item, $template_uact_skill;
	
	$debug_publish = isset($test_qs);
	
	if ($debug_publish){
		echo "<b>publishActivity: </b><br/>";
	}	
	// 1. read activity
	$documents = databaseRead($database, $col_act, ['act_id' => $act_id]);
	if ($documents && sizeof($documents) > 0){
		$activity = json_decode(json_encode($documents[0]), false);
	} else {
		$error = "cannot find activity act_id=$act_id";
		return;
	}
	
	// 2. read coordinator
	$coor_id = intval($activity->coordinator_id);
	$documents = databaseRead($database, $col_usr, ['user_id' => $coor_id, "profile.activity.act_id" => $act_id],	[ 'projection' => ['_id' => 0, "profile.activity.$" => 1]]);
	if ($documents && sizeof($documents) > 0){
		$coordinator = json_decode(json_encode($documents[0]), false);
	} else {
		$error = "cannot find coordinator user_id=$coor_id";
		return;
	}	

	if ($debug_publish){
		//echo "<b>publish coordinator</b>"; print_json($coordinator);
		//echo "<b>publish activity</b>"; print_json($activity);
	}
	
	// 3. update coordinator's user document
	$coor_uact = $coordinator->profile->activity[0];
	// update published
	$coor_uact->published = 1;
	
	// find all the assessors (in ids);
	$assessors = getActAssessors($activity);
	$unique_assessors = num2hashArr($assessors);	// unique assessors

	// find all the assessees (in ids);
	$assessees = getActAssessees($activity);
	$unique_assessees = num2hashArr($assessees);	// unique assessees
	
	if ($debug_publish){
		echo "Assessors: "; echo implode(', ', $assessors); echo "<br>";
		echo "Assessees: "; echo implode(', ', $assessees); echo "<br>";
	}

	// find all the participants (in ids)
	$participants = $activity->participants;
	$unique_participants = num2hashArr($participants);
	if ($debug_publish){
		echo "Participants: "; echo implode(', ', $participants); echo "<br>";
	}
		
	// find all skills
	$act_skills = getActSkills($activity);
	if ($debug_publish){
		echo "Skills: "; echo implode(', ', $act_skills); echo "<br><br>";
	}
	
	///////////////////////////////////////////////////////
	// find all users from 3 types
	///////////////////////////////////////////////////////
	$all_users = [$coor_id => 1];
	foreach ($unique_assessors as $user_id => $v){
		$all_users[$user_id] = 1;
	}
	foreach ($unique_participants as $user_id => $v){
		$all_users[$user_id] = 1;
	}
	if ($debug_publish){
		echo "All users: "; echo implode(', ', hash2numArr($all_users)); echo "<br>";
	}	
	
	// loop thru for all related users
	foreach ($all_users as $user_id => $v){
		
		// for each user
		//$user_id = intval($user_id);
		
		// COPY UACT FROM THE COORDINATOR'S
		$user_uact = jsonclone($coor_uact);
		//echo "coor_uact: "; print_json($user_uact);		
		
		$iamcoordinator = 0; $iamassessor = 0; $iamparticipant = 0;
		
		// COPY ACT ASSESSMENT TO USR
		$user_uact->assessments = jsonclone($activity->assessment->assessments);
		
		// CHANGE ASSESSMENT ITEM
		foreach ($user_uact->assessments as $i => $assessment){
			//echo "$assessment->method <br>";
			// REMOVE UNNNEED HASH ARRAY FIRST
			unset($assessment->assr_asst_completed);
			unset($assessment->part_asst_marks);
			unset($assessment->assr_asst_marks);
			// CREATE DUMMY ITEM
			foreach ($assessment->items as $j => $item){
				$item = [ 'ass_item_id' => ($j + 1)];	// path has to be from the beginning
			}
			//print_json($assessment);
			//if ($assessment->method == 'pst'){
			//	$assessment->media = [];
			//}
		}
				
		/////////////////////////////////////////////////////////////////
		// COORDINATOR
		/////////////////////////////////////////////////////////////////
		if ($coor_id == $user_id){
			$iamcoordinator = 1;
		}
		/////////////////////////////////////////////////////////////////
		// ASSESSORS
		/////////////////////////////////////////////////////////////////
		//if (isset($unique_assessors[$user_id])){
		if (isset($unique_assessees[$user_id])){
			$iamassessor = 1;
		}
		/////////////////////////////////////////////////////////////////
		// PARTICIPANTS
		/////////////////////////////////////////////////////////////////
		if (isset($unique_participants[$user_id])){
			$iamparticipant = 1;
			
			// ADD UACT SKILLS
			foreach ($user_uact->impression->skills as $skill_name =>$x){
				$user_uact->impression->skills->$skill_name = jsonclone($template_uact_skill);
			}
			
			// ADD PEER ASSESSORS FOR IMPRESSION
			if (!isset($user_uact->impression->panelists)){
				$user_uact->impression->panelists = new stdClass();
			}
			$user_uact->impression->panelists->peer_assessors = [];

			// FOR EACH ASSESSMENTS AND ITEMS
			foreach ($user_uact->assessments as $i => $assessment){
				// CREATE DUMMY ASSESSORS
				$assessment->panelists->peer_assessors = [];
				// CREATE DUMMY ITEM
				foreach ($assessment->items as $j => $item){
					// http://stackoverflow.com/questions/455700/what-is-the-best-method-to-merge-two-php-objects
					$item = (object)array_merge((array)$item, (array)jsonclone($template_uact_ass_item));
				}
			}
		}
		
		// UACT ROLES
		$user_uact->uact_coordinator	= $iamcoordinator;
		$user_uact->uact_assessor 		= $iamassessor;
		$user_uact->uact_participant	= $iamparticipant;
		
		// *** CREATE A USER AND SEND EMAIL IF IT DOES NOT EXIST
		//echo "**$user_id<br>";
		$user_id = checkInviteUser($user_id, $iamassessor, $iamparticipant, $activity);
		//echo "***$user_id<br>";
		
		if ($iamassessor){
			$unique_assessors[$user_id] = 1;
		}
		if ($iamparticipant){
			$unique_participants[$user_id] = 1;
		}
		// DEBUG
		if ($debug_publish){
			//echo "<b>uact(act_id=$act_id user_id=$user_id coor=$iamcoordinator assr=$iamassessor part=$iamparticipant):</b> ";	print_json($user_uact);	echo "<br><br>";
		}
			
		// update user activity
		databaseUpdateArrayElement($database, $col_usr, ['user_id' => intval($user_id)], 'profile.activity', ['act_id' => $act_id], $user_uact);
		if ($user_id == $coor_id){
			$output['user_uact'] = $user_uact;
		}
	}
	
	// resume the assessors and the participants to the activity
	//$assessors2 = hash2numArr2($unique_assessors);
	//$participants2 = 
	$activity->published = 1;
	$activity->participants = hash2numArr2($unique_participants);
	
	////////////////////////////////////////////////
	// TO BE DONE
	// 6. update other assessors in activity panelists
	// - replace email to id in panelists 
	////////////////////////////////////////////////
	$converted = 0;
	if (convertEmailToUserID($activity->impression->panelists->others)){
		$converted = 1;
	}
	foreach ($activity->assessment->assessments as $index => $assessment){
		if (convertEmailToUserID($assessment->panelists->others)){
			$converted = 1;
		}
	}	
	
	//print_json($activity); exit();
	
	// 7. update activity
	//		- update publish status
	if ($converted){
		unset($activity->_id);
		$result = databaseUpdate($database, $col_act, ['act_id' => intval($act_id)], [
			'$set' => $activity,
		]);
	} else {
		$result = databaseUpdate($database, $col_act, ['act_id' => intval($act_id)], [
			'$set' => [
				'published' => 1,
				'participants' => $activity->participants,
			]
		]);
	}
	
	//echo "update activity...<br>";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function convertEmailToUserID(&$others){
	global $database, $error, $type, $email, $pwd, $error, $output, $col_act, $col_usr, $act_id, $test_qs;
	$converted = 0;
	//print_json($others);
	//var_dump($others); return;
	
	if (isset($others) && is_array($others)){
		foreach ($others as $index => $user_id){
			if (strpos($user_id, '@') === false){
			} else {
				// this is an email
				$user_email = $user_id;
				// find this user from users
				$documents = databaseRead($database, $col_usr, ['email' => $user_email], ['projection'=>['_id'=>0, 'user_id'=>1]]);
				if ($documents && sizeof($documents) > 0){
					$user = $documents[0];
					$others[$index] = $user->user_id;
					$converted = 1;
				}
			}
		}
		if ($converted){
			sort($others);
		}
	}
	return $converted;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkInviteUser($user_id, $iamassessor, $iamparticipant, $activity){
	global $database, $error, $type, $email, $pwd, $error, $output, $col_act, $col_usr, $act_id, $test_qs, $template_user;
	$debug = isset($test_qs);	

	// find user types (assessor or participant?)
	$user_types = '';
	if ($iamassessor){
		$user_types .= 'an assessor';
	}
	if ($iamparticipant){
		if ($user_types != ''){
			$user_types .= ' and ';
		}
		$user_types .= 'a participant';
	}
	if ($user_types != ''){
		
		$user = 0;
		if (strpos($user_id, '@') !== false){
			
			//////////////////////////////////////////////////////
			// case 1: user_id is email
			//////////////////////////////////////////////////////
			$user_email = $user_id;
			$filters = ['email' => $user_email];
			$documents = databaseRead($database, $col_usr, $filters);
			if (!$documents || !sizeof($documents)){
				// case 1A: no dummy user, create a new user
				$user = jsonclone($template_user);
				$user_id =
				$user->user_id = getNewSequenceID('user_id', 'users');
				$user->email = $user_email;
				// create user
				$result = databaseInsert($database, $col_usr, $user);				
				if ($debug){
					echo "<b>checkInviteUser(case 1A: create a new user):</b> email=$user_email user_id=$user_id <br/>";
				}
			} else {
				// case 1B: already have a dummy user
				$user = $documents[0];
				$user_id = $user->user_id;
				if ($debug){
					echo "<b>checkInviteUser(case 1B: follow the old user):</b> email=$user_email user_id=$user_id <br/>";
				}
			}
		} else if ($user_id != 0){
			//////////////////////////////////////////////////////
			// case 2: user_id is number, it is an exisiting user
			//////////////////////////////////////////////////////
			$user_id = intval($user_id);
			$documents = databaseRead($database, 'users', ['user_id' => $user_id]);
			if ($documents && sizeof($documents) > 0){
				$user = $documents[0];
				$user_email = $user->email;
			}
				
			if ($debug){
				echo "<b>checkInviteUser(case 2: exisiting user):</b> user_id=$user_id <br/>";
			}
		} else {
			$error = "No such a user: user_id=0";
		}
			
		if ($user){
			// send email to sign up
			sendEmail_invitation($user, $user_types, $activity);
			
			// send notification
			sendNotify_invitation($user, $user_types, $activity);	
		}
	}
	
	return $user_id;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendNotify_invitation($user, $user_types, $activity){
	// create the user now
	// associate the new act_id to the activity 
	// send email to the user ?
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getActAssessors($activity){
	$assessors = [];
	// get hash array from impression
	getAssessors($activity, $activity->impression->panelists, $assessors);
	
	// get hash array from assessment
	foreach ($activity->assessment->assessments as $index => $assessment){
		getAssessors($activity, $assessment->panelists, $assessors);
	}
	return hash2numArr($assessors);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAssessors($activity, $panelists, &$assessors){
	if ($panelists->coordinator == 1){
		$coor_id = intval($activity->coordinator_id);
		$assessors[$coor_id] = 1;
	}
	//echo "add panelists: "; print_r($panelists['others']); echo "<br><br>";
	if (gettype($panelists->others) == 'array'){
		foreach ($panelists->others as $index => $user_id){
			//echo $user_id;
			$assessors[$user_id] = 1;
		}
	}
	//echo "<b>HASH panelists:</b>"; print_r($assessors); echo "<br><br>";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getActAssessees($activity){
	$assessees = [];
	//return $assessees;

	// get hash array from impression
	getAssessors($activity, $activity->impression->panelists, $assessees);
	
	// get hash array from assessment
	foreach ($activity->assessment->assessments as $index => $assessment){
		getAssessors($activity, $assessment->panelists, $assessees);
	}
	return hash2numArr($assessees);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAssessees($activity, $panelists, &$assessees){
	if ($panelists->coordinator == 1){
		$coor_id = intval($activity->coordinator_id);
		$assessees[$coor_id] = 1;
	}
	if (gettype($panelists->others) == 'array'){
		foreach ($panelists->others as $index => $user_id){
			//echo $user_id;
			$assessees[$user_id] = 1;
		}
	}
}

?>
