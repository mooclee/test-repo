<table>
	<tr>
		<td style="height:100%; border-left:1px solid lightgray;">
		</td>
		<td height="150">
			<table width="100%" height="100%" border="0">
				<tr>
					<td align="center">
						<table border="0">
							<tr>
								<td style="text-align:center">
									<b>GS Status</b>
								</td>
							</tr>
							<tr>
<!--							
								<td class="svg_container" svg="star" svgfill="#cd7f32" title="Status">
								</td>												
-->
								<td>
									<div>
										<canvas class="status_gauge" style="width:125px" user="<?=$user?>"></canvas>
										<div class="preview-textfield"><?=$status?></div>
									</div>
								</td>
							</tr>
							<tr>
								<td style="text-align:center; ">
									<?=$rank?>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="border-bottom:1px solid lightgrey; height:2px">
					</td>
				</tr>
				<tr>
					<td align="center">
						<table>
							<tr>
								<td style="text-align:center">
									<b>Networks</b>
								</td>
							</tr>
							<tr>
								<td class="networks_num">
									<?=$network?>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>