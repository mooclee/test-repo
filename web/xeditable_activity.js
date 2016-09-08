

/**
Activity editable input.
Internally value stored as {city: "Moscow", street: "Lenina", building: "15"}

@class activity
@extends abstractinput
@final
@example
<a href="#" id="activity" data-type="activity" data-pk="1">awesome</a>
<script>
$(function(){
    $('#activity').editable({
        url: '/post',
        title: 'Enter city, street and building #',
        value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
        }
    });
});
</script>
**/
(function ($) {
    "use strict";
    
    var Activity = function (options) {
        this.init('activity', options, Activity.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Activity, $.fn.editabletypes.abstractinput);

    $.extend(Activity.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/        
        render: function() {
           this.$input = this.$tpl.find('input');
        },
        
        
        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/        
        html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g. 
            editable({
                value: {
                    city: "Moscow", 
                    street: "Lenina", 
                    building: "15"
                }
            });
          */ 
          return null;  
        },
      
       /**
        Converts value to string. 
        It is used in internal comparing (not for sending to server).
        
        @method value2str(value)  
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       /*
        Converts string to value. Used for reading value from 'data-value' attribute.
        
        @method str2value(str)  
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute. 
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },                
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/         
      value2input: function(value) {
				if (!value) {
					return;
				}
				//console.debug(value);
				this.$input.filter('[name=title]').val(value.title);
				this.$input.filter('[name=position]').val(value.position);
				//this.$input.filter('[name=type]').val(value.type);
				this.$tpl.find('.activity_type]').text(value.type);
      },       
       
			 /////////////////////////////////////////////////////////////////////////////
			 // get the selected month and year
			 setMonthYear: function(month, year, value){
					var arr = value.split('-'), mval = parseInt(arr[1]), yval = parseInt(arr[0]);
					var jsel1 = this.$tpl.find('[name='+month+']');
					jsel1.find("option[value=" + mval + "]").attr("selected", true);
					var jsel2 = this.$tpl.find('[name='+year+']');
					jsel2.find("option[value=" + yval + "]").attr("selected", true);
			 },

       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
				 return {
					act_id:			this.$tpl.find('.tbl_act').attr('id'),
					title: 			this.$input.filter('[name=title]').val(),
					type:				this.$input.filter('[name=type]').val(),
					//sharing_lvl:	
					organizer: 	this.$input.filter('[name=organizer]').val(), 
					position:		this.$input.filter('[name=position]').val(),
					start: 			this.getMonthYear('startDateDay', 'startDateMonth', 'startDateYear'),
					end: 				this.getMonthYear('endDateDay', 'endDateMonth', 'endDateYear'),
					desc:				this.$tpl.find('.input_desc').html(),
				 };
       },        
       
			 /////////////////////////////////////////////////////////////////////////////
			 // get the selected month and year
			 getMonthYear: function(day, month, year){
					var
						sel0 = this.$tpl.find('[name='+day+']')[0],
						sel1 = this.$tpl.find('[name='+month+']')[0],
						sel2 = this.$tpl.find('[name='+year+']')[0]
					;
					var str =
						sel2.options[sel2.selectedIndex].value + '-' +
						sel1.options[sel1.selectedIndex].value + '-' +
						sel0.options[sel0.selectedIndex].value
					;
					//console.debug(str);
					return str;
			 },
        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/        
       activate: function() {
          //this.$input.filter('[name=privacy]').focus();
       },  
       
       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode
        
        @method autosubmit() 
       **/       
       autosubmit: function() {
				 this.$input.keydown(function (e) {
						if (e.which === 13) {
							$(this).closest('form').submit();
						}
				 });
       },
			 
        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function(value, element) {
					//console.debug('value2html', value, element);
					if (!value) {
						$(element).empty();
						return; 
					}
					var act_id = value.act_id,
							sharing = value.sharing
					;
					//console.debug(sharing);
					var s = '<table class="activity_outer" cellspacing="0" cellpadding="0">' +
										'<tr>' +
											'<td>' +
												'<div>' +
													'<div>' +
														'<span class="activity_title">' +
															value.title +
														'</span>' +
														' (<span class="activity_type">' +
															value.type +
														'</span>)' +
														//' by <span class="activity_organizer"> ' + value.organizer + '</span>' +
													'</div>' +
													'<div class="activity_period">' +
														'<span class="activity_position">' +
															value.position +
														'</span>' +
														'<span>, ' +
															this.getDateFormat(value.start) +
														'</span> - ' +
														'<span>' +
															this.getDateFormat(value.end) +
														'</span>' +
													'</div>' +
												'</div>' +
											'</td>' +
											'<td nowrap align="right" valign="top" style="padding-top:10px">Sharing with:</td>' +
											'<td valign="top" align="right" style="width:260px" valign="middle">' +
												'<div class="btn-group switch_share" data-toggle="buttons" nowrap act_id="' + act_id + '">' +
													'<label class="btn btn-primary'+(sharing=='0'?' active':'')+'" nowrap>' +
														'<input type="radio" name="options" value="0" '+(sharing=='0'?'checked':'')+'/>no one' +
													'</label>' +
													'<label class="btn btn-primary'+(sharing=='1'?' active':'')+'" nowrap>' +
														'<input type="radio" name="options" value="1" '+(sharing=='1'?'checked':'')+'/>network' +
													'</label>' +
													'<label class="btn btn-primary'+(sharing=='2'?' active':'')+'" nowrap>' +
														'<input type="radio" name="options" value="2" '+(sharing=='2'?'checked':'')+'/>public' +
													'</label>' +
												'</div>' +
											'</td>' +
										'</tr>'
					;
					if (value.gskills){
						s += '<tr>' +
							'<td colspan="3">' +
								'<table id="tbl_act_' + act_id + '" class="tbl_gskill_root" cellspacing="0" cellpadding="0" style="width:100%;">' +
									'<tr>' +
										'<td valign="top" class="td_tbl_gskills">' +
											'<div class="div_tbl_gskills">' +
												'<table class="tbl_gskills" style="width:100%;" cellspacing="0" cellpadding="0" chart_id="' + act_id + '" id="tbl_gskills_' + act_id + '">' +
												'</table>' +
											'</div>' +
										'</td>' +
										'<td width="300" class="td_canvas_chart">' +
											'<div class="div_canvas_chart">' +
												'<canvas class="canvas_chart" width="300" height="300" chart_id="' + act_id + '" id="canvas_chart_' + act_id + '"></canvas>' +
											'</div>' +
										'</td>' +
									'</tr>' +
								'</table>'
						;
					}
					
					if (value.feedback){
						s += '<tr><td colspan="3">' +
										'<table class="activity_feedback" cellspacing="0" cellpadding="0">'
						;
						for (var i = 0; i < value.feedback.length; i++){
							var feedback = value.feedback[i];
							s += '<tr>' +
											'<td class="feedback_date">' + feedback.date + '</td>' +
											'<td class="feedback_assessor">' + feedback.assessor + '</td>' +
											'<td class="feedback_comments">' + feedback.comments + '</td>' +
										'</tr>';
						}
						s +=	'</table></td></tr>';
					}
					s += '</table>'
					;
					$(element).html(s);
					//console.debug($(element).find('.btn-group').html());
					

        },
				
				////////////////////////////////////////////////
				// from yyyy-mm-dd to day mon yyyy
				////////////////////////////////////////////////
				getDateFormat: function(value){
					var arr = value.split('-'), dval = parseInt(arr[2]) - 1, mval = parseInt(arr[1]) - 1, year = arr[0];
					var month = month_arr[mval];
					return dval + ' ' + month + ' ' + year;
				}
				
    });
		
		
		// edit interface

		
    Activity.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: 
						'<div class="activity_outer">' +
							'<div class="editable-activity">Title</div><div class="editable-activity">' +
								'<input type="text" name="title" autocomplete="off">' +
							'</div>' +
							'<div class="editable-activity">Privacy</div>' +
							'<div class="editable-activity"><select name="privacy"><option selected="">Share to the public</option><option>Share to my network only</option><option>Do not share with others</option></select></div>' +
							'<div class="editable-activity">Date</div>' +
								'<div class="div_start_date">' +
									'<select name="startDateDay">' + dayopts + '</select>&nbsp;' +
									'<select name="startDateMonth">' + monthopts + '</select>&nbsp;' +
									'<select name="startDateYear">' + yearopts + '</select>' +
								'</div>' +
								'<div class="div_end_date">' +
									'<select name="endDateDay">' + dayopts + '</select>&nbsp;' +
									'<select name="endDateMonth">' + monthopts + '</select>&nbsp;' +
									'<select name="endDateYear">' + yearopts + '</select>' +
								'</div>' +
							'</div>' +
						'</div>',
        inputclass: '',
    });

    $.fn.editabletypes.activity = Activity;

}(window.jQuery));