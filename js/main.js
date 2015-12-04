requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        underscore: '../bower_components/underscore-min',
        konva: '../bower_components/konva/konva.min'
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

require(['konva', 'app', 'space', 'buran'], function(konva, app, space, buran) {



});