// Avoid `console` errors in browsers that lack a console.
(function () {
  "use strict";

  var method,
      noop = function () {},
      methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
      ],
      length = methods.length,
      console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Internet Explorer 10 doesn't differentiate device width from viewport width.
// Include the following JavaScript to work around the bug until Microsoft issues a fix.
(function () {
  "use strict";

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
      document.createTextNode(
        "@-ms-viewport{width:auto!important}"
      )
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
  }
}());

var global = (function ($) {
  "use strict";

  return {

    init: function () {

    }

  };
})(jQuery);

global.init();

var bindingsModule = (function ($) {
  "use strict";

  return {

    init: function () {
      this.event();
    },

    event: function() {
      $(document).on('keydown', this.keyPress);
    },
    keyPress: function(e) {

      var value = e.target.value;

      // KeyCode not for in Input
      if(e.target.nodeName.toLowerCase() !== 'input') {

        switch(e.keyCode) { 
          
          case 83: 
              e.preventDefault();
              $('html').addClass('search-active');
              if(window.slideshow !== undefined) {
                window.slideshow.stop();
              }
              break;

          case 27: 
              e.preventDefault();
              $('html').removeClass('search-active');
              if(window.slideshow !== undefined) {
                window.slideshow.start();
              }

              break;            
          case 37:
            if(window.slideshow !== undefined) {
              window.slideshow.prev();
            }

            break;

          case 91:
            if(window.slideshow !== undefined) {
              window.slideshow.prev();
            }
            break;
          case 39:
            if(window.slideshow !== undefined) {
              window.slideshow.next();
            }
            break;

          case 92:
            if(window.slideshow !== undefined) {
              window.slideshow.next();
            }
            break;
        }

      }
      // KeyCode for Input
      else {

        switch(e.keyCode) {

          case 8:
            if(value.length < 2) {
              return false;
            }
          break;
          
          case 13:
            if(value.length > 2) {
              sliderModule.fetchData(value);
            }
        }

      }

    }

  };
})(jQuery);

bindingsModule.init();

var sliderModule = (function ($) {
  "use strict";
    var items = {
        intialRender  : 5,
        itemsRendered : 0,
        itemsAppend   : 5,
        itemsFetched  : 0
    }

    return {
        fetchData: function(search) {
            $.getJSON( "json/images.json?search=" + search, function( data ) {
                var preloadCount = 0;
                items.itemsFetched = data.length > items.intialRender ? items.intialRender : data.length;
                items.itemsRendered = items.itemsFetched;

                if(window.slideshow !== undefined) {
                    delete window.slideshow;
                    $('#slider ul').html('');
                }

                for (var i = 0; i < items.itemsFetched; i++) {
                    $('#slider ul').append('<li><img src="' + data[i] + '" id="image-' + i +'" class="img-responsive" alt="image"/></li>' );
                    $('#image-' + i).load(function(){
                        preloadCount++;
                        if(preloadCount === items.itemsFetched - 1) {
                            $('#slider').hide();
                            $('#slider').fadeIn(400).promise().done(function(){
                                $('html').removeClass('search-active');
                            });
                            window.slideshow = new Swipe(document.getElementById('slider'), {
                                speed: 400,
                                auto: 3000,
                                continuous: false,
                                disableScroll: false,
                                stopPropagation: false,
                                callback: function(index, elem) {
                                    if (index === (items.itemsRendered - 3) && items.itemsRendered < data.length) {
                                        items.itemsAppend = (items.itemsFetched - items.itemsRendered) <= items.itemsAppend ? items.itemsAppend : items.itemsFetched - items.itemsRendered;
                                        for (var i = items.itemsRendered; i < (items.itemsRendered + items.itemsAppend); i++) {
                                            $('#slider ul').append('<li><span class="preloader">Loading..</span><img src="' + data[i] + '" id="image-' + i +'" class="img-responsive" alt="image"/></li>' );
                                            $('#image-' + i).load(function(){
                                                $(this).parent().find('.preloader').hide();
                                            });
                                        }

                                        items.itemsRendered += items.itemsAppend;
                                        window.slideshow.setup();
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    }
})(jQuery);
