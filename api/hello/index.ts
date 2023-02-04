import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    "mongodb://orange-database:ogumKKoSdyA0UGIkP9DFWe4ugqLo5uu8Ag4fzkcO79bSFkI6i23qEpf8DHPAZf5vZaEYqHPA7j0QACDbdJH90g==@orange-database.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@orange-database@", // Retrieve connection string
    { // boiler plate values
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

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