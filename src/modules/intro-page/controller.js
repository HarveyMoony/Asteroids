
'use strict';

const jQuery = require('jQuery');

//import animations from './animations';


(function($) {
    $(document).ready(function() {

        $(this)
            /* Подъем логотипа */
            .delay(1000)
            .queue(function (next) {
                $('.wrapper-intro').addClass('go');
                next();
            })
            /* Появление блока опций */
            .delay(500)
            .queue(function() {
                $('.start-options').removeClass('hidden');
            });

    })
})(jQuery);