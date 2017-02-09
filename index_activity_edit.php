
<div id="div_activity_edit" class="tab_page">

	<table class="act_info">
		<tr>
			<td>
				<img class="activity_photo_edit"/>
			</td>
			<td>
				<span class="btn btn-primary div_input_file" style="height:40px">
					<i class="glyphicon glyphicon-picture"></i> Change<br> Activity Photo
					<input id="inp_activity_photo" class="input_file" type="file" accept="image/*"/>
				</span>
			</td>
		</tr>
	</table>

	<div class="section_header">
		<div class="section_title text_title">Title <span class="asterisk">*</span></div>
	</div>

	<div class="input_area">	
		<div class="editable"
			data-name="activity_title"
			data-mode="inline"
			data-type="text"
			data-title="Enter the title of the activity"
			data-emptytext="The title of the activity"
			data-url=""
			show_trash="0"
			data-unsavedclass="unsavededitable"
			data-placement="bottom"
			data-showbuttons="bottom"
		></div>
	</div>

	<div class="section_header">
		<div class="section_title">Type</span></div>
	</div>

	<div class="input_area" stylex="padding-top:2px">
		<div class="toggle_type toggle-light" ></div>
		<div class="toggle_type_text" nowrap></div>
	</div>
	

	<div class="section_header">
		<div class="section_title">Period</div>
	</div>
	
	<div class="input_area">
		<table class="tbl_period">
			<tr>
				<td nowrap class="text_start">
					Start:
				</td>
				<td>
					<input class="event_datetime start_datetime" value="2016/05/28 09:00"/>
				</td>
			</tr>
			<tr>
				<td nowrap class="text_end">
					End:
				</td>
				<td>
					<input class="event_datetime end_datetime" value="2016/06/28 09:00"/>
				</td>
			</tr>
		</table>
	</div>
	
	<div class="section_header">
		<div class="section_title">Description <span class="asterisk">*</span></div>
	</div>
	
	<div class="div_act_desc input_area" valign="top">
		<div class="editable"
			data-name="activity_desc"
			data-mode="inline"
			data-type="wysihtml5"
			data-type-xxx="textarea"
			data-title="Enter the description of the activity"
			data-emptytext="The description of the activity"
			data-inputclass="input_wysihtml5"
			data-url=""
			show_trash="0"
			data-unsavedclass-xxx="unsavededitable"
			data-showbuttons="bottom"
			data-placement="bottom"
		></div>
	</div>

		<div class="section_header">
			<div class="section_title">Participants <span class="asterisk">*</span></div>
		</div>

		<div class="div_participants input_area">
			<?php include 'find_users.php'?>	
		</div>

		<div class="section_header2">
			<table width="100%">
				<tr>
					<td class="section_title">
						Skills Rating and Comments (Based on Peer Impression)
					</td>
					<td style="padding:4px 8px; width:1px;">
						<div class="toggle_impression toggle-light" style="margin-right:2px;"></div>												
					</td>
				</tr>
			</table>
		</div>

		<div id="div_edit_skills" class="input_area">
			<div>
				<?php include 'find_skills.php'?>
			</div>
			<div class="div_separator">&nbsp;</div>
			<?php include 'index_panelists.php'?>
		</div>

		<div class="section_header2">
			<table width="100%">
				<tr>
					<td class="text_assessments section_title" style="font-weight:bold">
						Assessments
					</td>
					<td style="padding:4px 8px; width:1px;">
						<div class="toggle_assessment toggle-light" style="margin-right:2px;"></div>												
					</td>
				</tr>
			</table>
		</div>

		<div id="div_edit_assessment" class="input_area">
			<table id="tbl_assessment" width="100%" border="0" class="layout_box lightbar" style="border-spacing:10px">
				<tr>
					<td style="width:70px; padding-left:8px">
						<span class="assessment_header">Method:</span>
					</td>
					<td style="width:200px">
						<select class="select_methods" style="width:100%"></select>
					</td>
					<td>
						&nbsp;
					</td>
					<td align="center" style="width:40px;">
						<div class="btn btn-primary but_additem" style="font-size:12px"><span>Add</span></div>
					</td>
				</tr>
			</table>
			
			<table width="100%" border="0" class="my_datatable display nowrap" style="margin-top:6px; display:none" dt_type="assessments">
				<thead>
					<tr>
						<td>Method</td>
						<td>Title</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</thead>
			</table>
		</div>

		<!--PHOTOS AND VIDEOS-->
		<div>
			<table width="100%" style="padding-top:10px">
				<tr>
					<td>
						<div class="section_header4">
							Photos and Videos
						</div>
					</td>
					<td width="10" style="padding:4px 8px;">
						<input class="uploader" type="file" accept="image/*; video/*; capture=camcorder" data-title="Add">
					</td>
				</tr>
			</table>
		</div>

		<div class="uploader_gallery"></div>			

		<div class="btn_panel">
			<button class="btn_cancel btn btn-primary"><i class="glyphicon glyphicon-ban-circle"></i> Cancel</button>
			<button class="btn_clear btn btn-primary"><i class="glyphicon glyphicon-remove"></i> Clear</button>
			<button class="btn_save btn btn-primary"><i class="glyphicon glyphicon-ok"></i> Save</button>
			<button class="btn_delete btn btn-danger"><i class="glyphicon glyphicon-remove-circle"></i> Delete</button>
			<button class="btn_publish btn btn-success"><i class="glyphicon glyphicon-certificate"></i>	Publish</button>
		</div>


	
<!--END OF CONTAINER FOR EDIT-->
</div>
