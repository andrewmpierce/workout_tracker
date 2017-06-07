var express = require('express');
var app = express();
var routes = require("./routes");
var bodyParser = require('body-parser');
app.use(bodyParser());

app.use("/", routes);
app.use("/upload", routes);
app.use("/api", routes);



app.use(express.static('views'));
// app.get('/', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })


var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
