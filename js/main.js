requirejs.config({
    baseUrl: "js",
    paths: {
        /* Vendor */
        jquery: '../bower_components/jquery/dist/jquery.min',
        underscore: '../bower_components/underscore-min',
        konva: '../bower_components/konva/konva.min',
        utils: 'utils',

        /* Classes */
        space: 'classes/space',
        buran: 'classes/buran',

        /* Controllers */
        spaceCtrl: 'controllers/space.controller',
        buranCtrl: 'controllers/buran.controller'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'konva': {
            exports: 'konva'
        }
    }
});

require(['konva', 'app', 'space', 'buran', 'buranCtrl'], function(konva, app, space, buran, buranCtrl) {



});