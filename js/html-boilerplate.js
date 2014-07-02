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
