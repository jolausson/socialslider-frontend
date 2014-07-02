var searchInput = (function ($) {
  "use strict";

  var $foo = $('.foo'),
      $bar = $('.bar');

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

              break;

          case 27: {
              e.preventDefault();
              $('html').removeClass('search-active');

              break;            
          }

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
              alert('Search');
            }
        }

      }

    }

  };
})(jQuery);

searchInput.init();
