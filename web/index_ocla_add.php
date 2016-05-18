<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<tr>
		<td>
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
			<input class="inp_text" type="text" placeholder="The name of the activitiy..." value="Acounting Internship" style="width:99%"/>
		</td>
	</tr>
	<tr>
		<td>
			<div class="editor" style="min-height:15px; border-radius:8px">
				<b><u>Accounting Internship</u></b> provides college students with guaranteed internship placement in premier Accounting internships. You control the entire placement process, as you work with a Dream Careers Internship Coordinator as they assist in revising your resume, before scheduling interviews with our large network of accounting companies and departments. Before you begin the placement process, you must first apply and be accepted to a program and city to begin.

				Accounting internships are crucial for any student looking to become a CPA or other accounting professional.  Working in an Accounting Internship typically involves supporting either one or a variety of departments with their tasks, including accounts payable, accounts receivable, billing, budgeting, cost debiting/crediting, financial statements, and payroll while utilizing accounting computer software packages, spreadsheet programs, and a wide variety of general office skills.<br/>
				<!--<img src="https://www.skpacific.org/wp-content/uploads/2014/10/accounting-internship-abroad-internship-abroad.jpg"/>-->
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
			
				<!--SURVEY 1-->
				<tr>
					<td class="header" style="width:190px">
						Title
					</td>
					<td class="header" style="width:140px">
						Method
					</td>
					<td class="header" style="width:100px">
						Weight %
					</td>
					<td class="header" style="width:90px">
						Start time
					</td>
					<td class="header" style="width:90px">
						Due time
					</td>
					<td class="header" style="width:100px">
						Status
					</td>
				</tr>
				
				<?php include 'index_ocla_add_survey.php'?>

				<?php include 'index_ocla_add_mcq.php'?>

			</table>
		</td>
	</tr>
				
	<tr>
		<td align="center">
			<button class="medium_button">Add Assessment</button>
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
		<td>
			<table cellspacing="10" align="center">
				<tr>
					<td>
						<button class="medium_button">Add by Excel</button>
					</td>
					<td>
						<button class="medium_button">Add by CSV</button>
					</td>
					<td>
						<button class="medium_button">Add by groups</button>
					</td>
					<td>
						<button class="medium_button">Add by individuals</button>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	
	<tr>
		<td width="100%">
			<table cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td width="100%">
						<input id="inp_search" class="search_box" type="text" placeholder="Filter people..." style="width:100%"/>
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
			<table>
				<tr>
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/f01.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Chole Madely
								</td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/m01.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									John Davis
								</td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/f02.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Juliana Altimari
								</td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/f03.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Evelin Kwok
								</td>
							</tr>
						</table>
					</td>
					
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/m02.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Col Macy
								</td>
							</tr>
						</table>
					</td>
					
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/f04.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Cherish Chan
								</td>
							</tr>
						</table>
					</td>
					
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/m04.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Randell Lee
								</td>
							</tr>
						</table>
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
						<button class="medium_button">Preview</button>
					</td>
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