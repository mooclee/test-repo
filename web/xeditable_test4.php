<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="cache-control" content="max-age=0">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT">
	<meta http-equiv="pragma" content="no-cache">

	<title>X-editable Demo</title>
			
	<!-- jquery -->
	<script src="jquery-1.10.2.js"></script>  
	
	<!-- jqueryui -->
	<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css" rel="stylesheet">
	
	<!-- x-editable (jquery) -->
<!--	
	<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/overcast/jquery-ui.css" type="text/css" rel="stylesheet" >
	<script src="jquery-ui-1.11.4.js"></script>
	<link href="jqueryui-editable.css" rel="stylesheet">
	<script src="jqueryui-editable.js"></script>
-->	
<!--
	<script src="jquery.poshytip.js"></script>
	<link href="tip-yellowsimple.css" rel="stylesheet">
	<link href="jquery-editable-poshytip.css" rel="stylesheet">
	<script src="jquery-editable-poshytip.js"></script>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
-->
	<link href="bootstrap.css" rel="stylesheet">
	<link href="bootstrap-editable.css" rel="stylesheet">
	
	<script src="bootstrap.js"></script>
	<script src="bootstrap-editable.js"></script>
	<script>
		var email = 'alantypoon@gmail.com';
		window.onload = function(){
			demo();
			//ajaxmocks();
		};
		//
		// prepare the view/edit toggles
		function demo(){
		  //defaults
		  //$.fn.editable.defaults.mode = 'inline'; // default = popup
		  $.fn.editable.defaults.url = './post.php';
			$.fn.editable.defaults.pk = email;
			$.fn.editable.defaults.error = function(response, newValue){
				//var response2 = response.trim();
				//if (response2 != ''){
				//	console.error(response2);
				//}
				if (response.status != 200){
					console.error(response.responseText);
				}
			}
			// each field
		  //$('#username').editable({
		  //  type: 'text',
			//	pk: email,
		  //  name: 'username',
		  //  title: 'Enter username'
		  //});
			$('#username').editable({
				pk: 2,
			});
		  $('#comments').editable({
				placement: 'bottom',
		    showbuttons: 'bottom',
				title: 'Comments',
		  });
			
		}		
	</script>
	<noscript>
		<div style="color:red">
			javascript disabled!
		</div>
	</noscript>
</head>

<body> 
	<div style="width: 80%; margin: auto;"> 
		<h1>X-editable Demo (Bootstrap 3)</h1>
		<hr>
		<p>Click to edit</p>
		<table id="user" class="table table-bordered table-striped" style="clear: both" border="1" width="100%">
			<tbody> 
				<tr>
					<td width="35%">Simple text field</td>
					<td width="65%">
						<a href="#" id="username" data-type="text" data-pk="1" data-title="Enter username" class="editable editable-click editable-empty" style="display: inline; background-color: rgba(0, 0, 0, 0);">Empty</a>
					</td>
				</tr>
				<tr>         
					<td>Textarea, buttons below. Submit by <i>ctrl+enter</i></td>
					<td><a href="#" id="comments" data-type="textarea" data-pk="1" data-placeholder="Your comments here..." data-title="Enter comments" class="editable editable-pre-wrapped editable-click">awesome user!</a></td>
				</tr> 				
			</tbody>
		</table>
		<a href="https://vitalets.github.io/x-editable/docs.html" target="_blank">doc</a>
	</div>
</body>
</html>