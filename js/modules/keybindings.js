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
