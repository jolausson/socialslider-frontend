var example = (function ($) {
  "use strict";

  var $foo = $('.foo'),
      $bar = $('.bar');

  return {

    init: function () {
      this.foo();
      this.bar();
    },

    foo: function () {
      console.log('foo');
    },

    bar: function () {
      console.log('bar');
    }
  };
})(jQuery);

example.init();
