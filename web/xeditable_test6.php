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
<!--	
	<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css" rel="stylesheet">
-->	
	
	<!-- x-editable (jquery) -->
<!--	
	<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/overcast/jquery-ui.css" type="text/css" rel="stylesheet" >
	<script src="jquery-ui-1.11.4.js"></script>
	<link href="jqueryui-editable.css" rel="stylesheet">
	<script src="jqueryui-editable.js"></script>
	<script src="jquery.poshytip.js"></script>
	<link href="tip-yellowsimple.css" rel="stylesheet">
	<link href="jquery-editable-poshytip.css" rel="stylesheet">
	<script src="jquery-editable-poshytip.js"></script>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
-->
	<link href="bootstrap.css" rel="stylesheet">
	<link href="bootstrap-editable-alan.css" rel="stylesheet">
	<style>
		#div_input_file {
			position: relative;
			overflow: hidden;
			margin: 10px;
		}
		#input_file{
			position: absolute;
			top: 0;
			right: 0;
			margin: 0;
			padding: 0;
			font-size: 20px;
			cursor: pointer;
			opacity: 0;
			filter: alpha(opacity=0);
		}
	</style>
	<script src="bootstrap.js"></script>
	<script src="bootstrap-editable-alan.js"></script>
<!--	
	<link href="select2.css" rel="stylesheet">
	<script src="select2.js"></script>
	
	<script src="jquery.mockjax.js"></script>
	<script src="moment.min.js"></script>
	
	<link href="address.css" rel="stylesheet">
	<script src="address.js"></script>
	<script src="demo-mock.js"></script>
-->	
	<script src="svrop.js"></script>	
	<script>
		var email = 'alantypoon@gmail.com', pwd = '1234';
		window.onload = function(){
			demo();
			//ajaxmocks();
		};
		//
		// prepare the view/edit toggles
		function demo(){
			
		  //defaults
		  //$.fn.editable.defaults.mode = 'inline'; // default = popup
		  //$.fn.editable.defaults.url = './post.php';
			$.fn.editable.defaults.url = './svrop.php';
			$.fn.editable.defaults.params = {
				type:'xeditable',
				email:email,
				pwd:pwd,
			};
			$.fn.editable.defaults.pk = email;	// working (has to remove data-pk first)
			$.fn.editable.defaults.success = function(response, newValue){
				console.debug(response);
			}
			$.fn.editable.defaults.error = function(response, newValue){
				//var response2 = response.trim();
				//if (response2 != ''){
					console.error(response);
				//}
				if (response.status != 200){
					console.error(response.responseText);
				}
			}
			// each field
			$('.editable').editable();
			
			$('.editable[data-name=username]').editable('option', 'success', function(response, newValue){
				console.debug(newValue);
			});
			
		  $('#sex').editable({
		    prepend: "not selected",
		    source: [{
		      value: 1,
		      text: 'Male'
		    }, {
		      value: 2,
		      text: 'Female'
		    }],
		    display: function(value, sourceData) {
		      var colors = {
		          "": "gray",
		          1: "green",
		          2: "blue"
		        },
		        elem = $.grep(sourceData, function(o) {
		          return o.value == value;
		        });

		      if (elem.length) {
		        $(this).text(elem[0].text).css("color", colors[value]);
		      } else {
		        $(this).empty();
		      }
		    }
		  });
			
			// file upload
			$("#input_file").change(function(){
				//alert('upload photo');
				// http://stackoverflow.com/questions/23980733/jquery-ajax-file-upload-php
				// http://geniuscarrier.com/how-to-style-a-html-file-upload-button-in-pure-css/
				// uncomment in php.ini: always_populate_raw_post_data = -1 
				var file_data = $('#input_file').prop('files')[0];   
				var form_data = new FormData();                  
				form_data.append('type', 'ul_img');
				form_data.append('img_id', 'uploadtest');
				form_data.append('file', file_data);
				$.ajax({
					url: './svrop.php', // point to server-side PHP script 
					dataType: 'text',  	// what to expect back from the PHP script, if anything
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,
					type: 'post',
					success: function(resp){
						if (resp){
							console.debug(resp);
							resp = JSON.parse(resp);
							if (resp.error == ""){
								console.debug('success'); // display response from the PHP script, if any
							} else {
								console.error(resp);
							}
						}
						$("#input_file").val('');	// reset the file contents
						//console.debug($("#input_file").val());
					}
				});				
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
						<a href="#" data-name="username" data-type="text" data-title="Enter your name" class="editable editable-click editable-empty" style="display: inline;">Empty</a>
					</td>
				</tr>
				<tr>         
					<td>Textarea, buttons below. Submit by <i>ctrl+enter</i></td>
					<td>
						<!--text-align:justify must come with display:block-->
						<a href="#" id="comments" data-mode="inline" data-type="textarea" data-placeholder="Your comments here..." data-title="Enter comments" class="editable editable-pre-wrapped editable-click" style="display:block; text-align:justify">The study of Social Science is appealing to me because of the diversity of topics they cover and their relevance to our world today. In an increasingly globalised world, it is important to have a deep understanding of the economic and political institutions that govern, and the cultural backgrounds and values of its citizens. I like travelling and it has broadened my mind to the issues facing our world, and inspired me to investigate further into our origins and the workings of society. After my studies, I hope to work in social welfare and make a meaningful contribution to improving the lives of others and society. I have always enjoyed and felt confident in academia and in experiencing the world outside of the classroom I have been able to confirm my aspirations in life, making me a very motivated, enthusiastic and committed student.</a>
					</td>
				</tr>
				
				<tr>
					<td>
						image
					</td>
					<td>
						<div id="div_input_file" class="btn btn-primary">
							<span>Upload</span>
							<input id="input_file" name="input_file" type="file" />
						</div>					
					</td>
				</tr>

				<tr>         
					<td>Select, local array, custom display</td>
					<td>
						<a href="#" id="sex"
							data-type="select" data-pk="1" data-value="" data-title="Select sex" class="editable editable-click" style="color: rgb(128, 128, 128);">not selected</a>
					</td>
				</tr>
				
				
				<tr>
					<td>Select2</td>
					<td><a href="#" id="country" data-type="select2" data-pk="1" data-value="BS" data-title="Select country" class="editable editable-click">Bahamas</a></td>
				</tr>  
				
			</tbody>
		</table>
		
		<a href="https://vitalets.github.io/x-editable/docs.html" target="_blank">doc</a>
	</div>
</body>
</html>