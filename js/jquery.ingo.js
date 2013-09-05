(function( $, window, document, undefined ) {

    var IngoPopup = {
        popUpOpenClass: 'ingo-popup-open',
        body: $('body'),
        init: function(options, self){
            $this = self;
            IngoPopup.options = $.extend( {}, $.fn.ingo.options, options );
            IngoPopup.codeAppend();
            IngoPopup.listener($this);
            IngoPopup.errorsHandler();
            if(IngoPopup.options.autostart){
                $this.trigger('click');
            }
        },
        errorsHandler: function(){
            if(!IngoPopup.options.ingoId){
                throw new Error('To make working InGo plugin you should specify in options ingoId');
            }
            if(!typeof($.fn.on)==='function'){
                throw new Error('Please update your JQuery version >1.7.2');
            }
        },
        codeAppend: function(){
            var popupCode = IngoPopup.popupCode();
            if(IngoPopup.body.children('.ingo-popup-wrap').length === 0) {
                IngoPopup.body.append(popupCode);
            }
        },
        listener: function(self){
            $this = $(self);
            $this.on('click', $this, function(e){
                e.preventDefault();
                IngoPopup.openPopup();
            });
            IngoPopup.body.on('click', '.ingo-popup-close', function(e){
                e.preventDefault();
                IngoPopup.closePopup();
            })
        },
        openPopup: function(){
            IngoPopup.body.addClass(IngoPopup.popUpOpenClass);
            IngoPopup.setHeight();
        },
        closePopup: function(){
            IngoPopup.body.removeClass(IngoPopup.popUpOpenClass);
        },
        ingoAuthenticationUrl: function(baseUrl, ingoId, service) {
            var source = location.host;
            return baseUrl + '/checkSource/' + ingoId + '?nextUrl=' + encodeURIComponent('/' + service + '/authenticate?nextUrl=/event/' + ingoId) + '&source='+encodeURIComponent(source);
        },

        popupCode: function(options, self) {
            var popupHtml = '',
                $this = $(self);
            popupHtml += '  <div class="ingo-popup">';
            if(!IngoPopup.options.smallPopup){
                popupHtml += "    <h3>"+IngoPopup.options.headerText+"<\/h3>";
            }
            if(IngoPopup.options.linkedin) {
                popupHtml += '    <a class="in" href="' + IngoPopup.ingoAuthenticationUrl(IngoPopup.options.ingoBaseUrl, IngoPopup.options.ingoId, 'linkedin') + '">';
                popupHtml += '    Register with LinkedIn</a>';
            }
            if(IngoPopup.options.facebook) {
                popupHtml += '    <a class="fb" href="' + IngoPopup.ingoAuthenticationUrl(IngoPopup.options.ingoBaseUrl, IngoPopup.options.ingoId, 'facebook') + '">';
                popupHtml += '    Register with Facebook</a>';
            }
            if(IngoPopup.options.google) {
                popupHtml += '    <a class="gg" href="' + IngoPopup.ingoAuthenticationUrl(IngoPopup.options.ingoBaseUrl, IngoPopup.options.ingoId, 'google') + '">';
                popupHtml += '    Register with Google</a>';
            }
            if(!IngoPopup.options.smallPopup){
                popupHtml += '    <div class="manual">';
                if(IngoPopup.options.manual) {
                    withManual = true;
                    popupHtml += '      <a class=\"pull-left\" href="' + IngoPopup.options.manual + '">' + IngoPopup.options.manualText + '</a>';
                }
                popupHtml += "      <a href=\"#\" class=\"ingo-popup-close pull-right\"><\/a>";
                popupHtml += '    </div>';
            }
            popupHtml += '  </div>';
            return '<div class="ingo-popup-wrap ">' + popupHtml + '</div>';
        },
        setHeight: function(){
            var popup = $('.ingo-popup'),
                popupHeight = popup.outerHeight();
            console.log(popupHeight);

        }
    };

    $.fn.ingo = function( options ) {
        return this.each(function() {
            var ingoPopup = Object.create( IngoPopup );
            ingoPopup.init( options, this );
            $.data( this, 'ingo', ingoPopup );
        });
    };

    $.fn.ingo.options = {
        ingoBaseUrl: 'https://ingo.me',
        google: false,
        linkedin: true,
        facebook: true,
        manual: false,
        manualText: 'Or register manually',
        autostart: false,
        headerText: 'Speed up registration with',
        smallPopup: false
    };




    /*var popUpOpenClass = 'ingo-popup-open';

    var ingoAuthenticationUrl = function(baseUrl, ingoId, service) {
        var source = location.host;
        return baseUrl + '/checkSource/' + ingoId + '?nextUrl=' + encodeURIComponent('/' + service + '/authenticate?nextUrl=/event/' + ingoId) + '&source='+encodeURIComponent(source);
    };

    var popupCode = function(options) {
        var popupHtml = '', size = 0, withManual = false;

        popupHtml += '  <div class="ingo-popup">';
        popupHtml += "    <h3>Speed up registration with<\/h3>";
        if(options.linkedin) {
            size += 1;
            popupHtml += '    <a class="in" href="' + ingoAuthenticationUrl(options.ingoBaseUrl, options.ingoId, 'linkedin') + '">';
            popupHtml += '    Register with LinkedIn</a>';
        }
        if(options.facebook) {
            size += 1;
            popupHtml += '    <a class="fb" href="' + ingoAuthenticationUrl(options.ingoBaseUrl, options.ingoId, 'facebook') + '">';
            popupHtml += '    Register with Facebook</a>';
        }
        if(options.google) {
            size += 1;
            popupHtml += '    <a class="gg" href="' + ingoAuthenticationUrl(options.ingoBaseUrl, options.ingoId, 'google') + '">';
            popupHtml += '    Register with Google</a>';
        }
        popupHtml += '    <div class="manual">';
        if(options.manual) {
            withManual = true;
            popupHtml += '      <a class=\"pull-left\" href="' + options.manual + '">' + options.manualText + '</a>';
        }
        popupHtml += "      <a href=\"#\" class=\"ingo-popup-close pull-right\"><\/a>";
        popupHtml += '    </div>';
        popupHtml += '  </div>';
        return '<div class="ingo-popup-wrap ' + 'size-' + size + ' ' + (withManual? 'with-manual' : '') +'">' + popupHtml + '</div>';
    };


    var openPopUp = function(options) {
        var body = $('body');
        if(body.children('.ingo-popup-wrap').length === 0) {
            body.children().last().after(popupCode(options));
        }
        if(!body.hasClass(popUpOpenClass)) {
            body.addClass(popUpOpenClass);
        }
    };

    var closePopUp = function() {
        $('body').removeClass(popUpOpenClass);
    };

    $.fn.ingo = function(options) {
        options = $.extend({
            ingoBaseUrl: 'https://ingo.me',
            google: false,
            linkedin: true,
            facebook: true,
            manual: false,
            manualText: 'Or register manually',
            autostart: false
        }, options);

        if(!options.ingoId) throw new Error('To make working ingo plugin you should specify in options ingoId');

        if(options.autostart){
            openPopUp(options);
        }

        $('body').delegate('.ingo-popup-close', 'click.ingo.registration-popup.close', function(e) {
            e.preventDefault();

            closePopUp();
        });

        return this.each(function() {
            $(this).bind('click.ingo.registration-popup.open', function(e) {
                e.preventDefault();

                openPopUp(options);
            });
        });
    };*/
})( jQuery, window, document);