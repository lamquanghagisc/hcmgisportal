var App = function() {
    var t, e = !1, o = !1, a = !1, i = !1, n = [], l = "../assets/", s = "global/img/", r = "global/plugins/", c = "global/css/", d = {
        blue: "#89C4F4",
        red: "#F3565D",
        green: "#1bbc9b",
        purple: "#9b59b6",
        grey: "#95a5a6",
        yellow: "#F8CB00"
    }, p = function() {
        "rtl" === $("body").css("direction") && (e = !0),
            o = !!navigator.userAgent.match(/MSIE 8.0/),
            a = !!navigator.userAgent.match(/MSIE 9.0/),
            i = !!navigator.userAgent.match(/MSIE 10.0/),
        i && $("html").addClass("ie10"),
        (i || a || o) && $("html").addClass("ie")
    }, h = function() {
        for (var t = 0; t < n.length; t++) {
            var e = n[t];
            e.call()
        }
    }, u = function() {
        var t, e = $(window).width();
        if (o) {
            var a;
            $(window).resize(function() {
                a != document.documentElement.clientHeight && (t && clearTimeout(t),
                    t = setTimeout(function() {
                        h()
                    }, 50),
                    a = document.documentElement.clientHeight)
            })
        } else
            $(window).resize(function() {
                $(window).width() != e && (e = $(window).width(),
                t && clearTimeout(t),
                    t = setTimeout(function() {
                        h()
                    }, 50))
            })
    }, f = function() {
        $("body").on("click", ".portlet > .portlet-title > .tools > a.remove", function(t) {
            t.preventDefault();
            var e = $(this).closest(".portlet");
            $("body").hasClass("page-portlet-fullscreen") && $("body").removeClass("page-portlet-fullscreen"),
                e.find(".portlet-title .fullscreen").tooltip("destroy"),
                e.find(".portlet-title > .tools > .reload").tooltip("destroy"),
                e.find(".portlet-title > .tools > .remove").tooltip("destroy"),
                e.find(".portlet-title > .tools > .config").tooltip("destroy"),
                e.find(".portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip("destroy"),
                e.remove()
        }),
            $("body").on("click", ".portlet > .portlet-title .fullscreen", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet");
                if (e.hasClass("portlet-fullscreen"))
                    $(this).removeClass("on"),
                        e.removeClass("portlet-fullscreen"),
                        $("body").removeClass("page-portlet-fullscreen"),
                        e.children(".portlet-body").css("height", "auto");
                else {
                    var o = App.getViewPort().height - e.children(".portlet-title").outerHeight() - parseInt(e.children(".portlet-body").css("padding-top")) - parseInt(e.children(".portlet-body").css("padding-bottom"));
                    $(this).addClass("on"),
                        e.addClass("portlet-fullscreen"),
                        $("body").addClass("page-portlet-fullscreen"),
                        e.children(".portlet-body").css("height", o)
                }
            }),
            $("body").on("click", ".portlet > .portlet-title > .tools > a.reload", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet").children(".portlet-body")
                    , o = $(this).attr("data-url")
                    , a = $(this).attr("data-error-display");
                o ? (App.blockUI({
                    target: e,
                    animate: !0,
                    overlayColor: "none"
                }),
                    $.ajax({
                        type: "GET",
                        cache: !1,
                        url: o,
                        dataType: "html",
                        success: function(t) {
                            App.unblockUI(e),
                                e.html(t),
                                App.initAjax()
                        },
                        error: function(t, o, i) {
                            App.unblockUI(e);
                            var n = "Error on reloading the content. Please check your connection and try again.";
                            "toastr" == a && toastr ? toastr.error(n) : "notific8" == a && $.notific8 ? ($.notific8("zindex", 11500),
                                $.notific8(n, {
                                    theme: "ruby",
                                    life: 3e3
                                })) : alert(n)
                        }
                    })) : (App.blockUI({
                    target: e,
                    animate: !0,
                    overlayColor: "none"
                }),
                    window.setTimeout(function() {
                        App.unblockUI(e)
                    }, 1e3))
            }),
            $('.portlet .portlet-title a.reload[data-load="true"]').click(),
            $("body").on("click", ".portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet").children(".portlet-body");
                $(this).hasClass("collapse") ? ($(this).removeClass("collapse").addClass("expand"),
                    e.slideUp(200)) : ($(this).removeClass("expand").addClass("collapse"),
                    e.slideDown(200))
            })
    }, b = function() {
        if ($("body").on("click", ".md-checkbox > label, .md-radio > label", function() {
            var t = $(this)
                , e = $(this).children("span:first-child");
            e.addClass("inc");
            var o = e.clone(!0);
            e.before(o),
                $("." + e.attr("class") + ":last", t).remove()
        }),
            $("body").hasClass("page-md")) {
            var t, e, o, a, i;
            $("body").on("click", "a.btn, button.btn, input.btn, label.btn", function(n) {
                t = $(this),
                0 == t.find(".md-click-circle").length && t.prepend("<span class='md-click-circle'></span>"),
                    e = t.find(".md-click-circle"),
                    e.removeClass("md-click-animate"),
                e.height() || e.width() || (o = Math.max(t.outerWidth(), t.outerHeight()),
                    e.css({
                        height: o,
                        width: o
                    })),
                    a = n.pageX - t.offset().left - e.width() / 2,
                    i = n.pageY - t.offset().top - e.height() / 2,
                    e.css({
                        top: i + "px",
                        left: a + "px"
                    }).addClass("md-click-animate"),
                    setTimeout(function() {
                        e.remove()
                    }, 1e3)
            })
        }
        var n = function(t) {
            "" != t.val() ? t.addClass("edited") : t.removeClass("edited")
        };
        $("body").on("keydown", ".form-md-floating-label .form-control", function(t) {
            n($(this))
        }),
            $("body").on("blur", ".form-md-floating-label .form-control", function(t) {
                n($(this))
            }),
            $(".form-md-floating-label .form-control").each(function() {
                $(this).val().length > 0 && $(this).addClass("edited")
            })
    }, g = function() {
        $().iCheck && $(".icheck").each(function() {
            var t = $(this).attr("data-checkbox") ? $(this).attr("data-checkbox") : "icheckbox_minimal-grey"
                , e = $(this).attr("data-radio") ? $(this).attr("data-radio") : "iradio_minimal-grey";
            t.indexOf("_line") > -1 || e.indexOf("_line") > -1 ? $(this).iCheck({
                checkboxClass: t,
                radioClass: e,
                insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
            }) : $(this).iCheck({
                checkboxClass: t,
                radioClass: e
            })
        })
    }, m = function() {
        $().bootstrapSwitch && $(".make-switch").bootstrapSwitch()
    }, v = function() {
        $().confirmation && $("[data-toggle=confirmation]").confirmation({
            btnOkClass: "btn btn-sm btn-success",
            btnCancelClass: "btn btn-sm btn-danger"
        })
    }, y = function() {
        $("body").on("shown.bs.collapse", ".accordion.scrollable", function(t) {
            App.scrollTo($(t.target))
        })
    }, C = function() {
        if (encodeURI(location.hash)) {
            var t = encodeURI(location.hash.substr(1));
            $('a[href="#' + t + '"]').parents(".tab-pane:hidden").each(function() {
                var t = $(this).attr("id");
                $('a[href="#' + t + '"]').click()
            }),
                $('a[href="#' + t + '"]').click()
        }
        $().tabdrop && $(".tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs").tabdrop({
            text: '<i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i>'
        })
    }, w = function() {
        $("body").on("hide.bs.modal", function() {
            $(".modal:visible").size() > 1 && $("html").hasClass("modal-open") === !1 ? $("html").addClass("modal-open") : $(".modal:visible").size() <= 1 && $("html").removeClass("modal-open")
        }),
            $("body").on("show.bs.modal", ".modal", function() {
                $(this).hasClass("modal-scroll") && $("body").addClass("modal-open-noscroll")
            }),
            $("body").on("hidden.bs.modal", ".modal", function() {
                $("body").removeClass("modal-open-noscroll")
            }),
            $("body").on("hidden.bs.modal", ".modal:not(.modal-cached)", function() {
                $(this).removeData("bs.modal")
            })
    }, x = function() {
        $(".tooltips").tooltip(),
            $(".portlet > .portlet-title .fullscreen").tooltip({
                trigger: "hover",
                container: "body",
                title: "Fullscreen"
            }),
            $(".portlet > .portlet-title > .tools > .reload").tooltip({
                trigger: "hover",
                container: "body",
                title: "Reload"
            }),
            $(".portlet > .portlet-title > .tools > .remove").tooltip({
                trigger: "hover",
                container: "body",
                title: "Remove"
            }),
            $(".portlet > .portlet-title > .tools > .config").tooltip({
                trigger: "hover",
                container: "body",
                title: "Settings"
            }),
            $(".portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip({
                trigger: "hover",
                container: "body",
                title: "Collapse/Expand"
            })
    }, k = function() {
        $("body").on("click", ".dropdown-menu.hold-on-click", function(t) {
            t.stopPropagation()
        })
    }, I = function() {
        $("body").on("click", '[data-close="alert"]', function(t) {
            $(this).parent(".alert").hide(),
                $(this).closest(".note").hide(),
                t.preventDefault()
        }),
            $("body").on("click", '[data-close="note"]', function(t) {
                $(this).closest(".note").hide(),
                    t.preventDefault()
            }),
            $("body").on("click", '[data-remove="note"]', function(t) {
                $(this).closest(".note").remove(),
                    t.preventDefault()
            })
    }, A = function() {
        "function" == typeof autosize && autosize(document.querySelectorAll("textarea.autosizeme"))
    }, S = function() {
        $(".popovers").popover(),
            $(document).on("click.bs.popover.data-api", function(e) {
                t && t.popover("hide")
            })
    }, z = function() {
        App.initSlimScroll(".scroller")
    }, P = function() {
        jQuery.fancybox && $(".fancybox-button").size() > 0 && $(".fancybox-button").fancybox({
            groupAttr: "data-rel",
            prevEffect: "none",
            nextEffect: "none",
            closeBtn: !0,
            helpers: {
                title: {
                    type: "inside"
                }
            }
        })
    }, T = function() {
        $().counterUp && $("[data-counter='counterup']").counterUp({
            delay: 10,
            time: 1e3
        })
    }, D = function() {
        (o || a) && $("input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)").each(function() {
            var t = $(this);
            "" === t.val() && "" !== t.attr("placeholder") && t.addClass("placeholder").val(t.attr("placeholder")),
                t.focus(function() {
                    t.val() == t.attr("placeholder") && t.val("")
                }),
                t.blur(function() {
                    "" !== t.val() && t.val() != t.attr("placeholder") || t.val(t.attr("placeholder"))
                })
        })
    }, U = function() {
        $().select2 && ($.fn.select2.defaults.set("theme", "bootstrap"),
            $(".select2me").select2({
                placeholder: "Select",
                width: "auto",
                allowClear: !0
            }))
    }, E = function() {
        $("[data-auto-height]").each(function() {
            var t = $(this)
                , e = $("[data-height]", t)
                , o = 0
                , a = t.attr("data-mode")
                , i = parseInt(t.attr("data-offset") ? t.attr("data-offset") : 0);
            e.each(function() {
                "height" == $(this).attr("data-height") ? $(this).css("height", "") : $(this).css("min-height", "");
                var t = "base-height" == a ? $(this).outerHeight() : $(this).outerHeight(!0);
                t > o && (o = t)
            }),
                o += i,
                e.each(function() {
                    "height" == $(this).attr("data-height") ? $(this).css("height", o) : $(this).css("min-height", o)
                }),
            t.attr("data-related") && $(t.attr("data-related")).css("height", t.height())
        })
    };
    return {
        init: function() {
            p(),
                u(),
                b(),
                g(),
                m(),
                z(),
                P(),
                U(),
                f(),
                I(),
                k(),
                C(),
                x(),
                S(),
                y(),
                w(),
                v(),
                A(),
                T(),
                this.addResizeHandler(E),
                D()
        },
        initAjax: function() {
            g(),
                m(),
                z(),
                U(),
                P(),
                k(),
                x(),
                S(),
                y(),
                v()
        },
        initComponents: function() {
            this.initAjax()
        },
        setLastPopedPopover: function(e) {
            t = e
        },
        addResizeHandler: function(t) {
            n.push(t)
        },
        runResizeHandlers: function() {
            h()
        },
        scrollTo: function(t, e) {
            var o = t && t.size() > 0 ? t.offset().top : 0;
            t && ($("body").hasClass("page-header-fixed") ? o -= $(".page-header").height() : $("body").hasClass("page-header-top-fixed") ? o -= $(".page-header-top").height() : $("body").hasClass("page-header-menu-fixed") && (o -= $(".page-header-menu").height()),
                o += e ? e : -1 * t.height()),
                $("html,body").animate({
                    scrollTop: o
                }, "slow")
        },
        initSlimScroll: function(t) {
            $().slimScroll && $(t).each(function() {
                if (!$(this).attr("data-initialized")) {
                    var t;
                    t = $(this).attr("data-height") ? $(this).attr("data-height") : $(this).css("height"),
                        $(this).slimScroll({
                            allowPageScroll: !0,
                            size: "7px",
                            color: $(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : "#bbb",
                            wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : "slimScrollDiv",
                            railColor: $(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : "#eaeaea",
                            position: e ? "left" : "right",
                            height: t,
                            alwaysVisible: "1" == $(this).attr("data-always-visible"),
                            railVisible: "1" == $(this).attr("data-rail-visible"),
                            disableFadeOut: !0
                        }),
                        $(this).attr("data-initialized", "1")
                }
            })
        },
        destroySlimScroll: function(t) {
            $().slimScroll && $(t).each(function() {
                if ("1" === $(this).attr("data-initialized")) {
                    $(this).removeAttr("data-initialized"),
                        $(this).removeAttr("style");
                    var t = {};
                    $(this).attr("data-handle-color") && (t["data-handle-color"] = $(this).attr("data-handle-color")),
                    $(this).attr("data-wrapper-class") && (t["data-wrapper-class"] = $(this).attr("data-wrapper-class")),
                    $(this).attr("data-rail-color") && (t["data-rail-color"] = $(this).attr("data-rail-color")),
                    $(this).attr("data-always-visible") && (t["data-always-visible"] = $(this).attr("data-always-visible")),
                    $(this).attr("data-rail-visible") && (t["data-rail-visible"] = $(this).attr("data-rail-visible")),
                        $(this).slimScroll({
                            wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : "slimScrollDiv",
                            destroy: !0
                        });
                    var e = $(this);
                    $.each(t, function(t, o) {
                        e.attr(t, o)
                    })
                }
            })
        },
        scrollTop: function() {
            App.scrollTo()
        },
        blockUI: function(t) {
            t = $.extend(!0, {}, t);
            var e = "";
            if (e = t.animate ? '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>' : t.iconOnly ? '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>' : t.textOnly ? '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><span>&nbsp;&nbsp;' + (t.message ? t.message : "LOADING...") + "</span></div>" : '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (t.message ? t.message : "LOADING...") + "</span></div>",
                t.target) {
                var o = $(t.target);
                o.height() <= $(window).height() && (t.cenrerY = !0),
                    o.block({
                        message: e,
                        baseZ: t.zIndex ? t.zIndex : 1e3,
                        centerY: void 0 !== t.cenrerY && t.cenrerY,
                        css: {
                            top: "10%",
                            border: "0",
                            padding: "0",
                            backgroundColor: "none"
                        },
                        overlayCSS: {
                            backgroundColor: t.overlayColor ? t.overlayColor : "#555",
                            opacity: t.boxed ? .05 : .1,
                            cursor: "wait"
                        }
                    })
            } else
                $.blockUI({
                    message: e,
                    baseZ: t.zIndex ? t.zIndex : 1e3,
                    css: {
                        border: "0",
                        padding: "0",
                        backgroundColor: "none"
                    },
                    overlayCSS: {
                        backgroundColor: t.overlayColor ? t.overlayColor : "#555",
                        opacity: t.boxed ? .05 : .1,
                        cursor: "wait"
                    }
                })
        },
        unblockUI: function(t) {
            t ? $(t).unblock({
                onUnblock: function() {
                    $(t).css("position", ""),
                        $(t).css("zoom", "")
                }
            }) : $.unblockUI()
        },
        startPageLoading: function(t) {
            t && t.animate ? ($(".page-spinner-bar").remove(),
                $("body").append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')) : ($(".page-loading").remove(),
                $("body").append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (t && t.message ? t.message : "Loading...") + "</span></div>"))
        },
        stopPageLoading: function() {
            $(".page-loading, .page-spinner-bar").remove()
        },
        alert: function(t) {
            t = $.extend(!0, {
                container: "",
                place: "append",
                type: "success",
                message: "",
                close: !0,
                reset: !0,
                focus: !0,
                closeInSeconds: 0,
                icon: ""
            }, t);
            var e = App.getUniqueID("App_alert")
                , o = '<div id="' + e + '" class="custom-alerts alert alert-' + t.type + ' fade in">' + (t.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : "") + ("" !== t.icon ? '<i class="fa-lg fa fa-' + t.icon + '"></i>  ' : "") + t.message + "</div>";
            return t.reset && $(".custom-alerts").remove(),
                t.container ? "append" == t.place ? $(t.container).append(o) : $(t.container).prepend(o) : 1 === $(".page-fixed-main-content").size() ? $(".page-fixed-main-content").prepend(o) : ($("body").hasClass("page-container-bg-solid") || $("body").hasClass("page-content-white")) && 0 === $(".page-head").size() ? $(".page-title").after(o) : $(".page-bar").size() > 0 ? $(".page-bar").after(o) : $(".page-breadcrumb, .breadcrumbs").after(o),
            t.focus && App.scrollTo($("#" + e)),
            t.closeInSeconds > 0 && setTimeout(function() {
                $("#" + e).remove()
            }, 1e3 * t.closeInSeconds),
                e
        },
        initFancybox: function() {
            P()
        },
        getActualVal: function(t) {
            return t = $(t),
                t.val() === t.attr("placeholder") ? "" : t.val()
        },
        getURLParameter: function(t) {
            var e, o, a = window.location.search.substring(1), i = a.split("&");
            for (e = 0; e < i.length; e++)
                if (o = i[e].split("="),
                o[0] == t)
                    return unescape(o[1]);
            return null
        },
        isTouchDevice: function() {
            try {
                return document.createEvent("TouchEvent"),
                    !0
            } catch (t) {
                return !1
            }
        },
        getViewPort: function() {
            var t = window
                , e = "inner";
            return "innerWidth"in window || (e = "client",
                t = document.documentElement || document.body),
                {
                    width: t[e + "Width"],
                    height: t[e + "Height"]
                }
        },
        getUniqueID: function(t) {
            return "prefix_" + Math.floor(Math.random() * (new Date).getTime())
        },
        isIE8: function() {
            return o
        },
        isIE9: function() {
            return a
        },
        isRTL: function() {
            return e
        },
        isAngularJsApp: function() {
            return "undefined" != typeof angular
        },
        getAssetsPath: function() {
            return l
        },
        setAssetsPath: function(t) {
            l = t
        },
        setGlobalImgPath: function(t) {
            s = t
        },
        getGlobalImgPath: function() {
            return l + s
        },
        setGlobalPluginsPath: function(t) {
            r = t
        },
        getGlobalPluginsPath: function() {
            return l + r
        },
        getGlobalCssPath: function() {
            return l + c
        },
        getBrandColor: function(t) {
            return d[t] ? d[t] : ""
        },
        getResponsiveBreakpoint: function(t) {
            var e = {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            };
            return e[t] ? e[t] : 0
        }
    }
}();
jQuery(document).ready(function() {
    App.init()
});
