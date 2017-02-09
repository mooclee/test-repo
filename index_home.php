<div id="web_home" class="web_layout">
	<table width="100%">
		<tr>
			<td valign="top" width="100">
				<table>
					<tr>
						<td class="td_myinfo_photo">
						</td>
					</tr>
					<tr>
						<td class="td_hr">
						</td>
					</tr>
					<tr>
						<td class="td_tbl_gauge">
						</td>
					</tr>					
					<tr>
						<td class="td_hr">
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


<div id="mobile_home">
	<!--USER INFO-->
	<table class="user_info">
		<tr>
			<td rowspan="3">
				<img id="home_photo" class="custom_photo myinfo_photo" src=""/>
			</td>
			<td>
				<span class="myinfo_username" style="font-weight:bold; font-size:20px"></span>
			</td>
		</tr>
		<tr>
			<td>
				<span class="myinfo_position"></span>
			</td>
		</tr>
		<tr>
			<td>
				<span class="myinfo_location"></span>
			</td>
		</tr>
	</table>

	<!--USER STAT & STATUS-->
	<table class="user_status" align="center" cellspacing="0" cellpadding="0" border="0" width="100%">
		<tr>
			<td valign="top">
				<?php $id="1"; include 'index_userstat.php'?>
			</td>
			<td  height="150" align="center" valign="top">
				<table border="0" class="tbl_gauge"  cellspacing="0" cellpadding="0">
					<tr>
						<td style="text-align:center">
							<span class="text_gsscore">GS Score</span>
						</td>
					</tr>
					<tr>
						<td>
							<div>
								<canvas id="cvs_gauge_home" class="canvas_gauge"></canvas>
								<div class="div_gauge div_gauge1"></div>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>

	<!--SKILLS-->
	<table class="user_skills" width="100%">
		<tr>
			<td>
				<table id="tbl_skills_home" class="tbl_skills" cellspacing="0" cellpadding="0"></table>
			</td>
		</tr>
		<tr>
			<td align="center">
				<canvas id="cvs_skills_home" class="canvas_chart"></canvas>
			</td>
		</tr>
	</table>
</div>
