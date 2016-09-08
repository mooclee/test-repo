<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="author" content="Vitaliy Potapov">
	<meta http-equiv="cache-control" content="max-age=0">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT">
	<meta http-equiv="pragma" content="no-cache">

	<title>X-editable Demo</title>
			
	<!-- jquery -->
	<script src="jquery-1.10.2.js"></script>  


	<!-- x-editable (jquery) -->
	<link href="bootstrap.css" rel="stylesheet">
	<script src="bootstrap.js"></script>
	
	<link href="bootstrap-editable-alan.css" rel="stylesheet">
	<script src="bootstrap-editable-alan.js"></script>
	
	<style type="text/css">
		body {
			padding-top: 50px;
			padding-bottom: 30px;
		}
		table.table > tbody > tr > td {
			height: 30px;
			vertical-align: middle;
		}
		/* used only in jqueryui and jquery demos */
		body {
			font-size: 12px;
			font-family: sans-serif;  
		}
		#user {
			border-collapse: collapse; 
			width: 100%;  
		}
		#user > tbody > tr > td {
			border: solid 1px gray;
			height: 25px;
			padding: 3px;
		}
		.muted {
			color: #999999;
		}
		.alert {
			padding: 5px;
			margin-bottom: 10px;  
		}
		h2 {
		 margin-top: 40px;   
		}
		hr {
		 color: #C0C0C0;   
		}
		.input-large {
			width: 300px;  
		}
	</style>
	<script>
		window.onload = function(){
		  $('#institute').editable({
		    //prepend: "Your institute",
		    source: [
					{
						text: 'City University of Hong Kong (CityU), Hong Kong',
						value: 'hkcityu',
					}, 
					{
						text: 'Hong Kong Baptist University (HKBU), Hong Kong',
						value: 'hkbu',
					}, 
					{
						text: 'Lingnan University (LU), Hong Kong',
						value: 'hklu',
					}, 
					{
						text: 'The Chinese University of Hong Kong (CUHK), Hong Kong',
						value: 'hkcuhk',
					}, 
					{
						text: 'The Education University of Hong Kong (EdUHK), Hong Kong',
						value: 'eduhk',
					}, 
					{
						text: 'The Hong Kong Polytechnic University (PolyU), Hong Kong',
						value: 'hkpolyu',
					}, 
					{
						text: 'The Hong Kong University of Science and Technology (HKUST), Hong Kong',
						value: 'hkust',
					},
					{
						text: 'The University of Hong Kong (HKU), Hong Kong',
						value: 'hku',
					},
				],
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
			
		}		
	</script>        
</head>

<body> 

	<div style="width: 80%; margin: auto;"> 
			<h1>X-editable Demo</h1>
			<hr>

			<p>Click to edit</p>
			<table id="user" class="table table-bordered table-striped" style="clear: both">
					<tbody> 
							<tr>         
								<td>Institute</td>
								<td>
									<a href="#" id="institute" data-type="select" data-pk="1" data-emptytext="Your institute" data-value="" data-title="Select Institute" class="editable editable-click" style="color: rgb(128, 128, 128);"></a>
								</td>
							</tr>

					</tbody>
			</table>
	</div>
	
</body>
</html>