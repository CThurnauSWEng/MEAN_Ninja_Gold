const express = require('express');

const app = express();

app.use(express.static(__dirname + '/AngularApp/dist'));
// Require Mongoose
var mongoose = require('mongoose');
// connect to mongodb using mongoose - "ninja_gold" is the name of the db for this project
mongoose.connect('mongodb://localhost/ninja_gold');
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());

var NinjaSchema = new mongoose.Schema({
    gold: Number,
    activityLog: [String]
})
mongoose.model("NinjaGold",NinjaSchema);
var NinjaGold = mongoose.model("NinjaGold");

app.get('/', function (req, res){
    console.log('got hit');
    res.render('index');
});

app.get('/game', function(req, res){
    ninjaGold = new NinjaGold({gold: 0, activityLog: []});
    ninjaGold.save(function(err){
        if (err){
            console.log("there was an error while saving the game", ninjaGold.errors);
            res.json({"Status": "Error", "Errors":ninjaGold.errors});
        } else {
            console.log("successfully added a game with id: ", ninjaGold['_id']);
            res.json({"Status": "Success", "id":ninjaGold['_id']});
        }
    })
})

app.put('/game/:id', function(req, res){
    NinjaGold.findByIdAndUpdate({"_id":req.params.id}, {"gold":req.body.gold, "activityLog": req.body.activityLog}, function(err) {
        if (err){
            console.log("there was an error while updating the game", err);
            res.json({"Status": "Error", "Errors":err});
        } else {
            console.log("successfully updated a game with id: ", req.params.id);
            res.json({"Status": "Success"});
        }        
    })
})

app.listen(8000, function() {
    console.log("Hello Angular listening on port 8000")
})