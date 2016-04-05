
/*
  Animations
*/

'use strict';

function animations() {

  /* API */
    return {
        logoToUp: logoToUp,
        optionShow: optionShow
    };


    function logoToUp(delay) {
        return $('.wrapper-intro').delay(delay).queue(function () {
            $(this).addClass('go');
        });
    }

    function optionShow(option) {
        return $(option).removeClass('hidden');
    }

}

/* Helpers */


