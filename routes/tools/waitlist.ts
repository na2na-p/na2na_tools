export { }
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const dayjs = require('dayjs');

const mysql = require('mysql2');
let connection: any;
let result: any;
connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});



router.get('/', function (req: any, res: any, next: any) {
    let status:string = "No Data";
    let id: string = "No Data";
    let visibility: number = 1;
    let waitlists: any = [];
    //GETパラメータに、idがある場合は変数に設定
    if (req.query.id) {
        id = req.query.id;
        //idから空白を除去
        id = id.replace(/\s+/g, '');
    }
    if (req.query.visibility) {
        visibility = req.query.visibility.replace(/\s+/g, '');
    }
    if (req.query.status) {
        waitlists.status = req.query.status.replace(/\s+/g, '');
    }
    connection.query('SELECT * FROM waitlist_current_hold WHERE is_visible=1 ORDER BY created_at ASC', function (err: any, results: any) {
        if (err) {
            console.log(err);
            res.render('index', { title: 'Express' });
        } else {
            //該当のデータがない場合、"No Data"を表示
            if (results.length === 0) {
                waitlists.message = "No Data";
            } else {
                for (let i = 0; i < results.length; i++) {
                    waitlists.push(results[i]);
                    //created_atをmm/dd HH:mmに変換
                    waitlists[i].created_at = dayjs(waitlists[i].created_at).format('MM/DD HH:mm');
                }
            }
            res.render('waitlist/index', { visibility: visibility, id: id, waitlists: waitlists });
        }
    });
});


router.get('/views', function (req: any, res: any, next: any) {
    //getリクエストにあるidを取得
    let id = req.query.id;
    connection.query('SELECT * FROM `waitlist_' + id + '` WHERE is_checked=0 ORDER BY added_at ASC', [id], function (err: any, results: any) {
        if (err) {
            console.log(err);
            res.render('/index', { title: 'Express' });
        } else {
            let waitlists: any = [];
            for (let i = 0; i < results.length; i++) {
                waitlists.push(results[i]);
                //added_atをmm/dd HH:mmに変換
                waitlists[i].added_at = dayjs(waitlists[i].added_at).format('MM/DD HH:mm');
            }
            if (results.length === 0) {
                waitlists.message = "No Data";
            }
            //waitlist_current_holdから、idと一致したデータのうちnameを取得
            connection.query('SELECT name FROM waitlist_current_hold WHERE id=?', [id], function (err: any, results: any) {
                let name = results[0].name;
                if (err) {
                    console.log(err);
                    res.render('/index', { title: 'Express' });
                } else {
                    //waitlistに該当データがなければ、"データがありません"と表示
                    res.render('waitlist/views', { name : name, waitlists: waitlists, id: id });
                }
            });
        }
    });
});

module.exports = router;
