const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    description: String,
    nom: String,
    prix: Number,
    quantite: Number,
    poids: Number,
});

module.exports = mongoose.model("Item", itemSchema);