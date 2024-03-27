const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://baptrgtt:WYk7zg1W9LZeRk2G@steakgenerator.aqcbsvs.mongodb.net/STEAK_GENERATOR_DB?retryWrites=true&w=majority&appName=SteakGenerator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const Viande = require("../models/Item"); // Create the Item model

app.get("/api/items", async (req, res) => {
  try {
    const items = await Viande.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});