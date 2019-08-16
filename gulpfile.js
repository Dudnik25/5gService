var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var destpath = {
    local: 'app/',
    web: 'C:/xampp/htdocs/serviceNew/'
};

var jspath = [
    'dev/js/jquery-3.3.1.min.js',
    'dev/js/jquery.maskedinput.min.js',
    'dev/js/wow.min.js',
    'dev/js/app.js'
];

var csspath = [
    'dev/css/normalize.css',
    'dev/css/animate.min.css',
    'dev/css/style.css'
];

gulp.task('buildCss', function () {
    console.log('Работа с css файлами!');
    return gulp.src(csspath)
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(destpath.local + 'css'))
        .pipe(gulp.dest(destpath.web + 'css'));
});

gulp.task('buildPhp', function () {
    console.log('Работа с php файлами!');
    return gulp.src('dev/*.php')
        .pipe(gulp.dest(destpath.local))
        .pipe(gulp.dest(destpath.web));
});

gulp.task('buildJs', function () {
    console.log('Работа с js файлами!');
    return gulp.src(jspath)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destpath.local + 'js'))
        .pipe(gulp.dest(destpath.web + 'js'));
});

gulp.task('buildImage', function () {
    console.log('Работа с картинками!');
    return gulp.src('dev/image/*.*')
        .pipe(gulp.dest(destpath.local + 'image'))
        .pipe(gulp.dest(destpath.web + 'image'));
});

gulp.task('buildFonts', function () {
    console.log('Работа с шрифтами!');
    return gulp.src('dev/fonts/*.*')
        .pipe(gulp.dest(destpath.local + 'fonts'))
        .pipe(gulp.dest(destpath.web + 'fonts'));
});

gulp.task('css', function () {
    console.log('Работа с css файлами!');
    return gulp.src(csspath)
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(destpath.web + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('php', function () {
    console.log('Работа с php файлами!');
    return gulp.src('dev/*.php')
        .pipe(gulp.dest(destpath.web));
});

gulp.task('js', function () {
    console.log('Работа с js файлами!');
    return gulp.src(jspath)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destpath.web + 'js'));
});
gulp.task('watch', function () {
    browserSync.init({
        proxy: "https://ip-4a87.proline.net.ua/serviceNew/"
    });
    gulp.watch('dev/css/**/*.css', gulp.parallel('css')).on('change', browserSync.reload);
    gulp.watch('dev/js/**/*.js', gulp.parallel('js')).on('change', browserSync.reload);
    gulp.watch('dev/**/*.php', gulp.parallel('php')).on('change', browserSync.reload);
});

gulp.task('build', gulp.series('buildPhp', 'buildJs', 'buildCss', 'buildImage', 'buildFonts'));

exports.default = gulp.parallel('css', 'php', 'js', 'watch');