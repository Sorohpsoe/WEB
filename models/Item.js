const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    id : Number,
    description: String,
    nom: String,
    prix: Number,
    quantite: Number,
    poids: Number,
});

module.exports = mongoose.model("Item", itemSchema);