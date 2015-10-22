var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    tsPath = 'ts/*.ts',
    compilePath = 'js/compiled',
    concatPath = 'js/compiled/min',
    dist = 'js/dist';

gulp.task('uglify', ['concat'], function(){
    return gulp.src(concatPath+'/*.js')
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(concatPath))
});

gulp.task('concat', ['typescript'],  function(){
    return gulp.src(compilePath+'/*.js')
        .pipe(concat('concat.js'))
        .pipe(gulp.dest(concatPath));
});


gulp.task('typescript', function(){
    var tsResult = gulp.src(tsPath)
        .pipe(ts({
            target: 'ES5',
            declarationFiles: false,
            noExternalResolve: true
        }));
    return tsResult.js.pipe(gulp.dest(compilePath));
});

gulp.task('watch', function(){
    gulp.watch([tsPath], ['uglify']);
});

gulp.task('default', ['watch']);