(function ( $ ) {
    
    var popUpOpenClass = 'ingo-popup-open';
    
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
            manualText: 'Manually Register'
        }, options);
        
        if(!options.ingoId) throw new Error('To make working ingo plugin you should specify in options ingoId');
        
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
    };
 
}( jQuery ));