/**------------------------------------------------------------------
 *  HUNAN
 *  last modify: 2017-05-22
 *
 *  hexo-landscape-index model
 *  request: 
 *  work for: blog-index
 * ------------------------------------------------------------------
 *  version 2.2.0X
 *      - 新特性 基础功能完成
 *  version 2.3.01
 *      - 新特性 增加浮动导航
 *  version 2.3.02
 *      - 优化 优化代码风格, 精简代码
 *  @TODO :
 *        - NAN
 *        - NAN
 * ------------------------------------------------------------------
 */


require.config({
    baseUrl: location.protocol + '//' + location.host + "/js/",
    paths: {
        // "ael": "ext_addEventListener-min",
        "func": "ext_func-min",
        // "ck": "ext_cookie-min",
        // "md5": "ext_md5-min",
        // "ajax": "ext_ajax-min",
        // "sprintf": "ext_sprintf-min"
    }
});

// require(['ael', 'func', 'ck', 'md5', 'ajax', 'sprintf'], function(Qa, Qf, Qc, Qm, QA, Qv) {
require(['func'], function(Qf) {
    var option = (
        function(commend) {
            var option = {
                _host: location.protocol + '//' + location.host,
                _cache: {
                    languages: {
                        runtimeContent: ['blog-index'],
                        canvasSetting: {
                            "el": "#banner", // （必选）指定一个父容器
                            // "width": 1349, // （可选）宽度：不写默认为父容器的大小
                            // "height": 300, // （可选）高度：
                            "bgcolor": "#222222", // （可选）画布的背景颜色
                            "bgcolorOpacity": 0.6, // （可选）背景透明度
                            "color": "#ffffff", // （可选）粒子的颜色
                            "concentration": 0.2, // （可选）浓度
                            "radius": 5, // （可选）例子半径
                            "opacity": 0.9, // （可选）粒子透明度
                            "duration": 10, // （可选）运动的时间（秒）大概值不一定精确
                            "rangeRadius": 512, // （可选）粒子运动的范围  
                            // "tweenType": "", // （可选）粒子运动的方式(即js缓动算法)，不写表示每一个粒子随机一个方式，"easeInOutQuad" || "easeInOutCubic" || "easeInOutBack" || "easeOutBounce"
                            // "tweenAni": "", // （可选）当粒子进行自定义动画的时候使用那个缓动，不指定则使用 easeInOutBack
                        },
                        canvasText: {
                            "content" : [
                                "时间在我们每个人身上所沉淀的都是我们自己选择的",
                                "XT044500",
                                "知其雄,守其雌,为天下溪.为天下溪,常德不离,复归于婴儿.知其白,守其黑,为天下式.为天下式,常德不忒,复归于无极.知其荣,守其辱,为天下谷.为天下谷,常德乃足,复归于朴.朴散则为器,圣人用之,则为官长,姑大制不割. - 道德经 老子",
                                "Everything that you've learnt and all the hardships you've suffered will all come in handy at some point in your life. - Francis Scott Fitzgerald"
                            ]
                        }
                    }
                },
                _ele: {},
                _data: {},
                _request: ['/api/ext/no.php'],
                load_document: function() {
                    this._ele.ub = document.getElementById('utility-bar')  // float-bar
                    this._ele.m = document.getElementById('main')  // article-container
                    this._ele.artc = this._ele.m.getElementsByTagName('ARTICLE')
                    this._ele.st = document.getElementById('j-show-text')  // article-title-showed

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
                        article: {
                            cur: [],
                            floatBarHeight: 0,
                            movement: {
                                src: [],  // 数据源, count 3
                                res: 0  // 结论, 0: 初始状态, 1: 向上, 2: 向下
                            }
                        }
                    }

                    var setting = option._cache.languages.canvasSetting
                    var setting_ext = option._cache.languages.canvasText
                    var test = new granule(setting) || {};    // 设置动画的属性

                    if(!test){
                        return
                    }

                    test.startAnimation();
                    // default: 128(, start as ASCII code 64(@)), but , change it as random do better funny
                    var num = ~~(Math.random() * 1000) % 256;
                    var timeout = 3000;
                    // ACSII code
                    var dynic = function(){
                            if(test){
                                if(num % 2){
                                    test.closeAniStauts()
                                    timeout = 240000
                                    clearInterval(boring)
                                    boring = setInterval(dynic, timeout)
                                }else{
                                    // console.log(num/2)
                                    test.echo(String.fromCharCode(num/2))
                                    timeout = 10000

                                    clearInterval(boring)
                                    // 切换至 自定义内容
                                    if(0 === num % 256){
                                        boring = setInterval(dynic_diy, timeout)
                                    }else{
                                        boring = setInterval(dynic, timeout)
                                    }
                                }

                                console.log(num)
                                num = (1 + num) % 256
                            }else{
                                console.log('generate granule failure')
                                clearInterval(boring)
                            }
                        }
                    // 自定义string 需要判断 粒子数是否足够显示
                    var dynic_diy = function(){
                            if(test || !setting_ext || !setting_ext.content || !setting_ext.content.length){
                                if(!setting_ext.hasOwnProperty("content_ctrl")){
                                    setting_ext.content_ctrl = {
                                        'cur_str' : ~~(Math.random() * 10) % setting_ext.content.length,
                                        'cur_char' : 0
                                    }
                                }

                                if(num % 2){
                                    test.closeAniStauts()
                                    timeout = 240000
                                    clearInterval(boring)
                                    boring = setInterval(dynic_diy, timeout)
                                }else{
                                    // console.log(setting_ext.content[setting_ext.content_ctrl.cur_str][setting_ext.content_ctrl.cur_char])
                                    test.echo(setting_ext.content[setting_ext.content_ctrl.cur_str][setting_ext.content_ctrl.cur_char])
                                    timeout = 10000
                                    clearInterval(boring)
                                    boring = setInterval(dynic_diy, timeout)

                                    setting_ext.content_ctrl.cur_char += 1

                                    if(setting_ext.content_ctrl.cur_char == setting_ext.content[setting_ext.content_ctrl.cur_str].length){
                                        setting_ext.content_ctrl.cur_str += 1
                                        // 切换至 ASCII code
                                        if(setting_ext.content_ctrl.cur_str === setting_ext.content.length){
                                            clearInterval(boring)
                                            boring = setInterval(dynic, timeout)
                                        }
                                        setting_ext.content_ctrl.cur_str = setting_ext.content_ctrl.cur_str % setting_ext.content.length
                                        setting_ext.content_ctrl.cur_char = 0
                                    }
                                }
                                console.log(num)
                                num = (1 + num) % 256
                            }else{
                                console.log('generate granule failure')
                                clearInterval(boring)
                            }
                        }

                    // 定时任务开启
                    if(setting_ext.content.length){
                        var boring = setInterval(dynic_diy, timeout);
                    }else{
                        var boring = setInterval(dynic, timeout);
                    }

                    var checkoutMovement = function(src){
                        // console.log(src)
                        tmp = []
                            , tmpp = 0
                        for (var i = src.length - 1; i > 0; i--) {
                            tmp.push(src[i] - src[i-1])
                        }

                        for(j in tmp){
                            tmpp += (tmp[j] > 0)?1:((tmp[j] < 0)?-1:0)
                        }
                        tmpp = (tmpp > 0)?1:((tmpp < 0)?-1:0)

                        switch(tmpp){
                            case 1:
                                // console.log('up')
                                break
                            case 0:
                                // console.log('unmove')
                                break
                            case -1:
                                // console.log('down')
                                break
                            default:
                                console.log('NAN')
                                break
                        }

                        return tmpp
                    }

                    /**************************** window 事件 start ****************************/
                    var float_bar = option._ele.ub
                    // 当canvas移出屏幕时, 停止canvas动画. 否则: 因为balls 都在屏幕之外(x<0, y<0), 新增的ext_balls不会删除(删除依据的是:是否在屏幕之外), 造成浏览器压力过大.
                    window.onscroll = function(){
                        // option._ele.st.innerText = test.canvas.getBoundingClientRect().top + test.canvas.height
                        var articles = option._ele.artc
                            , cur_movement = 0

                        if(test && (test.canvas.getBoundingClientRect().top + test.canvas.height)>(option._data.article.floatBarHeight + 10) ){
                            if(!boring){
                                boring = setInterval(dynic_diy, timeout);
                            }
                        }else{
                            boring = boring?clearInterval(boring):boring
                        }

                        // @FUTURE 预测用户即将发生的行为
                        if('/' != location.pathname){  // 仅首页需要
                            return
                        }
                        if(option._data.article.movement.src.slice(-1) != test.canvas.getBoundingClientRect().top){
                            if(option._data.article.movement.src.length < 3){
                                option._data.article.movement.src.push(test.canvas.getBoundingClientRect().top)
                            }else{
                                option._data.article.movement.src.push(test.canvas.getBoundingClientRect().top)
                                option._data.article.movement.src.shift()
                            }
                            cur_movement = checkoutMovement(option._data.article.movement.src)
                        }

                        if(!option._data.article.cur.length){
                            tmp = 0
                            // 初始化 case 1: 第一篇之前, 2: 最后一篇之后, 3: 合适
                            for (var i = articles.length - 1; i >= 0; i--) {
                                if(articles[i].getBoundingClientRect().top >= 0){
                                    tmp = i
                                    continue
                                }else{
                                    break
                                }
                            }
                            option._data.article.cur[0] = tmp?tmp:0
                            option._ele.st.innerText = option._ele.artc[option._data.article.cur[0]].querySelector('.article-title').innerText
                        }else{
                            if(option._ele.artc[option._data.article.cur[0]].getBoundingClientRect().top >= 0){
                                tmp = 0
                                for (var i = option._data.article.cur[0]; i >= 0; i--) {
                                    if(articles[i].getBoundingClientRect().bottom >= option._data.article.floatBarHeight){
                                        tmp = i
                                        continue
                                    }else{
                                        break
                                    }
                                }
                                option._data.article.cur[0] = tmp
                                option._ele.st.innerText = option._ele.artc[option._data.article.cur[0]].querySelector('.article-title').innerText
                            }else{
                                tmp = option._ele.artc.length - 1
                                for (var i = option._data.article.cur[0]; i < option._ele.artc.length; i++) {
                                    if(articles[i].getBoundingClientRect().top < option._data.article.floatBarHeight){
                                        tmp = i
                                        continue
                                    }else{
                                        break
                                    }
                                }
                                option._data.article.cur[0] = tmp
                                option._ele.st.innerText = option._ele.artc[option._data.article.cur[0]].querySelector('.article-title').innerText
                                // console.log(option._ele.st.innerText)
                            }
                        }

                        if(test && (test.canvas.getBoundingClientRect().top + test.canvas.height)>(option._data.article.floatBarHeight + 10) ){
                            $('#utility-bar').fadeOut()
                            // Qf.removeClass(float_bar, 'is_stuck')
                        }else{
                            $('#utility-bar').fadeIn()
                            Qf.addClass(float_bar, 'is_stuck')

                            if(!option._data.article.floatBarHeight && option._ele.ub.getBoundingClientRect().height){
                                option._data.article.floatBarHeight = option._ele.ub.getBoundingClientRect().height
                            }
                        }
                    }

                    // 失去焦点/获得焦点时, canvas 动画控制. (切换浏览器选项卡时)
                    window.onfocus = function() {
                        if(!boring){
                            boring = setInterval(dynic_diy, timeout);
                        }
                    }
                    window.onblur = function() {
                        boring = boring?clearInterval(boring):boring
                    }
                    /**************************** window 事件 end ****************************/

                    if (window.console) {
                        console.log('INF: event ready[' + this._cache.languages['runtimeContent'][0] + '].')
                    }
                    return this
                },
                utils: {
                },
                start: function() {
                    if(this.load_document() && this.load_event()){
                    }
                }
            }

            return option
        }
    )('force');

    option.start()
    window.Op = option
});