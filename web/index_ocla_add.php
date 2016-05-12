<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<tr>
		<td colspan="2">
			<b>Add an Activitiy</b>
		</td>
	</tr>
</table>

<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<tr>
		<td colspan="2">
			<b>Activitiy</b>
		</td>
	</tr>
	<tr>
		<td>
			<input class="layout_text" type="text" placeholder="The name of the activitiy..." value="Acounting Internship" style="width:200px"/>
		</td>
	</tr>
	<tr>
		<td>
			<div class="editor" style="height:150px; border-radius:8px">
				<b><u>Accounting Internship</u></b> provides college students with guaranteed internship placement in premier Accounting internships. You control the entire placement process, as you work with a Dream Careers Internship Coordinator as they assist in revising your resume, before scheduling interviews with our large network of accounting companies and departments. Before you begin the placement process, you must first apply and be accepted to a program and city to begin.

				Accounting internships are crucial for any student looking to become a CPA or other accounting professional.  Working in an Accounting Internship typically involves supporting either one or a variety of departments with their tasks, including accounts payable, accounts receivable, billing, budgeting, cost debiting/crediting, financial statements, and payroll while utilizing accounting computer software packages, spreadsheet programs, and a wide variety of general office skills.			
			</div>
		</td>
	</tr>
</table>

<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<tr>
		<td>
			<b>Assessment</b>
		</td>
	</tr>
	<tr>
		<td>
		
			<table id="tbl_assess" align="center">
			
				<tr>
					<td class="header" style="width:180px">
						Method
					</td>
					<td class="header">
						Weight %
					</td>
					<td class="header">
						Due time
					</td>
					<td class="header" style="width:140px">
						Assessor
					</td>
					<td class="header" style="width:100px">
						Status
					</td>
				</tr>
			
				<!--ASSESSMENT-->
				<tr>
					<td>
						<div class="ui-widget assessment_method">
							<select class="assessment_combobox">
								<option>Survey (Self)</option>
							</select>
						</div>
					</td>
					<td>
					 <input class="assessment_spinner" value="20" style="width:20px; height:20px"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/05/28 17:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
					</td>
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_assessor">
							<select class="assessment_combobox">
								<option selected>Self</option>
								<option>Peer</option>
								<option>Coordinator</option>
								<option>Others</option>
							</select>
						</div>
					</td>
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_status">
							<select class="assessment_combobox">
								<option>Sent</option>
								<option>Saved</option>
							</select>
						</div>
					</td>
					<td>
						<button class="medium_button">Edit</button>
					</td>
				</tr>
				
				<tr>
					<td>
						<div class="ui-widget assessment_method">
							<select class="assessment_combobox">
								<option>Survey (Peer)</option>
							</select>
						</div>
					</td>
					<td>
					 <input class="assessment_spinner" value="30" style="width:20px; height:20px"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/05/28 17:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
					</td>
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_assessor">
							<select class="assessment_combobox">
								<option>Self</option>
								<option selected>Peer</option>
								<option>Coordinator</option>
								<option>Others</option>
							</select>
						</div>
					</td>
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_status">
							<select class="assessment_combobox">
								<option>Sent</option>
								<option>Saved</option>
							</select>
						</div>
					</td>
					<td>
						<button class="medium_button">Edit</button>
					</td>
				</tr>
				<tr>
					<td>
						<div class="ui-widget assessment_method">
							<select class="assessment_combobox">
								<option>Survey (Coordinator)</option>
							</select>
						</div>
					</td>
					<td>
					 <input class="assessment_spinner" value="50" style="width:20px; height:20px"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/05/28 17:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
					</td>
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_assessor">
							<select class="assessment_combobox">
								<option>Peer</option>
								<option>Self</option>
								<option selected>Coordinator</option>
								<option>Others</option>
							</select>
						</div>
					</td>
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_status">
							<select class="assessment_combobox">
								<option>Sent</option>
								<option>Saved</option>
							</select>
						</div>
					</td>
					<td>
						<button class="medium_button">Edit</button>
					</td>
				</tr>
				<tr>
					<td>
						<button class="medium_button">Add Assessment</button>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>


<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<tr>
		<td colspan="2">
			<b>Participants</b>
		</td>
	</tr>
	
	<tr>
		<td width="100%">
			<table cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td width="100%">
						<input id="inp_search" class="search_box" type="text" placeholder="Search people or groups..." style="width:100%"/>
					</td>
					<td style="padding-left:2px">
						<div class="svg_container" svg="search" style="position: relative; left: -40px; width:16px; height:16px; padding:4px; border-radius:8px; cursor:pointer;" svgfill="green"></div>
					</td>
				</tr>
			</table>	
		</td>
	</tr>
	
	<tr>
		<td>
			<table cellspacing="10" align="center">
				<tr>
					<td>
						<button class="medium_button">By Excel</button>
					</td>
					<td>
						<button class="medium_button">By CSV</button>
					</td>
					<td>
						<button class="medium_button">By groups</button>
					</td>
					<td>
						<button class="medium_button">By individuals</button>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<table class="layout_box" style="width:100%">
	<tr>
		<td>
			<table cellspacing="10" align="center">
				<tr>
					<td>
						<button class="medium_button">Save</button>
					</td>
					<td>
						<button class="medium_button">Send</button>
					</td>
					<td>
						<button class="medium_button">Cancel</button>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>