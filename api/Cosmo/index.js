const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
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

module.exports = async function (context, req) {
    try {


        const Projet = mongoose.model("Projet", ProjetSchema);
        context.res.status(200).json(Projet)

    }
    catch (error) {
        context.res.status(500).send(error)

    }


}
