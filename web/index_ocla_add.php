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
<!--					<td class="header" style="width:140px">
						Assessor
					</td>
-->					
					<td class="header" style="width:100px">
						Status
					</td>
				</tr>
			
				<!--SURVEY 1-->
				<tr>
					<td>
						<input class="inp_text" type="text" placeholder="The name of the survey..." value="Supervisor survey" style="width:180px"/>
					</td>
					<td>
						<div class="ui-widget assessment_method">
							<select class="assessment_combobox">
								<option selected>Survey</option>
								<option>Essay</option>
								<option>Report</option>
								<option>Blog</option>
								<option>MCQ</option>
							</select>
						</div>
					</td>
					<td>
					 <input class="assessment_spinner" value="20" style="width:25px"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/05/28 09:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/07/28 17:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
					</td>
<!--					
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
-->					
					<td style="padding-left:8px;">
						<div class="ui-widget assessment_status">
							<select class="assessment_combobox">
								<option>Sent</option>
								<option>Saved</option>
							</select>
						</div>
					</td>
					<td>
						<button class="medium_button" onclick="openDetails(this)">Details</button>
					</td>
				</tr>
				
				<tr>
					<td colspan="7">
						<div class="div_details">
						
							<table width="100%" class="tbl_details">
								<tr>
									<td width="100%">
										<b>Survey</b>
										<table width="100%" border="0">
											<tr>
												<td style="width:20px">
													&nbsp;
												</td>
												<td class="header">
													Questions
												</td>
												<td style="width:180px" align="center" class="header">
													Like scale
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													1.
												</td>
												<td>
													<textarea class="ta_question" rows="1">Are you able to finish the task assigned to you?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option selected>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option>1-5</option>
														</select>
													</div>
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													2.
												</td>
												<td>
													<textarea class="ta_question" rows="1">You learn new things from the job everyday.</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option selected>Agreed/Disagreed</option>
															<option>1-3</option>
															<option>1-5</option>
														</select>
													</div>
												</td>
											</tr>

											<tr>
												<td valign="middle">
													3.
												</td>
												<td>
													<textarea class="ta_question" rows="1">How do you like your supervisor?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option selected>1-5</option>
														</select>
													</div>
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													4.
												</td>
												<td>
													<textarea class="ta_question" rows="1">How do you like your colleagues?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option selected>1-5</option>
														</select>
													</div>
												</td>
											</tr>										
										</table>
									</td>
								</tr>
								<tr>
									<td align="center">
										<button class="medium_button">Add question</button>
									</td>
								</tr>
							</table>

							<div style="height:5px"></div>

							<table width="100%" class="tbl_details">
								<tr>
									<td width="100%">
										<b>Assessors</b>
									</td>
								</tr>
								<tr>
									<td>
										<table align="center">
											<tr>
												<td>
													<table>
														<tr>
															<td>
																<img src="./people/m03.jpg" class="photo_home"/>
															</td>
														</tr>
														<tr>
															<td class="person_name">
																Samson Chan
															</td>
														</tr>
													</table>
												</td>
												<td>
													<table>
														<tr>
															<td>
																<img src="./people/p01.jpg" class="photo_home"/>
															</td>
														</tr>
														<tr>
															<td class="person_name">
																Prof. David Jasper
															</td>
														</tr>
													</table>
												</td>
												<td>
													<table>
														<tr>
															<td>
																<img src="./people/p02.jpg" class="photo_home"/>
															</td>
														</tr>
														<tr>
															<td class="person_name">
																Janene Petit
															</td>
														</tr>
													</table>
												</td>
												<td>
													<table>
														<tr>
															<td>
																<img src="./people/p03.jpg" class="photo_home"/>
															</td>
														</tr>
														<tr>
															<td class="person_name">
																Juliana Altimari
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
										<input type="checkbox" checked/> Coordinator
										<input type="checkbox" checked/> Self
										<input type="checkbox" checked/> Peer
										<span>
											(Min. <input class="assessment_spinner" value="5" style="width:25px"/>)
										</span>
										<button class="medium_button">Add other assessor</button>
									</td>
								</tr>
							</table>

							<div style="height:5px"></div>

							<table width="100%" class="tbl_details">
								<tr>
									<td align="center">
										<button class="medium_button">Load template</button>
										<button class="medium_button">Save template</button>
									</td>
								</tr>
							</table>
							
							
							
							
						</div>
					</td>
				</tr>

				
				<!--SURVEY 2-->
<!--				
				<tr>
					<td>
						<div class="ui-widget assessment_method">
							<select class="assessment_combobox">
								<option>Self survey</option>
								<option selected>Peer survey</option>
								<option>Coordinator survey</option>
							</select>
						</div>
					</td>
					<td>
					 <input class="assessment_spinner" value="30" style="width:20px; height:20px"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/05/28 09:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/07/28 17:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
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
						<button class="medium_button" onclick="openQuestions(this)">Questions</button>
					</td>
				</tr>
				
				<tr>
					<td colspan="7">
						<div class="div_question">
							<table width="100%">
								<tr>
									<td width="100%">
										<table width="100%" border="0">
											<tr>
												<td style="width:20px">
													&nbsp;
												</td>
												<td class="header" style="text-align:left">
													Questions
												</td>
												<td style="width:180px" align="center" class="header">
													Like scale
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													1.
												</td>
												<td>
													<textarea class="ta_question" rows="1">Are you able to finish the task assigned to you?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option selected>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option>1-5</option>
														</select>
													</div>
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													2.
												</td>
												<td>
													<textarea class="ta_question" rows="1">You learn new things from the job.</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option selected>Agreed/Disagreed</option>
															<option>1-3</option>
															<option>1-5</option>
														</select>
													</div>
												</td>
											</tr>

											<tr>
												<td valign="middle">
													3.
												</td>
												<td>
													<textarea class="ta_question" rows="1">How do you like your supervisor?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option selected>1-5</option>
														</select>
													</div>
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													4.
												</td>
												<td>
													<textarea class="ta_question" rows="1">How do you like your colleagues?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option selected>1-5</option>
														</select>
													</div>
												</td>
											</tr>										
										</table>
									</td>
								</tr>
								
								<tr>
									<td>
										<button class="medium_button">Add question</button>
										<button class="medium_button">Use template</button>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
-->				
				<!--SURVEY 3-->
<!--				
				<tr>
					<td>
						<div class="ui-widget assessment_method">
							<select class="assessment_combobox">
								<option>Self survey</option>
								<option>Peer survey</option>
								<option selected>Coordinator survey</option>
							</select>
						</div>
					</td>
					<td>
					 <input class="assessment_spinner" value="50" style="width:20px; height:20px"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/05/28 09:00"/>
					</td>
					<td style="padding-left:8px;">
					 <input class="assessment_datetime" value="2016/07/28 17:00"/>
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
						<button class="medium_button" onclick="openQuestions(this)">Questions</button>
					</td>
				</tr>
				
				<tr>
					<td colspan="7">
						<div class="div_question">
							<table width="100%">
								<tr>
									<td width="100%">
										<table width="100%" border="0">
											<tr>
												<td style="width:20px">
													&nbsp;
												</td>
												<td class="header" style="text-align:left">
													Questions
												</td>
												<td style="width:180px" align="center" class="header">
													Like scale
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													1.
												</td>
												<td>
													<textarea class="ta_question" rows="1">Are you able to finish the task assigned to you?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option selected>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option>1-5</option>
														</select>
													</div>
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													2.
												</td>
												<td>
													<textarea class="ta_question" rows="1">You learn new things from the job.</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option selected>Agreed/Disagreed</option>
															<option>1-3</option>
															<option>1-5</option>
														</select>
													</div>
												</td>
											</tr>

											<tr>
												<td valign="middle">
													3.
												</td>
												<td>
													<textarea class="ta_question" rows="1">How do you like your supervisor?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option selected>1-5</option>
														</select>
													</div>
												</td>
											</tr>
											
											<tr>
												<td valign="middle">
													4.
												</td>
												<td>
													<textarea class="ta_question" rows="1">How do you like your colleagues?</textarea>
												</td>
												<td style="text-align:center; padding-right:30px;" valign="top">
													<div class="ui-widget assessment_scale">
														<select class="assessment_combobox">
															<option>Yes/No</option>
															<option>Agreed/Disagreed</option>
															<option>1-3</option>
															<option selected>1-5</option>
														</select>
													</div>
												</td>
											</tr>										
										</table>
									</td>
								</tr>
								
								<tr>
									<td>
										<button class="medium_button">Add question</button>
										<button class="medium_button">Use template</button>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
-->
			</table>
		</td>
	</tr>
	
	<!--END OF SURVEY-->
	<tr>
		<td>
			<button class="medium_button">Add Assessment</button>
		</td>
	</tr>
	
</table>

<!--
<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<tr>
		<td colspan="2">
			<b>Other Assessors</b>
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
									<img src="./people/p01.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Prof. David Jasper
								</td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/p02.jpg" class="photo_home"/>
								</td>
							</tr>
							<tr>
								<td class="person_name">
									Janene Petit
								</td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<img src="./people/p03.jpg" class="photo_home"/>
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
									<img src="./people/p04.jpg" class="photo_home"/>
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
									<img src="./people/p05.jpg" class="photo_home"/>
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
									<img src="./people/p06.jpg" class="photo_home"/>
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
									<img src="./people/p07.jpg" class="photo_home"/>
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
-->

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