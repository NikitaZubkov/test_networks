/*
            gulp                - task-менеджер Gulp
            gulp-concat         - объединения файлов в один
            gulp-rename         - переименование файла/ов
            gulp-plumber        - обработчик ошибок сборщика;
            gulp-sourcemaps     - генерация Source-maps
            path                - утилита для работы с путями

            gulp-clean-css      - Сжимает css

            postcss
            postcss-import              - Поддержка @import в postcss
            postcss-mixins              - Поддержка mixin и @define-mixin
            postcss-nested-ancestors    - Поддержка вложенности селекторов
            postcss-nested        
            postcss-simple-vars         - Поддержка переменных
            postcss-hexrgba             - Поддержка вставки hex в rgba
            postcss-units               - Генерация rem или em при необходимости
            postcss-cssnext             - Поддержка некоторых функций css4: http://cssnext.io/
            postcss-easings             - Поддержка кривых для transition из: http://easings.net/ru
            postcss-extend              - Поддержка заполнителей для селекторов
            postcss-object-fit-images   - Преобразование object-fit и object-position для старых браузеров
            postcss-flexibility         - Преобразование display flex
            postcss-math                - Поддержка математически операций
            postcss-conditionals        - Поддержка условий в селекторах
            postcss-assets              - Изолирование путей в css до файлов/изображений
*/
    
    // Базовые модули
const   gulp                    = require('gulp'),
        plumber                 = require('gulp-plumber'),
        path                    = require('path'),                       
        concat                  = require('gulp-concat'),              
        cleanCSS                = require('gulp-clean-css'),    
        rename                  = require('gulp-rename'),           
        sourcemaps              = require('gulp-sourcemaps');

    // Модули для PostCSS
const   postcss                     = require('gulp-postcss'),
        postcss_import              = require('postcss-import'),
        postcss_mixins              = require('postcss-mixins'),
        postcss_nested_ancestors    = require('postcss-nested-ancestors'),
        postcss_nested              = require('postcss-nested'),
        postcss_simple_vars         = require('postcss-simple-vars'),
        postcss_hexrgba             = require('postcss-hexrgba'),
        postcss_units               = require('postcss-units'),
        postcss_cssnext             = require('postcss-cssnext'),
        postcss_easings             = require('postcss-easings'),
        postcss_extend              = require('postcss-extend'),
        postcss_object_fit_images   = require('postcss-object-fit-images'),
        postcss_flexibility         = require('postcss-flexibility'),
        postcss_math                = require('postcss-math'),
        postcss_conditionals        = require('postcss-conditionals'),
        postcss_assets              = require('postcss-assets');

    // Базовые переменные путей
const   nameOutCSS = 'style.min.css',
        postcssPath = './src/assets/postcss/',              // Папка с PostCSS файлами
        mainPostCSS = path.join(postcssPath, 'style.pcss'), // Имя главного pcss файла проекта
        cssOutPath = './public/css/';                       // папка со склеенным и уменьшенным css.
  
/**
 * Сборка и минификация css
 */
gulp.task('postcss-build', function(cb) {
    return gulp.src(mainPostCSS)
        .pipe(sourcemaps.init())
        .pipe( postcss([ 
                postcss_import(),
                postcss_mixins(),
                postcss_nested_ancestors(),
                postcss_nested(),
                postcss_simple_vars(),
                postcss_hexrgba(),
                postcss_units(),
                postcss_cssnext({ browsers: ['> 0.5%', 'last 10 versions'] }),
                postcss_easings(),
                postcss_extend(),
                postcss_object_fit_images(),
                postcss_flexibility(),
                postcss_math(),
                postcss_conditionals(),
                postcss_assets({ loadPaths: ['.'] }),
            ]) 
        )        
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe( rename(nameOutCSS) )
        .pipe( sourcemaps.write('./maps') )
        .pipe( gulp.dest(cssOutPath) );
});

/**
 * Наблюдение за изменениями всех css файлов
 */
gulp.task('watch-css', function() {
    gulp.watch(postcssPath+'**/*.pcss', ['postcss-build']);
})