
/////////////////////////////////////////////////////////////////

var g_widgetID1 = 0;

function initAll(){
	//alert(2);
	
	// get os, platform and screensize
	getHardwareSpec();
	
	// remove cmenu
	cmenu();
	
	//alert(g_platform);
	var w = 320, h = 520;
	switch (g_platform){
		case 'ios':
		case 'android':
			$('#div_topmenu').hide();
			$('#div_title').parent().hide();
			// resize tabs
			w = g_nScreenW;
			h = g_nScreenH - 8;
			$('#tabs').css({
				'display': 'block',
				'border-bottom-width': 0,
			});
			break;
			
		//case 'web':
		default:
			$('#tabs').css({
				display: 'inline-block',
				float: 'none',
				width: w,
				height: h,
			});
			break;
	}
	$('#tabs').css({
		'min-width': w,
		'min-height': h,
	});
	
	$( "#tabs" ).tabs();
	
	$('.toggle_gender')
		.toggles({
			drag: true, // allow dragging the toggle between positions
			click: true, // allow clicking on the toggle
			text: {
				on: 'Female', // text for the ON position
				off: 'Male' // and off
			},
			on: true, // is the toggle ON on init
			animate: 150, // animation time (ms)
			easing: 'swing', // animation transition easing function
			checkbox: null, // the checkbox to toggle (for use in forms)
			clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
			width: 118, // width used if not set in css
			height: 25, // height if not set in css
			type: 'select' // if this is set to 'select' then the select style toggle will be used
			//type: 'compact' // if this is set to 'select' then the select style toggle will be used
		})
		.on('toggle', function(e, active) {
		});//.data('toggles').toggle(true);
		
	// https://bdhacker.wordpress.com/2010/01/17/free-javascript-birthdate-picker/
	date_populate("signup_birth_date", "signup_birth_month", "signup_birth_year");
	
	$('input[type=text], input[type=password]').focus(function(e){
		var jobj = $(this);
		//console.debug(jobj);
		jobj
			.highlight(0)
		if (jobj.data('ui-tooltip')) {
			jobj
				.tooltip('close')
				.tooltip('destroy')
			jobj
				.attr("title", "")
				.removeProp("title");
		}			
	});
	
	// RECAPTCHA-RESPONSE
	if (g_siteKey){
		g_widgetID1 = grecaptcha.render('div_recaptcha', {
			'sitekey' : g_siteKey,
			//'theme' : 'dark',
		});
	}
	if (!g_widgetID1){
		//console.error('recaptcha error', 'sitekey=' + g_siteKey, 'widget='+g_widgetID1);
	}
	$('#div_recaptcha > div > div > iframe').on('load', function(){
		//console.debug('recaptcha loaded');
		$('#div_recaptcha > div').width(0);
		$('#div_recaptcha > div > div > iframe').css({
			'transform': 'scale(.82)',
			'transform-origin': '0px',
			'border-radius': '6px',
			//'zoom': 0.85,
		});
		//alert(4);
	});
	$('input')
		.focus(function(){
			$(this).select();
		})
	;
	$('input')
		.on('touchstart', function(){
			$(this).select();
		})
	;	
	$('input').bind("dragstart", function(event) {
		//console.debug('dragstart');
    event.preventDefault();
  });	
	
	// login
	$('#but_login').mouseup(function(e){
		goLogIn();
	});
	
	// signup
	$('#but_signup').mouseup(function(e){
		goSignUp();
	});
	
	// forgotpwd
	$('#td_forgot_pwd').mouseup(function(e){
		forgotPwd();
	});
	
	if (loginemail){
		// loginemail
		$("#tabs").tabs("option", "active", 0);	// login
		$('#login_email')
			.val(loginemail)
			.prop('disabled', true);
		$('#login_pwd').val('');			
		
	} else if (signupemail){
		
		// signupemail
		$("#tabs").tabs("option", "active", 1);	// signup	
		$('#signup_email')
			.val(signupemail)
			.prop('disabled', true);		
		
	} else if (reset_pwd){
		
		// reset_pwd
		$('#login_email')
			.val(confirmed_email)
			.prop('disabled', true);
			
		$('#login_pwd')
			.attr('placeholder', 'New password')
			.val('');
			
		$('#login_remember').prop('checked', false);
		$('#td_forgot_pwd').unbind().css('cursor','default').html('<span style="color:blue">Please enter your new password</span>');

	} else if (confirmed_email){
		
		// email confirmation
		$('#login_email').val(confirmed_email);
		$('#login_pwd').val('');
		$('#login_remember').prop('checked', false);
				
	} else if (getCookie('remember', 0) == 1){
		
		$('#login_remember').prop('checked', true);
		$('#login_email').val(getCookie('email', ''));
		$('#login_pwd').val(getCookie('pwd', ''));
		
	}
	// first page
	//$('#div_root').css('display', 'inline-block');
	$('#div_root').show();
	$('#login_email').focus();
	//$("iframe").contents().find(".rc-anchor-light").css('border-radius', '8px');
	initKeyboard();
	
	// testing 
	//$("#tabs").tabs("option", "active", 1);	// signup

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goLogIn(){
	$('#td_login_error').text('');
	// disable input
	$('input, button, select, #tabs').prop('disabled', true);
	
	if (checkValid(['login_email', 'login_pwd'])){
		var email = $('#login_email').val().trim(),
				pwd = $('#login_pwd').val().trim(),
				remember = $('#login_remember').prop('checked')?1:0
		;
		console.debug(email, pwd, remember, reset_pwd);
		
		//console.debug(reset_pwd, typeof(reset_pwd));
		call_svrop(
			{
				type: 'login',
				email: email,
				pwd: pwd,
				reset_pwd: reset_pwd,
				remember: remember,
			},
			function (obj){
				//alert(obj);
				if (obj.error){
					$('#td_login_error').text(obj.error);
					$('input, button, select, #tabs').prop('disabled', false);
				} else {
					//console.log(obj);
					$('#td_login_error').text('');
					setCookie('email', email, 7);	// last for 7 days only
					setCookie('pwd', pwd, 7);
					setCookie('reset_pwd', reset_pwd, 7);
					setCookie('remember', remember, 7);
					setCookie('login', 1, 7);
					// forward to index.php
					$('#td_login_error').text('');
					var url = window.location.href;
					url = url.substring(0, url.lastIndexOf('/') + 1) + 'index.php?s=' + getDateString();
					if (g_separate){
						url += '&separate=1';
					}
					window.location.href = url;
				}
			},
			function (obj){
				//console.debug(obj);
				$('#td_login_error').text(obj.error);
				$('input, button, select, #tabs').prop('disabled', false);
			}
		);
	} else {
		$('input, button, select').prop('disabled', false);
	};
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goSignUp(){
	$('#td_signup_error').text('');
	$('input, button, select').prop('disabled', true);
	if (checkValid(['signup_email', 'signup_pwd', 'signup_name'])){
		var
				name 		= $('#signup_name').val().trim(), 
				email 	= $('#signup_email').val().trim(),
				pwd 		= $('#signup_pwd').val().trim(),
				gender	= $('#signup_gender').data('toggles').active?1:0,
				birthday = get_birthday("signup_birth_date", "signup_birth_month", "signup_birth_year"),
				resp = g_widgetID1 ? grecaptcha.getResponse(g_widgetID1) : 0	//$('#g-recaptcha-response').text()
		;
		console.debug(email, pwd, gender, birthday, resp, g_widgetID1);
		call_svrop(
			{
				type: 'signup',
				name: name,
				email: email,
				pwd: pwd,
				gender: gender,
				birthday: birthday,
				'g-recaptcha-response': resp,
			},
			function (obj){
				console.log(obj);
				
				var error = 0;
				if (typeof(obj.error) == 'string'){
					error = obj.error;
				} else if (typeof(obj.responseText)){
					error = obj.responseText;
				}
				if (error){
					
					// failure
					$('#td_signup_error').text(error);
					if (g_widgetID1){
						grecaptcha.reset(g_widgetID1);
					} 
					$('input, button, select').prop('disabled', false);
				} else {
					
					// success
					if (g_widgetID1) grecaptcha.reset(g_widgetID1);
					$('#td_signup_error').text('');
					setCookie('email', email, 7);	// last for 7 days only
					setCookie('pwd', pwd, 7);
					setCookie('login', 1, 7);
					$('#td_signup_error').html('<span style="color:blue">A confirmation email has been sent to your email account. Please check and follow its instructions.</span>');
					$('input, button, select').prop('disabled', false);
				}
			}
/*			
			,
			function (obj){
				console.debug(obj);
				var error = '';
				if (typeof(obj.error) == 'string'){
					error = obj.error;
				} else if (typeof(obj.responseText)){
					error = obj.responseText;
				}
				$('#td_signup_error').text(error);
				if (g_widgetID1){
					grecaptcha.reset(g_widgetID1);
				} 
				$('input, button, select').prop('disabled', false);
			}
*/			
		);
	} else {
		$('input, button, select').prop('disabled', false);
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////

function forgotPwd(){
	console.debug('forgot pwd');
	BootstrapDialog.show({
		type: BootstrapDialog.TYPE_PRIMARY,
		cssClass: 'login-dialog',
		title: 'Find your password',
		closable: true,
		closeByBackdrop: true,
		closeByKeyboard: true,
		message: 
						'<div>'
						+ 'The email address you used to signup.'
						+ '</div><br/>'
						+ '<div style="width:100%; text-align:center;">'
							+ '<input id="forgotpwd_email" class="nonempty isemail" type="text" placeholder="Email" autocomplete="off"/>'
						+ '</div>'
		,
		//onshow: function(){
		//},
		onshown: function(){
			//$('.bootstrap-dialog .btn-default').focus();	// set the focus					
			$('#forgotpwd_email').focus();
		},
		buttons: [
			{
				label: 'Cancel',
				action: function(dialog){
					 dialog.close();
				}
			},
			{
				icon: 'glyphicon glyphicon-envelope',
				label: 'Send notification email',
				action: function(dialog){
					if (checkValid(['forgotpwd_email'])){
						var jobj = $('#forgotpwd_email');
						var email = jobj.val().trim();
						$('input, button, select').prop('disabled', true);
						console.debug('Sending to server...', email);
						// call_svrop
						call_svrop(
							{
								type: 'reset_pwd',
								email: email,
							},
							function (obj){
								console.debug('success', obj);
								$('input, button, select').prop('disabled', false);
								dialog.close();
								// SHOW NEW DIALOG
								BootstrapDialog.show({
									type: BootstrapDialog.TYPE_PRIMARY,
									title: 'Find your password',
									message: 'An email has been sent to your mailbox. Please check it and continue.',
									buttons:[{
										label: 'Close',
										action: function(dialog){
											 dialog.close();
										},
									}],
								});
							},
							function (obj){
								//console.error('failed', obj);
								var error = '';
								if (typeof(obj.error) == 'string'){
									error = obj.error;
								} else if (typeof(obj.responseText)){
									error = obj.responseText;
								}
								$('#div_forgotpwd_status').text(error);
								$('input, button, select').prop('disabled', false);
								dialog.close();
								// SHOW NEW DIALOG
								BootstrapDialog.show({
									type: BootstrapDialog.TYPE_WARNING,
									title: 'Find your password',
									message: error,
									buttons:[{
										label: 'Close',
										action: function(dialog){
											 dialog.close();
										},
									}],
								});
							}
						);
					}
				}
			},
		]
	});	
}

/*
window.addEventListener('orientationchange', function (){
	if (window.innerHeight > window.innerWidth){
		document.getElementsByTagName('body').style.transform = "rotate(90deg)";
	}
});
*/