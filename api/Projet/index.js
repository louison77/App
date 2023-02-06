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
    projetid: { type: String, unique: true, required: true },
    statutaudit: String,
    statutplanaction: String,
    manager: String,
    auditeur: String
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

function findAll() {
    return Projet.find();
}

async function createOne(projetData) {
    const projet = new Projet(projetData);
    return projet.save();
}

async function updateOne(id, projetData) {
    const projet = await findOne(id);
    for (const projetElementKey in projetData) {
      if (
        projetElementKey[0] !== "_" &&
        projetData.hasOwnProperty(projetElementKey)
      ) {
        projet[projetElementKey] = projetData[projetElementKey];
      }
    }
    await projet.save();
    return await findOne(id);
}

async function deleteOne(id) {
    const projet = await findOne(id);
    return projet.remove();
}