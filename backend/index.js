var Express   = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');
const { mongo } = require('mongoose');

var app = Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://baptrgtt:WYk7zg1W9LZeRk2G@steakgenerator.aqcbsvs.mongodb.net/?retryWrites=true&w=majority&appName=SteakGenerator"


var DATABASE_NAME = "STEAK_GENERATOR_DB";
var database;

app.listen(5038, () =>{
    Mongoclient.connect(CONNECTION_STRING,(error, client) => {
        database = client.db(DATABASE_NAME);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    })

})

app.get("/api/app/Viandes", (request, response) => {

    database.collection("items").find({}).toArray((error, result) => {
        response.send(result);  
    });
});

app.post("/api/app/AddViandes",multer().none(), (request, response) => {
    database.collection("items").count({},function(error, numOfDocs)
    {
        database.collection("items").insertOne({
            id: (numOfDocs+1).toString(),
            description: request.body.newDescription,
            prix: request.body.prix
        });
        response.json("Item added successfully");
    });

});

app.delete("/api/app/DeleteViandes", (request, response) => {
    database.collection("items").deleteOne({
        id: request.query._id
    });
    response.json("Item deleted successfully");
}) 
