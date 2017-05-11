var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var form = require('express-form');
var field = form.field;
const pg = require('pg');
const conString = 'postgres://andrew:@localhost/workout_tracker'; // make sure to match your own database's credentials



app.use(express.static('views'));
// app.get('/', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })

app.use(bodyParser());

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/api/:workout?', function(req, res, next) {
    console.log(req.params.workout);
    var stats = {
      chest_press: 25
    };
    return res.json(stats);
    //console.log(res);
});


app.post('/upload', function(req, res, next) {
    console.log(req.body);
});

pg.connect(conString, function (err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT * FROM pull', [], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

    console.log(result.rows[0])
    process.exit(0)
  })
})
