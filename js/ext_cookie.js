/**------------------------------------------------------------------
 *  HUNAN
 *  last modify: 2016-08-26 AM
 *
 *  cookie
 *  work for: maybe only themes/pure/js/ *.js
 *  changes: 
 *      1. var e = e || window.event // compatible for IE8
 * ------------------------------------------------------------------
 */

define(function(){
	var cookie_class = {
		_doc: null,
		getCookie: function(name) {
			var arrstr = this._doc.cookie.split("; ");
			var temp,value;
			for (var i = 0,len=arrstr.length; i < len; i++) {
				temp = arrstr[i].split("=");
				if (temp[0] == name) {
					value = decodeURIComponent(temp[1]);
				}
			}

			if (typeof(value) != "undefined") {
				return (value);
			} else {
				return null;
			}
		},

		setCookie: function(name, value) {
			if ((name && value) || (name && 0 === parseInt(value))) {
				var oldaid = this.getCookie(name);
				if(oldaid&&(-1 == oldaid.indexOf(value))){
					value = oldaid + ',' + value;
				}
				var exp = new Date();
				exp.setTime(exp.getTime() + 36000000);
				this._doc.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + exp.toGMTString();
				return name + ':' + value;
			} else {
				return null;
			}
		},
		clearCookie: function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 36000000);
			var cval = this.getCookie(name);
			if (null != cval) {
				this._doc.cookie = name + "=" + encodeURIComponent(cval) + "; expires=" + exp.toGMTString();
			}
		},
		setDocument: function(doc){
			this._doc = doc?doc: document
		}
	};
	cookie_class.setDocument(0)
	return cookie_class
	// return {ext_cookie: cookie_class}
})