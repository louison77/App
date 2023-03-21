const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

const MesureSchema = new mongoose.Schema({
    mesureid: { type: String, unique: true },
    projetid: String,
    priorite: String,
    complexite: String,
    cout: Number,
    coutrun: Number,
    porteur: String,
    debut: String,
    fin: String,
    statut: String,
    macro: String,
    domaine: String,
    note: Number,
});

const Mesure = mongoose.model("Mesure", MesureSchema);

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
        // If get, return all categories
        case 'GET':
            await findAll(context);
            break;
        // If post, create new categorie
        case 'POST':
            await createOne(context);
            break;
        // If put, update categorie
        case 'PATCH':
            await updateOne(context);
            break;
        case 'DELETE':
            await deleteOne(context);
            break;
    }
};

async function findAll(context) {
    const mesure = await Mesure.find();
    // return all categories
    context.res.body = { mesure: mesure };
}

async function createOne(context) {
    try {
        const body = context.req.body;
        const mesure = await Mesure.create(body);
        context.res.status = 201;
        // return new object
        context.res.body = mesure;
    }
    catch (error) {
        context.res.status = 404
    }
}

async function updateOne(context) {
    // Grab the id from the URL (stored in bindingData)
    try {
        const id = context.req.body.mesureid;
        // Get the categorie from the body
        const mesure = context.req.body;
        // Update the item in the database
        await Mesure.findOneAndUpdate({ mesureid: id }, mesure);
        context.res.status = 204;
    }
    catch (error) {
        context.res.status = 404;
    }

}

async function deleteOne(context) {
    const id = context.req.body.mesureid;
    const mesure = context.req.body;
    await Mesure.deleteOne({ mesureid: id }, mesure);
    context.res.status = 204;
}