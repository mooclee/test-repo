<!--FOR ASSESSMENTS TO BE VIEWED, DONE, MARKED AND REVIEWED-->
<div id="div_tmp_assessment" class="div_tmp">

	<table cellspacing="4" cellpadding="4" align="center" class="tbl_asspage">
		<tr>
			<td>
				<table cellspacing="0" cellpadding="0" align="center" style="width:100%">
					
					<tr>
						<td>
							<table cellspacing="0" cellpadding="0" width="100%">
								<tr>
									<td class="asspage_title"></td>
<!--									<td class="asspage_role" align="right"></td>-->
								</tr>
							</table>
						</td>
					</tr>
					
					<tr>
						<td class="asspage_role"></td>
					</tr>
					
					<tr>
						<td>
							<table cellspacing="0" cellpadding="0" width="100%">
								<tr>
									<td class="asspage_participant"></td>
<!--									<td class="asspage_period" align="right"></td>-->
								</tr>
							</table>
						</td>
					</tr>
		
					<tr>
						<td>
							<table cellspacing="0" cellpadding="0" width="100%">
								<tr>
									<td class="asspage_status"></td>
									<td class="asspage_marks" align="right"></td>
								</tr>
							</table>
						</td>
					</tr>
					
					<tr>
						<td class="asspage_period" align="left"></td>
						</td>
					</tr>

				</table>
			</td>
			
			<!--DESCRIPTION-->
			<tr>
				<td>
					<table>
						<tr>
							<td>
								<div class="asspage_header">Description</div>
							</td>
						</tr>
						
						<tr>
							<td class="td_indent">
								<div class="asspage_desc"></div>
							</td>
						</tr>			
					</table>
				</td>
			</tr>
			

			<!--GENERIC SKILLS-->
			<tr>
				<td>
					<table>
						<tr>
							<td>
								<div class="asspage_header">Generic Skills Involved</div>
							</td>
						</tr>
						
						<tr>
							<td class="td_indent">
								<table class="my_datatable display nowrap" dt_type="asspage_skills">
									<thead>
										<td>
											Skill
										</td>
									</thead>
								</table>
							</td>
						</tr>			
					</table>
				</td>
			</tr>

			<!--ASSESSMENT ITEMS-->
			<tr class="tr_assessments">
				<td>
					<table>
						<tr>
							<td>
								<div class="asspage_header1 asspage_header" >
									Assessments
								</div>
								<table cellspacing="0" cellpadding="0" width="100%" class="asspage_header2">
									<tr>
										<td class="asspage_header">
											Photos and Videos
										</td>
										<td width="1">
											<input class="uploader" type="file" accept="image/*; video/*;" data-title="Add" />
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<table class="tbl_asspage_assessment" border="0">
									<tbody>
									</tbody>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>

			<!--ASSESSORS-->
			<tr>
				<td>
					<table>
						<tr>
							<td>
								<div class="asspage_header">Assessors</div>
							</td>
						</tr>						
						
						<tr>
							<td>
								
								<!--PEER ASSESSORS-->
								<div class="div_peer_assessment"></div>
						
								<!--ASSESSORS-->
								<span class="subsection_header">Other Assessors</span>
								
								<table style="width:100%">
									<tr>
										<td class="td_indent">
											<table class="my_datatable display nowrap asspage_users" dt_type="asspage_assessors" style="width:100%">
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
					
					</table>
				</td>
			</tr>						
						
		</tbody>
	</table>
		
	<!--<div class="div_separator">&nbsp;</div>-->
	
	<div class="btn_panel">
		<button class="btn_cancel btn btn-primary"><i class="glyphicon glyphicon-ban-circle"></i>	Cancel</button>
		<button class="btn_clear btn btn-primary"><i class="glyphicon glyphicon-remove"></i> Clear</button>
		<button class="btn_save btn btn-primary"><i class="glyphicon glyphicon-ok"></i>	Save</button>
		<button class="btn_close btn btn-primary"><i class="glyphicon glyphicon-ok-circle"></i> Close</button>
		<button class="btn_submit btn btn-success"><i class="glyphicon glyphicon-send"></i> Submit</button>
	</div>
	
</div>