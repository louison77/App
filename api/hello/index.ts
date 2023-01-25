import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, // Retrieve connection string
    { // boiler plate values
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const ProjetSchema = new mongoose.Schema({
    projetid: { type: String, unique: true, required: true },
    statutaudit: String,
    statutplanaction: String
});

const Projet = mongoose.model("Projet", ProjetSchema);
async function createOne(projetData) {
    const projet = new Projet(projetData);
    return projet.save();
}

