var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var form = require('express-form');
var field = form.field;
const pg = require('pg');
const conString = process.env.DATABASE_URL || 'postgres://andrew:@localhost/workout_tracker'; // make sure to match your own database's credentials



router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

router.get('/api/:workout?', function(req, res, next) {
    var workout = req.params.workout;
    var query_string = 'SELECT * FROM ' + workout + ' WHERE user_id=$1 ORDER  BY "date_added" DESC LIMIT 1;'

    pg.connect(conString, function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err)
      }
      client.query(query_string, ['test'], function (err, result) {
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


router.post('/upload', function(req, res, next) {
  var data = req.body;
  var workout = {
    workout_type: data.workout_type
  };
  delete data.workout_type;

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var movement_reps = key.slice(0, -2) + '_reps';
      if (key.slice(-7) == '_weight') {
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
  switch (workout.workout_type) {
    case 'pull':
      var query_string = "INSERT INTO pull (user_id, pull_up_weight, pull_up_reps, bent_over_row_weight, bent_over_row_reps, reverse_fly_weight, reverse_fly_reps, shrug_weight, shrug_reps, bicep_curl_weight, bicep_curl_reps) VALUES ('test', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
      console.log(query_string);
      var query_array = [workout.pull_up_weight, workout.pull_up_reps, workout.bent_over_row_weight, workout.bent_over_row_reps, workout.reverse_fly_weight, workout.reverse_fly_reps, workout.shrug_weight, workout.shrug_reps, workout.bicep_curl_weight, workout.bicep_curl_reps];
      console.log(query_array);
    break;

    case 'push':
      var query_string = "INSERT INTO push (user_id, chest_press_weight, chest_press_reps, incline_fly_weight, incline_fly_reps, arnold_press_weight, arnold_press_reps, overhead_tricep_extension_weight, overhead_tricep_extension_reps) VALUES ('test', $1, $2, $3, $4, $5, $6, $7, $8)";
      console.log(query_string);
      var query_array = [workout.chest_press_weight, workout.chest_press_reps, workout.incline_fly_weight, workout.incline_fly_reps, workout.arnold_press_weight, workout.arnold_press_reps, workout.overhead_tricep_extension_weight, workout.overhead_tricep_extension_reps];
      console.log(query_array);
    break;

    case 'legs':
      var query_string = "INSERT INTO legs (user_id, goblet_squat_weight, goblet_squat_reps, lunge_weight, lunge_reps, single_leg_deadlift_weight, single_leg_deadlift_reps, calf_raise_weight, calf_raise_reps) VALUES ('test', $1, $2, $3, $4, $5, $6, $7, $8)";
      console.log(query_string);
      var query_array = [workout.goblet_squat_weight, workout.goblet_squat_reps, workout.lunge_weight, workout.lunge_reps, workout.single_leg_deadlift_weight, workout.single_leg_deadlift_reps, workout.calf_raise_weight, workout.calf_raise_reps];
      console.log(query_array);
    break;
  }
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err)
    }
    client.query(query_string, query_array, function (err, result) {
        done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
        console.log(result);
        if (err) {
          // pass the error to the express error handler
          return next(err);
        }

      //console.log(result);
      //process.exit(0)
    })
  })

});

module.exports = router;
