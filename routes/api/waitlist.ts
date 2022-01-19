export{}
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

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

router.post('/create_list', function(req: any, res: any, next: any) {
    //POSTで送られてきたリスト名を取得
    let listName: string = req.body.listName;
    let id:string = uuid.v4();
    let visibility:number = req.body.visibility;
    //リスト名をDBに保存
    connection.query('INSERT INTO waitlist_current_hold (id, name, is_visible) VALUES (?, ?, ?)', [id, listName, visibility], function(err: any, results: any) {

        //idをテーブル名に設定し、リストを作成する。
        //waitlist_templateのテーブル構造をそのまま用いる
        connection.query('CREATE TABLE `waitlist_' + id + '` LIKE waitlist_template', function(err: any, results: any) {
            if (err) {
                console.log(err);
                res.render('index', { title: 'Express' });
            } else {
                res.redirect('/tools/waitlist?id=' + id + "&visibility=" + visibility);
            };
        });
        });
});

router.post('/add_waitlist', function(req: any, res:any, next: any) {
  //postリクエストから、id,number,commentを取得
    let id: string = req.body.list_id;
    //idから空白を除去
    id = id.replace(/\s+/g, '');
    let number: string = req.body.number;
    let comment: string = req.body.comment;

    //waitlist_${id}にnumber,commentを保存
    connection.query('INSERT INTO `waitlist_' + id + '` (student_no, comment) VALUES (?, ?)', [number, comment], function(err: any, results: any) {
        if (err) {
            console.log(err);
            res.render('index', { title: 'Express' });
        } else {
            let redirect_uri : string = '/tools/waitlist/views/?id=' + id;
            res.redirect(redirect_uri);
        };
    }
    );
});

router.get('/delete_list', function(req:any, res:any, next:any) {
    //getで渡されたidを取得
    let id: string = req.query.id;
    //idから空白を除去
    id = id.replace(/\s+/g, '');
    let table_name:string = 'waitlist_' + id;
    //table_nameを削除
    connection.query('DROP TABLE `' + table_name + '`', function(err: any, results: any) {
        if (err) {
            console.log(err);
            res.render('index', { title: 'Express' });
        } else {
            //waitlist_current_holdからidを削除
            connection.query('DELETE FROM waitlist_current_hold WHERE id = ?', [id], function(err: any, results: any) {
                if (err) {
                    console.log(err);
                    res.render('index', { title: 'Express' });
                } else {
                    res.redirect('/tools/waitlist?status=delete');
                };
            });
        };
    }
    );
})

router.post('/mark_checked', function(req:any, res:any, next:any) {
    //getで渡されたwaitlist_id,list_idを取得
    let waitlist_id: string = req.body.waitlist_id;
    let list_id: string = req.body.list_id;
    //waitlist_${list_id}からwaitlist_idに該当するフィールドに対して、is_checkedを1にする
    connection.query('UPDATE `waitlist_' + list_id + '` SET is_checked = 1 WHERE id = ?', [waitlist_id], function(err: any, results: any) {
        if (err) {
            console.log(err);
            res.render('index', { title: 'Express' });
        } else {
            res.redirect('/tools/waitlist/views/?id=' + list_id);
        };
    }
    );
})

router.post('/get_waitList',function(req:any, res:any, next:any){
    console.log(req.body);
    let id: string = req.body.id;
    //SELECT * FROM `waitlist_' + id + '` WHERE is_checked=0 ORDER BY added_at ASC
    //結果をJSONで返すREST API
    connection.query('SELECT * FROM `waitlist_' + id + '` WHERE is_checked=0 ORDER BY added_at ASC', function(err: any, results: any) {
        if (err) {
            console.log(err);
            res.render('index', { title: 'Express' });
        } else {
            res.json(results);
        };
    }
    );
});

module.exports = router;
