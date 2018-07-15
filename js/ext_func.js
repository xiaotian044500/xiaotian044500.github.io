/**------------------------------------------------------------------
 *  HUNAN
 *  last modify: 2016-09-13 PAM
 *
 *  cookie
 *  work for: maybe only themes/pure/js/ *.js
 *  changes: 
 * ------------------------------------------------------------------
 */

define(function(){
    var func_class = {
        // check out 'ele' is inner ele(decided by 'key', 'keyType') or outter
        isInside: function(ele, key, keyType, loop){
            rs = false
            if (!ele || !key || !keyType || !loop){
                return rs
            }
            loop = ('N0-0' === loop)?'N0-0':'N0-1'
            // N0-1, N0-0
            var dict = {1: 'id', 2: 'class', 3: 'name', 4: 'nodeName'}
            var start = ele, go = null, tmp = ''

            while(start){
                if(keyType % 4){
                    tmp = start.getAttribute(dict[keyType])
                }else{
                    tmp = start.nodeName
                }
                // changes: 20160913, name must be 'XXXXX.key' to prevent some bugs
                if(!(keyType % 3) && tmp && tmp.indexOf('.') > -1){
                    tmp = tmp.substring(tmp.indexOf('.') + 1)
                }

                if('N0-0' === loop){
                    if(key === tmp){
                        go = start
                        break
                    }else{
                        start = start.parentElement
                    }
                }
                if('N0-1' === loop){
                    if(key === tmp){
                        break
                    }else{
                        go = start
                        start = start.parentElement
                    }
                }
            }
            if(start){rs = go}

            return rs
            
        },
        // only support for here, case: ele already has className
        addClass: function(ele, name){
            if(!ele || !name){
                return false
            }
            if(ele.className.indexOf(name) > -1){
                return false
            }else{
                ele.className = ele.className + ' ' + name
                return true
            }
        },
        // only support for here, case: ele already has className
        removeClass: function(ele,name){
            if(!ele || !name){
                return false
            }
            if(-1 === ele.className.indexOf(name)){
                return false
            }else{
                ele.className = ele.className.replace(' ' + name, '')
                return true
            }
        },
        // get function name by javascript eneginer arguments.callee
        getFuncName: function (callee) {
            if (callee.name){
                return callee.name
            }else{
                return callee.toString().match(/function ([^\(]+)/)[1]
            } 
        },
        /**
         * 根据长度截取先使用字符串，超长部分追加...
         * @param str 对象字符串
         * @param len 目标字节长度
         * @return 处理结果字符串
         */
        cutString: function(str, len) {
            //length属性读出来的汉字长度为1
            if(str.length * 2 <= len) {
                return str
            }
            var strlen = 0
            var s = ""
            for(var i = 0;i < str.length; i++) {
                s = s + str.charAt(i)
                if (str.charCodeAt(i) > 128) {
                    strlen = strlen + 2
                    if(strlen >= len){
                        return s.substring(0,s.length-1) + "..."
                    }
                } else {
                    strlen = strlen + 1
                    if(strlen >= len){
                        return s.substring(0,s.length-2) + "..."
                    }
                }
            }
            return s
        }
    };
    return func_class
})