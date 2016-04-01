
    var utils = {
        math: {}
    };

    utils.math.sin = function(angle) {
        return Math.sin(angle * Math.PI / 180)
    };

    utils.math.cos = function(angle) {
        return Math.cos(angle * Math.PI / 180)
    };

    module.exports =  utils;
