<tr>
	<td>
		<input class="inp_text" type="text" placeholder="Title..." value="Employer survey" style="width:180px"/>
	</td>
	<td>
		<div class="ui-widget assessment_method">
			<select class="assessment_combobox">
				<option>Abstract/Dissertation/Essay/Reviews</option>
				<option>Application/Report</option>
				<option>Blog</option>
				<option>Abstract/Dissertation/Essay/Reviews</option>
				<option>Case Studies</option>
				<option>Concept Maps</option>
				<option>Journals/Daily or Weekly Logbooks</option>
				<option>Learning contract</option>
				<option>MCQ</option>
				<option>Observations/Role Play Participation</option>
				<option>Porfolios</option>
				<option>Posters</option>
				<option>Presentations</option>
				<option>Reflective Piece</option>
				<option selected>Survey</option>
				<option>Wikis</option>
			</select>
		</div>
	</td>
	<td align="center">
	 <input class="assessment_spinner" value="50" style="width:25px"/>
	</td>
	<td style="padding-left:8px;">
	 <input class="assessment_datetime" value="2016/05/28 09:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
	</td>
	<td style="padding-left:8px;">
	 <input class="assessment_datetime" value="2016/07/28 17:00" style=" border-radius:8px; padding:4px; border:1px solid #c0c0c0"/>
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
		<button class="medium_button" onclick="openDetails(this)">Details</button>
	</td>
	<td>
		<button class="icon_button but_trash"></button>
	</td>
</tr>

<!--SURVEY 2-->
<tr>
	<td colspan="8">

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
								<td class="assessment_num" valign="middle">
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
								<td width="28">
									<button class="icon_button but_trash"></button>
								</td>
							</tr>
							
							<tr>
								<td class="assessment_num" valign="middle">
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
								<td width="28">
									<button class="icon_button but_trash"></button>
								</td>
							</tr>

							<tr>
								<td class="assessment_num" valign="middle">
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
								<td width="28">
									<button class="icon_button but_trash"></button>
								</td>
							</tr>
							
							<tr>
								<td class="assessment_num" valign="middle">
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
								<td width="28">
									<button class="icon_button but_trash"></button>
								</td>
							</tr>										
						</table>
					</td>
				</tr>
				<tr>
					<td align="center">
						<table class="tbl_footbar">
							<tr>
								<td align="center">
									<button class="medium_button">Add question</button>
									<button class="medium_button">Load template</button>
									<button class="medium_button">Save template</button>
								</td>
							</tr>
						</table>
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
					
						<table class="tbl_footbar">
							<tr>
								<td style="border-right:2px solid #e0e0e0; text-align:center; width:25%">
									<input type="checkbox" checked/>Coordinator
								</td>
								<td style="border-right:2px solid #e0e0e0; text-align:center; width:25%">
									<input type="checkbox" checked/>Self
								</td>
								<td style="border-right:2px solid #e0e0e0; text-align:center; width:25%">
									<input type="checkbox" checked/>Peer
									<span>(Min. <input class="assessment_spinner" value="5" style="width:25px"/>)</span>
								</td>
								<td style="text-align:center; width:25%">
									<button class="medium_button">Add Assessor(s)</button>
								</td>
							</tr>
						</table>
						
					</td>
				</tr>
			</table>
<!--			
			<div style="height:5px"></div>

			<table width="100%" class="tbl_details">
				<tr>
					<td align="center">
						<button class="medium_button">Load template</button>
						<button class="medium_button">Save template</button>
					</td>
				</tr>
			</table>
-->			
		</div>

	</td>
</tr>						