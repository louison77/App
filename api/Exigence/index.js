const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

const ExigenceSchema = new mongoose.Schema({
    exigenceid: String,
    exigencenom: String,
    projetid: String,
    observations: String,
    maturite: String,
    note: String,
});

const Exigencemodel = mongoose.model("Exigence", ExigenceSchema);

// Export our function
module.exports = async function (context, req) {
    // setup our default content type (we always return JSON)
    context.res = {
        header: {
            "Content-Type": "application/json"
        }
    }

    // Read the method and determine the requested action
    switch (req.method) {
        // If get, return all tasks
        case 'GET':
            await findAll(context);
            break;
        // If post, create new task
        case 'POST':
            await createOne(context);
            break;
        // If put, update task
        case 'PATCH':
            await updateOne(context);
            break;
        /*case 'DELETE':
            await deleteOne(context);
            break;*/
    }
};

async function findAll(context) {
    const exigence = await Exigencemodel.find();
    // return all exigences
    context.res.body = { exigence: exigence };
}

async function createOne(context) {

    const body = context.req.body;
    const exigence = await Exigencemodel.create(body);
    context.res.status = 201;
    // return new object
    context.res.body = exigence;
}

async function updateOne(context) {
    // Grab the id from the URL (stored in bindingData)
    try {
        const id = context.req.body.exigenceid;
        // Get the exigence from the body
        const exigence = context.req.body;
        // Update the item in the database
        await Exigencemodel.findOneAndUpdate({ exigenceid: id }, exigence);
        context.res.status = 204;
    }
    catch (error) {
        context.res.status = 404;
    }
    // Check to ensure an item was modified

}
/*
async function deleteOne(id) {
    const id = context.bindingData.id;
    const exigence = context.req.body;
    const result = await Exigence.deleteOne({ _id: id });
    context.res.status = 204;
}*/