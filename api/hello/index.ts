import { AzureFunction, Context, HttpRequest } from "@azure/functions"



const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const mongoose = require('mongoose');

    // Connect to the database
    mongoose.connect(
        process.env.CONNECTION_STRING, // Retrieve connection string
        { // boiler plate values
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

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