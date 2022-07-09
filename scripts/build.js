const fse = require('fs-extra');

//"./public"と"./views"を、"./built/public"と"./built/views"にコピーする
fse.copySync('./src/public', './built/public');
fse.copySync('./src/views', './built/views');
fse.copySync('./src/data', './built/data');