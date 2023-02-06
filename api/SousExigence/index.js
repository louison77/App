const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

const SousExigenceSchema = new mongoose.Schema({
    sousexigenceid: String,
    exigenceid: String,
    projetid: String,
    libelle: String,
    descriptif: String,
    maturite: Number
});

const SousExigence = mongoose.model("SousExigence", SousExigenceSchema);

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
        case 'DELETE':
            await deleteOne(context);
            break;
    }
};

async function findAll() {
    const sousExigence = await SousExigence.find();
    // return all sous exigences
    context.res.body = { sousExigence: sousExigence };
}

async function createOne(context) {

    const body = context.req.body;
    const sousExigence = new SousExigence(body);
    context.res.status = 201;
    // return new object
    context.res.body = sousExigence;
}

async function updateOne(context) {
    // Grab the id from the URL (stored in bindingData)
    const id = context.bindingData.id;
    // Get the sousExigence from the body
    const sousExigence = context.req.body;
    // Update the item in the database
    const result = await SousExigence.updateOne({ _id: id }, sousExigence);
    // Check to ensure an item was modified
    if (result.nModified === 1) {
        // Updated an item, status 204 (empty update)
        context.res.status = 204;
    } else {
        // Item not found, status 404
        context.res.status = 404;
    }
}

async function deleteOne(id) {
    const id = context.bindingData.id;
    const sousExigence = context.req.body;
    const result = await SousExigence.deleteOne({ _id: id });
    context.res.status = 204;
}