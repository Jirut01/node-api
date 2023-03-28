var express = require("express");
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  let query = req.query
  console.log(query);  //get query ?key=value&key=value
  res.send(query)
  // res.send('hello api get');
});

router.get("/getparams/:id", function (req, res, next) {
  try {
    let params = req.params;
    // x+y
    // throw {message: 'ข้อมูลไม่ครบ', status: 400} // บังคับเด้งเข้า catch
    console.log(params);  //get params **ข้อควรระวัง api ห้ามซ้ำ
    return res.status(200).send({
      data: params,
      message: "get success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status|| 500).send({
      message: err.message,
      success: false,
    });
  }
});


router.post("/", function (req, res, next) {
  let body = req.body; //get by body
  console.log(body);
  res.send(body);
});

router.put("/", function (req, res, next) {
  res.send("hello api put");
});

router.delete("/", function (req, res, next) {
  res.send("hello api delete");
});

module.exports = router;
