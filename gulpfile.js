var browserify = require('browserify'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
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
    };


/* Объединение и минификация JS */
gulp.task('browserify', function() {
    return browserify(paths.srcFile)
        .bundle()
        .pipe(source(paths.destFile))
        .pipe(buffer())
        .pipe(uglify())
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
    gulp.watch(paths.scripts, ['browserify'])
        .on('change', function() {
            console.log('Scripts changes');
        });
});


gulp.task('default', ['browserify', 'minify-css', 'minify-images', 'watch']);