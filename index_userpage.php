

<div id="div_user_page" class="tab_page">

	<div id="web_userpage" class="web_layout">
		<table width="100%" border="0">
			<tr>
				<!--COL#1: PHOTO, DESC, GAUGE AND STAT, SKILLS CHART AND TABLE-->
				<td style="width:1px" valign="top">
					<table class="tbl_col">
						<tr>
							<td class="userpage_title" colspan="2">
								Personal Information
							</td>
						</tr>
						<tr>
							<td>
								<!--PHOTO AND DESC-->
								<table width="100%" style="border-spacing: 10px;">
									<tr>
										<td class="td_photo" valign="top">
										</td>
									</tr>
									<tr>
										<td>
											<table width="100%">
												<tr>
													<td class="td_username">
													</td>
												</tr>
												<tr>
													<td class="td_position">
													</td>
												</tr>
												<tr>
													<td class="td_location" style="width:100px">
													</td>
												</tr>
											</table>						
										</td>
									</tr>
								</table>						
							</td>
							<td>
								<table width="1">
									<tr>
										<td class="td_tbl_gauge" align="center"></td>
									</tr>
									<tr>
										<td class="td_tbl_userstat"></td>
									</tr>
								</table>
							</td>
						</tr>

						<tr>
							<td colspan="2">
								<!--SKILLS TABLE & AND CHART-->
								<table>
									<tr>
										<td class="td_div_canvas_userpage">
										</td>
									</tr>
									<tr>
										<td class="td_tbl_skills">
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
				
				<!--COL#2: OCLX-->
				<td valign="top">
					<table width="100%" class="tbl_col">
						<tr>
							<td class="userpage_title">
								OCL-X
							</td>
						</tr>
						<tr>
							<td class="td_div_userpage_oclx" style="padding:5px">
							</td>
						</tr>
					</table>
				</td>
				
				<!--COL#3: YOLOX-->
				<td valign="top">
					<table width="100%" class="tbl_col">
						<tr>
							<td class="userpage_title">
								YOLO-X
							</td>
						</tr>
						<tr>
							<td class="div_userpage_yolox" style="padding:5px">
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>

	<div id="mobile_userpage">	
		<?php include "index_userpage_1_userinfo.php"?>						
		<?php include "index_userpage_2_oclx.php"?>
		<?php include "index_userpage_3_yolox.php"?>
	</div>
	
	<div class="sections"></div>
	
</div>

