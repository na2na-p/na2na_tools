import express from 'express';
const router = express.Router();
import cors from 'cors';
const MeCab = require('mecab-async')
const mecab = new MeCab();

import ngList from "../../data/NGWord.json";

// @ts-ignore
router.post('/is_includeNgWord', cors() , async (req: any, res: any) => {
    if (!req.body.text) {
        res.status(400).send("Bad Request");
    }else{
        const text = req.body.text;
        const result:any = await exec_mecab(text);
        console.log(result);
        //filter_listに含まれているかを確認する。
        //含まれていればtrueを返す
        //foreachを使って、filter_listに含まれているかを確認する
        let isInclude = false;
        for(let i=0;i<result.length;i++){
            if(ngList.includes(result[i][0])){
                isInclude = true;
                break;
            }
        }
        res.send(isInclude);
    }
});

async function exec_mecab(text:string){
    //PROMSEを使って、mecabを非同期で実行する
    return new Promise((resolve, reject) => {
        mecab.parse(text, function (err: any, result: any) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    }
    );
}

export {router as apiWordRouter};