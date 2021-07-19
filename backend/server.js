const express = require("express");
const bodyParser = require("body-parser");
const db=require("./db");

const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
        id INTEGER AUTO_INCREMENT,
        value TEXT,
        PRIMARY KEY (id)
)`,(err, results, fields) => {
    console.log('results', results);
});

app.listen(5000, () => {
    console.log("어플리케이션이 5000 포트에서 시작되었습니다.!!!");
});

//DB의 값을 가져와 화면에 보여주기
app.get('/api/values', function(req, res){
    //데이터베이스에서 모든 정보를 가져오기
    db.pool.query('SELECT * FROM lists;',
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json(results);  
    });
});

//입력된 값을 DB에 넣어주기
app.post('/api/value', function(req, res){
    //데이터베이스에 값 넣기
    db.pool.query('INSERT INTO lists(value) VALUES ("${req.body.value}")',
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success:true, value:req.body.value});    
    });
});



