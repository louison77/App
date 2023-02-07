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

async function findAll(context) {
    const sousexigences = await SousExigence.find();
    // return all tasks
    context.res.body = { sousexigences: sousexigences };
}

async function createOne(context) {
    const body = context.req.body;
    // Save to database
    const sousexigences = await SousExigence.create(body);
    // Set the HTTP status to created
    context.res.status = 201;
    // return new object
    context.res.body = sousexigences;
}
async function updateOne(id, sousExigenceData) {
    const sousExigence = await findOne(id);
    for (const sousExigenceElementKey in sousExigenceData) {
        if (
            sousExigenceElementKey[0] !== "_" &&
            sousExigenceData.hasOwnProperty(sousExigenceElementKey)
        ) {
            sousExigence[sousExigenceElementKey] = sousExigenceData[sousExigenceElementKey];
        }
    }
    await sousExigence.save();
    return await findOne(id);
}

async function deleteOne(id) {
    const sousExigence = await findOne(id);
    return sousExigence.remove();
}