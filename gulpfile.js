var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var es = require('event-stream');

//to perform a task... (calling some scripts)
gulp.task('script',['runcoffee'],function(){
	return gulp.src('src/*.js')
	.pipe(concat('addMe'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('scripts',function(){
	var coff = gulp.src('src/*.coffee')
		.pipe(coffee()); //stored in memory the js then use it to merge...
		
	var js = gulp.src('src/*.js');
	return es.merge(coff,js)
		.pipe(concat('addMe'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
		
});

gulp.task('watch',function(){
	gulp.watch('src/*.{js,coffee}',['scripts']);
});

gulp.task('runcoffee',function(){
	return gulp.src('src/*.coffee')
	.pipe(coffee())
	.pipe(gulp.dest('src'));
});

