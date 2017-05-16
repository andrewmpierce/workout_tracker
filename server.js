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
    var workout = req.params.workout;
    var query_string = 'SELECT * FROM ' + workout + ' WHERE user_id=$1'
    //console.log(res);
    pg.connect(conString, function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err)
      }
      client.query(query_string, ['andrew'], function (err, result) {
          done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
          var stats = result.rows[0];
          if (err) {
            // pass the error to the express error handler
            return next(err);
          }

          var ret = {};
          for (var key in stats) {
            if (key.slice(-7) === '_weight') {
              var reps = key.slice(0,-7) + '_reps';
              console.log(stats[reps]);
              if (stats[reps] == 36) {
                ret[key] = stats[key] + 5;
              } else {
                ret[key] = stats[key];
              }
            }
          }

          //console.log(ret);
          return res.json(ret);
        //console.log(result);
        //process.exit(0)
      })
    })
  //return res.json(stats);
});


app.post('/upload', function(req, res, next) {
  var data = req.body;
  var workout = {
    workout_type: data.workout_type
  };
  delete data.workout_type;

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var movement_reps = key.slice(0, -2) + '_reps';
      if (key.slice(-7) === '_weight') {
        workout[key] = parseInt(data[key]);
      }
      else if (!workout[movement_reps]) {
        workout[movement_reps] = parseInt(data[key]);
      }
      else {
        workout[movement_reps] += parseInt(data[key]);
      }
    }
  }

  console.log(workout)
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err)
    }
    client.query('SELECT * FROM pull WHERE user_id=$1', ['andrew'], function (err, result) {
        done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
        console.log(result.rows);
        if (err) {
          // pass the error to the express error handler
          return next(err);
        }

      //console.log(result);
      //process.exit(0)
    })
  })

});
