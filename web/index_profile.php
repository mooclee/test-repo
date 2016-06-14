
<table cellspacing="0" cellpadding="0" width="100%">
	<tr>
		<td>
			<table cellpadding="0" cellspacing="0" width="100%" class="layout_box" style="padding:2px 8px">
				<tr>
					<td style="padding:0px 0px; width:200px; text-align:center;">
						<img id="profile_myphoto" class="photo_myself" src="./people/m03.jpg" style="margin-top:40px">
					</td>
					<td valign="top" style="padding-right:10px;">
						<table cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td>
									<b class="name_myself" style="font-size:20px">Samson Chan</b><br/>
									<span class="curriculum_myself">Social Science Year 2</span><br/>The University of Hong Kong, Hong Kong									
								</td>
							</tr>
							<tr>
								<td>
									<br/><b>Skills Table</b><br/>
									<?php include 'index_skills_table.php'?>
								</td>
							</tr>
						</table>						
					</td>
					<td width="100">
						<?php $user="samson"; $status = '3.6'; $network = '128'; $rank = 'Bronze'; include 'index_status.php'?>
					</td>
				</tr>
				<tr>
					<td colspan="4" style="padding-bottom:5px">
						<table width="100%">
							<tr>
								<td>
									<b>Personal Statement and Objectives</b>
								</td>
							</tr>
							<tr>
								<td class="text_box">
									The study of Social Science is appealing to me because of the diversity of topics they cover and their relevance to our world today. In an increasingly globalised world, it is important to have a deep understanding of the economic and political institutions that govern, and the cultural backgrounds and values of its citizens.<br/><br/>
									I like travelling and it has broadened my mind to the issues facing our world, and inspired me to investigate further into our origins and the workings of society. After my studies, I hope to work in social welfare and make a meaningful contribution to improving the lives of others and society. I have always enjoyed and felt confident in academia and in experiencing the world outside of the classroom I have been able to confirm my aspirations in life, making me a very motivated, enthusiastic and committed student.
								</td>
							</tr>
						</table>
					</td>
				</tr>
				
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<ul id="profile_blocks">
				<li class="ui-state-default">
					<table width="100%">
					
						<!--TITLE-->
						<tr>
							<td class="profile_header ui-state-default">
								Extra-curricular Activities / Projects
							</td>
						</tr>
						
						<!--EXPERIENCE #1-->
						<tr>
							<td>
								<table width="100%">
								
									<tr>
										<td class="profile_logo">
											<img src="./logo/hkredcross.jpg"/>
										</td>
										<td class="profile_desc">
											<b>Volunteer Helper</b><br/>
											Hong Kong Red Cross<br/>
											Aug 2013
										</td>
										<td width="32">
											<span class="svg_container" svg="edit" svgfill="#000000" svgsize="24" title="Edit this experience" style="cursor:pointer"></span>
										</td>
									</tr>
									
									<tr>
										<td colspan="3">
											<b>Post-earthquake Visit to Sichuan</b>
											<div class="text_box">Whether it be internationally or locally, the HKRC is without fail always willing to lend a helping hand and show support no matter what the situation. I can surely tell you that this organization has been making a difference and will continue to make a difference to the world for years to come. Simply being a part of the HKRC stands for leaves me speechless everyday.

Red Cross is the ideal service organization for a HKU student; it requires commitment and attendance, while meetings are efficient and very organized. Not only that, but it is possible to find a service activity for so many different interests, both on and off campus. Walking into a meeting, you will find a diverse group of students, but we all have one thing in common: we love to serve, and we are all genuinely nice people!
											</div>
										</td>
									</tr>
									
								</table>
							</td>
						</tr>
						
						<tr>
							<td style="padding:10px 4px">
							
								<table style="" cellpadding="0" cellspacing="0" width="100%">
									<tr>
										<td style="padding-right:10px; width:700px">
											<div style="width:100%">
												<b>Skills Developed Table:</b>
												<?php include 'index_skills_table.php'?>
											</div>
										</td>
										
										<td valign="top">
											<b>Privacy Options:</b>
											<table style="width:100%; height:100%; border:1px solid #e0e0e0; margin-top:8px;">
												<tr>
													<td>
														<input type="radio" name="profile_priv" checked disabled />Public
													</td>
												</tr>
												<tr>
													<td>
														<input type="radio" name="profile_priv" disabled />Only shown to network
													</td>
												</tr>
												<tr>
													<td>
														<input type="radio" name="profile_priv" disabled />Private
													</td>
												</tr>
											</table>
													
										</td>
									</tr>
								</table>
								
							</td>
						</tr>
							

						<!--ADD EXPERIENCE-->
						<tr>
							<td>
							
								<table width="100%" style="padding:2px; background:#e0e0e0;">
									<tr>
										<td style="text-align: center">
											<button class="medium_button" onclick="toggleAddExp()">Add experience</button>
										</td>
									</tr>
								</table>
								
								<div class="separator2"></div>
								
								<div id="div_add_exp">
								
									<table width="100%" style="padding:10px; background:#e0e0e0">
										<tr>
											<td>
												<table style="background:#e0e0e0">
													<tr>
														<td width="300">
															<b>Experience from:</b>
															<span id="cb_profile_activity" class="ui-widget">
																<select class="profile_combobox">		
																	<option selected>OCL-X</option>
																	<option>YOLO-X</option>
																</select>
															</span>
														</td>
														<td>
															<b>Name of experience:</b>
															<span id="cb_exp_name_oclx" class="ui-widget">
																<select class="profile_combobox">
<!--																
																	<option value="1">Beyond Our Borders: Experience Taiwan and South Korea</option>
																	<option value="2">My Experience in Post-earthquake Visit to Sichuan</option>
																	<option value="3">Team Lead in Science Society 2016</option>
-->																	
																</select>
															</span>
															<span id="cb_exp_name_yolox" class="ui-widget" style="display:none">
																<select class="profile_combobox">
<!--																
																	<option value="4">Experiential Learning 2016</option>
																	<option value="5">Parachute Diving</option>
																	<option value="6">Community service at Stocklerbridge Hospital</option>
-->																	
																</select>
															</span>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										
										<tr>
											<td>
												<table style="background:#e0e0e0" cellpadding="5" cellspacing="5">
													<tr>
														<td colspan="2">
															<b>Description:</b>
															<div style="text-align:center">
																<table>
																	<tr>
																		<td colspan="2">
																			<img id="img_profile_desc" style="width:100%"/>
																		</td>
																	</tr>
																	<tr>
																		<td>
																			<div id="video_profile_desc"></div>
																		</td>
																		<td>
																			<div id="div_profile_desc" class="text_box"></div>
																		</td>
																	</tr>
																</table>
															</div>
														</td>
													</tr>
												</table>
											</td>
										</tr>	

										<tr>
											<td>
												<table style="background:#e0e0e0" cellpadding="0" cellspacing="0" width="100%">
													<tr>
													
														<td style="padding-right:10px; width:700px">
															<div>
																<b>Skills Developed Table:</b>
																<?php include 'index_skills_table.php'?>
															</div>
														</td>
														
														<td valign="top">
															<b>Privacy Options:</b>
															<table style="width:100%; height:100%; margin-top:8px;">
																<tr>
																	<td>
																		<input id="addexp_priv1" type="radio" name="addexp_priv" checked />Public
																	</td>
																</tr>
																<tr>
																	<td>
																		<input type="radio" name="addexp_priv"/>Only shown to network
																	</td>
																</tr>
																<tr>
																	<td>
																		<input type="radio" name="addexp_priv"/>Private
																	</td>
																</tr>
															</table>
																	
														</td>
													</tr>
												</table>
											</td>
										</tr>	
										
										<tr>
											<td style="text-align:center">
												<button class="medium_button">Add</button>
												<button class="medium_button">Cancel</button>
											</td>
										</tr>
													
									</table>
								</div>
							</td>
						</tr>
						
					</table>
				</li>
				
				<!--WORK EXPERIENCE-->
				<li class="ui-state-default">
					<table width="100%">
						<tr>
							<td class="profile_header ui-state-default">
								Work Experience
							</td>
						</tr>
						<tr>
							<td>
								<table width="100%">
									<tr>
										<td class="profile_logo" valign="top">
											<img src="./logo/prudential.jpg"/>
										</td>
										<td class="profile_desc">
											<b>Customer Support Intern</b><br/>
											Prudential Hong Kong Ltd.<br/>
											Jul-Aug 2013<br/>
											- Handled general customer issues<br/>
											- Filing and data entry<br/>
										</td>
										<td width="32">
											<span class="svg_container" svg="edit" svgfill="#000000" svgsize="24" title="Edit this experience" style="cursor:pointer"></span>
										</td>
									</tr>
								</table>
							</td>

						</tr>
					</table>
				</li>
				
				<!--ACADEMIC QUALIFICATIONS-->
				
				<li class="ui-state-default">
					<table width="100%">
						<tr>
							<td class="profile_header ui-state-default">
								Education
							</td>
						</tr>
						<tr>
							<td>
								<table width="100%">
									<tr>
										<td class="profile_logo" valign="top">
											<img src="./logo/hku.jpg"/>
										</td>
										<td class="profile_desc">
											<b>Bachelor of Social Science</b><br/>
											The University of Hong Kong<br/> 2014 - Present
										</td>
										<td width="32">
											<span class="svg_container" svg="edit" svgfill="#000000" svgsize="24" title="Edit this experience" style="cursor:pointer"></span>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<hr noshade style="border:1px solid #e8e8e8">
							</td>
						</tr>
						<tr>
							<td>
								<table width="100%">
									<tr>
										<td class="profile_logo" valign="top">
											<img src="./logo/stpaulcoed.jpg"/>
										</td>
										<td class="profile_desc">
											<b>Secondary School</b><br/>
											St. Paul's Co-educational College<br/>
											2008 - 2014
										</td>
										<td width="32">
											<span class="svg_container" svg="edit" svgfill="#000000" svgsize="24" title="Edit this experience" style="cursor:pointer"></span>
										</td>
									</tr>
								</table>
							</td>
							
						</tr>
						
						<tr>
							<td>
								<div class="gray_bar">
									<button class="medium_button">Add academic qualification</button>
								</div>
							</td>
						</tr>
						
					</table>
				</li>
				
				<li class="ui-state-default">
					<table width="100%">
						<tr>
							<td class="profile_header ui-state-default">
								Interests
							</td>
						</tr>
						<tr>
							<td>
								Basketball, Swimming, Reading, Computer programming, Hiking
							</td>
						</tr>
						<tr>
							<td>
								<div class="gray_bar">
									<button class="medium_button">Add interest</button>
								</div>
							</td>
						</tr>
					</table>
				</li>
				
				<li class="ui-state-default">
					<table width="100%">
						<tr>
							<td class="profile_header ui-state-default">
								Lanugage Skills
							</td>
						</tr>
						<tr>
							<td>
								<table width="100%">
								
									<thead>
										<td class="tbl_header" style="width:50%">
											Language
										</td>
										<td class="tbl_header" style="width:25%; text-align:center">
											Spoken
										</td>
										<td class="tbl_header" style="width:25%; text-align:center">
											Written
										</td>
									</thead>
									
									<tr>
										<td>
											<input type="text" class="inp_text lang_text" value="Cantonese"/>
										</td>
										<td align="center">
											<select class="lang_combobox">
												<option selected>Native</option>
												<option>Fluent</option>
												<option>Intermediate</option>
												<option>Basic</option>
											</select>
										</td>
										<td align="center">
											<select class="lang_combobox">
												<option selected>Native</option>
												<option>Fluent</option>
												<option>Intermediate</option>
												<option>Basic</option>
											</select>
										</td>
									</tr>

									<tr>
										<td>
											<input type="text" class="inp_text lang_text" value="English"/>
										</td>
										<td align="center">
											<select class="lang_combobox">
												<option>Native</option>
												<option selected>Fluent</option>
												<option>Intermediate</option>
												<option>Basic</option>
											</select>
										</td>
										<td align="center">
											<select class="lang_combobox">
												<option>Native</option>
												<option selected>Fluent</option>
												<option>Intermediate</option>
												<option>Basic</option>
											</select>
										</td>
									</tr>
									
									<tr>
										<td>
											<input type="text" class="inp_text lang_text" value="Mandarin"/>
										</td>
										<td align="center">
											<select class="lang_combobox">
												<option>Native</option>
												<option>Fluent</option>
												<option selected>Intermediate</option>
												<option>Basic</option>
											</select>
										</td>
										<td align="center">
											<select class="lang_combobox">
												<option selected>Native</option>
												<option>Fluent</option>
												<option>Intermediate</option>
												<option>Basic</option>
											</select>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						
						<tr>
							<td>
								<div class="gray_bar">
									<button class="medium_button">Add language skill</button>
								</div>
							</td>
						</tr>
						
						
						<tr>
							<td colspan="3">
								<b>Comment:</b><br/>
								<!--<div contenteditable="true" class="text_box" onclick='$(this).focus();'>Japanese test</div>-->
								<textarea class="text_box" style="width:900px; resize: none;">Japanese test</textarea>
<!--								
								<div class="gray_bar">
									<button class="medium_button">Save</button>
								</div>
-->								
							</td>
						</tr>
						
					</table>
				</li>
				
				<li class="ui-state-default">
					<table width="100%">
						<tr>
							<td class="profile_header ui-state-default">
								Awards
							</td>
						</tr>
						<tr>
							<td>
								<pre>
									<b>Interschool Computer Programming Competition</b>
									Championship
									2004
								</pre>
							</td>
						</tr>
						<tr>
							<td>
								<div class="gray_bar">
									<button class="medium_button">Add award</button>
								</div>
							</td>
						</tr>
					</table>
				</li>
				
				<li class="ui-state-default">
					<table width="100%">
						<tr>
							<td class="profile_header ui-state-default">
								Publications
							</td>
						</tr>
						<tr>
							<td>
								N/A
							</td>
						</tr>
						<tr>
							<td>
								<div class="gray_bar">
									<button class="medium_button">Add publication</button>
								</div>
							</td>
						</tr>
					</table>
				</li>
			</ul>		
		</td>
	</tr>
</table>

