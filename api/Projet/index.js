const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

const ProjetSchema = new mongoose.Schema({

    nom: String,
    projetid: String,
    statutaudit: String,
    statutplanaction: String,
    manager: String,
    auditeur: [String],
});

const Projet = mongoose.model("Projet", ProjetSchema);

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
        //If put, update categorie
        case 'PATCH':
            await updateOne(context);
            break;
        case 'DELETE':
            await deleteOne(context);
            break;
    }
};

async function findAll(context) {

    const projets = await Projet.find();
    // return all categories
    context.res.body = { projets: projets };

}

async function createOne(context) {

    const body = context.req.body;
    const projet = await Projet.create(body);
    context.res.status = 201;
    // return new object
    context.res.body = projet;
}

async function updateOne(context) {
    // Grab the id from the URL (stored in bindingData)
    try {


        const id = context.req.body.projetid;
        // Get the categorie from the body
        const projet = context.req.body;
        // Update the item in the database
        await Projet.findOneAndUpdate({ projetid: id }, projet);
        context.res.status = 204;
    }
    catch (error) {
        context.res.status = 404;
    }

}

async function deleteOne(context) {
    const id = context.req.body.projetid;
    const projet = context.req.body;
    await Projet.deleteOne({ projetid: id, projet });
    context.res.status = 204;

}