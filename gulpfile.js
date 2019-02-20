const outputDir = 'build';

//https://github.com/mafintosh/pump
const pump      = require('pump');

//https://github.com/gulpjs/gulp
const gulp      = require('gulp');

//https://github.com/terinjokes/gulp-uglify
const uglify    = require('gulp-uglify');

//https://github.com/scniro/gulp-clean-css
const cleanCSS  = require('gulp-clean-css');

//https://github.com/cynosureabu/gulp-min-ejs
const minifyejs = require('gulp-minify-ejs');

const tasks = {
    //压缩src/public/js目录下的js文件
    compressJS: callback => {
        const option = {
            mangle : {
                toplevel: true,
                keep_fnames: true,
                reserved: ['$']
            }
        };
        pump([
            gulp.src('src/public/js/**/*.js'),
            uglify(option),
            gulp.dest(outputDir + '/public/js/')
        ], callback);
    },

    //处理src/public/css目录下的css文件中的空行
    cleanCSS: callback => {
        pump([
            gulp.src('src/public/css/*.css'),
            cleanCSS({compatibility: 'ie8'}),
            gulp.dest(outputDir + '/public/css/')
        ], callback);
    },
    
    //复制src/public目录下的其他文件
    copyPublic: callback => {
        pump([
            gulp.src(['src/public/**', '!src/public/js/**/*.js', '!src/public/css/**/*.css']),
            gulp.dest(outputDir + '/public/')
        ], callback);
    },

    //处理src/private/views目录下的ejs模板中的空白行
    minifyejs: callback => {
        pump([
            gulp.src('src/private/views/**/*.ejs'),
            minifyejs(),
            gulp.dest(outputDir + '/private/views/')
        ], callback);
    },

    //复制src/private目录下的其他文件
    copyPrivate: callback => {
        pump([
            gulp.src(['src/private/**', '!src/private/views/**/*.ejs']),
            gulp.dest(outputDir + '/private/')
        ], callback);
    }
};

for(const key in tasks) {
    gulp.task(key, tasks[key]);
}

gulp.task('default', Object.keys(tasks));
