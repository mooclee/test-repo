<!--METHOD: UPPER PART-->
<div id="div_ass_edit_template" class="div_tmp">

	<!--TITLE-->
	<div class="section_header3">
		<img class="leftarrow" src="./images/leftarrow_16.png" onclick="closeLightBox()"/>
		Assessment <span class="tmp_assessment"></span>:
		<span style="font-weight:normal">
			<span class="tmp_title"></span> (<span class="tmp_method"></span>)
		</span>
	</div>
	
	<div class="div_editass">
		<!--PERIOD-->
		<div class="subsection_header">Period</div>
		<table class="tbl_period">
			<tr>
				<td nowrap class="text_start">
					Start:
				</td>
				<td style="width:120px">
					<input class="event_datetime start_datetime" value="">
				</td>
			</tr>
			<tr>
				<td nowrap class="text_end">
					End:
				</td>
				<td style="width:150px">
					<input class="event_datetime end_datetime" value="">
				</td>
			</tr>
		</table>
		
		<div class="div_separator">&nbsp;</div>	
		
		<!--GENERIC SKILLS-->
		<div class="subsection_header" style="">Description</div>
		<div class="div_ass_desc">
			<div class="editable"
				data-name="assessment_desc"
				data-mode="inline"
				data-type="wysihtml5"
				data-title="Enter the description of the assessment"
				data-emptytext="The description of the assessment"
				data-inputclass="input_wysihtml5"
				data-url=""
				show_trash="0"
				data-unsavedclass-xxx="unsavededitable"
				data-showbuttons="bottom"
				data-placement="bottom"
			></div>
		</div>
		<div class="div_separator">&nbsp;</div>	
		
		<!--GENERIC SKILLS-->
		<div class="subsection_header" style="">Generic Skills</div>
		<div>
			<?php include 'find_skills.php'?>
		</div>	
		
		<div class="div_separator">&nbsp;</div>
		
		<!--ITEMS LIST-->
		<div class="div_ass_items"></div>

		<div class="div_separator">&nbsp;</div>
		
		<!--ASSESSORS-->	
		<?php include 'index_panelists.php'?>
		
	<!--
		<div class="div_separator">&nbsp;</div>
		<div class="btn_panel">
			<button class="btn_cancel btn btn-primary"><i class="glyphicon glyphicon-ban-circle"></i> Cancel</button>
			<button class="btn_clear btn btn-primary"><i class="glyphicon glyphicon-remove"></i> Clear</button>
			<button class="btn_delete btn btn-danger"><i class="glyphicon glyphicon-remove-circle"></i> Delete</button>
			<button  class="btn_close btn btn-success"><i class="glyphicon glyphicon-ok-circle"></i> Close</button>
		</div>
	-->		
	<!--			
			<div class="btn_loadtmp btn btn-primary"><span>Load template</span></div>
			<div class="btn_savetmp btn btn-primary"><span>Save template</span></div>
	-->
	
	</div>
	
</div>


<!--peer assessment (new: inline)-->
<div id="div_peer_assessment2" class="div_tmp">							

	<span class="subsection_header">Peer Assessors</span>
	
	<table class="tbl_peer_assessment" style="background:white; border-radius:8px; width:100%;" cellspacing="4" cellpadding="4">
	
		<tr>
			<td>
				Select the <span class="span_peers"></span> peer assessors out of the <span class="span_participants"></span> participants.
			</td>
			<td align="right">
				<button class="btn_select btn-sm btn btn-primary" style="width:80px;"><i class="glyphicon glyphicon-th-list"></i> Select</button>
			</td>
		</tr>
		
		<tr>
			<td colspan="2">
				<table class="my_datatable display nowrap" dt_type="peer_assessors2" style="width:100%">
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
</div>

<!--peer assessment (new: popup)-->
<div id="div_peer_assessment3" class="div_tmp">

	<span class="subsection_header">Peer Assessors</span>
	
	<table class="tbl_peer_assessment" style="background:white; border-radius:8px;" cellspacing="4" cellpadding="4">
	
		<tr>
			<td>
				Select the <span class="span_peers"></span> peer assessors out of the <span class="span_participants"></span> participants.
			</td>

		</tr>
		
		<tr>
			<td>
				<table class="my_datatable display nowrap" dt_type="peer_assessors3" style="width:100%">
					<thead>
						<td>Name</td>
<!--					
						<td>User ID</td>
						<td>&nbsp;</td>
						<td>Name</td>
						<td>Email</td>
						<td>Position</td>
-->						
						<td>Select</td>
					</thead>
				</table>
			</td>
		</tr>
		
	</table>
	
	<div class="div_error_msg" style="color:red; text-align:center;">&nbsp;</div>
	
	<div style="text-align:center">
		<button class="btn_cancel btn-sm btn btn-primary" style="width:75px;"><i class="glyphicon glyphicon-ban-circle"></i> Cancel</button>
		<button class="btn_selectall btn-sm btn btn-primary" style="width:75px;"><i class="glyphicon glyphicon-list"></i> Select all</button>
		<button class="btn_clear btn-sm btn btn-primary" style="width:75px;"><i class="glyphicon glyphicon-remove"></i> Clear	</button>
		<button class="btn_submit btn-sm btn btn-success" style="width:75px;"><i class="glyphicon glyphicon-ok"></i> Submit</button>
	</div>
	
</div>

<!--peer assessment (old)-->
<!--
<div id="div_peer_assessment" class="div_tmp">							

	<span class="subsection_header">Peer Assessors</span>
	
	<table class="tbl_peer_assessment" style="background:white; border-radius:8px;" cellspacing="4" cellpadding="4">
	
		<tr>
			<td>
				Select the <span class="span_peers"></span> peer assessors out of the <span class="span_participants"></span> participants.
			</td>
		</tr>
		
		<tr>
			<td>
				<div class="div_multi_users dropup">
					<select class="select_multi_users" multiple="multiple">
					</select>
				</div>
			</td>
		</tr>
		
	</table>								
</div>
-->

