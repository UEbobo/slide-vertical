// JavaScript Document
(function($) {
    $.fn.scrool = function(options) {

        //默认配置
        var defaults = {
            dataSource: [], // 数据
            rowHeight: 30, // 行高
            speend: 30, // 速度，越大速度越慢
            direction: top // top向上，bottom向下
        };

        var opts = $.extend({}, defaults, options);

        var marquee = '';

        // 向上滚动函数
        function marqueeTop(dom, hei) {
            $('.scrool-inner').animate({
                marginTop: '-=1'
            }, 0, function() {
                var marginTop = Math.abs(parseInt($('.scrool-inner').css('margin-top')));
                if (marginTop > hei) {
                    var that = $(this);
                    var firstA = $('.scrool-inner a').first();
                    firstA.appendTo(that);
                    that.css("margin-top", 0);
                }
            });
        };

        // 向下滚动函数
        function marqueeBottom(dom, hei) {
            $('.scrool-inner').animate({
                marginTop: '+=1'
            }, 0, function() {
                var marginTop = Math.abs(parseInt($('.scrool-inner').css('margin-top')));
                if (marginTop > hei) {
                    var that = $(this);
                    var firstA = $('.scrool-inner a').last();
                    firstA.prependTo(that);
                    that.css("margin-top", 0);
                }
            });
        };

        // jquery链式操作
        this.each(function(i) {
            var that = $(this),
                inner = that.find('.scrool-inner'),
                data = opts['dataSource'];

            // 生成dom
            var dom = '';
            for (var i = 0; i < data.length; i++) {
                dom = dom + '<a target="_blank" href="' + data[i].src + '">' + data[i].name + '</a>';
            }
            $('.scrool-inner').append(dom);

            // 定时函数
            marquee = setInterval(function() {
                var innerHei = $('.scrool-inner').height(),
                    outerHei = that.height();

                // 如果内容不超过，则不去滚动
                if (innerHei > outerHei) {

                    // 判断是向上还是向下滚动
                    if (opts['direction'] === 'top') {
                        marqueeTop(that, opts['rowHeight']);
                    } else if (opts['direction'] === 'bottom') {
                        marqueeBottom(that, opts['rowHeight']);
                    };

                } else {
                    clearInterval(marquee);
                }
            }, opts['speend']);

            // 鼠标悬停事件
            that.hover(function() {
                clearInterval(marquee);
            }, function() {
                marquee = setInterval(function() {
                    var innerHei = $('.scrool-inner').height(),
                        outerHei = that.height();

                    // 如果内容不超过，则不去滚动
                    if (innerHei > outerHei) {
                        // 判断是向上还是向下滚动
                        if (opts['direction'] === 'top') {
                            marqueeTop(that, opts['rowHeight']);
                        } else if (opts['direction'] === 'bottom') {
                            marqueeBottom(that, opts['rowHeight']);
                        };
                    } else {
                        clearInterval(marquee);
                    }
                }, opts['speend']);
            });

        });

    };

})(jQuery);
