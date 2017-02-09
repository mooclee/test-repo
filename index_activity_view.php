<div id="div_act_page" class="tab_page">

	<!--INFORMATION-->
	<table class="act_info">
		<tr>
			<td width="1">
				<img src="./images/new_activity.png" class="actpage_photo activity_photo custom_photo"><br>
			</td>
			<td>
				<a class="cmenu_anchor" name="anchor_actview_information">
					<div class="actpage_title" style="padding-left:12px"></div>
				</a>
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<table cellspacing="0" cellpadding="0" width="100%" style="padding-bottom: 10px;">
					<tr>
						<td class="actpage_period" align="left"></td>
					</tr>
					<tr>
						<td class="actpage_status" align="left"></td>
					</tr>
					<tr>
						<td class="actpage_coordinator" align="left"></td>
					</tr>
					<tr>
						<td class="actpage_roles" align="left"></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<div class="actpage_desc"></div>
			</td>
		</tr>
	</table>
	
	<!--ASSESSMENT-->
	<table width="100%">
			<tr id="tr_actpage_assessment">
				<td>
					<table style="width:100%">
					
						<tr>
							<td>
								<a class="cmenu_anchor" name="anchor_actview_assessment">
									<div class="actpage_header">Assessments</div>
								</a>
							</td>
						</tr>
						
						<tr id="tr_actpage_assessment_coordinator">
							<td class="td_indent">
								<span class="subsection_header">Statistics</span>
								<table class="my_datatable display nowrap" dt_type="assessment_coor1" style="width:100%">
									<thead>
										<td>Assessments</td>
										<td>&nbsp;</td>
<!--									
										<td></td>
										<td>Assessments</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
-->										
									</thead>
								</table>
							</td>
						</tr>						
				
						<tr id="tr_actpage_assessment_assessor">
							<td class="td_indent">
								<span class="subsection_header">Markings</span>
								<table class="my_datatable display nowrap" dt_type="assessment_assr1" style="width:100%">
									<thead>
										<td>Assessments</td>
										<td>&nbsp;</td>
<!--									
										<td></td>
										<td>Assessments</td>
										<td>Completed</td>
										<td>&nbsp;</td>
-->										
									</thead>
								</table>
							</td>
						</tr>
						
						<tr id="tr_actpage_assessment_participant">
							<td class="td_indent">
								<span class="subsection_header">Assignments and Results</span>
								<table class="my_datatable display nowrap" dt_type="assessment_part1" style="width:100%">
									<thead>
<!--									
										<td></td>
-->										
										<td>Assessments</td>
										<td>Marks</td>
										<td>&nbsp;</td>
									</thead>
								</table>
							</td>
						</tr>
						
					</table>
				</td>
			</tr>		
			
			<tr id="tr_actpage_impression">
				<td>
				
					<!--IMPRESSION-->
					</a>
					
					<table style="width:100%" class="tbl_actpage_impression">
					
						<tr>
							<td>
								<a class="cmenu_anchor" name="anchor_actview_impression">
									<div class="actpage_header">Skills Rating and Comments (Based on Peer Impression)</div>
								</a>
							</td>
						</tr>
						
						<tr id="tr_actpage_impression_coordinator">
							<td class="td_indent">
								<span class="subsection_header">Statistics</span>
								<table class="my_datatable display nowrap" dt_type="impression_coor1" style="width:100%">
									<thead>
										<td>Skills</td>
										<td>&nbsp;</td>
									</thead>
								</table>
							</td>
						</tr>						
				
						<tr id="tr_actpage_impression_assessor">
							<td class="td_indent">
								<span class="subsection_header">Markings</span>
								<table class="my_datatable display nowrap" dt_type="impression_assr1" style="width:100%">
									<thead>
										<td>Skills</td>
										<td>Completed</td>
										<td>&nbsp;</td>
									</thead>
								</table>
							</td>
						</tr>
						
						<tr id="tr_actpage_impression_participant">
							<td class="td_indent">
								<span class="subsection_header">Results</span>
								<table class="my_datatable display" dt_type="impression_part1" style="width:100%">
									<thead>
										<td>Skills</td>
										<td>Score</td>
										<td>&nbsp;</td>
									</thead>
								</table>
							</td>
						</tr>						
						
						<tr id="tr_actpage_impression_peer_assessment">
							<td class="td_indent">
								<div class="div_peer_assessment"></div>
							</td>
						</tr>						

						<tr id="tr_actpage_impression_assessors">
							<td class="td_indent">
								<span class="subsection_header">Other Assessors</span>
								<table class="my_datatable display nowrap actpage_users" dt_type="actpage_impression_assessors" style="width:100%">
									<thead>
										<td>Name</td>
<!--										
										<td>User ID</td>
										<td>&nbsp;</td>
										<td>Name</td>
										<td>Email</td>
										<td>Position</td>
										<td>Status</td>
-->										
									</thead>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>

			<tr>
				<td>
					<!--PARTICIPANTS-->
				
					<table style="width:100%" class="tbl_participants">
						<tr>
							<td>
								<a class="cmenu_anchor" name="anchor_actview_participants">
									<div class="actpage_header">Participants</div>
								</a>
							</td>
						</tr>						
						<tr>
							<td class="td_indent">
								<table class="my_datatable display nowrap actpage_users" dt_type="actpage_participants" style="width:100%">
									<thead>
										<td>Name</td>
<!--										
										<td>User ID</td>
										<td>&nbsp;</td>
										<td>Name</td>
										<td>Email</td>
										<td>Position</td>
										<td>Status</td>
-->										
									</thead>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>			
			
			<tr>
				<td>
					<table width="100%">
						<tr>
							<td>
								<!--PHOTOS AND VIDEOS-->
								<a class="cmenu_anchor" name="anchor_actview_photosvideos">
									<div class="actpage_header">Photos and Videos</div>
								</a>
							</td>
							<td width="10" style="padding:4px 8px;">
								<input class="uploader" type="file" accept="image/*; video/*; capture=camcorder" data-title="Add">
							</td>							
						</tr>					
						<tr>
							<td colspan="2">
								<div class="uploader_gallery"></div>
							</td>
						</tr>
					</table>
				</td>
			
			</tr>
	</table>
</div>
