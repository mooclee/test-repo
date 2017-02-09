

	<table id="tbl_my_profile" class="tab_page">

		<!--PERSONAL INFORMATION-->
		<tr>
			<td>
				<a class="cmenu_anchor" name="anchor_profile_information">
					<div class="profile_header" style="padding:8px">Personal Information</div>
				</a>
				
				<div id="web_profile" class="web_layout">
					<table width="100%">
						<tr>
							<td valign="top" width="100">
								<table>
									<tr>
										<td class="td_tbl_photo">
										</td>
									</tr>
									<tr>
										<td class="td_tbl_gauge">
										</td>
									</tr>					
									<tr>
										<td class="td_tbl_userstat">
										</td>
									</tr>
								</table>
							</td>
							<td class="td_user_skills" rowspan="2" valign="top">
								<table width="100%">
									<tr>
										<td class="td_user_info">
										</td>
									</tr>
									<tr>
										<td class="td_tbl_skills"></td>
									</tr>
									<tr>
										<td class="td_canvas_chart"></td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
					
				</div>
				
				<div id="mobile_profile">
					<table class="user_info">
						<tr>
							<td class="td_tbl_photo2" style="width:100px">
							
								<!--PHOTO and BUTTON--->
								<table class="tbl_photo">
									<tr>
										<td style="padding-right:10px; text-align:center; width:1px;">
										
											<img id="profile_photo" class="custom_photo myinfo_photo" src=""><br/>
											
											<span class="btn_change btn btn-primary div_input_file" style="width:90px; margin-bottom:8px;">
												<i class="glyphicon glyphicon-picture"></i> Change
												<input id="inp_user_photo" class="input_file" name="input_file" type="file" accept="image/*"/>
											</span>
											
											<span class="btn_preview btn btn-primary" onclick="openUserPage(g_user_id)" style="width:90px; margin-bottom:8px;">
												<i class="glyphicon glyphicon-eye-open"></i> Preview
											</span>
										</td>
									</tr>
								</table>
								
							</td>
							<td valign="top">
							
								<!--USER INFO--->
								<table class="tbl_user_info">
									<tr>
										<td>
											<div class="editable" style="font-weight:bold; font-size:20px"
												data-name="username"
												data-mode="inline"
												data-type="text"
												data-title="Enter your name"
												data-emptytext="Your name"
												data-inputclass="input_username"
												data-placement="bottom"
												data-showbuttons="bottom"					
											></div>
										</td>
									</tr>
									<tr>
										<td>
											<div class="editable"
												data-name="position"
												data-mode="inline"
												data-type="text"
												data-title="Please enter your current position"
												data-emptytext="Your current position"
												data-inputclass="input_position"
												data-placement="bottom"
												data-showbuttons="bottom"
											></div>
										</td>
									</tr>
									
									<tr>
										<td>
											<div class="editable"
												data-name="location"
												data-mode="inline"
												data-type="text"
												data-title="Please enter your current location"
												data-emptytext="Your current location"
												data-inputclass="input_location"
												data-placement="bottom"
												data-showbuttons="bottom"
											></div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
							
						<tr>
							<td colspan="2">
								<table id="tbl_skills_profile" class="tbl_skills" cellspacing="0" cellpadding="0"></table>
							</td>
						</tr>
						
						<tr>
							<td align="center" colspan="2">
								<canvas id="cvs_skills_profile" class="canvas_chart" width="220" height="220"></canvas>
							</td>
						</tr>

					</table>
				</div>
			</td>
		</tr>
		
		<tr>
			<td>
				<ul id="profile_blocks"></ul>
			</td>
		</tr>
			
	</table>


