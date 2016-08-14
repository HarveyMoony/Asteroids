
'use strict';

(function($) {
    $(document).ready(function() {

        $(this)
            .delay(500)
            .queue(function (next) {
                $('.header-intro').removeClass('hidden');
                next();
            })
            .delay(1300)
            .queue(function (next) {
                $('.wrapper-intro').addClass('go-40');
                $('.form-element--start').removeClass('hidden').addClass('go');
                next();
            });

        $(this).on('click', '.form-element--start .btn--xl', showFirstOption);
        $(this).on('click', '.option__username button', showSecondOption);



    /* Animation handlers */

        function showFirstOption() {
            $(this)
                /* Подъем логотипа */
                .delay(100)
                .queue(function (next) {
                    $('.form-element--start').addClass('hidden');
                    $('.wrapper-intro').addClass('go-25');
                    next();
                })
                /* Появление блока опций */
                .delay(500)
                .queue(function () {
                    $('.option__username input:text').focus();
                    $('.start-options').removeClass('hidden');
                });
        }

        function showSecondOption() {
            $(this)
            /* Подъем логотипа */
                .delay(100)
                .queue(function (next) {
                    $('.wrapper-intro').addClass('go-20');
                    $('.option__username').addClass('option--done');
                    $('.option__username .option__circle-done').removeClass('hidden');
                    next();
                })
                /* Появление блока опций */
                .delay(500)
                .queue(function () {
                    $('.option__ship').removeClass('hidden');
                });
        }


    })
})(jQuery);