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
    mesureid: String,
    projetid: String,
    priorite: String,
    complexite: String,
    cout: Number,
    porteur: String,
    debut: String,
    fin: String,
    statut: String
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
        /*case 'PATCH':
            await updateOne(context);
            break;
        /*case 'DELETE':
            await deleteOne(context);
            break;*/
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

/*async function updateOne(context) {
    // Grab the id from the URL (stored in bindingData)
    const id = context.req.body;
    // Get the categorie from the body
    const mesure = context.req.body;
    // Update the item in the database
    const result = await Mesure.updateOne({ _id: id }, categorie);
    // Check to ensure an item was modified
    if (result.nModified === 1) {
        // Updated an item, status 204 (empty update)
        context.res.status = 204;
    } else {
        // Item not found, status 404
        context.res.status = 404;
    }
}
/*
async function deleteOne(id) {
    const id = context.bindingData.id;
    const mesure = context.req.body;
    const result = await Mesure.deleteOne({ _id: id });
    context.res.status = 204;
}*/