/*
 * SmartRecruiters - https://www.smartrecruiters.com
 * Copyright (C) 2010 SmartRecruiters
 * Author: Dominik Malysa
 *
 * V 2.0 SmartRecruiters job list widget
 *
 * Example usage:
 <script type='text/javascript' src='https://www.smartrecruiters.com/img/script/smartWidget/smart_widget.js'></script>
 <script type='text/javascript'>
 widget({
 "company_code":"49306135",                 - code of your company to print your jobs
 "group_id":"test",							- code of group to print your jobs
 "bg_color_widget":"#ffffff",             	- job table background
 "bg_color_headers":"#969696",            	- table header background
 "txt_color_headers":"#292929",            	- table header text color
 "bg_color_even_row":"#e0e0e0",            	- table even row background color
 "bg_color_odd_row":"#f7f7f7",            	- table odd row background color
 "txt_color_job":"#3d3d3d",                	- table content text color
 "bg_color_links":"#99ccff",                - table row background color
 "custom_css_url":"https://www.smartrecruiters.com/img/style/smartWidget/smart_widget.css", - external custom css for widget styling
 "widget_width":"630",                    	- widget width in px
 "widget_height":"400",                    	- widget height in px
 "jobs_number":"10",                        - number of jobs shown in widget
 "job_title":"true",                        - job title column visibility
 "type_of_employment":"true",            	- type of employment column visibility
 "department":"true",                    	- department column visibility
 "location":"true",                        	- job location column visibility
 "occupational_area":"true",                - occupational area column visibility
 "published_since":"true",                	- job published since date column visibility
 "remove_headers":"true",                	- table header visibility
 "display_headers":"true,"					- table header visibility
 "add_search":"false",						- search bar and pagination visibility
 "filter_departments":"Finance",            - company department filter
 "filter_locations":"San Francisco"        - job location filter
 });
 </script>
 */
//This array is needed in jobWidgetColorPicker.js to create color pickers
var colorPickerArray = {
    "bg_color_widget": ".srJobList",
    "bg_color_headers": ".srJobListTitles th",
    "txt_color_headers": ".srJobListTitles th nobr",
    "bg_color_even_row": ".srJobList .srJobListJobEven *",
    "bg_color_odd_row": ".srJobList .srJobListJobOdd *",
    "txt_color_job": ".srJobListJobEven td, .srJobListJobOdd td",
    "bg_color_links": ".srJobList .srJobListJobEven:hover *,.srJobList .srJobListJobOdd:hover *"
};
var load;
window.widgetList = window.widgetList || [];
window.widget = window.widget || (function (window) {
    var testEnv = false;
    var jobNumber = 100;

    load = function () {
        load.getScript("https://www.smartrecruiters.com/img/js/jquery/jquery.min.js");
        load.tryReady(0);
    };

    load.getScript = function (filename) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = filename;
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (this.readyState === 'loaded') {
                    jQuery.each(widgetStock, function (index, value) {
                        var widgetElement = value;
                        widget(widgetElement.widget_json, widgetElement.widget_element_id, widgetElement.widget_refresh_data, widgetElement.widget_callback);
                    });
                }
            }
        } else {
            script.onload = function () {
                jQuery.each(widgetStock, function (index, value) {
                    var widgetElement = value;
                    if (widgetElement.widget_json !== undefined) {
                        widget(widgetElement.widget_json, widgetElement.widget_element_id, widgetElement.widget_refresh_data, widgetElement.widget_callback);
                    }
                });
            }
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    load.tryReady = function (time_elapsed) {
        if (typeof(jQuery) === "undefined") {
            if (time_elapsed <= 5000) {
                setTimeout("load.tryReady(" + (time_elapsed + 200) + ")", 200);
            } else {
                alert("Timed out while loading jQuery.");
            }
        } else {
            jQuery.noConflict();
        }
    };

    if (typeof(jQuery) === 'undefined') {
        load();
    }
    
    var defaultContent = 'Filter by title, expertise';
    var widgetStock = [];
    var widgetJSON = {};
    var filerJSON = {};


    if (typeof(numberOfWidgets) === 'undefined') {
        var numberOfWidgets = 0;
    }

    function widget(json, element_id, refresh_data, callback) {
        var widgetElement;
        var localWidgetList;
        var widgetID;

        if (typeof(jQuery) === 'undefined') {
            widgetStock.push({
                'widget_json': json,
                'widget_element_id': element_id,
                'widget_refresh_data': refresh_data,
                'widget_callback': callback
            });
        } else {
            localWidgetList = jQuery(".job_widget");
            if (localWidgetList.length == 0) {
                localWidgetList = jQuery("[src$='/smart_widget.js']").next("script");
            }
            localWidgetList.each(function (index) {
                jQuery(this).attr("id", "job_widget_" + index);
            });
            if (window.widgetList == undefined) {
                window.widgetList = new Array();
            }

            loadCSS(json.custom_css_url);

            if (element_id == undefined || jQuery("#" + element_id).length == 0) {
                var div = document.createElement('div');
                div.setAttribute("class", "smartWidget");
                div.id = "smartWidget" + numberOfWidgets;
                element_id = div.id;
                widgetID = "#smartWidget" + numberOfWidgets;
                jQuery(jQuery("#job_widget_" + numberOfWidgets)).after(jQuery(div));
                numberOfWidgets++;
                widgetElement = jQuery(div);
            } else {
                widgetID = "#" + element_id;
                widgetElement = jQuery(widgetID);
            }
            widgetElement.html("");
            widgetElement.addClass('loading');
            widgetJSON[element_id] = json;
            filerJSON[element_id] = {};
            setCurrentPage(element_id, 0);
            setOffset(element_id, 0);
            setLimit(element_id, json.jobs_number);

            if (refresh_data == undefined || refresh_data) {
                if ((json.company_code !== undefined && json.company_code.length > 0) || (json.group_id !== undefined && json.group_id.length > 0)) {
                    executeQuery(element_id, null, callback);
                    addEvents(element_id);
                }
            } else {
                data = window.widgetList[element_id];
                createWidgetContent(json.company_code, data, element_id, json, widgetElement, callback);
            }
        }
    }

    function toList(obj) {
        if (typeof(obj) === 'string') {
            return [obj];
        } else {
            return obj;
        }
    }
    
    function cleanFilters(filerArray){
    	var filteredFilterArray = filterElements(filerArray);
    	if (filerArray.length === filteredFilterArray.length){
    	    	return filerArray;
    	} else {
    		return [];
    	}
    }

    function filterElements(array){
    	var newArray = new Array();
    	for (var i = 0; i < array.length; i++){
    		if (array[i].indexOf('val_all_') < 0){
    			newArray.push(array[i]);
    		}
    	}
    	return newArray ; 
    }

    function executeQuery(widgetID, queryString, callback, offset, limit) {
        var json = widgetJSON[widgetID];
        var company_code = json.company_code;
        var group_code = json.group_id;
        var jobListURL;
        var domain;

        offset = offset || 0;
        limit = limit || getLimit(widgetID) || jobNumber;

        if (json.api_url && json.api_url.length > 0) {
            domain = 'http://betest.sr:8080';
        } else {
            domain = 'https://api.smartrecruiters.com';
        }
        if (company_code) {
            jobListURL = domain + "/search/widgets/" + company_code + "/postings?";
        } else if (group_code) {
            jobListURL = domain + "/search/companyGroups/" + group_code + "/postings?";
        } else {
            return;
        }
        if (queryString && queryString !== defaultContent) {
            jobListURL += 'q=' + queryString;
        }

        var keyFilterTranslation = {
            filter_locations: 'location',
            filter_companies: 'company_name',
            filter_departments: 'department'
        };

        if (offset !== undefined) {
            jobListURL += '&offset=' + offset;
        }

        if (limit !== undefined) {
            jobListURL += '&limit=' + limit;
        }

        var filterArray = [];
        var items;
        for (var key in keyFilterTranslation) {
            items = [];
            var filterList = toList(json[key]);
            if (filterList) {
                items = cleanFilters(filterList.slice());
            }
            if (filerJSON && filerJSON[widgetID] && filerJSON[widgetID][key]) {
                items = [filerJSON[widgetID][key]];
            }
            if (items && items.length > 0) {
                filterArray.push(keyFilterTranslation[key] + ':(' + encodeURIComponent(items.join(';')) + ')');
            }

        }
        jobListURL += '&fq=' + filterArray.join(',');

        var widgetElement = jQuery("#" + widgetID);
        jQuery.ajax(
            {
                url: jobListURL,
                dataType: 'jsonp',
                type: 'GET',
                success: function (data) {
                    window.widgetList[widgetID] = data;
                    createWidgetContent(company_code, data, widgetID, json, widgetElement, callback);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    createEmptyWidget();
                }
            }
        );
    }

    function addEvents(widgetID) {
    	jQuery('#' + widgetID).undelegate('.srSearchOptionListElement', 'click');
    	jQuery('#' + widgetID).undelegate('.srSearch .srSearchOption', 'click');
    	jQuery('#' + widgetID).undelegate('.srSearchForm', 'submit');
    	jQuery('#' + widgetID).undelegate('.srSearchButton', 'click');
    	jQuery('#' + widgetID).undelegate('.srSearchInput', 'keypress');
    	jQuery('html').unbind('click');
        jQuery('#' + widgetID).delegate('.srSearchOptionListElement', 'click', function () {
            var selectedElement = jQuery(this).find('.srSearchOptionListElementText').html();
            jQuery(this).siblings().removeClass('srSearchOptionListElementChecked');
            if (jQuery(this).hasClass('srSearchOptionListElementChecked')) {
                jQuery(this).removeClass('srSearchOptionListElementChecked');
            } else {
                jQuery(this).parents('ul').prev().html(add3Dots(selectedElement, 10));
                jQuery(this).addClass('srSearchOptionListElementChecked');
            }
            setCurrentPage(widgetID, 0);
            executeQueryWithFilter(this);
        });

        jQuery('#' + widgetID).delegate('.srSearch .srSearchOption', 'click', function () {
            var listElement = jQuery(this).children('.srSearchOptionList');
            listElement.children().length > 0 ? listElement.removeClass('none') : listElement.addClass('none');
            if (jQuery(this).children('.srSearchOptionList').is(':visible')) {
                jQuery(this).children('.srSearchOptionList').slideUp('fast');
            } else {
                jQuery(this).children('.srSearchOptionList').slideDown('fast');
            }
            return false;
        });
        jQuery('#' + widgetID).delegate('.srSearchForm', 'submit', function (e) {
            e.preventDefault();
        });
        jQuery('#' + widgetID).delegate('.srSearchButton', 'click', function () {
            setCurrentPage(widgetID, 0);
            executeQueryWithFilter(this);
        });
        jQuery('#' + widgetID).delegate('.srSearchInput', 'keypress', function (e) {
            if (e.keyCode == 13) {
                setCurrentPage(widgetID, 0);
                executeQueryWithFilter(this);
            }
        });
        jQuery('html').bind('click',function(){
        	jQuery('.srSearchOptionList').slideUp('fast');
    	});
    }

    function getWidgetId(element) {
        return jQuery(element).parents('.smartWidget, #widget_content').attr('id');
    }

    function getCurrentPage(id) {
        return filerJSON[id].currentPage;
    }

    function setCurrentPage(id, value) {
        filerJSON[id].currentPage = value;
    }

    function getPageCount(id) {
        return filerJSON[id].pageCount;
    }

    function setPageCount(id, value) {
        filerJSON[id].pageCount = value;
    }

    function getOffset(id) {
        return filerJSON[id].offset;
    }

    function setOffset(id, value) {
        filerJSON[id].offset = value;
    }

    function getLimit(id) {
        return filerJSON[id].limit;
    }

    function setLimit(id, value) {
        filerJSON[id].limit = value;
    }

    function executeQueryWithFilter(filter) {
        var filterObject = jQuery(filter);
        var widgetID = filterObject.parents('.smartWidget, #widget_content').attr('id');
        var filerID = filterObject.parents('.srSearchOption').attr('id');
        if (!filerJSON[widgetID]) {
            filerJSON[widgetID] = {};
        }
        if (filterObject.hasClass('srSearchOptionListElementChecked')) {
            filerJSON[widgetID][keyFacetToFilterTranslation[filerID]] = filterObject.children('.srSearchOptionListElementText').html();
        } else {
            filerJSON[widgetID][keyFacetToFilterTranslation[filerID]] = '';
        }
        var queryString = jQuery('#' + widgetID).find('.srSearchInput').val();
        if (queryString !== defaultContent) {
            filerJSON[widgetID]['queryString'] = queryString;
        } else {
            filerJSON[widgetID]['queryString'] = '';
        }

        executeQuery(widgetID, queryString);
    }

    function executeCurrentQuery(offset, limit, widgetId) {
        var queryString = filerJSON[widgetId]['queryString'];
        executeQuery(widgetId, queryString, null, offset, limit);
    }

    function loadCSS(url) {
        var targetelement = "link";
        var targetattr = "href";
        var allsuspects = document.getElementsByTagName(targetelement);
        var present = false;
        for (var i = allsuspects.length; i >= 0; i--) {
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr) == url) {
                present = true;
            }
        }
        if (!present) {
            var link = document.createElement('link');
            link.rel = "stylesheet";
            link.type = "text/css";
            link.media = "screen";
            link.setAttribute("href", url);
            if (typeof(link) !== "undefined") {
                document.getElementsByTagName("head")[0].appendChild(link);
            }
        }
    }

    function populateColorInputs() {
        for (var key in colorPickerArray) {
            if (colorPickerArray.hasOwnProperty(key)) {
                var fieldID = key + "_field";
                var selectorID = key + "_selector";
                if (key.indexOf('bg_color') === 0) {
                    css = "backgroundColor";
                } else {
                    css = "color";
                }
                if (jQuery("#" + fieldID).val() != undefined && jQuery("#" + fieldID).val().length != 0) {
                    var hex = jQuery("#" + fieldID).val();
                    var colorString = hex2rgb(hex);
                } else {
                    var colorString = jQuery(colorPickerArray[key]).css(css);
                    if (colorString != undefined && colorString.substr(0, 1) == "#") {
                        var hex = colorString;
                        colorString = hex2rgb(colorString);
                    } else {
                        var hex = rgb2hex(colorString);
                    }
                }
                if (colorString != undefined) {
                    jQuery("#" + fieldID).val(hex);
                    jQuery("#" + fieldID).css('backgroundColor', colorString);
                    jQuery("#" + fieldID).parents(".srWidgetInputContainer").css('backgroundColor', hex);
                    jQuery("#" + fieldID).prevAll(".jobWidgetPageColorField").css('backgroundColor', hex);
                    //jQuery("#" + fieldID).parents(".srWidgetInputContainer").find("div").css('backgroundColor', hex);
                    jQuery("#" + selectorID).ColorPickerSetColor(hex);
                }
            }
        }
    }

    function rgb2hex(rgb) {
        if (rgb != undefined) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (rgb != null) {
                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            } else {
                return "";
            }
        }
        return "";
    }

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    function hex2rgb(hex) {
        var c, o = [], k = 0, m = hex.match(/^#(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})|([0-9a-f])([0-9a-f])([0-9a-f]))$/i);
        if (!m) return "rgb(0,0,0)";
        for (var i = 2, s = m.length; i < s; i++) {
            if (undefined === m[i]) continue;
            c = parseInt(m[i], 16);
            o[k++] = c + (i > 4 ? c * 16 : 0);
        }
        return "rgb(" + o[0] + "," + o[1] + "," + o[2] + ")";
    }

    function createWidgetContent(companyIdentifier, data, widgetID, json, widgetElement, callback) {
        if (data === undefined) {
            return false;
        }
        var htmlContent = "";
        if (json.custom_css_url != undefined && json.custom_css_url.length > 0) {
            htmlContent = htmlContent + "<link href='" + json.custom_css_url + "' type='text/css' rel='stylesheet'>";
        }
        //SearchBar
        if (json.add_search && json.add_search === "true") {
            htmlContent += createSearchBar(data, widgetID, json);
        }

        //Content Table
        //Columns Header
        htmlContent = htmlContent + "<table border='1' class='srJobList' style='display:none;'>";
        if (json.remove_headers == undefined || (json.remove_headers != undefined && json.remove_headers != "true")) {
            htmlContent = htmlContent + createHeader(json);
        }
        //Data
        var countOfItems = 0;
        var countOnPage = json.jobs_number || jobNumber;
        if (data.results != undefined) {
            countOfItems = data.results.length;

            if (json.api_url && json.api_url.length > 0) {
                var domain =  json.api_url;
            } else {
                var domain = 'http://www.smartrecruiters.com';
            }

            jQuery.each(data.results, function (i, vacancy) {
                var link = '"' + domain + '/' + vacancy.companyIdentifier + '/' + vacancy.publicationId;

                if (vacancy.urlJobName) {
                    link = link + '-' + vacancy.urlJobName;
                }

                link += '"';

                if (i % 2 === 0) {
                    htmlContent = htmlContent + "<tr class='srJobListJobOdd' onClick ='window.open(" + link + ");'>";

                } else {
                    htmlContent = htmlContent + "<tr class='srJobListJobEven' onClick ='window.open(" + link + ");'>";
                }
                if (json.job_title !== "undefined" && json.job_title == "true") {
                    htmlContent = htmlContent + "<td class='srJobListJobTitle'>" + vacancy.vacancyName + "</td>";
                }
                if (typeof(json.group_id) != "undefined" && json.group_id.length > 0) {
                    htmlContent = htmlContent + "<td class='srJobListTypeOfEmployment'>" + vacancy.companyName + "</td>";
                }
                if (json.type_of_employment != "undefined" && json.type_of_employment == "true") {
                    htmlContent = htmlContent + "<td class='srJobListTypeOfEmployment'>" + (vacancy.typeOfEmployment || "") + "</td>";
                }
                if (json.department != "undefined" && json.department == "true") {
                    htmlContent = htmlContent + "<td class='srJobListDepartment'>" + (vacancy.department || "") + "</td>";
                }
                if (json.location != "undefined" && json.location == "true") {
                    var location = vacancy.location;
                    if (vacancy.regionAbbreviation) {
                        location += ", " + vacancy.regionAbbreviation;
                    }
                    htmlContent = htmlContent + "<td class='srJobListLocation'>" + location + "</td>";
                }
                if (json.occupational_area !== undefined && json.occupational_area == "true") {
                    htmlContent = htmlContent + "<td class='srJobListOccupationalArea'>" + (vacancy.occupationalArea || "") + "</td>";
                }
                if (json.published_since != "undefined" && json.published_since == "true") {
                    htmlContent += "<td class='srJobListPublishedSince'>";
                    var releaseDate = vacancy.releasedDate;
                    if (releaseDate) {
                        htmlContent += format(new Date(releaseDate));
                    }
                    htmlContent += "</td>";
                }
                htmlContent = htmlContent + "</tr>";
            });
        }
        htmlContent = htmlContent + "</table>";

        if (json.add_search && json.add_search === "true") {
            htmlContent = htmlContent + createPagination(countOfItems, countOnPage, widgetID);
        }
        jQuery('.srPagesTextPrevious').unbind('click');
        jQuery('.srPagesTextNext').unbind('click');

        widgetElement.html(htmlContent);
        $('#job-widget-me').html(widgetElement);

        jQuery('.srPagesTextPrevious').bind('click', prev);
        jQuery('.srPagesTextNext').bind('click', next);

        var link = widgetElement.find("link");
        if (link.length > 0) {
            link.after(createCSS(json, widgetElement));
        } else {
            widgetElement.prepend(createCSS(json, widgetElement));
        }
        widgetElement.find("table").fadeIn("fast", function () {
            if (callback != undefined && jQuery.isFunction(eval(callback))) {
                eval(callback).call();
            }
        });
        widgetElement.removeClass('loading');
        if (typeof(jQuery("#widget_content").parents("#srWidgetPreviewContainer").AjaxIndicator) == "function") {
            jQuery("#widget_content").parents("#srWidgetPreviewContainer").AjaxIndicator('hide');
        }
        jQuery('.srSearchOptionList').each(function () {
            if (jQuery(this).css('height').replace('px', '') == 0) {
                jQuery(this).addClass('none');
            }
            else if (jQuery(this).css('height').replace('px', '') <= 240) {
           		jQuery(this).css('overflow-y', 'auto');
            	jQuery(this).removeClass('none');
            }
            else {
                jQuery(this).css('overflow-y', 'scroll');
                jQuery(this).removeClass('none');
            }
        });
        jQuery('.srSearchOptionList .srSearchOptionListElementChecked').each(function () {
            jQuery(this).parent().prev('.srSearchOptionText').html(add3Dots(jQuery(this).find('.srSearchOptionListElementText').html(), 10));
        });
        return true;
    }

    function createEmptyWidget() {

    }

    function createCSS(json, widgetElement) {
        var ss1 = document.createElement('style');
        ss1.setAttribute("type", "text/css");

        var styleContent = "";
        styleContent += "#" + widgetElement.attr("id") + "{";
        styleContent += addSizeRule("width", json.widget_width);
        styleContent += addSizeRule("width", json.auto_width, true);
        styleContent += addSizeRule("height", json.widget_height);
        styleContent += addSizeRule("height", json.auto_height, true);
        if (json.widget_height > 0 || json.widget_width > 0) {
            styleContent += addRule("overflow", "hidden");
        }
        styleContent += "}\n";
        styleContent += "\n#" + widgetElement.attr("id") + " .srJobList{";
        styleContent += addRule("background-color", json.bg_color_widget);
        styleContent += addSizeRule("width", json.widget_width);
        styleContent += addSizeRule("width", json.auto_width);
        styleContent += addSizeRule("height", json.widget_height);
        styleContent += addSizeRule("height", json.auto_height, true);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListTitles *{";
        styleContent += addRule("background-color", json.bg_color_headers);
        styleContent += addRule("color", json.txt_color_headers);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListJobOdd *{";
        styleContent += addRule("background-color", json.bg_color_odd_row);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListJobEven *{";
        styleContent += addRule("background-color", json.bg_color_even_row);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListJobEven td{";
        styleContent += addRule("color", json.txt_color_job);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListJobOdd td{";
        styleContent += addRule("color", json.txt_color_job);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListJobEven:hover *{";
        styleContent += addRule("background-color", json.bg_color_links);
        styleContent += "}\n";

        styleContent += "#" + widgetElement.attr("id") + " .srJobList .srJobListJobOdd:hover *{";
        styleContent += addRule("background-color", json.bg_color_links);
        styleContent += "}\n";

        if (ss1.styleSheet) {
            ss1.styleSheet.cssText = styleContent;
        } else {
            var tt1 = document.createTextNode(styleContent);
            ss1.appendChild(tt1);
        }
        return ss1;
    }

    function getObjectCss() {
        var css = null;
        try {
            css = document.styleSheets[0];
            if (!css) {
                var head = document.getElementsByTagName("head").item(0);
                head.appendChild(document.createElement("style"));
                css = document.styleSheets[0];
            }
        } catch (ex) {
            css = document.createStyleSheet("styles.css");
        }
        return css;
    }


    function addRule(style, value) {
        if (value != undefined) {
            return style + ":" + value + ";\n";
        } else {
            return "";
        }
    }

    function addSizeRule(style, value, real_value) {
        if (value != undefined) {
            if (value == "auto") {
                if (real_value == true) {
                    return style + ":" + value + ";\n";
                } else {
                    return style + ":100%;\n";
                }
            } else {
                return style + ":" + parseInt(value) + "px;\n";
            }
        } else {
            return "";
        }
    }

    var keyFacetTranslation = {
        facet_location: 'Location',
        facet_company: 'Company',
        facet_department: 'Department'
    };

    var keyFacetToFilterTranslation = {
        facet_location: 'filter_locations',
        facet_company: 'filter_companies',
        facet_department: 'filter_departments'
    };

    function createSearchBar(data, widgetID, json) {
        var group_code = json.group_id;
        var htmlContent = '';
        var queryString;
        if (filerJSON && filerJSON[widgetID] && filerJSON[widgetID]['queryString']) {
            queryString = filerJSON[widgetID]['queryString'];
        } else {
            queryString = defaultContent;
        }
        htmlContent += '<div class="srSearch">';
        htmlContent += '<form class="srSearchForm">';
        htmlContent += '<input class="srSearchInput" type="text" onblur="if(this.value==\'\') { this.value=\'' + defaultContent + '\'; }" onfocus="if(this.value==\'' + defaultContent + '\') { this.value=\'\'; }" value=\'' + queryString + '\' />' +
            '<input class="srSearchButton" type="button" value="Search"/>';
        htmlContent += '</form>';
        for (var facet in keyFacetTranslation) {
            if (!(!group_code && facet === 'facet_company')) {
                htmlContent += '<div class="srSearchOption" id="' + facet + '">';
                htmlContent += '<span class="srSearchOptionText">' + add3Dots(keyFacetTranslation[facet], 10) + '</span>';
                htmlContent += '<ul class="srSearchOptionList">';
                var facetElements = data.facets[facet];
                for (var facetElement in facetElements) {

                        if (filerJSON[widgetID] && (facetElement === filerJSON[widgetID][keyFacetToFilterTranslation[facet]])) {
                            htmlContent += '<li class="srSearchOptionListElement srSearchOptionListElementChecked">';
                        } else {
                            htmlContent += '<li class="srSearchOptionListElement">';
                        }
                        htmlContent += '<span class="srSearchOptionListElementText">' + facetElement + '</span>';
                        htmlContent += '</li>';

                }
                htmlContent += '</ul>';
                htmlContent += '</div>';
            }
        }
        htmlContent += '</div>';
        return htmlContent;

    }

    function createHeader(json) {
        var header = "<tr class='srJobListTitles'>";
        if (json.job_title != "undefined" && json.job_title == "true") {
            header = header + "<th class='srJobListJobTitle'><nobr>Job Title</nobr></th>";
        }
        if (typeof json.group_id != "undefined" && json.group_id.length > 0) {
            header = header + "<th class='srJobListCompanyName'><nobr>Company</nobr></th>";
        }
        if (json.type_of_employment != "undefined" && json.type_of_employment == "true") {
            header = header + "<th class='srJobListTypeOfEmployment'><nobr>Type of Employment</nobr></th>";
        }
        if (json.department != "undefined" && json.department == "true") {
            header = header + "<th class='srJobListDepartment'><nobr>Department</nobr></th>";
        }
        if (json.location != "undefined" && json.location == "true") {
            header = header + "<th class='srJobListLocation'><nobr>Location</nobr></th>";
        }
        if (json.occupational_area != "undefined" && json.occupational_area == "true") {
            header = header + "<th class='srJobListOccupationalArea'><nobr>Occupational Area</nobr></th>";
        }
        if (json.published_since != "undefined" && json.published_since == "true") {
            header = header + "<th class='srJobListPublishedSince'><nobr>Published Since</nobr></th>";
        }
        header = header + "</tr>";
        return header;
    }

    function prev(e) {
        var id = getWidgetId(this);
        var currentPage = getCurrentPage(id);
        if (currentPage > 0) {
            currentPage -= 1;
        }
        var limit = getLimit(id);
        var offset = currentPage * limit;
        setCurrentPage(id, currentPage);
        setOffset(id, offset);
        executeCurrentQuery(offset, limit, id);

        e.preventDefault();
        return false;
    }
    function next(e) {
        var id = getWidgetId(this);
        var currentPage = getCurrentPage(id);
        var pageCount = getPageCount(id);
        if (currentPage < pageCount - 1) {
            currentPage += 1;
        }
        var limit = getLimit(id);
        var offset = currentPage * limit;
        setCurrentPage(id, currentPage);
        setOffset(id, offset);
        executeCurrentQuery(offset, limit, id);

        e.preventDefault();
        return false;
    }

    function createPagination(itemsCount, countOnPage, id) {
        var content = '';
        var pageCount = Math.round(itemsCount / countOnPage);
        if (pageCount > 1) {
            setPageCount(id, pageCount);
            setLimit(id, countOnPage);
            content = '<div class="srPages">' +
                            '<span class="srPagesText srPagesTextPrevious">&nbsp;</span>' +
                            '<span class="srPagesText srPagesTextCenter">' + (getCurrentPage(id) + 1) + ' of ' + pageCount +'</span>' +
                            '<span class="srPagesText srPagesTextNext">&nbsp;</span>' +
                          '</div>';
        }
        return content;
    }

    function add3Dots(string, limit) {
        var dots = "...";
        if (string.length > limit) {
            // you can also use substr instead of substring
            string = string.substring(0, limit) + dots;
        }

        return string;
    }

    function format(date) {
        var weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];

        return [ weekday[date.getDay()], month[ date.getMonth()] + ' ' + date.getDate() , date.getFullYear()].join(', ');
    }

    return widget;
})(window);


