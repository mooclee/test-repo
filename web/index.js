var
	TAB_HOME = 0,
	TAB_PROFILE = 1,
	TAB_NTWK = 2,
	TAB_OCLX = 3,
	TAB_YOLOX = 4
;

var g_profile_desc_arr = [
	0,
	'The Global Citizenship Summer Institute (GCSI) provides a platform for Social Sciences students to step beyond their academic and physical borders, engaging in intellectual and experiential learning through participating in a four-week intensive study programme in Taiwan and South Korea. GCSI aims to enhance Social Sciences students\' awareness of the importance of Asia in the globalizing world. Students will spend first two weeks in Taiwan and following two weeks in South Korea attending academic lectures relating to three focus areas: social, cultural and political developments in Taiwan and South Korea. Students will critically examine these focus areas through a comparative lens as well as analyzing their regional and global implications. Field visits to civil society organizations and political and cultural parties will be organized to provide students with a more holistic understanding of Taiwanese and South Korean societies. By the end of these four weeks, students will gain a unique perspective on Asia through interacting with academics, students, community leaders and people in the selected Asian societies.',
	'The Society aims at (a) promoting comradeship and spirit within the Faculty (b) representing the students of the Faculty as a whole (c) promoting interest in Science within and without the Society (d) promoting intellectual and social intercourse within and without the Society (e) promoting general welfare of the members of the Society. The Society is also the representative body for all students studying in the Faculty of Science in The University of Hong Kong. Until now, Science Society, HKUSU has more than 2000 members, from the following programmes: B.Sc. - Bachelor of ScienceWith 16 Science majors - Astronomy - Biochemistry - Biological Sciences - Chemistry - Decision Analytics - Earth System Science - Ecology & Biodiversity - Environmental Science - Food & Nutritional Science - Geology - Mathematics - Mathematics/Physics- Molecular Biology & Biotechnology - Physics - Risk Management - Statistics B.Sc.(AC) - Bachelor of Science in Actuarial Science B.Ed. & B.Sc. - Bachelor of Education and Bachelor of Science (5-year double degree programme) Science Society, HKUSU is devoted to support the development of versatile science leaders, who would go on to succeed in any career prospects, through organising various events. In order to benefit members and promote science, a series of academic and social functions is being held every year.',
	'Whether it be internationally or locally, the HKRC is without fail always willing to lend a helping hand and show support no matter what the situation. I can surely tell you that this organization has been making a difference and will continue to make a difference to the world for years to come. Simply being a part of the HKRC stands for leaves me speechless everyday. Red Cross is the ideal service organization for a HKU student; it requires commitment and attendance, while meetings are efficient and very organized. Not only that, but it is possible to find a service activity for so many different interests, both on and off campus. Walking into a meeting, you will find a diverse group of students, but we all have one thing in common: we love to serve, and we are all genuinely nice people!',
	'In May 2016, I was involved in an experential learning project with Doctors without Borders. I was responsible to coordinate the Hong Kong sector, including collecting resources and materials to the east of China. I felt so grateful to love this opportunity to meet, learn and develop myself.',
	'"Jumping is fun! Skydiving is not just falling; it is flying—the closest we have been able to come to free, unencumbered, non-mechanical individual flight,"',
	'Living abroad is a tempting opportunity for people that could lead to gain a lot of useful experiences and valuable knowledge. However, Living in a foreign country can be an experience both exhilarating and daunting. A t the same time, it would be new experience and memorable days, but through this period of time these will not be ordinary days. People who lived away from their countries usually face some effect, this essay aims to mention the three most common effects of living in a foreign country that can change people\'s personal lives.The major effect, and also a very common one, is missing anything that reminding you of both your family and hometown. Living away from your family sometimes district your attention and makes you feel homesick. Especially, when you face up some issue which you are unable to resolve and lacked to whose support. That supposedly would makes you realize how valuable your family is. Furthermore, the simple things would remind you where you belong such as a bird\'s song, trees blowing in the wind, sunrise, calm night, people\'s speech, and all of the community life around you.',
];


jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

/////////////////////////////////////////////////////////////////

function initAll(){
	//return;
	
	// top buttons
	$('.svg_container').each(function(){
		var jobj = $(this),
			svg = jobj.attr('svg'),
			html = svg_obj[svg],
			jhtml = $(html);
		var svgfill = jobj.attr('svgfill'),
				svgsize = jobj.attr('svgsize')
		;
		jhtml
			.find('path,ellipse,circle,polygon')
			.attr('fill', svgfill ? svgfill : '#ffffff')
		;
		if (svgsize){
			jhtml.width(svgsize).height(svgsize)
		}
		jobj.prepend(jhtml);
		//console.debug(jobj.outerHTML());
	});
	
	// tooltip
	$( document ).tooltip();
	$( document ).click(function(){
		closeDropmenu();
	});

	// profile blocks
	$('#profile_blocks').sortable({
		placeholder: 'ui-state-highlight',
		// http://stackoverflow.com/questions/5791886/jquery-draggable-shows-helper-in-wrong-place-after-page-scrolled
		helper: function(event, ui){
			var $clone =  $(ui).clone();
			$clone.css('position','absolute');
			return $clone.get(0);
		},		
	}).disableSelection();

	// resize
	//$(window).resize(onSize);
	
	/////////////////////////////////////////////////////////////////////////////
	// EDITOR
	/////////////////////////////////////////////////////////////////////////////
	$.extend(true, $.trumbowyg.langs, {
			fr: {
					align: 'Alignement',
					image: 'Image'
			}
	});
		var opts = {
			lang: 'en',
			fixedBtnPane: true,
			btnsGrps: {
					test: ['strong', 'em'] // Custom nammed group
			},
			btnsDef: {
					// Customizables dropdowns
					align: {
							dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
							ico: 'justifyLeft'
					},
					image: {
							dropdown: ['insertImage', 'upload'],//, 'base64', 'noembed'],
							ico: 'insertImage'
					},
					//createTable: {
					//	ico: 'createTable',
					//}
			},
			btns: [
					//['createTable'],
					['bold', 'italic', 'underline'],//, 'strikethrough'],
					['formatting'],
					['align'],
					['unorderedList', 'orderedList'],
					//['superscript', 'subscript'],
					['link'],
					['image'],
					['foreColor', 'backColor'],
					['preformatted'],
					['horizontalRule'],
					['removeformat'],
					['viewHTML'],
//					['fullscreen', 'close']
          //['undo', 'redo'],
					['script', 'style'],
			],
			autogrow: true,
	};	

	$('.editor').trumbowyg(
		opts
	);
	
	
	// combobox
	$('.profile_combobox').combobox();
	$('.assessment_combobox').combobox();
	
	// combobox event
	$('#cb_profile_activity input')
		.on("autocompleteselect", function(event, ui){
			//console.debug(label);
			var label = ui.item.label;
			switch (label){
				case 'OCL-X':
					$('#cb_exp_name_olcx').show();
					$('#cb_exp_name_yolox').hide();
					$('#cb_exp_name_olcx input').val($('#cb_exp_name_olcx select option')[0].text);
					showProfileDesc(1);
					break;
				case 'YOLO-X':
					$('#cb_exp_name_olcx').hide();
					$('#cb_exp_name_yolox').show();
					$('#cb_exp_name_yolox input').val($('#cb_exp_name_yolox select option')[0].text);
					showProfileDesc(4);
					break;
			}
		});
		
	$('#cb_exp_name_olcx input')
		.on("autocompleteselect", function(event, ui){
			var value = parseInt(ui.item.option.value);
			showProfileDesc(value);
		});

	$('#cb_exp_name_yolox input')
		.on("autocompleteselect", function(event, ui){
			var value = parseInt(ui.item.option.value);
			showProfileDesc(value);
		});
		
	showProfileDesc(1);
	
	// spinner
	$('.assessment_spinner').spinner();
	$('.datatable').DataTable();
 
	// calender
	$.datetimepicker.setLocale('en');
	$('.assessment_datetime').datetimepicker();                	
	
	setBalloonNumber('todolist', 3);
	setBalloonNumber('notice', 3);
	setBalloonNumber('msg', 5);
	
	// TABS
	$("#tabs").tabs({
		//active: starttab,
		activate: function(event, ui){
			//console.debug('activate');
			$('.dropmenu, .ocla_page').hide();
			var jobj = ui.newTab.find('a');
			var tab = jobj.attr('href');
			switch (tab){
				
				case '#tabs-4a':
					$('#tabs-4a').show();
					break;
					
				case '#tabs-5a':
					$('#tabs-5a').show();
					break;
			}
		}
	});
	
	$('#tabs a')
		.hover(function(){
				
			var jobj = $(this);
			var tab = jobj.attr('href');
			//console.debug(tab);
			switch (tab){
				
				case '#tabs-4a':
					openDropmenu(jobj, 'ocla');
					//event.stopPropagation();
					break;

				case '#tabs-5a':
					openDropmenu(jobj, 'yolox');
					//event.stopPropagation();
					break;
					
				case '#tabs-1':
				case '#tabs-2':
				case '#tabs-3':
				case '#tabs-5':
					closeDropmenu();
					break;
			}
		})
	;
	// dropmenu
	$('.dropmenu').menu().hide();
	$('#dropmenu_ocla a, #dropmenu_yolox a').click(function(e){
		var jobj = $(this);
		var id = jobj.attr('href');
		var tab_num = id.substring(6, 7);
		switch (tab_num){
			
			case '4':
				$("#tabs").tabs("option", "active", TAB_OCLX);
				break;
				
			case '5':
				$("#tabs").tabs("option", "active", TAB_YOLOX);
				break;
		}
		//console.debug(id, num);
		
		$('.ui-tabs-panel').hide();
		$('.ocla_page').hide();
		setTimeout(function(){$(id).show();}, 50);	// just after all the page are hidden
	});	
	
	// autogrow
	// http://www.technoreply.com/autogrow-textarea-plugin-3-0/
	$('.ta_question').autoGrow();
	
	$('.but_trash').button({
		text: false,
		icons: {	primary: "ui-icon-trash"}
	}).mouseup(function(){	// work for mobile too
		onDelete(this);
	});
	
	
	
	// start page
	$('.ocla_page').hide();
	$("#tabs").tabs("option", "active", TAB_HOME);

	// show pages
	$('#tbl_root').show();
	var url = window.location.href;
	if (url.indexOf('yolofolio.cetl.hku.hk' ) >= 0){
		return;
	}
	
	///////////////////////
	// TESTING
	///////////////////////
	// show tab
	//$('.ui-tabs-panel').hide();
	//$('.ocla_page').hide();
	//$("#tabs").tabs("option", "active", TAB_PROFILE);
	//$("#tabs").tabs("option", "active", TAB_OCLX);
	//$("#tabs").tabs("option", "active", TAB_YOLOX);
	//$('.ocla_page').hide(); $('#tabs-4b').show();
	$("#tabs").tabs("option", "active", TAB_OCLX);
	//toggleDetails($('.details_button')[5]);
	
	
}

/////////////////////////////////////////////////////////////////////////////////////

function onDelete(but){
	//if (confirm('Are you sure to delete this?')){
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:180,
      modal: true,
      buttons: {
        "Yes": function() {
          $( this ).dialog( "close" );
					
					var jbut = $(but),
							jtd = jbut.parent(),
							jtr = jtd.parent(),
							jtbody = jtr.parent(),
							jtrs = jtbody.find('tr'),
							length = jtrs.length,
							index = jtrs.index(jtr)
					;
					//console.debug(index, length);
					if (index == length - 1){
						jtr.find('textarea').val('').css('height', '');
						jtr.find('div.autogrow-textarea-mirror').html('');
					} else {
						jtr.remove();
					}

					$('.div_details').each(function(){
						var num = 1;
						$(this).find('.assessment_num').each(function(){
							$(this).text((num++) + '.');
						});
						var code = 65; // begin from A
						$(this).find('.mcq_letter').each(function(){
							$(this).text(String.fromCharCode(code++) + '.');
						});
					});
				
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });		
		
	//}
}

//////////////////////////////////////////////////////////////////////

//function onSize(){
//}

//////////////////////////////////////////////////////////////////////
 
 function setBalloonNumber(name, num){
	var jobj = $('#topmenu_'+name), jballoon = jobj.find('.balloon'), jtext = jobj.find('.balloon2');
	if (num){
		if (num > 99){
			num = 99;
		}
		var offset = jobj.offset(), x = offset.left, y = offset.top, w = jobj.width(), w1 = num.toString().lenth*10;
		jtext.text(num);
		jballoon.show();
	} else {
		jballoon.hide();
	}
 }

//////////////////////////////////////////////////////////////////////
 
 function openDropmenu(obj, menu){
	//console.debug('openDropmenu', menu);
	var jobj = $(obj), jmenu = $("#dropmenu_" + menu);
	var offset = jobj.offset(),
		y = offset.top + jobj.height() + 11,
		x = offset.left
	;
	
	var display = jmenu.css('display');
	if (display == 'none')
	{
		$('.dropmenu').hide();
		jmenu.show().offset({left:x, top:y}).hide();
		//jmenu.show().hide();
		jmenu.fadeIn('swing');
		//jmenu.show();
		//console.debug(jmenu[0].outerHTML);
	} else {
		//jmenu.show();
	}
 }

//////////////////////////////////////////////////////////////////////
 
function closeDropmenu(){
	//console.trace('closeDropMenu')
	$('.dropmenu').hide();
		//$('.dropmenu, .ocla_page').hide();
}

//////////////////////////////////////////////////////////////////////
 
function toggleDropmenu(obj, menu){
	var jobj = $(obj), jmenu = $("#dropmenu_"+menu);
	if (jmenu.css('display') != 'none'){
		console.debug('toggleDropMenu', 'close');
		jmenu.hide();
	} else {
		console.debug('toggleDropMenu', 'open');
		openDropmenu(obj, menu);
	}
}

//////////////////////////////////////////////////////////////////////
 
function toggleDetails(obj){
	var jobj = $(obj);
	var jtr = jobj.parent().parent().next();
	jtr.find('div.div_details').slideToggle('swing');	// must be with div
}

//////////////////////////////////////////////////////////////////////
 
function toggleAddExp(){
	$("#div_add_exp").slideToggle('swing');	// must be with div
}

//////////////////////////////////////////////////////////////////////
 
function togglePage(name){
	var display = $(name).css('display') != 'none';
	if (display){
		//$(name).slideToggle();
	} else {
		$('.display_page').hide();
	}
	//$(name).slideToggle();
	$(name).css('display', display?'none':'block');
}

///////////////////////////////////////////////////////////////////////

function showProfileDesc(value){
	$('#div_profile_desc').html(g_profile_desc_arr[value]);
	$('#addexp_priv1').prop('checked', true);
}
