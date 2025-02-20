var Layout = function() {
    var e = "layouts/layout4/img/"
        , a = "layouts/layout4/css/"
        , s = App.getResponsiveBreakpoint("md")
        , i = []
        , t = []
        , o = function() {
        var e, a = $(".page-content"), i = $(".page-sidebar"), t = $("body");
        if (t.hasClass("page-footer-fixed") === !0 && t.hasClass("page-sidebar-fixed") === !1) {
            var o = App.getViewPort().height - $(".page-footer").outerHeight() - $(".page-header").outerHeight()
                , r = i.outerHeight();
            r > o && (o = r + $(".page-footer").outerHeight()),
            a.height() < o && a.css("min-height", o)
        } else {
            if (t.hasClass("page-sidebar-fixed"))
                e = l(),
                t.hasClass("page-footer-fixed") === !1 && (e = e - $(".page-footer").outerHeight() - 60);
            else {
                var n = $(".page-header").outerHeight()
                    , d = $(".page-footer").outerHeight();
                e = App.getViewPort().width < s ? App.getViewPort().height - n - d : i.height() + 20,
                e + n + d <= App.getViewPort().height && (e = App.getViewPort().height - n - d - 60)
            }
            a.css("min-height", e)
        }
    }
        , r = function(e, a, i) {
        var t = location.hash.toLowerCase()
            , o = $(".page-sidebar-menu");
        if ("click" === e || "set" === e ? a = $(a) : "match" === e && o.find("li > a").each(function() {
            var e = $(this).attr("ui-sref");
            if (i && e) {
                if (i.is(e))
                    return void (a = $(this))
            } else {
                var s = $(this).attr("href");
                if (s && (s = s.toLowerCase(),
                s.length > 1 && t.substr(1, s.length - 1) == s.substr(1)))
                    return void (a = $(this))
            }
        }),
        a && 0 != a.size() && "javascript:;" != a.attr("href") && "javascript:;" != a.attr("ui-sref") && "#" != a.attr("href") && "#" != a.attr("ui-sref")) {
            parseInt(o.data("slide-speed")),
                o.data("keep-expanded");
            o.hasClass("page-sidebar-menu-hover-submenu") === !1 ? o.find("li.nav-item.open").each(function() {
                var e = !1;
                $(this).find("li").each(function() {
                    var s = $(this).attr("ui-sref");
                    if (i && s) {
                        if (i.is(s))
                            return void (e = !0)
                    } else if ($(this).find(" > a").attr("href") === a.attr("href"))
                        return void (e = !0)
                }),
                e !== !0 && ($(this).removeClass("open"),
                    $(this).find("> a > .arrow.open").removeClass("open"),
                    $(this).find("> .sub-menu").slideUp())
            }) : o.find("li.open").removeClass("open"),
                o.find("li.active").removeClass("active"),
                o.find("li > a > .selected").remove(),
                a.parents("li").each(function() {
                    $(this).addClass("active"),
                        $(this).find("> a > span.arrow").addClass("open"),
                    1 === $(this).parent("ul.page-sidebar-menu").size() && $(this).find("> a").append('<span class="selected"></span>'),
                    1 === $(this).children("ul.sub-menu").size() && $(this).addClass("open")
                }),
            "click" === e && App.getViewPort().width < s && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click()
        }
    }
        , n = function() {
        $(".page-sidebar").on("click", "li > a", function(e) {
            if (!(App.getViewPort().width >= s && 1 === $(this).parents(".page-sidebar-menu-hover-submenu").size())) {
                if ($(this).next().hasClass("sub-menu") === !1)
                    return void (App.getViewPort().width < s && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click());
                var a = $(this).parent().parent()
                    , i = $(this)
                    , t = $(".page-sidebar-menu")
                    , r = $(this).next()
                    , n = t.data("auto-scroll")
                    , l = parseInt(t.data("slide-speed"))
                    , d = t.data("keep-expanded");
                d !== !0 && (a.children("li.open").children("a").children(".arrow").removeClass("open"),
                    a.children("li.open").children(".sub-menu:not(.always-open)").slideUp(l),
                    a.children("li.open").removeClass("open"));
                var p = -200;
                r.is(":visible") ? ($(".arrow", $(this)).removeClass("open"),
                    $(this).parent().removeClass("open"),
                    r.slideUp(l, function() {
                        n === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? t.slimScroll({
                            scrollTo: i.position().top
                        }) : App.scrollTo(i, p)),
                            o()
                    })) : ($(".arrow", $(this)).addClass("open"),
                    $(this).parent().addClass("open"),
                    r.slideDown(l, function() {
                        n === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? t.slimScroll({
                            scrollTo: i.position().top
                        }) : App.scrollTo(i, p)),
                            o()
                    })),
                    e.preventDefault()
            }
        }),
        App.isAngularJsApp() && $(".page-sidebar-menu li > a").on("click", function(e) {
            App.getViewPort().width < s && $(this).next().hasClass("sub-menu") === !1 && $(".page-header .responsive-toggler").click()
        }),
            $(".page-sidebar").on("click", " li > a.ajaxify", function(e) {
                e.preventDefault(),
                    App.scrollTop();
                var a = $(this).attr("href")
                    , i = $(".page-sidebar ul");
                i.children("li.active").removeClass("active"),
                    i.children("arrow.open").removeClass("open"),
                    $(this).parents("li").each(function() {
                        $(this).addClass("active"),
                            $(this).children("a > span.arrow").addClass("open")
                    }),
                    $(this).parents("li").addClass("active"),
                App.getViewPort().width < s && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(),
                    Layout.loadAjaxContent(a, $(this))
            }),
            $(".page-content").on("click", ".ajaxify", function(e) {
                e.preventDefault(),
                    App.scrollTop();
                var a = $(this).attr("href");
                App.startPageLoading(),
                App.getViewPort().width < s && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(),
                    Layout.loadAjaxContent(a)
            }),
            $(document).on("click", ".page-header-fixed-mobile .responsive-toggler", function() {
                App.scrollTop()
            })
    }
        , l = function() {
        var e = App.getViewPort().height - $(".page-header").outerHeight(!0);
        return $("body").hasClass("page-footer-fixed") && (e -= $(".page-footer").outerHeight()),
            e
    }
        , d = function() {
        var e = $(".page-sidebar-menu");
        o(),
        0 !== $(".page-sidebar-fixed").size() && App.getViewPort().width >= s && !$("body").hasClass("page-sidebar-menu-not-fixed") && (e.attr("data-height", l()),
            App.destroySlimScroll(e),
            App.initSlimScroll(e),
            o())
    }
        , p = function() {
        var e = $("body");
        e.hasClass("page-sidebar-fixed") && $(".page-sidebar").on("mouseenter", function() {
            e.hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").removeClass("page-sidebar-menu-closed")
        }).on("mouseleave", function() {
            e.hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").addClass("page-sidebar-menu-closed")
        })
    }
        , c = function() {
        var e = $("body");
        $("body").on("click", ".sidebar-toggler", function(a) {
            var s = $(".page-sidebar")
                , i = $(".page-sidebar-menu");
            $(".sidebar-search", s).removeClass("open"),
                e.hasClass("page-sidebar-closed") ? (e.removeClass("page-sidebar-closed"),
                    i.removeClass("page-sidebar-menu-closed"),
                Cookies && Cookies.set("sidebar_closed", "0")) : (e.addClass("page-sidebar-closed"),
                    i.addClass("page-sidebar-menu-closed"),
                e.hasClass("page-sidebar-fixed") && i.trigger("mouseleave"),
                Cookies && Cookies.set("sidebar_closed", "1")),
                $(window).trigger("resize")
        }),
            p(),
            $(".page-sidebar").on("click", ".sidebar-search .remove", function(e) {
                e.preventDefault(),
                    $(".sidebar-search").removeClass("open")
            }),
            $(".page-sidebar .sidebar-search").on("keypress", "input.form-control", function(e) {
                if (13 == e.which)
                    return $(".sidebar-search").submit(),
                        !1
            }),
            $(".sidebar-search .submit").on("click", function(e) {
                e.preventDefault(),
                    $("body").hasClass("page-sidebar-closed") && $(".sidebar-search").hasClass("open") === !1 ? (1 === $(".page-sidebar-fixed").size() && $(".page-sidebar .sidebar-toggler").click(),
                        $(".sidebar-search").addClass("open")) : $(".sidebar-search").submit()
            }),
        0 !== $(".sidebar-search").size() && ($(".sidebar-search .input-group").on("click", function(e) {
            e.stopPropagation()
        }),
            $("body").on("click", function() {
                $(".sidebar-search").hasClass("open") && $(".sidebar-search").removeClass("open")
            }))
    }
        , h = function() {
        $(".page-header").on("click", ".search-form", function(e) {
            $(this).addClass("open"),
                $(this).find(".form-control").focus(),
                $(".page-header .search-form .form-control").on("blur", function(e) {
                    $(this).closest(".search-form").removeClass("open"),
                        $(this).unbind("blur")
                })
        }),
            $(".page-header").on("keypress", ".hor-menu .search-form .form-control", function(e) {
                if (13 == e.which)
                    return $(this).closest(".search-form").submit(),
                        !1
            }),
            $(".page-header").on("mousedown", ".search-form.open .submit", function(e) {
                e.preventDefault(),
                    e.stopPropagation(),
                    $(this).closest(".search-form").submit()
            })
    }
        , u = function() {
        var e = 300
            , a = 500;
        navigator.userAgent.match(/iPhone|iPad|iPod/i) ? $(window).bind("touchend touchcancel touchleave", function(s) {
            $(this).scrollTop() > e ? $(".scroll-to-top").fadeIn(a) : $(".scroll-to-top").fadeOut(a)
        }) : $(window).scroll(function() {
            $(this).scrollTop() > e ? $(".scroll-to-top").fadeIn(a) : $(".scroll-to-top").fadeOut(a)
        }),
            $(".scroll-to-top").click(function(e) {
                return e.preventDefault(),
                    $("html, body").animate({
                        scrollTop: 0
                    }, a),
                    !1
            })
    };
    return {
        initHeader: function() {
            h()
        },
        setSidebarMenuActiveLink: function(e, a) {
            r(e, a, null)
        },
        setAngularJsSidebarMenuActiveLink: function(e, a, s) {
            r(e, a, s)
        },
        initSidebar: function(e) {
            d(),
                n(),
                c(),
            App.isAngularJsApp() && r("match", null, e),
                App.addResizeHandler(d)
        },
        initContent: function() {},
        initFooter: function() {
            u()
        },
        init: function() {
            this.initHeader(),
                this.initSidebar(null),
                this.initContent(),
                this.initFooter()
        },
        loadAjaxContent: function(e, a) {
            var s = $(".page-content .page-content-body");
            App.startPageLoading({
                animate: !0
            }),
                $.ajax({
                    type: "GET",
                    cache: !1,
                    url: e,
                    dataType: "html",
                    success: function(e) {
                        App.stopPageLoading(),
                            s.html(e);
                        for (var t = 0; t < i.length; t++)
                            i[t].call(e);
                        a.size() > 0 && 0 === a.parents("li.open").size() && $(".page-sidebar-menu > li.open > a").click(),
                            Layout.fixContentHeight(),
                            App.initAjax()
                    },
                    error: function(e, a, i) {
                        App.stopPageLoading(),
                            s.html("<h4>Could not load the requested content.</h4>");
                        for (var o = 0; o < t.length; o++)
                            t[o].call(e)
                    }
                })
        },
        addAjaxContentSuccessCallback: function(e) {
            i.push(e)
        },
        addAjaxContentErrorCallback: function(e) {
            t.push(e)
        },
        fixContentHeight: function() {},
        initFixedSidebarHoverEffect: function() {
            p()
        },
        initFixedSidebar: function() {
            d()
        },
        getLayoutImgPath: function() {
            return App.getAssetsPath() + e
        },
        getLayoutCssPath: function() {
            return App.getAssetsPath() + a
        }
    }
}();
App.isAngularJsApp() === !1 && jQuery(document).ready(function() {
    Layout.init()
});
