<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
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
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

  <link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css" rel="stylesheet">
	<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/overcast/jquery-ui.css" type="text/css" rel="stylesheet" >
<!--	
	<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/redmond/jquery-ui.css" type="text/css" rel="stylesheet" >
-->


	<script>
		function load_script(path, s){
			if (s) path += '?d=' + s;
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
		var s = getDateString();
		var bIsMobile = mobileAndTabletcheck();			
		if (!bIsMobile){
			s = '';	// testing only
		}
		// Development loader
		var cssfiles = 'jquery.datetimepicker.css index.css trumbowyg.css',
				jqueryfiles = 'jquery-1.10.2.js jquery-ui-1.11.4.js jquery.ba-resize.js trumbowyg.js jquery.datetimepicker.full.js jquery.autogrowtextarea.js autocomplete_combo.js',
				jsfiles = 'index.js svg.js'
		;
		[cssfiles, jqueryfiles, jsfiles].forEach(function(files){
			if (files){
				files.split(' ').forEach(function(file){
					if (file.indexOf('.css') > 0){
						load_css('./'+file, s);
					} else {
						load_script('./'+file, s);
					}
				})
			}
		});
		window.onload = function(){
			initAll();
		}
	</script>
</head>
<body>
 <table id="tbl_root">
	 <tr>
		<!--topmenu-->
		<td id="td_topmenu" align="center">
			<table class="center_contents" border="0">
				<tr>
					<td width="130">
						<img src="yocle_logo15_h40.png"/>
					</td>
					<td id="div_search">
						<table cellpadding="0" cellspacing="0">
							<tr>
								<td>
									<input id="inp_search" class="search_box" type="text" placeholder="Search people or activities..."/>
								</td>
								<td style="padding-left:2px">
									<div class="svg_container" svg="search" style="position: relative; left: -40px; width:16px; height:16px; padding:4px; border-radius:8px; cursor:pointer;" svgfill="green"></div>
								</td>
							</tr>
						</table>
					</td>
					<td style="color:white" align="right">
						<table>
							<tr>
								<td>
									<img id="bar_myphoto" src="./people/m03.jpg"/>
								</td>
								<td style="color:white; font-size:14px">
									Samson Chan
								</td>
							</tr>
						</table>
					</td>
					<td align="right" width="280">
						<table cellspacing="0" id="top_panel" border="0">
							<tr>
								<td id="topmenu_settings" class="svg_container topmenu_btn" svg="settings" title="Settings">
								</td>
								<td id="topmenu_todolist" class="svg_container topmenu_btn" svg="pin" title="To do list">
									<div class="balloon"><div class="balloon2"></div></div>
								</td>
								<td id="topmenu_notice" class="svg_container topmenu_btn" svg="notice" title="Notice board">
									<div class="balloon"><div class="balloon2"></div></div>
								</td>
								<td id="topmenu_msg" class="svg_container topmenu_btn" svg="message" title="Message">
									<div class="balloon"><div class="balloon2"></div></div>
								</td>
								<td id="logout" class="svg_container topmenu_btn" svg="logout" title="Log out">
								</td>
							</tr>
						</table>
					</td>
			 </tr>
			</table>
		</td>
	</tr>
	
	<tr>
		<td align="center">
			<!--tabs-->
			<div id="tabs" class="center_contents">
				<ul>
					<li>
						<a href="#tabs-1">Home</a>
					</li>
					<li>
						<a href="#tabs-2">Profile</a>
					</li>
					<li>
						<a href="#tabs-3">Networks</a>
					</li>
					<li>
						<a href="#tabs-4a" style="cursor: pointer">OCLA</a>
					</li>
					<li>
						<a href="#tabs-5">Post a Project</a>
					</li>
				</ul>
				
				<!-- HOME -->
				<div id="tabs-1">
					<?php include 'index_home.php'?>
				</div>
				
				<!-- PROFILE -->
				<div id="tabs-2">
					<?php include 'index_profile.php'?>
				</div>
				
				<!-- NETWORK -->
				<div id="tabs-3">
					<?php include 'index_network.php'?>
				</div>
				
				<div id="tabs-4a" class="ocla_page ui-tabs-panel ui-widget-content ui-corner-bottom">
					<?php include 'index_ocla_engaged.php'?>
				</div>

				<div id="tabs-4b" class="ocla_page ui-tabs-panel ui-widget-content ui-corner-bottom">
					<?php include 'index_ocla_coordinated.php'?>
				</div>

				<div id="tabs-4c" class="ocla_page ui-tabs-panel ui-widget-content ui-corner-bottom">
					<?php include 'index_ocla_add.php'?>
				</div>

				<div id="tabs-4d" class="ocla_page ui-tabs-panel ui-widget-content ui-corner-bottom">
					<?php include 'index_ocla_search.php'?>
				</div>
				
				<div id="tabs-5">
					<?php include 'index_postaproject.php'?>
				</div>
			</div>
		</td>
	</tr>
	
</table>

<ul id="dropmenu_ocla" class="dropmenu">
  <li>
		<a href="#tabs-4c" class="dropmenu-item">Add an activity</a>
	</li>
  <li>
		<a href="#tabs-4a" class="dropmenu-item">Activities engaged</a>
	</li>
  <li>
		<a href="#tabs-4b" class="dropmenu-item">Activities coordinated</a>
	</li>
  <li>
		<a href="#tabs-4d" class="dropmenu-item">Seach for participants</a>
	</li>
</ul>	

</body>
</html>