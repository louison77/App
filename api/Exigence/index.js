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
    exigenceid: { type: String, unique: true, required: true },
    macroexigenceid: String,
    projetid: String,
    libelle: String,
    guidecomplet: String,
    guideabrege: String,
    objectif: String,
    observations: String,
    selectionne: Number
  });

  const Exigence = mongoose.model("Exigence", ExigenceSchema);

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
    return Exigence.find();
}

async function createOne(projetData) {
    const exigence = new Exigence(projetData);
    return exigence.save();
}

async function updateOne(id, exigenceData) {
    const exigence = await findOne(id);
    for (const exigenceElementKey in exigenceData) {
      if (
        exigenceElementKey[0] !== "_" &&
        exigenceData.hasOwnProperty(exigenceElementKey)
      ) {
        exigence[exigenceElementKey] = exigenceData[exigenceElementKey];
      }
    }
    await exigence.save();
    return await findOne(id);
}

async function deleteOne(id) {
    const exigence = await findOne(id);
    return exigence.remove();
}