
'use strict';

/*
 Gulpfile
 */

const gulp = require("gulp"),
        sourcemaps = require("gulp-sourcemaps"),
        gulpIf = require('gulp-if'),
        jade = require("gulp-jade"),
        less = require('gulp-less'),
            LessPluginCleanCSS = require('less-plugin-clean-css'),
            LessPluginAutoPrefix = require('less-plugin-autoprefix'),
            cleancss = new LessPluginCleanCSS({ advanced: true }),
            autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] }),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        plumber = require('gulp-plumber'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    bSync = require('browser-sync');


let isProduction = process.env.NODE_ENV == 'production';


/* Templates
 */

gulp.task('templates', () => {
    return gulp.src('src/views/**/*.jade')
        .pipe(plumber())
        .pipe(jade({ pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(bSync.reload({ stream: true }));
});


/* Styles
 */

gulp.task('styles', () => {
    return gulp.src('src/styles/main.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulpIf( isProduction,
            /* production */
            less({plugins: [autoprefix, cleancss]}),
            /* develop */
            less({plugins: [autoprefix]})
        ))
        .pipe(sourcemaps.write())

        .pipe(gulp.dest('dist/styles'))
        .pipe(bSync.reload({ stream: true }));
});


/* Scripts
 */

gulp.task('scripts', () => {
    let bundler = watchify(browserify('src/js/main.js', { debug: !isProduction }))
        .transform('babelify', { presets: ['es2015'], ignore: ['src/vendor/**/**.js'] });

    bundle(bundler);

    /* watch */
    bundler.on('update', () => {
        bundle(bundler);
    })
});

function bundle(bundler) {
    return bundler
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(plumber())
        /* production */
        .pipe(gulpIf( isProduction, uglify() ))
        .pipe(gulpIf( isProduction, concat('main.js') ))

        .pipe(gulp.dest('dist/js'))
        .pipe(bSync.reload({ stream: true }));
}


/* Serve
 */

gulp.task('serve', () => {
    bSync.init({
        server: 'dist',
        open: false,
        reloadOnRestart: true
    });
});


/* Watcher
 */

gulp.task('watch', () => {
    gulp.watch('src/**/*.jade', ['templates']);
    gulp.watch(['src/styles/*.less', 'src/modules/**/*.less'], ['styles']);
});


gulp.task('default', ['templates', 'styles', 'scripts', 'watch', 'serve']);
