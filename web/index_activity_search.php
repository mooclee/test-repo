
<table cellspacing="0" cellpadding="5" width="100%" class="layout_box">
	<thead>
		<tr>
			<td class="tab_title">
				Search activity
			</td>
		</tr>
		<tr>
			<td>
				<table width="100%">
					<tr>
						<td>
							<?php $placheolder = 'Find in my activities...';include "searchbar.php"?>
						</td>
						<td width="100">
							<table border="0" cellspacing="0" cellpadding="0" style="border-radius:8px; border:1px solid #e0e0e0; ">
								<tr>
									<td style="width:18px">
										<span class="svg_container" svg="pin" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
									</td>
									<td style="width:18px; padding-right:0px;">
										<input id="cb_assessment" type="checkbox" checked />
									</td>
									
									<td style="width:18px">
										<span class="svg_container" svg="notice" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
									</td>
									<td style="width:18px; padding-right:2px;">
										<input id="cb_notice" type="checkbox" checked />
									</td>
									
									<td style="width:18px">
										<span class="svg_container" svg="message" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
									</td>
									<td style="width:18px; padding-right:0px;">
										<input id="cb_message" type="checkbox" checked />
									</td>
									
								</tr>
							</table>
						</td>
						<td align="right" width="120">
							<button class="medium_button" onclick="toggleAllTasks()">Toggle all tasks</button>
						</td>
						<td align="right" width="120">
							<button class="medium_button" onclick="openCreateActivity(1)">Create Activity</button>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>
				<!--DATATABLE-->
				<table id="tbl_search_activity" class="datatable" style="width:100%">

					<thead id="thead_search_activity">
						<td>
							Type
						</td>
						<td>
							Title
						</td>
						<td>
							Role
						</td>
						<td>
							Start
						</td>
						<td>
							End
						</td>
						<td>
							Status
						</td>
						<td>
							&nbsp;
						</td>
					</thead>
					
					<tbody id="tbody_search_activity">
<!--					
						<tr index="1">
							<td style="width:50px">
								OCLX
							</td>
							<td>
								Beyond Our Borders: Experience Taiwan and South Korea
							</td>
							<td>
								Coordinator
							</td>
							<td>
								8 Jul 2016
							</td>
							<td>
								31 Jul 2016
							</td>
							<td>
								New
							</td>
							<td>
								<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
							</td>
						</tr>

						<tr index="2">
							<td>
								OCLX
							</td>
							<td>
								Post-earthquake Visit to Sichuan
							</td>
							<td>
								Participant
							</td>
							<td>
								8 Aug 2008
							</td>
							<td>
								31 Sep 2018
							</td>
							<td>
								Completed
							</td>
							<td>
								<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
							</td>
						</tr>

						<tr index="3">
							<td>
								OCLX
							</td>
							<td>
								Team Lead in Science Society
							</td>
							<td>
								Participant
							</td>
							<td>
								15 Sep 2015
							</td>
							<td>
								31 Dec 2016
							</td>
							<td>
								Invited
							</td>
							<td>
								<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
							</td>
						</tr>

						<tr index="4">
							<td>
								YOLOX
							</td>
							<td>
								Experiential Learning
							</td>
							<td>
								Coordinator
							</td>
							<td>
								15 May 2016
							</td>
							<td>
								30 May 2016
							</td>
							<td>
								Completed
							</td>
							<td>
								<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
							</td>
						</tr>

						<tr index="5">
							<td>
								YOLOX
							</td>
							<td>
								Parachute Diving
							</td>
							<td>
								Participant
							</td>
							<td>
								17 Jul 2016
							</td>
							<td>
								31 Jul 2016
							</td>
							<td>
								Completed
							</td>
							<td>
								<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
							</td>
						</tr>

						<tr index="6">
							<td>
								YOLOX
							</td>
							<td>
								Community Service in Stocklerbridge
							</td>
							<td>
								Participant
							</td>
							<td>
								15 May 2016
							</td>
							<td>
								31 Jul 2016
							</td>
							<td>
								Completed
							</td>
							<td>
								<span class="svg_container action_button" svg="settings" svgsize="18" svgfill="gray" style="cursor:pointer"></span>
							</td>
						</tr>
-->						
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>

