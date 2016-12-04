// Date Object Plus for Acrobat JavaScript

var nSecond = 1000;
var nMinute = 60 * nSecond;
var nHour = 60 * nMinute;
var nDay = 24 * nHour;
var nWeek = 7 * nDay;

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var	abbreviatedDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var shortestDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

var weekStartDay = 0; // Sunday

/*
var fullDateTime = "dddd, MMMM dd, yyyy h:mm:ss tt"
var sortableDateTime = "yyyy-MM-ddTHH:mm:ss"
var universalSortableDateTime = "yyyy-MM-dd HH:mm:ssZ"
var monthDay = "MMMM dd"
var yearMonth = "MMMM, yyyy"
*/

Object.defineProperty( Date, "SHORT_DATE", {
  value: "m/d/yyyy",
  writable: false,
  enumerable: true,
  configurable: true
});
Object.defineProperty( Date, "LONG_DATE", {
  value: "dddd, mmmm, dd, yyyy",
  writable: false,
  enumerable: true,
  configurable: true
});
Object.defineProperty( Date, "SHORT_TIME", {
  value: "h:MM tt",
  writable: false,
  enumerable: true,
  configurable: true
});
Object.defineProperty( Date, "LONG_TIME", {
  value: "h:MM:ss tt",
  writable: false,
  enumerable: true,
  configurable: true
});
Object.defineProperty( Date, "FULL_DATETIME", {
  value: "dddd, mmmm dd, yyyy h:MM:ss tt",
  writable: false,
  enumerable: true,
  configurable: true
});




Date.isLeapYear = function (nYear) {
	return (((nYear % 4 == 0) && (nYear % 100 !== 0)) || (nYear % 400 == 0));
};

Date.nextWeekDay = function() {
	var oReturnDate;
	var oDate = new Date();
	oDate.changeBy({"days": 1});
	if (oDate.getDay() < 5) {
		oReturnDate = oDate.changeBy({"days": 1});
	}
	if (oDate.getDay() == 5) {
		oReturnDate = oDate.changeBy({"days": 3});
	}
	if (oDate.getDay() == 6) {
		oReturnDate = oDate.changeBy({"days": 2});
	}
	return oReturnDate;
};

// FIX for business day
Date.nextWeek = function(businessDay) {
	var oDate = new Date();
	var nDay = oDate.getDay();
	var nDelta = 7 - nDay;
	oDate.changeBy({"days":nDelta});
	return oDate;
};

Date.nextMonth = function(businessDay) {
	var oDate = new Date();
	oDate.changeBy({"months": 1});
	oDate.setDate(1);
	if (businessDay && typeof businessDay == "boolean" && businessDay == true) {
		if (oDate.getDay() == 6) {
			oDate.changeBy({"days":2});
		}
		if (oDate.getDay() == 0) {
			oDate.changeBy({"days":1});
		}	
	}
	return oDate;
};

Date.daysBetween = function( oDateA, oDateB ) {
  var nDelta = oDateB.getTime() - oDateA.getTime();
  return Math.round(nDelta/nDay); 
};

Date.getAge = function getAge(oDate) {
	var oToday = new Date();
	var age = oToday.getFullYear() - oDate.getFullYear();
	var m = oToday.getMonth() - oDate.getMonth();
	if (m < 0 || (m === 0 && oToday.getDate() < oDate.getDate())) {
		age--;
	}
	return age;
}

Date.getAgeFromString = function getAge(cDate) {
	var oDate = util.scand("mm/dd/yyyy", cDate);
	var oToday = new Date();
	var age = oToday.getFullYear() - oDate.getFullYear();
	var m = oToday.getMonth() - oDate.getMonth();
	if (m < 0 || (m === 0 && oToday.getDate() < oDate.getDate())) {
		age--;
	}
	return age;
}

Date.fromString = function(cFormat, cDate) {
	return util.scand(cFormat, cDate);
}

/**
 * Resets the time of this Date object to 12:00 AM (00:00), which is the start of the day.
 * @param {Boolean}  .clone() this date instance before clearing Time
 * @return {Date}    this
 */
Date.prototype.reset = function () {
	this.setHours(0);
	this.setMinutes(0);
	this.setSeconds(0);
	this.setMilliseconds(0);
	return this;
};

Date.prototype.getDaysInMonth = function (nYear, nMonth) {
	return [31, (this.isLeapYear(nYear) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][nMonth];
};

Date.prototype.changeBy = function (oChange) {
	if (oChange.milliseconds) {
		this.setMilliseconds(this.getMilliseconds() + oChange["milliseconds"]);
	}
	if (oChange.seconds) {
		this.setMilliseconds(this.getMilliseconds() + (oChange["seconds"]*nSecond));
	}
	if (oChange.minutes) {
		this.setMilliseconds(this.getMilliseconds() + (oChange["minutes"]*nMinute));
	}
	if (oChange.hours) {
		this.setMilliseconds(this.getMilliseconds() + (oChange["hours"]*nHour));	
	}
	if (oChange.days) {
		this.setMilliseconds(this.getMilliseconds() + (oChange["days"]*nDay));
	}
	if (oChange.weeks) {
		this.setMilliseconds(this.getMilliseconds() + (oChange["weeks"]*nWeek));
	}
	if (oChange.months) {
		var n = this.getDate();
		this.setDate(1);
		this.setMonth(this.getMonth() + oChange["months"]);
		this.setDate(Math.min(n, this.getDaysInMonth(this.getFullYear(), this.getMonth())));
	}
	if (oChange.years) {
		var n = this.getDate();
		this.setDate(1);
		this.setMonth(this.getMonth() + (oChange["years"]*12));
		this.setDate(Math.min(n, this.getDaysInMonth(this.getFullYear(), this.getMonth())));
	}
	return this;
};

Date.prototype.getDayOfYear = function () {
	return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / nDay);
};

Date.prototype.getWeekOfYear = function (firstDayOfWeek) {
	var y = this.getFullYear(),
		m = this.getMonth(),
		d = this.getDate();
	if (firstDayOfWeek) {
		var dow = firstDayOfWeek;
	}
	else {
		var dow = weekStartDay;
	}
	var offset = 7 + 1 - new Date(y, 0, 1).getDay();
	if (offset == 8) {
		offset = 1;
	}
	var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / nDay) + 1;
	var w = Math.floor((daynum - offset + 7) / 7);
	if (w === dow) {
		y--;
		var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
		if (prevOffset == 2 || prevOffset == 8) {
			w = 53;
		} else {
			w = 52;
		}
	}
	return w;
};

			
			