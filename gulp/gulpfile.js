//导入工具包 require('node_modules里对应模块')
//本地安装gulp所用到的地方
var gulp = require('gulp'), 
    sass = require('gulp-sass'),
 	htmlmin = require('gulp-htmlmin'),
 	//压缩图片
 	imagemin = require('gulp-imagemin'),
   	//imagemin插件，深度压缩图片
   	pngquant = require('imagemin-pngquant'),
   	//只压缩修改的图片，其余从缓存读取
   	cache = require('gulp-cache');
 	
gulp.task('testSass', function () {
    gulp.src('src/sass/*.scss') //该任务针对的文件
        .pipe(sass()) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将会在dist/css下生成css
});
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});
//定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
gulp.task('default',['testSass','testHtmlmin','testImagemin']); 
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
