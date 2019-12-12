const gulp = require('gulp');
const less = require('gulp-less');
const twig = require('gulp-twig');

gulp.task('styles', function () {
    var output = './public/styles';
    return gulp
        .src('./src/index.less')
        .pipe(less())
        .pipe(gulp.dest(output));
});

gulp.task('sample', function () {
    var srcfile = './src/sample.less';
    var output = './public/styles';
    return gulp
        .src(srcfile)
        .pipe(less())
        .pipe(gulp.dest(output));
});

gulp.task('twig', function () {
    return gulp.src([
        './templates/index.twig',
        './templates/components/*.twig'
    ])
    // Load template pages json data
    // .pipe(data(function (file) {
    //     return JSON.parse(fs.readFileSync(paths.data + path.basename(file.path) + '.json'));
    // }))
        .pipe(
            twig().on('error', function (err) {
                process.stderr.write(err.message + '\n');
                this.emit('end');
            })
        )
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
    gulp.watch('./src/*', gulp.series('styles'));
    gulp.watch('./src/components/*', gulp.series('styles'));
    gulp.watch('./src/globals/*', gulp.series('styles'));
});