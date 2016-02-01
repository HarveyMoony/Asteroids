
'use strict';

var browserify = require('browserify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCss = require('gulp-minify-css'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    paths = {
        srcFile: './src/js/main.js',
        destFolder: './dist/',
        destFile: 'app.js',

        scripts: './src/js/*',
        css: './src/css/*.css',
        images: './src/img/*'
    },

    b = browserify({
        entries: paths.srcFile,
        plugin: [watchify]
    });


/* Объединение и минификация JS */
gulp.task('browserify', function() {
    return b.bundle()
        .pipe(source(paths.destFile))
        //.pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(paths.destFolder + 'js'));
});

/* Объединение и минификация CSS */
gulp.task('minify-css', function() {
    return gulp.src(paths.css)
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.destFolder + 'css'))
});

/* Сжатие изображений */
gulp.task('minify-images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.destFolder + 'img'))
});

/* Вотчер изменения JS */
gulp.task('watch', function() {
    b.on('update', rebundle);

    function rebundle() {
        b.on('log', function(msg) {
            console.log(msg);
        });

        return b.bundle()
            .pipe(source(paths.destFile))
            .pipe(gulp.dest(paths.destFolder + 'js'));
    }

    return rebundle();
});


gulp.task('default', ['browserify', 'minify-css', 'minify-images', 'watch']);