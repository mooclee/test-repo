<table width="100%">

	<!--USER INFO-->
	<tr>
		<td>		
			<table class="user_info">
				<tr>
					<td rowspan="3" style="padding-right:10px; width:100px;">
						<img id="userpage_photo" class="custom_photo photo" src=""/>
					</td>
					<td>
						<span class="username" style="font-weight:bold; font-size:20px"></span>
					</td>
				</tr>
				<tr>
					<td>
						<span class="position"></span>
					</td>
				</tr>
				<tr>
					<td>
						<span class="location"></span>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	
	<tr>
		<td>
			<table align="center" cellspacing="0" cellpadding="0">
				<tr>
					<td>
						<!--USER STAT-->
						<?php $id="3"; include 'index_userstat.php'?>
					</td>
					
					<td>
						<!--GS STATUS-->
						<table border="0" class="tbl_gauge">
							<tr>
								<td style="text-align:center">
									<span class="text_gsscore">GS Score</span>
								</td>
							</tr>
							<tr>
								<td>
									<div>
										
										<canvas id="cvs_gauge_userpage" class="canvas_gauge" style="width:125px"></canvas>
										<div class="div_gauge div_gauge3"></div>
										
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	
	<!--ROW#2: MY GS TBL & CANVAS-->
	<tr>
		<td>
			<table class="tbl_gskill_root" cellspacing="0" cellpadding="0" width="100%">
				<tr>
					<td class="td_tbl_skills" valign="top">
						<div class="div_tbl_skills">
							<table id="tbl_skills_userpage" class="tbl_skills" style="" cellspacing="0" cellpadding="0" chart_type="userpage">
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td valign="top" align="center">
						<div class="div_canvas_userpage">
							<canvas id="cvs_skills_userpage" class="canvas_chart" chart_type="userpage"></canvas>
						</div>
					</td>
				</tr>
			</table>												

		</td>
	</tr>
</table>
