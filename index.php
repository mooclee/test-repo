<?php

include "common.php";
include "database.php";

$email = isset($_COOKIE['email']) ? $_COOKIE['email'] : '';
$pwd = isset($_COOKIE['pwd']) ? $_COOKIE['pwd'] : '';
$login = isset($_COOKIE['login']) ? $_COOKIE['login'] : '';
$reset_pwd = isset($_COOKIE['reset_pwd']) ? $_COOKIE['reset_pwd'] : '';
setcookie('reset_pwd', '');

$redirect = 1;
if ($email != '' && $pwd != '' && $login == '1'){
	// check secret_token
	$documents = databaseRead($database, 'users', ['email' => $email]);
	if ($documents && sizeof($documents)){
		$user = json_decode(json_encode($documents[0]), false);
		//$reset_pwd = "";
		if ($reset_pwd != ''){
			if ($user->secret_token != $reset_pwd){
				echo 'invalid password reset';
				exit();
			} else {
				// RESET PASSWORD HERE AND REMOVE SECRET TOKEN
				$result = databaseUpdate($database, 'users', ['email' => $email], ['$set' => ['pwd' => $pwd, 'secret_token' => '']]);
				// continue login
				$redirect = 0;
			}
		} else if ($user->confirmed_email == 0){
			echo 'account not confirmed yet';
			exit();
		} else if ($user->pwd == $pwd){
			// login
			$redirect = 0;
		}
	}
}
//echo "$email $pwd $login"; exit();
//wlog("INDEX.PHP: $email $pwd $login $redirect");
//echo $redirect; exit();

//$redirect = 1;
if ($redirect == 1){
	header("Location: ./login.php");
	die();
	//echo "redirect=1<br/>";
	//echo "email=$email pwd=$pwd login=$login";
} else {
	echo "<script>var g_user = ".json_encode($user)."; g_user_id = g_user.user_id; </script>";
}
?>

<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	
  <title>YOCLE - Your Out of Classroom Learning Experience</title>
	
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<noscript>Your browser does not support JavaScript!</noscript>
	<script>
<?php
	$platform = getQs('platform');
	echo "var g_platform = '$platform';\r\n\r\n";	
	
	$separate = getQS('separate')?1:0;
	echo "var g_separate = $separate;\r\n\r\n";	
?>
		function load_script(path, s){
			s = '<script src="' + path + '" type="text/javascript"><\/script>';
			document.writeln(s);
		}
		function load_css(path, s){
			if (s) path += '?d=' + s;
			s = '<link href="' + path + '"  type="text/css" rel="stylesheet"\/>';
			document.writeln(s);
		}
		function getDateString(){
			var d = new Date();
			return d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
		}
		function mobileAndTabletcheck(){
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
/*		
		// https://github.com/HubSpot/pace/issues/56
		window.paceOptions = {
			ajax: false,
			elements: false,
			restartOnPushState: false,
			restartOnRequestAfter: false,
			startOnPageLoad: false,
		};
*/		
		var
			page = 'b',
			url = window.location.href,
			g_bProduction = url.indexOf('dev') < 0,
			s = g_separate ? '' : getDateString(),
			//s = g_bProduction ? s : '',	// for easier to save files and setting breakpoints when debugging (drawback is risk of cached)
			cssfiles = ''
											+ 'jquery-ui1.css jquery-ui2.css '
											+ 'jquery.datetimepicker.css index.css '
											+ 'toggles.css star-rating-svg.css '
											+ 'xeditable_work.css select2.css jquery-labelauty.css '
											+ 'xeditable_activity.css xeditable_education.css xeditable_publication.css xeditable_award.css xeditable_language.css xeditable_interest.css xeditable_limit.css '
											+ 'dhtmlxscheduler_flat.css '
											+ 'typeahead.css typeahead_test5.css bootstrap-tokenfield.css tokenfield-typeahead.css '
											+ 'bootstrap-multiselect.css '
											+ 'buttons.dataTables.css '
											+ 'jquery.dataTables-alan.css responsive.dataTables-alan.css '
											+ 'arrow-box.css '	// used in the correct answers of mcq
											+ 'featherlight.css featherlight.gallery-alan.css '
											+ 'a.uploader.css '
											+ 'jquery.bxslider.css '
											+ 'dhtmlxscheduler-responsive.css '
											+ 'bootstrap.css bootstrap-alan-only.css bootstrap-dialog.css bootstrap-editable-alan.css '
											+ 'bootstrap-editable.css bootstrap-wysihtml5-0.0.3.css wysiwyg-color.css '
											//+ 'ekko-lightbox.css '
											//+ 'lightbox.css '											
											
				,commonjsfiles = ''
											+ 'platform.js '
											+ 'jquery-3.1.1.js '
											+ 'dataTables.js buttons.print.js '
											+ 'jquery-ui-1.12.1.js '
											+ 'bootstrap-alan.js bootstrap-dialog.js '
											+ 'jquery.ba-resize.js jquery.datetimepicker.full.js jquery.autogrowtextarea.js autocomplete_combo.js '
											+ 'toggles.js jquery.star-rating-svg.js autosize.js gauge.js '
											+ 'jquery-labelauty.js jquery.easing.1.3.js '
											+ 'dhtmlxscheduler-alan.js dhtmlxscheduler_year_view.js '
											+ 'typeahead.bundle.js bloodhound.js handlebars-v4.0.5.js bootstrap-tokenfield.js typeahead-alan.js jquery.linkedsliders.js '
											+ 'bootstrap-multiselect.js '
											+ 'featherlight.js featherlight.gallery.js '
											+ 'moment.js '
											+ 'progressbar.js '
											+ 'jquery.bxslider.js jquery.fitvids.js jquery.dotdotdot.js '
											+ 'jquery.ui.touch-punch.js '	// for mobile touch events
											+ 'Chart.bundle-2.4.0.js '
											+ 'Chart.bundle-2.4.0-alan.js '
											+ 'dataTables.responsive.js '
											+ 'dhtmlxscheduler-responsive.js '
											+ 'bootstrap-editable-alan.js wysihtml5-0.3.0-alan.js bootstrap-wysihtml5-0.0.3-alan.js wysihtml5-0.0.3.js '
											+ 'select2.js '
											+ 'xeditable_activity.js xeditable_work.js xeditable_education.js xeditable_publication.js xeditable_award.js xeditable_language.js xeditable_interest.js xeditable_limit.js '
											+ 'waitingfor.js '
											//+ 'ekko-lightbox-alan.js '	// http://ashleydw.github.io/lightbox/
											//+ 'lightbox.js '	// http://lokeshdhakar.com/projects/lightbox2/#options
											
				,myjsfiles = ''
											+ 'svg.js database_templates.js lang.js '
											+ 'index.js index_common.js svrop.js '	// 
											+ 'index_profile.js index_network.js '
											+ 'index_schedule.js index_datatable.js '
											+ 'index_topmenu.js '
											+ 'index_panelists.js '
											+ 'index_home.js index_userpage.js index_uact.js index_uass.js index_datetime.js '	
											+ 'a.uploader.js resumable-alan.js '
											// activity
											+ 'index_activity.js index_activity_create.js index_activity_edit.js index_activity_list.js index_activity_view.js '
											// assessment
											+ 'index_assessment_create.js index_assessment_edit.js index_assessment_view.js '
											+ 'index_assessment_view_assessor.js index_assessment_view_coordinator.js index_assessment_view_participant.js '
											// impression
											+ 'index_impression_view.js index_impression_view_assessor.js index_impression_view_coordinator.js index_impression_view_participant.js '
											// skills
											+ 'index_skills.js index_skills_chart.js index_skills_breakdown.js '
											// interface
											+ 'interface.js index_method.js '
											+ 'index_method_ref.js index_method_mcq.js index_method_prt.js index_method_abs.js index_method_lcn.js index_method_sur.js index_method_pst.js '
											+ 'index_gsgauge.js '
			,
			arr = []
		;
		//if (!g_bProduction && !g_separate){
		if (g_separate == 1){
			var text =
				'\r\n'
				+ 'echo ***generating '+page+'.css***\r\n\r\n'
				+ 'call uglifycss ' + cssfiles + ' > ./' + page + '.css\r\n\r\n'
				+ 'echo ***generating '+page+'.js***\r\n\r\n'
				+ 'call uglifyjs ' + commonjsfiles + myjsfiles + ' -o ./' + page + '.js -b ascii_only=true,beautify=false\r\n\r\n'
			;
			console.log(text); // consider writing to a batch file
			arr = [cssfiles, commonjsfiles, myjsfiles];
		} else {
			arr = [page + '.css ' + page + '.js'];
		}		
		arr.forEach(function(files){
			if (files){
				files.split(' ').forEach(function(file){
					if (file.indexOf('.css') > 0){
						load_css('./'+file, s);
					} else if (file.indexOf('.js') > 0){
						//alert(file+'?'+s);
						load_script('./'+file, s);
					}
				})
			}
		});
		window.onload = function(){
			initAll();
			//openProgress();
		}
	</script>
	<style type="text/css" media="screen">
		#tbl_root, .dropmenu, .adialog{
			/*display:none;*/
		}
	</style>
</head>
<body style="display:none">

<div id="bodyview_1" class="bodyview container">
	<div class="row">
	
		<!--TOPMENU-->
		<div id="div_topmenu" class="col-sm-12">
			<table id="tbl_topmenu">
				<?php include "index_topmenu.php"?>
			</table>
		</div>
		

		<div id="tabs" class="col-sm-12">
			<!--TABS-->
			<ul>
				<li><a href="#tab_home">Home</a></li>
				<li><a href="#tab_profile">Profile</a></li>
				<li><a href="#tab_activity">Activity</a></li>
				<li><a href="#tab_schedule">Schedule</a></li>
				<li><a href="#tab_network">Network</a></li>
			</ul>
			<!-- HOME -->
			<div id="tab_home" class="tab_page">
				<?php include 'index_home.php'?>
			</div>
			<!-- PROFILE -->
			<div id="tab_profile" class="tab_page">
				<?php include 'index_profile.php'?>
				<?php include 'index_userpage.php'?>
			</div>
			<!-- NETWORK -->
			<div id="tab_network" class="tab_page">
				<?php include 'index_network.php'?>
			</div>
			<!-- ACTIVITY -->
			<div id="tab_activity" class="tab_page ui-tabs-panel ui-widget-content ui-corner-bottom">
				<?php include 'index_activity_edit.php'?>
				<?php include 'index_assessment_edit.php'?>
				<?php include 'index_activity_list.php'?>
				<?php include 'index_activity_view.php'?>
				<?php include 'index_assessment_view.php'?>
			</div>
			<div id="tab_schedule" class="tab_page ui-tabs-panel ui-widget-content ui-corner-bottom">
				<?php include 'index_schedule.php'?>
			</div>
		</div>

		<!--FOOTER-->
		<div id="div_footer" class="col-sm-12">
			<table id="tbl_footer" cellspacing="4" align="center">
				<tr>
					<td>About</td>
					<td>Help</td>
					<td>Feedback</td>
					<td>Privacy</td>
					<td>Terms</td>
				</tr>
				<tr>
					<td colspan="5" align="center"><span style="color:gray">YOCLE &copy; 2017</span></td>
				</tr>
			</table>
		</div>
		
	</div>
</div>

<div id="bodyview_2" class="bodyview container">
	<div id="div_lightbox"></div>
</div>

<!--CREATE ACTIVITY-->
<ul id="dropmenu_import" class="dropmenu" style="width:120px; text-align:left">
	<li>
		<span menuitem="import_excel" class="dropmenu-item" nowrap>Import by Excel</span>
	</li>
	<li>
		<span menuitem="import_csv" class="dropmenu-item" nowrap>Import by CSV</span>
	</li>
</ul>	

<ul id="dropmenu_import2" class="dropmenu" style="width:140px; text-align:left">
	<li>
		<span menuitem="import_template" class="dropmenu-item" nowrap>Import by Template</span>
	</li>
	<li>
		<span menuitem="import_excel" class="dropmenu-item" nowrap>Import by Excel</span>
	</li>
	<li>
		<span menuitem="import_csv" class="dropmenu-item" nowrap>Import by CSV</span>
	</li>
</ul>	

<ul id="dropmenu_lang" class="dropmenu" style="text-align:left">
	<li>
		<span menuitem="lang_ENG" class="dropmenu-item" nowrap>English</span>
	</li>
	<li>
		<span menuitem="lang_THA" class="dropmenu-item" nowrap>ไทย (Thai)</span>
	</li>
</ul>	

<div id="dialog-confirm" class="adialog" title="Delete this item?">
	<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>
		Are you sure?
</div>

<div id="dialog-message" title="Error">
	<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>
	<div id="div_errmsg"></div>
</div>

<div style="display:none">
	<div class="splash card">
		<br>
		<div role="spinner">
			<div class="spinner-icon"></div>
		</div>
		<p class="lead" style="text-align:center">Please wait...</p>
		<div class="progress">
			<div class="mybar" role="bar"></div>
		</div>
	</div>
</div>

<?php
	include "index_method.php";
?>

</body>
</html>

