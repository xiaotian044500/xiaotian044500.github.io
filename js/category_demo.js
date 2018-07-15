/**------------------------------------------------------------------
 *  HUNAN
 *  last modify: 2017-05-22
 *
 *  hexo-landscape-category model
 *  request: 
 *  work for: cateogry
 * ------------------------------------------------------------------
 *  version 2.2.0X
 *      - 新特性 基础功能完成
 *  version 2.3.0X
 *      - 新特性 分类导航逻辑修正, 仅支持 2-level 层级的分类
 *  @TODO :
 *        - NAN
 *        - NAN
 * ------------------------------------------------------------------
 */


require.config({
    baseUrl: location.protocol + '//' + location.host + "/js/",
    paths: {
        "ael": "ext_addEventListener-min",
        "func": "ext_func-min",
        // "ck": "ext_cookie-min",
        // "md5": "ext_md5-min",
        // "ajax": "ext_ajax-min",
        // "sprintf": "ext_sprintf-min"
    }　　
});

// require(['ael', 'func', 'ck', 'md5', 'ajax', 'sprintf'], function(Qa, Qf, Qc, Qm, QA, Qv) {
require(['ael', 'func'], function(Qa, Qf) {
    var option = (
        function(commend) {
            var option_class = {
                _host: location.protocol + '//' + location.host,
                _cache: {
                    languages: {
                        runtimeContent: ['category']
                    }
                },
                _ele: {},
                _data: {},
                _request: ['/api/ext/no.php'],
                load_document: function() {
                    this._ele.ac = document.getElementById('accordion')

                    for (var i in this._ele) {
                        if (!this._ele[i]) {
                            return null
                        }

                    }

                    if (window.console) {
                        console.log('INF: element ready[' + this._cache.languages['runtimeContent'][0] + '].')
                    }
                    return this
                },
                load_event: function() {
                    option._data = {
                        category: {
                            cur: []
                        }
                    }

                    /**
                     * [category_click_ctrl]
                     * @return {[type]} [description]
                     */
                    var category_click_ctrl = function(e) {
                        var e = e || window.event
                        var target = e.target || e.srcElement

                        if(!target){
                            return
                        }

                        slct_ele = Qf.isInside(target, 'link', 2, 'N0-0') || Qf.isInside(target, 'link active', 2, 'N0-0') 
                        if(!slct_ele){
                            return
                        }

                        loop_ele = slct_ele.nextElementSibling
                        if(!loop_ele){
                            return
                        }

                        loop_li_es = loop_ele.querySelectorAll("LI")

                        if(loop_li_es && loop_li_es.length){
                            if(2 === option._data.category.cur.length && option._data.category.cur[0][option._data.category.cur[0].length - 1] !== slct_ele){
                                if(option._data.category.cur[1][0].contains(slct_ele)){
                                    // console.log('here 同父类触发 打开子类')
                                    option.utils.closeOpened(slct_ele, loop_ele)
                                    option.utils.dropdown('block' !== loop_ele.style.display)
                                }else if(option._data.category.cur[0][0] == slct_ele){
                                    // console.log('here 同父类触发 关闭有子类的父类')
                                    option.utils.closeOpened(slct_ele, loop_ele)
                                }else{
                                    // console.log('here 异父类触发 关闭异类')
                                    option.utils.closeOpened(slct_ele, loop_ele)
                                    option.utils.dropdown('block' !== loop_ele.style.display)
                                }
                                return
                            }else{
                                // case 1: init
                                // case 2: 1-level same-ele-repeat-click, max 1-level
                                // console.log('here 初始化 or 当前唯一/临近类状态切换')
                                option._data.category.cur  = [[slct_ele], [loop_ele]]
                                option.utils.dropdown('block' !== loop_ele.style.display)
                            }

                        }

                    }
                    Qa.add(option._ele.ac, 'click', category_click_ctrl)

                    if (window.console) {
                        console.log('INF: event ready[' + this._cache.languages['runtimeContent'][0] + '].')
                    }
                    return this
                },
                utils: {
                    closeOpened: function(new_link, new_submenu){
                        link = option._data.category.cur[0]
                        submenu = option._data.category.cur[1]
                        if(submenu[0].contains(new_submenu) && submenu[0] != new_submenu){
                            // if(submenu[0] == new_submenu){}
                            option._data.category.cur[0] = link.concat(new_link)
                            option._data.category.cur[1] = submenu.concat(new_submenu)
                        }else{
                            for (var i = submenu.length - 1; i >= 0; i--) {
                                if("block" !== submenu[i].style.display){
                                    continue
                                }
                                // submenu[i].style = "display: none;"
                                // option.utils.slideToggle(submenu[i])
                                Qf.removeClass(link[i], 'active')
                                $(submenu[i]).slideToggle(500)
                                // console.log('here loop-deepth: ' + i)
                            }
                            option._data.category.cur[0] = [new_link]
                            option._data.category.cur[1] = [new_submenu]
                        }
                    },
                    dropdown: function(status){
                        var len = 0

                        if(status){
                            // 开 只需 开最深层
                            if(1 === option._data.category.cur[1].length){
                                Qf.addClass(option._data.category.cur[0][0], 'active')
                                $(option._data.category.cur[1][0]).slideToggle(500)
                            }else{
                                for (var i = option._data.category.cur[1].length - 1; i > 0; i--) {
                                    // option._data.category.cur[1][i].style = "display: block; overflow: hidden;"
                                    // option.utils.slideToggle(option._data.category.cur[1][i])
                                    Qf.addClass(option._data.category.cur[0][i], 'active')
                                    $(option._data.category.cur[1][i]).slideToggle(500)
                                }
                            }
                        }else{
                            // 关 则 一关到底
                            for (var i = option._data.category.cur[1].length - 1; i >= 0; i--) {
                                // option._data.category.cur[1][i].style = "display: none;"
                                // option.utils.slideToggle(option._data.category.cur[1][i])
                                Qf.removeClass(option._data.category.cur[0][i], 'active')
                                $(option._data.category.cur[1][i]).slideToggle(500)
                            }
                        }
                    },
                    slideToggle: function(ele){
                        var unit = ele.previousElementSibling
                        unit = unit.getBoundingClientRect().height + 3
                        var minheight = 1 * unit;
                        var maxheight = ele.childElementCount * unit;
                        var time = 1000;
                        var timer = null;
                        var toggled = false;

                        var controler = ele;
                        var slider = ele;
                        slider.style.height = minheight + 'px'; //not so imp,just for my example

                        clearInterval(timer);
                        var instanceheight = parseInt(slider.style.height);  // Current height
                        var init = (new Date()).getTime(); //start time
                        var height = (toggled = !toggled) ? maxheight: minheight; //if toggled

                        var disp = height - parseInt(slider.style.height);
                        timer = setInterval(function() {
                            var instance = (new Date()).getTime() - init; //animating time
                            if(instance <= time ) { //0 -> time seconds
                                var pos = instanceheight + Math.floor(disp * instance / time);
                                slider.style.height =  pos + 'px';
                            }else {
                                slider.style.height = height + 'px'; //safety side ^^
                                clearInterval(timer);
                            }
                        }, 1);
                    }
                },
                start: function() {
                    if(this.load_document()){
                        this.load_event()
                    }
                }
            }

            return option_class
        }
    )('force');
    option.start()
    window.Op = option
});