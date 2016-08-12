
/////////////////////////////////////////////////////////////////
var g_widgetID1 = 0;

function initAll(){
	
	// top buttons
	//drawSvg($('.svg_container'));
	
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
	g_widgetID1 = grecaptcha.render('div_recaptcha', {
		'sitekey' : g_siteKey,
		//'theme' : 'dark',
	});
	$('#div_recaptcha > div').css({width:0});
	$('input').focus(function(){
		$(this).select();
	});
	
	// login
	$('#but_login').mouseup(function(e){
		$('#td_login_error').text('');
		$('input, button, select').prop('disabled', true);
		if (checkValid(['login_email', 'login_pwd'])){
			var email = $('#login_email').val().trim(),
					pwd = $('#login_pwd').val().trim(),
					remember = $('#login_remember').prop('checked')?1:0
			;
			console.debug(email, pwd, remember);
			call_svrop(
				{
					type: 'login',
					email: email,
					pwd: pwd,
					remember: remember,
				},
				function(obj){
					console.log(obj);
					$('#td_login_error').text('');
					setCookie('email', email, 7);	// last for 7 days only
					setCookie('pwd', pwd, 7);
					setCookie('remember', remember, 7);
					setCookie('login', 1, 7);
					// forward to index.php
					$('#td_login_error').text('');
					window.location.href = '/';
				},
				function (obj){
					//console.debug(obj);
					$('#td_login_error').text(obj.error);
					$('input, button, select').prop('disabled', false);
				}
			);
		} else {
			$('input, button, select').prop('disabled', false);
		};
	});
	
	// signup
	$('#but_signup').mouseup(function(e){
		$('#td_signup_error').text('');
		$('input, button, select').prop('disabled', true);
		if (checkValid(['signup_email', 'signup_pwd', 'signup_name'])){
			var
					name 		= $('#signup_name').val().trim(), 
					email 	= $('#signup_email').val().trim(),
					pwd 		= $('#signup_pwd').val().trim(),
					gender	= $('#signup_gender').data('toggles').active?1:0,
					birthday = get_birthday("signup_birth_date", "signup_birth_month", "signup_birth_year"),
					resp = grecaptcha.getResponse(g_widgetID1)	//$('#g-recaptcha-response').text()
			;
			console.debug(email, pwd, gender, birthday, resp);
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
				function(obj){
					console.log(obj);
					grecaptcha.reset(g_widgetID1);
					$('#td_signup_error').text('');
					setCookie('email', email, 7);	// last for 7 days only
					setCookie('pwd', pwd, 7);
					setCookie('login', 1, 7);
					$('#td_signup_error').html('<span style="color:blue">A confirmation email has been sent to your email account. Please check and follow its instructions.</span>');
					$('input, button, select').prop('disabled', false);
				},
				function (obj){
					console.debug(obj);
					var error = '';
					if (typeof(obj.error) == 'string'){
						error = obj.error;
					} else if (typeof(obj.responseText)){
						error = obj.responseText;
					}
					$('#td_signup_error').text(error);
					grecaptcha.reset(g_widgetID1);
					$('input, button, select').prop('disabled', false);
				}
			);
		} else {
			$('input, button, select').prop('disabled', false);
		};
	});
	
	// forgotpwd
	$('#td_forgot_pwd').mouseup(function(e){
		console.debug('forgot pwd');
		if (checkValid(['login_email'])){
			var
				email = $('#login_email').val().trim(),
				msg = 'Do you want to request an email about resetting your password?'
			;
			showConfirmDialog('Forgot password', msg, function(){
				console.debug('request to reset password');
			});
		}
	});
	
	// is cookie set?
	if (typeof(confirmed_email)!='undefined'){
		 $('#login_email').val(confirmed_email);
		 $('#login_pwd').val('');
		 $('#login_remember').prop('checked', false);
	} else if (getCookie('remember', 0) == 1){
		 $('#login_remember').prop('checked', true);
		 $('#login_email').val(getCookie('email', ''));
		 $('#login_pwd').val(getCookie('pwd', ''));
	}
	// first page
	$('#tbl_root').show();
	//$("#tabs").tabs("option", "active", 1);	// signup
	//$("iframe").contents().find(".rc-anchor-light").css('border-radius', '8px');
}

