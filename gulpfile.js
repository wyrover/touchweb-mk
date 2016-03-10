/**
 * @desc gulp help 输出相关帮助;
 * @author Aaron(rongzhong.sun@imike.com)'
 * npm install gulp gulp-if gulp-rev-all gulp-image browser-sync  gulp-useref gulp-filter gulp-uglify gulp-clean moment gulp-replace gulp-sequence gulp-minify-html gulp-minify-css gulp-zip -g
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task("default", function () {
      browserSync.init({
        server: {
            baseDir: "./",
            index: "mockup/wechat4.0/"
        }
    });

    gulp.watch(["./mockup/**"]).on("change", browserSync.reload);
});
