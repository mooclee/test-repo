@echo off
date /t
time /t

rem goto B

echo ***generating a.css***
call uglifycss jquery-ui1.css jquery-ui2.css toggles.css bootstrap-3.3.7-alan.css bootstrap-dialog-1.35.3.css font-awesome-4.7.0/css/font-awesome.css login.css  > ./a.css

echo ***generating a.js***

call uglifyjs jquery-2.2.4-alan.js jquery-ui-1.11.4.js toggles.js bootstrap-3.3.7-alan.js bootstrap-dialog-1.35.3.js platform.js interface.js login.js login_keyboard.js svg.js lang.js index_common.js birthdate.js svrop.js  -o ./a.js -b ascii_only=true,beautify=false

rem echo ***copy to production***
rem xcopy /y .\a.js ..\
rem xcopy /y .\a.css ..\

rem goto END

:B
echo ***generating b.css***

call uglifycss jquery-ui1.css jquery-ui2.css jquery.datetimepicker.css index.css toggles.css star-rating-svg.css xeditable_work.css select2.css jquery-labelauty.css xeditable_activity.css xeditable_education.css xeditable_publication.css xeditable_award.css xeditable_language.css xeditable_interest.css xeditable_limit.css dhtmlxscheduler_flat.css typeahead.css typeahead_test5.css bootstrap-tokenfield.css tokenfield-typeahead.css bootstrap-multiselect.css buttons.dataTables.css jquery.dataTables-alan.css responsive.dataTables-alan.css arrow-box.css featherlight.css featherlight.gallery-alan.css a.uploader.css jquery.bxslider.css dhtmlxscheduler-responsive.css bootstrap.css bootstrap-alan-only.css bootstrap-dialog.css bootstrap-editable-alan.css bootstrap-editable.css bootstrap-wysihtml5-0.0.3.css wysiwyg-color.css  > ./b.css

echo ***generating b.js***

call uglifyjs platform.js jquery-3.1.1.js dataTables.js buttons.print.js jquery-ui-1.12.1.js bootstrap-alan.js bootstrap-dialog.js jquery.ba-resize.js jquery.datetimepicker.full.js jquery.autogrowtextarea.js autocomplete_combo.js toggles.js jquery.star-rating-svg.js autosize.js gauge.js jquery-labelauty.js jquery.easing.1.3.js dhtmlxscheduler-alan.js dhtmlxscheduler_year_view.js typeahead.bundle.js bloodhound.js handlebars-v4.0.5.js bootstrap-tokenfield.js typeahead-alan.js jquery.linkedsliders.js bootstrap-multiselect.js featherlight.js featherlight.gallery.js moment.js progressbar.js jquery.bxslider.js jquery.fitvids.js jquery.dotdotdot.js jquery.ui.touch-punch.js Chart.bundle-2.4.0.js Chart.bundle-2.4.0-alan.js dataTables.responsive.js dhtmlxscheduler-responsive.js bootstrap-editable-alan.js wysihtml5-0.3.0-alan.js bootstrap-wysihtml5-0.0.3-alan.js wysihtml5-0.0.3.js select2.js xeditable_activity.js xeditable_work.js xeditable_education.js xeditable_publication.js xeditable_award.js xeditable_language.js xeditable_interest.js xeditable_limit.js waitingfor.js svg.js database_templates.js lang.js index.js index_common.js svrop.js index_profile.js index_network.js index_schedule.js index_datatable.js index_topmenu.js index_panelists.js index_home.js index_userpage.js index_uact.js index_uass.js index_datetime.js a.uploader.js resumable-alan.js index_activity.js index_activity_create.js index_activity_edit.js index_activity_list.js index_activity_view.js index_assessment_create.js index_assessment_edit.js index_assessment_view.js index_assessment_view_assessor.js index_assessment_view_coordinator.js index_assessment_view_participant.js index_impression_view.js index_impression_view_assessor.js index_impression_view_coordinator.js index_impression_view_participant.js index_skills.js index_skills_chart.js index_skills_breakdown.js interface.js index_method.js index_method_ref.js index_method_mcq.js index_method_prt.js index_method_abs.js index_method_lcn.js index_method_sur.js index_method_pst.js index_gsgauge.js  -o ./b.js -b ascii_only=true,beautify=false


rem echo ***copy to production***
rem xcopy /y .\b.js ..\
rem xcopy /y .\b.css ..\

:END
echo ***done***