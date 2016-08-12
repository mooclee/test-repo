<table>
	<tr>
		<td style="height:100%;">
		</td>
		<td height="150">
			<table width="100%" height="100%" border="0">
				<tr>
					<td align="center">
						<table border="0">
							<tr>
								<td style="text-align:center">
									<b class="text_gsgrades">GS Status</b>
								</td>
							</tr>
							<tr>
								<td>
									<div>
										<canvas id="canvas_gauge<?=$id?>" class="canvas_gauge" style="width:125px"></canvas>
										<div class="div_gauge div_gauge<?=$id?>"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td style="text-align:center;" class="text_bronze"></td>
							</tr>
						</table>
					</td>
				</tr>
				
				<tr>
					<td style="border-bottom:1px solid lightgrey; height:16px">
					</td>
				</tr>
				
				<tr>
					<td align="center">
						<table>
							<tr>
								<td style="text-align:center">
									<b class="text_ntwk">Network</b>
								</td>
							</tr>
							<tr>
								<td class="td_ntwk_num td_ntwk_num<?=$id?> networks_num">
								</td>
							</tr>
						</table>
					</td>
				</tr>
				
				<tr>
					<td style="border-bottom:1px solid lightgrey; height:16px">
					</td>
				</tr>
				
				<tr>
					<td align="center">
						<b>Activities</b>

						<table cellpadding="0" cellspacing="4" align="center">

							<tr>
								<td align="center">
									<table cellspacing="0" style="margin-bottom:10px">
										<tr>
											<td class="act_num_text">
												Participated
											</td>
											<td class="td_participated<?=$id?> act_num">
											</td>
										</tr>
									</table>
								</td>
							</tr>
							
							<tr>
								<td align="center">
									<table cellspacing="0" style="margin-bottom:10px">
										<tr>
											<td class="act_num_text">
												Coordinated
											</td>
											<td class="td_coordinated1 act_num">
											</td>
										</tr>
									</table>
								</td>
							</tr>

						</table>
					
					</td>
				</tr>
				
			</table>
		</td>
	</tr>
</table>
