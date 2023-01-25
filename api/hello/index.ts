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

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {


    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + " cc" + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            input: name,
            message: responseMessage
        }
    };

};


export default httpTrigger;