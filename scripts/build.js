const fse = require('fs-extra');

//"./public"と"./views"を、"./built/public"と"./built/views"にコピーする
fse.copySync('./public', './built/public');
fse.copySync('./views', './built/views');