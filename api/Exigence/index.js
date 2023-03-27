
const mongoose = require('mongoose');
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);
//Schema d'une Exigence avec mongoose.Schema, les différentes colonnes/attributs possibles
const ExigenceSchema = new mongoose.Schema({
    exigenceid: String,
    exigencenom: String,
    projetid: String,
    observations: String,
    maturite: String,
    note: String,
    color: [Number],
    domaine: String,
});
//Création d'un modèle avec le schéma définis précédemment
const Exigencemodel = mongoose.model("Exigence", ExigenceSchema);

// Export our function
//Selon le type de method (post,patch,delete,get) ce module va appeler une des fonctions défini en desous pour pouvoir communiquer avec la bdd mongodb
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
//cette fonction va chercher et récupérer toutes les exigences correspondants au model dans le bdd, on y accède avec la valeur exigence dans le body
async function findAll(context) {
    const exigence = await Exigencemodel.find();
    // return all exigences
    context.res.body = { exigence: exigence };
}

//Cette fonction va créer une Exigence selon les valeurs de context.req.body avec insertMany qu'on a spécifiè lors de la requête post
async function createOne(context) {

    /*const body = context.req.body;
    const exigence = await Exigencemodel.create(body);
    context.res.status = 201;
    // return new object
    context.res.body = exigence;*/

    try {
        const body = context.req.body;
        const exigence = await Exigencemodel.insertMany(body);
        context.res.status = 201;
        context.res.body = exigence
    }
    catch (e) {
        console.log(e)
    }
}

//Update une Exigence en cherchant la bonne exigence dans la bdd avec la fonction findOneAndUpdate selon son exigenceid présent dans le body et le body en question qu'on a passé en paramètre dans la requête patch
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