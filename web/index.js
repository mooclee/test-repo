var
	TAB_HOME = 0,
	TAB_PROFILE = 1,
	TAB_NTWK = 2,
	TAB_OCLA = 3
;


jQuery.fn.outerHTML = function(s){
	return s
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

/////////////////////////////////////////////////////////////////

function initAll(){
	
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
	
	// move balloon
	
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
	
	// dropmenu
	$('.dropmenu').menu().hide();
	$('#dropmenu_ocla	a').click(function(e){
		var jobj = $(this);
		var id = jobj.attr('href');
		console.debug(id);
		$("#tabs").tabs("option", "active", TAB_OCLA);
		$('.ocla_page').hide();
		$(id).show();
	});
	
	// EDITOR
	$('.editor').trumbowyg({
//	 semantic: true,
    btns: [
//        ['viewHTML'],
//        ['formatting'],
//        'btnGrp-semantic',
				['bold', 'italic', 'underline', 'strikethrough'],
        ['superscript', 'subscript'],
        ['link'],
//        ['insertImage'],
        'btnGrp-justify',
        'btnGrp-lists',
        ['horizontalRule'],
        ['removeformat'],
  //      ['fullscreen']
    ],
		autogrow: true,
	});
	
	// editor
	//$('.editor').trumbowyg('html', "<b>Internship 101</b> is a course for students to prepare their internship programme.");
	
	// combobox
	$('.assessment_combobox').combobox();
	
	// spinner
	$('.assessment_spinner').spinner();
	
	// calender
	$.datetimepicker.setLocale('en');
	$('.assessment_datetime').datetimepicker();                	
	
	setBalloonNumber('todolist', 3);
	setBalloonNumber('notice', 3);
	setBalloonNumber('msg', 5);

	// TABS
	//var starttab = 0;	// home
	//var starttab = 1;	// profile
	//var starttab = 2;	// network
	//var starttab = 3;	// ocla
	$("#tabs").tabs({
		//active: starttab,
		activate: function(event, ui){
/*
			//console.debug('activate');
			closeDropmenu();
			var jobj = ui.newTab.find('a');
			var tab = jobj.attr('href');
			switch (tab){
				case '#tabs-4a':
					toggleDropmenu(jobj, 'ocla');
					event.stopPropagation();
					break;
			}
*/
		}
	});
	$('#tabs a')
		.hover(function(){
			var jobj = $(this);
			var tab = jobj.attr('href');
			switch (tab){
				case '#tabs-4a':
					openDropmenu(jobj, 'ocla');
					//event.stopPropagation();
					break;
				default:
					closeDropmenu();
					break;
			}
		})
		//.mouseleave(function(){
		//	closeDropmenu();
		//});
	;
	
	$('#tbl_root').show();

	// testing
	$("#tabs").tabs("option", "active", TAB_OCLA);
	$('.ocla_page').hide();
	$('#tabs-4a').show();

	
}

//////////////////////////////////////////////////////////////////////

function onSize(){
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
 
 function openDropmenu(obj, menu){
	var jobj = $(obj), jmenu = $("#dropmenu_"+menu);
	var offset = jobj.offset(),
		y = offset.top + jobj.height() + 11,
		x = offset.left
	;
	if (jmenu.css('display') == 'none'){
		jmenu.show().offset({left:x, top:y}).hide();
		//jmenu.show().hide();
		jmenu.fadeIn('swing');
	}
 }

//////////////////////////////////////////////////////////////////////
 
function closeDropmenu(){
	$('.dropmenu').hide();
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
//*/
 
  (function( $ ) {
		$.widget( "custom.combobox", {
			_create: function() {
				this.wrapper = $( "<span>" )
					.addClass( "custom-combobox" )
					.insertAfter( this.element );

				this.element.hide();
				this._createAutocomplete();
				this._createShowAllButton();
			},

			_createAutocomplete: function() {
				var selected = this.element.children( ":selected" ),
					value = selected.val() ? selected.text() : "";

				this.input = $( "<input>" )
					.appendTo( this.wrapper )
					.val( value )
					.attr( "title", "" )
					.addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
					.autocomplete({
						delay: 0,
						minLength: 0,
						source: $.proxy( this, "_source" )
					})
					.tooltip({
						tooltipClass: "ui-state-highlight"
					});

				this._on( this.input, {
					autocompleteselect: function( event, ui ) {
						ui.item.option.selected = true;
						this._trigger( "select", event, {
							item: ui.item.option
						});
					},

					autocompletechange: "_removeIfInvalid"
				});
			},

			_createShowAllButton: function() {
				var input = this.input,
					wasOpen = false;

				$( "<a>" )
					.attr( "tabIndex", -1 )
					.attr( "title", "Show All Items" )
					.tooltip()
					.appendTo( this.wrapper )
					.button({
						icons: {
							primary: "ui-icon-triangle-1-s"
						},
						text: false
					})
					.removeClass( "ui-corner-all" )
					.addClass( "custom-combobox-toggle ui-corner-right" )
					.mousedown(function() {
						wasOpen = input.autocomplete( "widget" ).is( ":visible" );
					})
					.click(function() {
						input.focus();

						// Close if already visible
						if ( wasOpen ) {
							return;
						}

						// Pass empty string as value to search for, displaying all results
						input.autocomplete( "search", "" );
					});
			},

			_source: function( request, response ) {
				var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
				response( this.element.children( "option" ).map(function() {
					var text = $( this ).text();
					if ( this.value && ( !request.term || matcher.test(text) ) )
						return {
							label: text,
							value: text,
							option: this
						};
				}) );
			},

			_removeIfInvalid: function( event, ui ) {

				// Selected an item, nothing to do
				if ( ui.item ) {
					return;
				}

				// Search for a match (case-insensitive)
				var value = this.input.val(),
					valueLowerCase = value.toLowerCase(),
					valid = false;
				this.element.children( "option" ).each(function() {
					if ( $( this ).text().toLowerCase() === valueLowerCase ) {
						this.selected = valid = true;
						return false;
					}
				});

				// Found a match, nothing to do
				if ( valid ) {
					return;
				}

				// Remove invalid value
				this.input
					.val( "" )
					.attr( "title", value + " didn't match any item" )
					.tooltip( "open" );
				this.element.val( "" );
				this._delay(function() {
					this.input.tooltip( "close" ).attr( "title", "" );
				}, 2500 );
				this.input.autocomplete( "instance" ).term = "";
			},

			_destroy: function() {
				this.wrapper.remove();
				this.element.show();
			}
		});
	})( jQuery );