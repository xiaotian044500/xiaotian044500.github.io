/**------------------------------------------------------------------
 *  HUNAN
 *  last modify: 2016-07-28
 *
 *  兼容IE8 addEventListener lib
 *  request: none
 *  work for: *.js
 * ------------------------------------------------------------------
 */


define(function() {
    if (document.addEventListener) {
        var addEvent = function(elem, type, handler) {
            elem.addEventListener(type, handler, false)
        }
        var removeEvent = function(elem, type, handler) {
            elem.removeEventListener(type, handler, false)
        }
    } else {
        var addEvent = function(elem, type, handler) {
            elem.attachEvent("on" + type, handler)
        }
        var removeEvent = function(elem, type, handler) {
            elem.detachEvent("on" + type, handler)
        }
    }
    return {add: addEvent, remove: removeEvent}
})