

$(document).ready(function(){
    // 菜单
    var manuItem = [
        {
            menuName: '首页',
            menuIcon: 'glyphicon glyphicon-home',
            menuId: 1,
            menuUrl: 'views/page1/page1.html',
            unionId: 'shouye',
        },
        {
            menuName: '互联网',
            menuIcon: 'glyphicon glyphicon-magnet',
            menuId: 2,
            menuUrl: '',
            unionId: 'youyi',
            children: [
                {
                    menuName: '腾讯',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 4,
                    menuUrl: 'views/page2/page2.html',
                },
                {
                    menuName: '阿里',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 5,
                    menuUrl: 'views/page3/page3.html',
                }
            ]
        },
        {
            menuName: '太阳系',
            menuIcon: 'glyphicon glyphicon-tower',
            menuId: 3,
            menuUrl: '',
            unionId: 'sky',
            children: [
                {
                    menuName: '地球',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 6,
                    menuUrl: 'views/page4/page4.html',
                },
                {
                    menuName: '火星',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 7,
                    menuUrl: 'views/page5/page5.html',
                },
                {
                    menuName: '水星',
                    menuIcon: 'glyphicon glyphicon-fire',
                    menuId: 8,
                    menuUrl: 'views/page6/page6.html',
                }
            ]
        },
    ]

    initMenu();
    menuClick();

    function initMenu () {
        $('#index-nav .navi').empty();
        var navHtml = '';
        $.each(manuItem, function (index, item) {
            navHtml += '<li role="presentation" class="nav-item">';
            navHtml += '<a class="nav-title"  data-toggle="collapse" href="#' + item.unionId + '" data-url="' + item.menuUrl + '"><i class="menu-icon ' + item.menuIcon + '"></i><span class="menu-name">' + item.menuName + '</span><i class="arrow glyphicon glyphicon-menu-right"></i><i class="arrow glyphicon glyphicon-menu-down"></i></a>';
            if (item.children && item.children.length > 0) {
                navHtml += '<ul class="collapse menuContent" id="' + item.unionId + '">';
                $.each(item.children, function (i, n) {
                    navHtml += '<li><a class="nav-link" data-url="' + n.menuUrl + '"><i class="link-icon menu-icon ' + n.menuIcon + '"></i><span class="menu-name">' + n.menuName + '</span><i class="arrow glyphicon glyphicon-menu-left"></i></a></li>';
                })
                navHtml += '</ul>';
            }
        });
        $('#index-nav .navi').html(navHtml);
    }

    function menuClick () {
        $('#index-nav').find('.nav-title').click(function(){
            $(this).parent().siblings().find(".menuContent").collapse("hide");
            $('.glyphicon-menu-down').hide();
            $('.glyphicon-menu-right').show();
            if ($(this).siblings().find('.nav-link').length < 1) {
                var url = $(this).attr('data-url');
                $('iframe').attr('src', url);
                $('.active-item').removeClass('active-item');
                $(this).addClass('active-item');
                $('.breadcrumb li').eq(0).html($(this).find('.menu-name').text());
                $('.breadcrumb li').eq(1).html('');
            } else {
                if ($(this).siblings('.in').length < 1) {
                    $(this).find('.glyphicon-menu-right').hide();
                    $(this).find('.glyphicon-menu-down').show();
                } else {
                    $(this).find('.glyphicon-menu-right').show();
                    $(this).find('.glyphicon-menu-down').hide();
                }
            }
        })
        $('#index-nav').find('.nav-title').eq(0).trigger('click');
        $('#index-nav').find('.nav-link').click(function(){
            $('.active-item').removeClass('active-item');
            $(this).parent().addClass('active-item');
            var url = $(this).attr('data-url');
            $('iframe').attr('src', url);
            $('.breadcrumb li').eq(0).html($(this).parents('.nav-item').find('.menu-name').eq(0).text());
            $('.breadcrumb li').eq(1).html($(this).find('.menu-name').text());
        })
    }

})