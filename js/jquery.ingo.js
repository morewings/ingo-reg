// Le Polyfill
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

// Le hipster code
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
            if(typeof($.fn.on)!=='function'){
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
            if(!IngoPopup.options.local)
                return baseUrl + '/checkSource/' + ingoId + '?nextUrl=' + encodeURIComponent('/' + service + '/authenticate?nextUrl=/event/' + ingoId) + '&source='+encodeURIComponent(source);
            else
                return '/' + service + '/authenticate?nextUrl=' + encodeURIComponent('/event/' + ingoId);
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
        smallPopup: false,
        local: false
    };
})( jQuery, window, document);
