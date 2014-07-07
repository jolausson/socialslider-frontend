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
