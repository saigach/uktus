$(document).ready(function() {
	$("#main-carousel").height($(window).height());
	//$('#main-carousel').carousel();
	$owl = $("#main-carousel>.carousel-inner");
	$owl.owlCarousel({
    nav: true,
    items: 1,
    animateOut: 'fadeOutRight',
    animateIn: '',
    dotData: true,
    dotsContainer: '.dotsCont',
    //autoplay: true,
    loop: true
  });
  
	$owl.on('changed.owl.carousel',function(property){
	    var current = property.item.index;
	    var src = $(property.target).find(".owl-item").eq(current).find(".slide-text").addClass('animated fadeInDown');
	});
	$owl.on('change.owl.carousel',function(property){
	    var current = property.item.index;
	    var src = $(property.target).find(".owl-item").eq(current).find(".slide-text").removeClass('animated fadeInDown');
	});
  
  IntroEffect.init({container: $(".wrapper"), trigger: $('#home-scroll-down')});
  IntroEffect.start = true;
  
  $(window).resize(function() {
	$("#main-carousel").height($(window).height());
  });
});


/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

var IntroEffect = {
    options : {},
    ie_check: function(){
        var undef,rv = -1; // Return value assumes failure.
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    },
    // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179                  
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    keys : [37, 38, 39, 40], 
    wheelIter : 0,
    preventDefault: function(e){
        e = e || window.event;
        if (e.preventDefault)
        e.preventDefault();
        e.returnValue = false;  
    },
    keydown: function(e){
        for (var i = IntroEffect.keys.length; i--;) {
            if (e.keyCode === IntroEffect.keys[i]) {
                IntroEffect.preventDefault(e);
                return;
            }
        }
    },
    touchmove: function(e){
        IntroEffect.preventDefault(e);
    },
    wheel: function(e){
        // for IE 
        /*if( IntroEffect.ie ) {
            IntroEffect.preventDefault(e);
        }*/
        if(e.deltaY < 0){
            $(window).trigger('scroll.intro-effect');
        }
        IntroEffect.preventDefault(e);

    },
    disable_scroll: function(){
        $(window).on('mousewheel', function(e){
            IntroEffect.wheel(e);
        });

        document.onkeydown = IntroEffect.keydown;
        document.body.ontouchmove = IntroEffect.touchmove;
    },
    enable_scroll: function(){
        $(window).off('mousewheel');
        document.onkeydown = document.body.ontouchmove = null;  
    },

    docElem: window.document.documentElement,
    scrollVal: false,
    isRevealed: false,
    noscroll: false,
    start: false,
    isAnimating: false,
    runs:0,
    
    scrollY: function(){
        return window.pageYOffset || IntroEffect.docElem.scrollTop;
    },
    scrollPage: function(){
        if(!IntroEffect.start){return false;}
        IntroEffect.scrollVal = IntroEffect.scrollY();
            
        /*if( IntroEffect.noscroll && !IntroEffect.ie ) {
            if( IntroEffect.scrollVal < 0 ) return false;
            // keep it that way
            window.scrollTo( 0, 0 );
        }*/

        if(IntroEffect.options.container.hasClass('notrans')){
            IntroEffect.options.container.removeClass('notrans');
            return false;
        }

        if( IntroEffect.isAnimating ) {
            return false;
        }
        
        if( IntroEffect.scrollVal <= 0 && IntroEffect.isRevealed ) {
            IntroEffect.toggle(0);
        }
        else if(!IntroEffect.isRevealed ){
            IntroEffect.toggle(1);
            IntroEffect.runs++;
        }
    },
    toggle: function(reveal){
        IntroEffect.isAnimating = true;
            
        if( reveal ) {
            IntroEffect.options.container.addClass('intro-effect-in').trigger('intro-effect-in');
        }
        else {
            IntroEffect.noscroll = true;
            IntroEffect.disable_scroll();
            $fx = $('.fx-in').removeClass('fx-in');
            IntroEffect.options.container.removeClass('intro-effect-in');
        }

        // simulating the end of the transition:
        setTimeout( function() {
            IntroEffect.isRevealed = !IntroEffect.isRevealed;
            IntroEffect.isAnimating = false;
            if( reveal ) {
                IntroEffect.noscroll = false;
                IntroEffect.enable_scroll();
                $('html,body').scrollTop(1);
            }
        }, 1200 );
    },
    init: function(options){
        this.ie = this.ie_check();

        var options = $.extend({}, options);
        IntroEffect.options = options;

        if(!_.isUndefined(this.ie) || !Modernizr.csstransforms || !Modernizr.csstransitions){
            IntroEffect.options.trigger.on('click.intro-effect', function(){
                $('body,html').animate({
                    scrollTop: IntroEffect.options.container.outerHeight(true)
                },800);
            });
            IntroEffect.options.container.trigger('intro-effect-in');
        }else{
            IntroEffect.options.container.addClass('intro-effect');
            // refreshing the page...
            var pageScroll = IntroEffect.scrollY();
            IntroEffect.noscroll = pageScroll === 0;
            
            IntroEffect.disable_scroll();
            
            if( IntroEffect.pageScroll ) {
                IntroEffect.isRevealed = true;
                IntroEffect.options.container.addClass('notrans intro-effect-in');
            }
            
            $(window).on('scroll.intro-effect', function(){
                if(IntroEffect.start){
                    IntroEffect.scrollPage();
                }
            });
            IntroEffect.options.trigger.on('click.intro-effect', function(){IntroEffect.toggle('reveal');});
        }
    },
    destroy_events: function(){
        $(window).off('scroll.intro-effect');
        IntroEffect.options.trigger.off('click.intro-effect');
        IntroEffect.options.container.off('intro-effect-in');
    },
    destroy: function(){
        IntroEffect.start = false;
        IntroEffect.destroy_events();
        IntroEffect.enable_scroll();
        IntroEffect.options.container.removeClass('intro-effect intro-effect-in');
    }
}


;