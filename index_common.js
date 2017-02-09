
//////////////////////////////////////////////////////////////////////
// jQuery
jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

//////////////////////////////////////////////////////////////////////
// list all events
var list_all_events = 0;
if (list_all_events){
	var oldJQueryEventTrigger = jQuery.event.trigger;
	jQuery.event.trigger = function( event, data, elem, onlyHandlers ) { 
		console.log( event, data, elem, onlyHandlers ); 
		oldJQueryEventTrigger( event, data, elem, onlyHandlers ); 
	}
}

//////////////////////////////////////////////////////////////////////

var g_editor_opts = {
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
					dropdown: ['insertImage', 'noembed', 'upload'],//, 'base64'],
					ico: 'insertImage'
			},
			//createTable: {
			//	ico: 'createTable',
			//}
	},
	btns: [
//		['createTable'],
			['bold', 'italic', 'underline'],//, 'strikethrough'],
			['formatting'],
			['align'],
			['unorderedList', 'orderedList'],
//		['superscript', 'subscript'],
			['link'],
			['image'],
			['foreColor', 'backColor'],
// 		['preformatted'],
			['horizontalRule'],
			['removeformat'],
			['viewHTML'],
//		['fullscreen', 'close']
			//['undo', 'redo'],
			['script', 'style'],
	],
	autogrow: true,
};

/////////////////////////////////////////////////////////////////

function drawSvg(jobj){
	jobj.each(function(){
		var jobj = $(this),
			svg = jobj.attr('svg'),
			html = svg_obj[svg],
			jhtml = $(html);
		var svgfill = jobj.attr('svgfill'),
				svgsize = jobj.attr('svgsize'),
				svgback = jobj.attr('svgback')
		;
		jhtml
			.find('path,ellipse,circle,polygon')
			.attr('fill', svgfill ? svgfill : '#ffffff')
		;
		if (svgsize){
			jhtml.width(svgsize).height(svgsize)
		}
		if (svgback){
			jobj.css('background-color', svgback);
		}
		jobj.find('svg').remove();
		jobj.prepend(jhtml);
		//console.debug(jobj.outerHTML());
	});
}

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

///////////////////////////////////////////////////////////////////////////

var HIGHLIGHT_BORDER = 2,
		HIGHLIGHT_COLOR0 = 'rgba(0,0,0,0.2)'
		HIGHLIGHT_COLOR1 = 'red';
;
jQuery.fn.highlight = function (bOn){
	if (typeof(bOn) == 'undefined'){
		bOn = 1;	// default
	}
	var offset = this.offset(), w = this.width(), h = this.height(), val = this.attr('highlight');
	if (!offset){
		debugger;
	}
	if (bOn && val != 1){
		// TYPE 2 ON
		this.css('border', HIGHLIGHT_BORDER+'px solid ' + HIGHLIGHT_COLOR1)
		;
	} else {
		this.css('border', HIGHLIGHT_BORDER+'px solid ' + HIGHLIGHT_COLOR0)
	}
	return this;
}

///////////////////////////////////////////////////////////////////////////

function setCookie(cname, cvalue, exdays){
	//console.debug('setCookie', cname, cvalue);
	var d = new Date();
	if (!exdays){
		exdays = 365;
	}
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

///////////////////////////////////////////////////////////////////////////
	
function getCookie(cname, defaultValue){
	var name = cname + "=";
	var value = null;
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		//console.debug(c);
		while (c.charAt(0)==' '){
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			value = c.substring(name.length, c.length);
			break;
		}
	}
	if (typeof(defaultValue)!='undefined' && (value == '' || value === null)){
		value = defaultValue;
		this.setCookie(cname, value);
	}
	return value;
}

///////////////////////////////////////////////////////////////////////////

function checkValid(arr){
	var err = 0, jobj = 0;
	arr.forEach(function(name){
		if (!err){
			jobj = $('#'+name),
					val = jobj.val().trim()
			;
			if (jobj.hasClass('nonempty') && val == ''){
				err = 'This field cannot be empty';
			} else if (jobj.hasClass('isemail')){
				if (val.indexOf('@') == -1){
					err = 'Your email must contain @';
				} else {
					var user = val.split('@')[0],
						domain = val.split('@')[1]
					;
					if (!user || !domain){
						err = 'Your email is invalid in format';
					}
				}
			}
		}
	});
	if (err){
		jobj.highlight(1);
		jobj.attr('title', err);
		
		// http://jsfiddle.net/tj_vantoll/kyBwU/
		jobj.tooltip({
			position: {
				my: 'left center',
				at: 'right+10 center',
				collision: 'none',
			},
			tooltipClass: 'right',
		}).tooltip('show');
		//jerr.text(err);
		
	} else {
		jobj.highlight(0);
	}
	return !err;
}

////////////////////////////////////////////////////////
// scroll to element 
// try to show the element in the middle of the screen
// http://gsgd.co.uk/sandbox/jquery/easing/
////////////////////////////////////////////////////////
var g_scrollingtop = 0;
function scroll2Element(jobj, onCompleted){
	if (g_scrollingtop){
		console.debug('skipped scroll2Element...')
		return;
	} else {
		g_scrollingtop = 1;
	}

	//console.debug('', jobj);
	var
		//nScreenW = eval(window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth),
		nScreenH = eval(window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight),
		nObjectY = jobj.offset().top,
		nObjectH = jobj.height(),
		nScrollTop = $(window).scrollTop(),
		top = nObjectY - (nScreenH - nObjectH) / 2
	;
	if (top < 0) top = 0;
	var upper = nObjectY - nScrollTop, lower = nScrollTop + nScreenH - (nObjectY + nObjectH) ;
	
	console.debug('scroll2Element', 'screenH='+nScreenH, 'y='+nObjectY, 'h='+nObjectH, 'scrolltop='+nScrollTop, 'top='+top, 'upper='+upper, 'lower='+lower);
	
	if (upper > 0 && lower > 100){
		//console.debug('skipped scrolling');
		onCompleted && onCompleted();
		g_scrollingtop = 0;
		
	} else {
		//if ($('.featherlight').is(':visible')){
		if (g_lightbox2){
			
			// case 1: popup
			$('.featherlight-content').animate({
					scrollTop: top,
				}, 1000, 'swing', function(){
					onCompleted && onCompleted();
					g_scrollingtop = 0;
				}
			);

		} else {
			
			// case 2: window
			//console.error('step 0: ' + $(window).scrollTop()); return;
			var final_val = top,
					initial_val = $(window).scrollTop(),
					diff = final_val - initial_val
			;
			$(window).animate({
						scrollTop: diff,	// assume it will read zero 
					},
					{
						duration: 1000,
						step: function(now, fx){
							$(window).scrollTop(initial_val + now);
						},
						complete: function(){
							onCompleted && onCompleted();
							g_scrollingtop = 0;
						}
					}
			);
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////

function uploadPhoto(jobj, user_id, act_id, img_id, onSuccess, onError){
	// http://stackoverflow.com/questions/23980733/jquery-ajax-file-upload-php
	// http://geniuscarrier.com/how-to-style-a-html-file-upload-button-in-pure-css/
	// uncomment in php.ini: always_populate_raw_post_data = -1 
	var file_data = jobj.prop('files')[0];   
	//if (!file_data){
		//console.debug('skip null file');
	//} else {
	if (file_data){
		var form_data = new FormData();                  
		form_data.append('type', 'ul_img');	// upload image
		form_data.append('user_id', user_id);
		form_data.append('act_id', act_id);
		form_data.append('img_id', img_id);
		form_data.append('file', file_data);
		console.debug('image uploading...', user_id, act_id, img_id, file_data);
		$.ajax({
			url: './svrop.php', // point to server-side PHP script 
			dataType: 'text',  	// what to expect back from the PHP script, if anything
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			type: 'post',
			success: function(resp){
				var bError = 0;
				//console.debug(resp);
				if (resp){
					try {
						resp = JSON.parse(resp);
						if (resp.error == ''){
							img_id = resp.img_id;
							console.debug('image upload success', 'img_id='+img_id); // display response from the PHP script, if any
							onSuccess & onSuccess(img_id);
						} else {
							bError = 1;
						}
					} catch(e){
						bError = 1;
						console.debug('Server error', resp);
						resp.error = 'Server error';
					}
					if (bError){
						console.error('image upload error', resp);
						onError & onError(resp);
						BootstrapDialog.show({
							type: BootstrapDialog.TYPE_DANGER,
							title: 'Error: Cannot upload image',
							closable: true,
							closeByBackdrop: true,
							closeByKeyboard: true,
							message: resp.error + '<br/><br/>Is the file invalid or too big?',
							buttons: [{
								label: 'Close',
								action: function(dialogRef){
									dialogRef.close();
								}
              }],
						});
					}
				}
				jobj.val('');	// reset the file contents
				//console.debug($("#input_file").val());
			}
		});
	}
}

/////////////////////////////////////////////////////////////////////////////

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/////////////////////////////////////////////////////////////////////////////

function getBrText(s){
	return s.replace(/(\r\n|\n|\r)/g, '<br />')
}

/////////////////////////////////////////////////////////////////////////////

function sortByNumber(a,b){
	return a - b;
}

/////////////////////////////////////////////////////////////////////////////

function strcmp ( str1, str2 ) {
	// http://kevin.vanzonneveld.net
	// +   original by: Waldo Malqui Silva
	// +      input by: Steve Hilder
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +    revised by: gorthaur
	// *     example 1: strcmp( 'waldo', 'owald' );
	// *     returns 1: 1
	// *     example 2: strcmp( 'owald', 'waldo' );
	// *     returns 2: -1

	return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function sortByDate(a, b){
	if (a.end){
		if (a.end == sPresent && b.end != sPresent){
			return 1;
		} else if (a.end != sPresent && b.end == sPresent){
			return -1;
		}
	}
	// both present or both not present
	if (a.start){
		return strcmp(a.start, b.start);	
	} else if (a.date){
		return strcmp(a.date, b.date);	
	} else {
		return 0;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function jsonclone(obj){
	return JSON.parse(JSON.stringify(obj));
}


/////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects
// simpleRecusiveDeepEqual
/////////////////////////////////////////////////////////////////////////////
/** Recursively check if both objects are equal in value
***
*** This function is designed to use multiple methods from most probable 
*** (and in most cases) valid, to the more regid and complex method.
***
*** One of the main principles behind the various check is that while
*** some of the simpler checks such as == or JSON may cause false negatives,
*** they do not cause false positives. As such they can be safely run first.
***
*** # !Important Note:
*** as this function is designed for simplified deep equal checks it is not designed
*** for the following
***
*** - Class equality, (ClassA().a = 1) maybe valid to (ClassB().b = 1)
*** - Inherited values, this actually ignores them
*** - Values being strictly equal, "1" is equal to 1 (see the basic equality check on this)
*** - Performance across all cases. This is designed for high performance on the
***   most probable cases of == / JSON equality. Consider bench testing, if you have
***   more 'complex' requirments
***
*** @param  objA : First object to compare
*** @param  objB : 2nd object to compare
*** @param  .... : Any other objects to compare
***
*** @returns true if all equals, or false if invalid
***
*** @license Copyright by eugene@picoded.com, 2012.
***          Licensed under the MIT license: http://opensource.org/licenses/MIT
**/

function deepequal(objA, objB) {
	// Multiple comparision check
	//--------------------------------------------
	var args = Array.prototype.slice.call(arguments);
	if (args.length > 2) {
		for (var a = 1; a < args.length; ++a) {
			if (!deepequal(args[a-1], args[a])) {
				return false;
			}
		}
		return true;
	} else if(args.length < 2) {
		throw "deepequal, requires at least 2 arguments";
	}
	
	// basic equality check,
	//--------------------------------------------
	// if this succed the 2 basic values is equal,
	// such as numbers and string.
	//
	// or its actually the same object pointer. Bam
	//
	// Note that if string and number strictly equal is required
	// change the equality from ==, to ===
	//
	if (objA == objB){
		return true;
	}
	
	// If a value is a bsic type, and failed above. This fails
	var basicTypes = ["boolean", "number", "string"];
	if (basicTypes.indexOf(typeof objA) >= 0 || basicTypes.indexOf(typeof objB) >= 0 ) {
		return false;
	}
	
	// JSON equality check,
	//--------------------------------------------
	// this can fail, if the JSON stringify the objects in the wrong order
	// for example the following may fail, due to different string order:
	//
	// JSON.stringify( {a:1, b:2} ) == JSON.stringify( {b:2, a:1} )
	//
	if (JSON.stringify(objA) == JSON.stringify(objB)) {
		return true;
	}
	
	// Array equality check
	//--------------------------------------------
	// This is performed prior to iteration check,
	// Without this check the following would have been considered valid
	//
	// deepequal( { 0:1963 }, [1963] );
	//
	// Note that u may remove this segment if this is what is intended
	//
	if( Array.isArray(objA) ) {
		//objA is array, objB is not an array
		if( !Array.isArray(objB) ) {
			return false;
		}
	} else if( Array.isArray(objB) ) {
		//objA is not array, objB is an array
		return false;
	}
	
	// Nested values iteration
	//--------------------------------------------
	// Scan and iterate all the nested values, and check for non equal values recusively
	//
	// Note that this does not check against null equality, remove the various "!= null"
	// if this is required
	
	var i; //reuse var to iterate
	
	// Check objA values against objB
	for (i in objA) {
		//Protect against inherited properties
		if(objA.hasOwnProperty(i)) {
			if(objB.hasOwnProperty(i)) {
				// Check if deep equal is valid
				if(!deepequal( objA[i], objB[i] )) {
					console.debug('unequal item', i, objA[i], objB[i]);
					return false;
				}
			} else if(objA[i] != null) {
				//ignore null values in objA, that objB does not have
				//else fails
				console.debug('unequal nullness1', i, objA[i], objB[i]);
				return false;
			}
		}
	}
	
	// Check if objB has additional values, that objA do not, fail if so
	for (i in objB) {
		if(objB.hasOwnProperty(i)) {
			if(objB[i] != null && !objA.hasOwnProperty(i)) {
				//ignore null values in objB, that objA does not have
				//else fails
				console.debug('unequal nullness2', i, objA[i], objB[i]);
				return false;
			}
		}
	}
	
	// End of all checks
	//--------------------------------------------
	// By reaching here, all iteration scans have been done.
	// and should have returned false if it failed
	return true;
}
/*
// Sanity checking of simpleRecusiveDeepEqual
(function() {
	if(
		// Basic checks
		!deepequal({}, {}) ||
		!deepequal([], []) ||
		!deepequal(['a'], ['a']) ||
		// Not strict checks
		!deepequal("1", 1) ||
		// Multiple objects check
		!deepequal( { a:[1,2] }, { a:[1,2] }, { a:[1,2] } ) ||
		// Ensure distinction between array and object (the following should fail)
		deepequal( [1963], { 0:1963 } ) ||
		// Null strict checks
		deepequal( 0, null ) ||
		deepequal( "", null ) ||
		// Last "false" exists to make the various check above easy to comment in/out
		false
	) {
		alert("FATAL ERROR: deepequal failed basic checks");
	} else { 
		//added this last line, for SO snippet alert on success
		alert("deepequal: Passed all checks, Yays!");
	}
})();
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checkLoseInput(msg, onConfirm){
	var bSuspended = 0;
	//if (g_checkinglostinput) return false;
	//g_checkinglostinput = 1;
	///toggle(true);	// closeall the editables

	var editing_doc = 0;
	if (g_saved_assessment_view){			// for viewing
		var
		 editing = getAssessmentInput(),
		 equal = deepequal(g_saved_assessment_view, editing)
		;
		if (!equal){
			editing_doc = 'assessment';
		}
	} else if (g_saved_assessment_edit){	// for editing
		if ($('.editable-open').length){
			editing_doc = 'assessment';
		} else {
			var 
				editing = getEditAssessment(),
				equal = deepequal(g_saved_assessment_edit, editing)
			;
			//console.debug('saved', g_saved_assessment_edit); console.debug('editing', editing); console.debug('equal', equal?1:0);
			if (!equal){
				editing_doc = 'assessment';
			}
		}
	} else if (g_saved_activity){
		if ($('.editable-open').length){
			editing_doc = 'activity';
		} else {
			var editing = getEditActivity(), equal = deepequal(g_saved_activity, editing);
			//console.debug('saved', g_saved_activity); console.debug('editing', editing);  console.debug('equal', equal?1:0);
			if (!equal){
				editing_doc = 'activity';
			}
		}
	}
	//editing_doc = 'test';
	if (editing_doc){
		msg = 'Are you sure you want to ' + msg + ' on the editing ' + editing_doc + '?';
		if (onConfirm){
			confirmDialog(msg, function(){
					g_checkinglostinput = 0;
					g_saved_assessment_view = 0;
					g_saved_assessment_edit = 0;
					g_saved_activity = 0;
					onConfirm && onConfirm();
				},
				function(){
					g_checkinglostinput = 0;
				}
			);
			bSuspended = 1;
		}
	} else {
		//onSuccess && onSuccess();
		//g_checkinglostinput = 0;
		g_checkinglostinput = 0;

	}

	return bSuspended;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUserPosition(user){
	return user.position ? user.position.split(',').length?user.position.split(',')[0]:user.position : '';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function capitalizeWords(s){
	if (s && s.length){
		s = s.substring(0, 1).toUpperCase() + s.substring(1);
	}
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getImgUrl(img_id, type){
	return img_id ? './svrop.php?type=dl_img&img_id=' + img_id + '&d=' + getDateString2() : './images/new_' + type + '.png';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateImgPhoto(jobj, img_id, type){

	var url = getImgUrl(img_id, type);
	jobj
		.css('visibility', 'hidden')
		.unbind()
		.load(function(){
			$(this).css('visibility', 'visible')
		})	
		.attr('img_id', img_id)
		.attr('src', url)
	;
}

//////////////////////////////////////////////////////////////////////////////////

function createUserList(jdiv, users, title){
	jdiv.empty();
	if (title){
		jdiv.append('<div class="tbl_user_list_title">' + title + '</div>');
	}
	// loop thru all the users
	for (var i in users){
		var user = users[i];
		var s = '<table class="tbl_user_list">';
		s +=			'<tr>' +
								'<td rowspan="2">' +
									'<img class="ntwk_user_photo" img_id="' + user.img_id + '"/>' +
								'</td>' +
								'<td class="ntwk_desc">' +
									'<div onclick="openUserPage(' + user.user_id + ')">' + user.username + '</div>';
		if (user.position){
			s += '<div>' + user.position + '</div>';
		}
		if (user.location){
			s += '<div>' + user.location  + '</div>';
		}
		s +=
								'</td>'
							'</tr>' +
						'</table>';
		jdiv.append(s);
	}
	jdiv.find('img.ntwk_user_photo').each(function(){
		updateImgPhoto($(this), $(this).attr('img_id'), 'user');
	});	
}

////////////////////////////////////////////////////////////////////////////////////////

function getSkillByName(skills, name){
	return skills[name];
}

////////////////////////////////////////////////////////////////////////////////////////

function getUserByID(users, user_id){
	var user = 0;
	if (users){
		if ($.isArray(users)){
			for (var index in users){
				var user2 = users[index];
				if (typeof(user2) == 'object' && user2.user_id == user_id){
					user = user2;
					break;
				} else if (user2 == user_id){
					user = user2;
					break;
				}
			}
		} else if (users[user_id]){
			user = users[user_id];
		}
	}
	return user;
}

///////////////////////////////////////////////////////////////////////////////////////////

function addUserIdToObj(obj, user_id){
	if (typeof(user_id) == 'object'){
		for (var key in user_id){
			addUserIdToObj(user_id[key]);
		}
	}
	if (!isNaN(user_id)){
		obj[user_id] = true;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////

function getMarkedPercent(unmarked, marked){
	var percent = !unmarked && marked ? 100 : parseInt(100 * marked / (marked + unmarked));
	if (percent < 100){
		percent = '<span style="color:red">' + percent + '%</span>';
	} else {
		percent += '%';
	}
	return percent;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setpeerassessment2:
// using datatable, double featherlight
// https://editor.datatables.net/examples/api/checkbox.html
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_lightbox2 = 0;

function setPeerAssessment2(jparent, root_panelists, user_panelists, bEditable, act_id, ass_id){
	console.debug('setPeerAssessment2');
	//console.debug(panelists);
	var
		activity = g_curr_activity
		,participants = g_curr_participants
	;
	if (root_panelists.peers == 0){
		//jparent.html(
		//	'<span class="subsection_header">Peer Assessors</span>' +
		//	'<div class="td_indent">No peer assessor is required</div>'
		//);
		return;
	}
	// CHECK IF PEERS ARE MORE THAN PARTICIPANTS
	var peers = parseInt(root_panelists.peers);
	if (peers > participants.length){
		peers = participants.length;
	}
	// SHOW THE FIRST TABLE
	jparent.empty();
	jparent.append($('#div_peer_assessment2').html());
	jparent.find('.span_participants').text(participants.length);
	jparent.find('.span_peers').text(peers);
	if (!bEditable){
		jparent.find('button').hide();
	}
	var jtbl1 = jparent.find('.my_datatable');
	
	// testing
	//panelists.peer_assessors = [2,3,4];
	if (user_panelists){
		
		actpage_addUsers(user_panelists.peer_assessors, jtbl1, 0, function(users){

			//jtbl1.show();

			// construct the popup table for the select button
			jparent.find('button').click(function(){
				console.debug('select peer assessors');

				// unselected (participants) = participants - panelists
				var my_assessors = getMyAssessors(activity.coordinator_id, g_user_id, root_panelists, 0);
				var unselected = [];

				// loop for each participant
				for (var i in participants){
					var
						participant = participants[i],
						user_id = participant.user_id
						bFound = 0;
					;
					// check if it is already in panelist
					for (var j in my_assessors){
						var
							my_panelist = my_assessors[j],
							user_id2 = my_panelist.user_id
						;
						if (user_id2 == user_id){
							bFound = 1;
							break;
						}
					}
					if (!bFound){
						unselected.push(user_id);
					}
				}

				var jdiv2 = $('<div/>');
				jdiv2.append($('#div_peer_assessment3').html());
				jdiv2.find('.span_participants').text(participants.length);
				jdiv2.find('.span_peers').text(peers);

				//jdiv2.find('input[type=checkbox]').uniform();
				g_lightbox2 = $.featherlight(jdiv2, {
					afterClose: function(){
						return false;
					},
					afterContent: function(){

						// LIGHTBOX
						var jdiv3 = this.$content;

						// FIND THE SELECTED OBJ
						var selected = {};
						if (user_panelists.peer_assessors){
							for (var i in user_panelists.peer_assessors){
								var user_id = user_panelists.peer_assessors[i];
								selected[user_id] = 1;
							}
						}

						// BUILD UP THE SECOND POPUP TABLE
						var jtbl3 = jdiv3.find('.my_datatable').css('visibility', 'hidden');
						actpage_addUsers(unselected, jtbl3, selected, function(users){

							console.debug('add peer assessors');
							jtbl3.css('visibility', 'visible');
							jtbl3.find('input[type=checkbox]').css('zoom', 1.5);
							// BUTTONS
							jdiv3.find('.btn_selectall').click(function(){
								jdiv3.find('input[type=checkbox]').prop('checked', true);
							});
							jdiv3.find('.btn_clear').click(function(){
								jdiv3.find('input[type=checkbox]').prop('checked', false);
							});
							jdiv3.find('.btn_cancel').click(function(){
								g_lightbox2.close();
							});
							jdiv3.find('.btn_submit').click(function(){
								// FIND THE SELECTED ARRAY
								var selected = [];
								var dt = jtbl3.DataTable();
								dt.$("input:checked", {"page": "all"}).each(function(index, elem){	// row collection
									var	jobj = $(elem),
										jtr = jobj.closest('tr')
										row = dt.row( jtr ),
										data = row.data();
										user_id = parseInt(data[data.length - 1])
									;
									selected.push(user_id);
								});
								if (selected.length != peers){
									jdiv3.find('.div_error_msg')
										.html(selected.length + ' selected. Please select exactly ' + peers + '.');
								} else {
									// handle the selected array
									//console.debug(selected);
									user_panelists.peer_assessors = selected;
									// PUT THE FINISH ARRAY BACK TO THE FIRST TABLE
									actpage_addUsers(user_panelists.peer_assessors, jtbl1, 0, function(users){
										g_lightbox2.close();
										// SAVE THE RESULT TO THE DATABASE
										call_svrop(
											{
												type: 'save_peerassessors',
												user_id: g_user_id,
												act_id: act_id,
												ass_id: ass_id,	// if=0, impression
												selected: selected,
											},
											function (obj){
												console.debug(obj);
											}
										)
									});
								}
							});
						});
					},
				});

			});
		});
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getCompletedByID(assessment, name, assr_id){
	var completed = 0;
	if (assessment && assessment[name] && assessment[name][assr_id]){
		completed = assessment[name][assr_id];
	}
	return getCompleted(completed);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
	
function getCompleted(completed){
	if (completed < 100){
		 completed = '<span style="color:red">' + completed + '%</span>';
	} else {
		 completed += '%';
	}
	return completed;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function setCompletedByID(assessment, name, assr_id, completed){
	if (!assessment[name]){
		assessment[name] = {};
	}	
	assessment[name][assr_id] = completed;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getObjCount(obj){
	return Object.keys(obj).length;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function isActClosed(activity){
	var closed = 0;
	if (g_server_time < activity.start || g_server_time > activity.end){
		closed = 1;
	}
	return closed;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getStarRating(score){
	return '<!--' + score + '--><div class="star_rating" data-rating="' + score + '"></div>';
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getActivityByID(activities, act_id){
	var activity = 0;
	for (var i in activities){
		var activity2 = activities[i];
		if (activity2.act_id == act_id){
			activity = activity2;
			break;
		}
	}
	return activity;
}

///////////////////////////////////////////////////////////////////////////////////////

function hash2numArr(hasharr){
	var numarr = [];
	for (var key in hasharr){
		numarr.push(key);
	}
	numarr.sort(sortByNumber);
	return numarr;
}

///////////////////////////////////////////////////////////////////////////////////////

function num2hashArr(numarr){
	var hasharr = {};
	for (var index in numarr){
		var value = numarr[index];
		hasharr[value] = 1;
	}
	return hasharr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////

function getUserImgSrc(img_id){
	return img_id ? image_url + img_id + '&d=' + getDateString2() : './images/new_user.png';
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getActImgSrc(img_id){
	return img_id ? image_url + img_id + '&d=' + getDateString2() : './images/new_activity.png';
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getImgUserName(user_id, users){
	if (typeof(user_id) == 'object'){
		user = user_id;
		user_id = user.user_id;
	} else {
		user = getUserByID(users, user_id);
	}
	if (user){
		var username = user.username ? user.username : user.email ? user.email : '';
		return '<!--' + username + '--><span class="imgusername" onclick="openUserPage(' + user_id + ')"><img class="person_photo" src="' + getUserImgSrc(user.img_id) + '"/> ' + username + '</span>';
	} else {
		return user_id;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getUserStat(user){
	var obj = {
		coordinated: 0,
		assessed: 0,
		participated: 0,
	};
	for (var i in user.profile.activity){
		var uact = user.profile.activity[i];
		if (uact.uact_coordinator){
			obj.coordinated++;
		}
		if (uact.uact_assessor){
			obj.assessed++;
		}
		if (uact.uact_participant){
			obj.participated++;
		}
	}
	return obj;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function updateMyUserStat(){
	var obj = getUserStat(g_user);
	g_user.participated = obj.participated;
	g_user.assessed = obj.assessed;
	g_user.coordinated = obj.coordinated;
	$('.stat_network1, .stat_network2').text(g_user.network);
	$('.stat_participated1, .stat_participated2').text(g_user.participated);
	$('.stat_assessed1, .stat_assessed2').text(g_user.assessed);
	$('.stat_coordinated1, .stat_coordinated2').text(g_user.coordinated);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var g_os = '';
var g_nScreenW = 0, g_nScreenH = 0;

function getHardwareSpec(){
	//alert('initAll');
	g_os = platform.os.toString();
	if (typeof(g_platform) == 'undefined' || !g_platform){
		if (g_os.indexOf('iOS')>=0){
			g_platform = 'ios';
		} else if (g_os.indexOf('Android')>=0){
			g_platform = 'android';
		} else {
			g_platform = '';
		}
	}
	g_nScreenW = eval(window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth);
	g_nScreenH = eval(window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight);
	//alert(g_os+'\r\n'+g_platform+'\r\n'+g_nScreenW+'x'+g_nScreenH);
}

///////////////////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/questions/5937339/ipad-safari-make-keyboard-disappear
///////////////////////////////////////////////////////////////////////////////////////////

function hideKeyboard(jobj){
	document.activeElement.blur();
	$("input").blur();
	//console.debug(jobj);
	//jobj.focus();
	//alert(1);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// http://xdsoft.net/jqplugins/datetimepicker/
//////////////////////////////////////////////////////////////////////////////////////////////////////

var g_datetimepicker_opts =	{
	format: 'Y-m-d H:i',
	//className: 'my_datetimepicker',
};
function setDateTimePicker(selector, bDisable){
	var jobj = typeof(selector) == 'string' ? $(selector) : selector;
	var opts = jsonclone(g_datetimepicker_opts);
	opts.onSelectTime = function(){
		console.debug('time');
	};
	opts.onShow = function (){
		var jobj2 = $(this);
		jobj2.css({
			'margin-left': 0,
		});
		setTimeout(function () {
			//console.debug('onShow', jobj2);
			jobj2.css({
				'margin-left': 80,
			});
		}, 10);
	};
	if (bDisable){
	//	opts.timepicker = false;
	//	opts.datepicker = false;
		opts.onGenerate = function( ct ){
			$(this).find('.xdsoft_date, .xdsoft_time')
				.addClass('xdsoft_disabled');
		};
		jobj
			.find('.event_datetime')
			.prop('disabled', true)
		;
	}
	jobj
		.find('.event_datetime')
		.datetimepicker(opts)
		.focus(function(){
		//	$(this).select();
			//hideKeyboard(jobj);
			$(this).blur();
		})
		.change(function(){
			//console.debug(this);
			var jstart = $(this);
			if (jstart.hasClass('start_datetime')){
				var jend = jstart.closest('tr').find('.end_datetime');
				var start = jstart.val(), end = jend.val();
				console.debug(start, end);
				if (end < start){
					jend.val(start);
				}
			}
		});		
}

//////////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/questions/822452/strip-html-from-text-javascript

function stripHtmlTags(html){
   var tmp = document.implementation.createHTMLDocument("New").body;
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// check with server
function getUsersFromDB(users, onComplete){

	if (!users || !users.length){
		console.info('getUserFromDB no users');
		onComplete && onComplete([]);
	} else {
		// is it an array of objects
		if (typeof(users[0]) == 'object'){
			var users2 = [];
			for (var i in users){
				users2.push(users[i].user_id);
			}
			users = users2;
		}
		if (users.length){
			call_svrop(
				{
					type: 'check_users',
					users: users,
				},
				function (obj){
					console.debug(obj.users);
					onComplete && onComplete(obj.users);
				}
			);
		}
	}
}


///////////////////////////////////////////////////////////////////////////////////////////

function getMyAssessors(coor_id, my_user_id, ass_panelists, uass_panelists){
	var	assessors = {};
	// add coordinator
	if (ass_panelists){
		if (ass_panelists.coordinator == 1){
			addUserIdToObj(assessors, coor_id);
		}
		// add self
		if (ass_panelists.self == 1){
			addUserIdToObj(assessors, my_user_id);
		}
		// add others
		if (ass_panelists.others != '0'){
			for (var index in ass_panelists.others){
				addUserIdToObj(assessors, ass_panelists.others[index]);
			}
		}
		// add uact's peers
		if (ass_panelists.peers != '0' && uass_panelists && uass_panelists.peer_assessors){
			var peers = uass_panelists.peer_assessors;
			for (var index in peers){
				addUserIdToObj(assessors, peers[index]);
			}
		}
	}
	// reallocate from an object to an array
	var assessors2 = [];
	for (var key in assessors){
		assessors2.push(parseInt(key));
	}
	// sort by number
	assessors2.sort(sortByNumber);
	return assessors2;
}

///////////////////////////////////////////////////////////////////////////////////////////

function getMyAssessees(coord_id, my_user_id, participants, ass_panelists, uass_panelists){
	var	assessees = {};
	// add coordinator
	if (ass_panelists){
		//if (ass_panelists.coordinator == 1){
		//	addUserIdToObj(assessees, coor_id);
		//}
		// add self
		if (ass_panelists.self == 1){
			addUserIdToObj(assessees, my_user_id);
		}
		// add others
		if (ass_panelists.others != '0'){
			for (var index in ass_panelists.others){
				var user_id = ass_panelists.others[index];
				if (user_id == my_user_id){
					// one of the assessors, add all the participants
					for (var j in participants){
						var user_id2 = partcipants[j];
						addUserIdToObj(assessees, user_id2);
					}					
				}
			}
		}
		// add uact's peers
		if (ass_panelists.peers != '0' && uass_panelists && uass_panelists.peer_assessees){
			var peers = uass_panelists.peer_assessees;
			for (var index in peers){
				addUserIdToObj(assessees, peers[index]);
			}
		}
	}
	// reallocate from an object to an array
	var assessees2 = [];
	for (var key in assessees){
		assessees2.push(parseInt(key));
	}
	// sort by number
	assessees2.sort(sortByNumber);
	return assessees2;
}

///////////////////////////////////////////////////////////////////////////////////
// progress
///////////////////////////////////////////////////////////////////////////////////

function initProgress(){
	//NProgress.configure({
	//	template: $('.splash.card').html(),
	//});
}
function openProgress(){
	//NProgress.start();
	waitingDialog.show('Processing...');	// https://github.com/ehpc/bootstrap-waitingfor
}
function closeProgress(){
	//NProgress.stop();
	waitingDialog.hide();
}

/////////////////////////////////////////////////////////////////////////
// dialog
/////////////////////////////////////////////////////////////////////////

function confirmDialog(msg, onOkay, onCancel){
	BootstrapDialog.confirm({
		//animate: false,
		type: BootstrapDialog.TYPE_WARNING,
		title: 'Warning',
		closable: true,
		closeByBackdrop: true,
		closeByKeyboard: true,
		message: msg,
		onshown: function(){
			$('.bootstrap-dialog .btn-default').focus();	// set the focus					
		},
		callback: function(result) {
			if (result)	{
				onOkay && onOkay();
			} else {
				onCancel && onCancel();
			}
		},
	});
}

/////////////////////////////////////////////////////////////////////////

function notifyDialog(msg){
	BootstrapDialog.show({
		//animate: false,
		type: BootstrapDialog.TYPE_SUCCESS,
		title: 'Information',
		closable: true,
		closeByBackdrop: true,
		closeByKeyboard: true,
		message: msg,
		onshown: function(){
			$('.bootstrap-dialog .btn-default').focus();	// set the focus					
		},
		buttons: [
			{
				label: 'Close',
				action: function(dialog){
						dialog.close();
				}
			}		
		]
	});
}

///////////////////////////////////////////////////////////////////////////////
var
	g_bodyview = 0,
	g_bodyview_page = 1,
	g_scrolltop_arr = []
;

function changeBodyView(page){
	if (page != g_bodyview_page){
		// reserve the current scrolltop
		g_scrolltop_arr[g_bodyview_page] = $(window).scrollTop();
		
		$('.bodyview').hide();
		g_bodyview = $('#bodyview_' + page);
		g_bodyview.fadeIn();
		
		// restore the old scrolltop
		if (page < g_bodyview_page){
			$(window).scrollTop(g_scrolltop_arr[page]);
		} else {
			$(window).scrollTop(0);
		}
		
		// remember the new page
		g_bodyview_page = page;
	}
}