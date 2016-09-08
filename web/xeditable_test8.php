<!--
WYSIWYG PLUGIN
http://keenthemes.com/preview/metronic/theme/admin_1/form_editable.html
-->
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
	
	<link href="select2.css" rel="stylesheet">
	<script src="select2.js"></script>

	<link href="address.css" rel="stylesheet">
	<script src="address.js"></script>
	
	<link href="work.css" rel="stylesheet">
	<script src="work.js"></script>
	
	<link href="jquery-labelauty.css" rel="stylesheet">
	<script src="jquery-labelauty.js"></script>
	
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
	var g_static = {
		institutes: [
			{id:'hkcityu', text:'City University of Hong Kong (CityU), Hong Kong'},
			{id:'hkbu', text:'Hong Kong Baptist University (HKBU), Hong Kong'},
			{id:'hklu', text:'Lingnan University (LU), Hong Kong'},
			{id:'hkcuhk', text:'The Chinese University of Hong Kong (CUHK), Hong Kong'},
			{id:'eduhk', text:'The Education University of Hong Kong (EdUHK), Hong Kong'},
			{id:'hkpolyu', text:'The Hong Kong Polytechnic University (PolyU), Hong Kong'},
			{id:'hkust', text:'The Hong Kong University of Science and Technology (HKUST), Hong Kong'},
			{id:'hku', text:'The University of Hong Kong (HKU), Hong Kong'},
		],
	};
		window.onload = function(){
		 //defaults
		 $.fn.editable.defaults.url = '/post'; 

			$('#institute').editable({
				source: g_static.institutes,
				select2:{
					width: 480,
					placeholder: 'Select institute',
					allowClear: true,
				},
			})
			//$('#institute').editable().show();
			
			$('#address').editable({
/*
				value: {
					city: '',
					street: '',
					building: '',
				},
				validate: function(value) {
					if (value.city == '') return 'city is required!'; 
				},

				display: function(value) {
					if(!value) {
						$(this).empty();
						return; 
					}
					var html = '<b>' + $('<div>').text(value.city).html() + '</b>, ' + $('<div>').text(value.street).html() + ' st., bld. ' + $('<div>').text(value.building).html();
					$(this).html(html); 
				}
*/
			})
//			$('#address').editable('show');//, {closeAll:1});
/*
			$('#work').editable({
				value: {
					company: 'Prudential Hong Kong Ltd.',
					title: 'Customer Support Intern',
					location: 'Hong Kong',
					start: 'January 2010',
					end: 'December 2012',
					desc: '- Handled general customer issues<br/>- Filing and data entry',
				},
			});
			$('#work').editable('show');//, {closeAll:1});
*/			
			//$(":checkbox").labelauty();
			//$(":radio").labelauty();
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
						<td width="200">Select2 (dropdown mode)</td>
						<td><a href="#" id="institute" data-mode="inline" data-type="select2" data-emptytext="Your institute" data-value="" data-title="Select Institute" data-showbuttons="bottom" data-placement="bottom" class="editable editable-click"></a></td>
					</tr>
					
					<tr>         
						<td>Address</td>
						<td>
							<span id="address" data-type="address" data-mode="inline" data-showbuttons="bottom" data-placement="bottom" data-title="Please fill address" class="editable editable-click"></span>
						</td>
					</tr>  

					<tr>         
						<td>Work</td>
						<td>
							<div id="work" data-type="work" data-mode="inline" data-showbuttons="bottom" data-placement="bottom" data-title="Please fill work experience" class="editable editable-click"></div>
						</td>
					</tr>  
					
				</tbody>
			</table>
			
		<a href="https://vitalets.github.io/x-editable/docs.html" target="_blank">doc</a>
	</div>
<!--	
	<input checked type="checkbox" aria-label="Should this synchronize your files?" data-labelauty="Don't synchronize files|Synchronize my files"/>
	<input type="checkbox" data-labelauty="Don't delete my files|Delete my files"/>
	<input checked type="checkbox"/>

	<input checked type="radio" name="radio-input" aria-label="Should this synchronize your files?" data-labelauty="Don't synchronize files|Synchronize my files"/>
	<input type="radio" name="radio-input" data-labelauty="Don't delete my files|Delete my files"/>
	<input checked type="radio" name="radio-input"/>					
-->	
</body>
</html>