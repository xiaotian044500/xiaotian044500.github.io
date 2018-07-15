// https://custompbwaters.github.io/
// adjust for fun
// Q-1: 覆盖其他点击事件 所造成的额外的代码
// Q-2: 字体的旋转角度成正态分布
// Q-3: 自定义语言包

! function(e, t, a) {  // window, document, undifined
    function n() {
        css(".word-demo{transform: rotate(15deg); display: inline-block; color: #f00; position: fixed; -moz-user-select:none;/*火狐*/ -webkit-user-select:none; -ms-user-select:none; -khtml-user-select:none; user-select:none;}"),
            o(),
            r()
    }

    function r() {
        for (var e = 0; e < data.length; e++)
            data[e].alpha <= 0 ? (t.body.removeChild(data[e].el),
                data.splice(e, 1)) : (data[e].y--,
                // data[e].scale += .002,
                data[e].alpha -= .013,
                data[e].el.style.cssText = "left:" + data[e].x + "px;top:" + data[e].y + "px;opacity:" + data[e].alpha + ";transform:scale(" + data[e].scale + "," + data[e].scale + ") rotate(" + data[e].rotate + "deg);color:" + data[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }

    function o() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function(evt) {
            var evt = evt || window.event
            var target = evt.target || evt.srcElement
            if(!target || 'A' === target.tagName || 'link' === target.className.substring(0, 4)){
                return
            }
            t && t(),
                i(evt)
        }
    }

    function i(e) {
        var a = t.createElement("div");
        a.className = "word-demo",
            data.push({
                el: a,
                x: e.clientX - 5,
                y: e.clientY - 5,
                scale: 1,
                alpha: 1,
                rotate: ~~(90 * Math.random()) - 45,
                color: s()
            }),
        a.innerText = '哈'
        t.body.appendChild(a)
    }

    function css(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }

    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var data = [];
    e.requestAnimationFrame = function() {
            return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
                setTimeout(e, 1e3 / 60)
            }
        }(),
        n()
}(window, document);