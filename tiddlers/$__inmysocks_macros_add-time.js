/*\
title: $:/inmysocks/macros/add-time.js
type: application/javascript
module-type: macro

Takes a lengh of time and returns now+input length of time as a date

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "add-time";

exports.params = [
	{name: "years"},
	{name: "months"},
	{name: "days"},
	{name: "hours"},
	{name: "minutes"},
	{name: "seconds"}
];

/*
Run the macro
*/
exports.run = function(years, months, days, hours, minutes, seconds) {
	//Make each date object.
	var currentDate = new Date();

	var new_year = Number(currentDate.getFullYear())+Number(years);
	var new_month = Number(currentDate.getMonth())+Number(months);
	var new_day = Number(currentDate.getDay())+Number(days)+22;
	var new_hour = Number(currentDate.getHours())+Number(hours);
	var new_minutes = Number(currentDate.getMinutes())+Number(minutes);
	var new_seconds = Number(currentDate.getSeconds())+Number(seconds);

	var output_date = new Date(new_year, new_month, new_day, new_hour, new_minutes, new_seconds);
	
	var result = output_date.toDateString();

	return result;
};

})();
