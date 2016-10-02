var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

//자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('optimize-js', function () {
	return gulp.src(['src/js/!(main).js', 'src/js/main.js'])
		.pipe(plumber())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({stream: true}));
});

//CSS 파일을 하나로 합치고 압축한다.
gulp.task('optimize-css', function () {
	return gulp.src(['src/css/!(style).css', 'src/css/style.css'])
		.pipe(plumber())
		.pipe(concat('style.css'))
		.pipe(cleanCss({compatibility: 'ie10'}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({stream: true}));
});

//HTML 파일을 압축한다.
gulp.task('concat-html', function () {
	return gulp.src(['src/commonHeader.html', 'src/content*.html', 'src/commonFooter.html'])
		.pipe(plumber())
		.pipe(concat('skin.html'))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({stream: true}));
});

//이미지 파일을 복사한다.
gulp.task('serve-images', function () {
	return gulp.src('src/images/**/*')
		.pipe(plumber())
		.pipe(gulp.dest('dist/images'));
});


//index.xml 파일을 복사한다.
gulp.task('serve-xml', function () {
	return gulp.src('src/index.xml')
		.pipe(plumber())
		.pipe(gulp.dest('dist/'));
});

//Static Server 를 시작한다.
gulp.task('static-server', ['build'], function () {
	// dist 디렉토리를 기준으로 웹서버 시작
	browserSync.init({
			server: {
					baseDir: './dist',
					index: 'skin.html'
			}
	});
});

//전체 빌드를 수행한다.
gulp.task('build', ['serve-xml', 'serve-images', 'optimize-js', 'optimize-css','concat-html']);

// 파일 변경 감지
gulp.task('watch', function () {
	gulp.watch('src/js/*.js', ['optimize-js']);
	gulp.watch('src/css/*.css', ['optimize-css']);
	gulp.watch('src/*.html', ['concat-html']);
	gulp.watch('src/index.xml', ['serve-xml']);
	gulp.watch('src/images/*', ['serve-images']);
});

//기본 task 설정
gulp.task('default', ['static-server', 'watch' ]);
