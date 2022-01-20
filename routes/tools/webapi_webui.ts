export{}
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.render('webapi_webui/index');
});

module.exports = router;
