const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

//Se référer à index.js du dossier Exigence où tout est expliquer
const UserSchema = new mongoose.Schema({
    mail: { type: String, unique: true },
    role: String,
});

const User = mongoose.model("User", UserSchema);

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

    const users = await User.find();
    // return all categories
    context.res.body = { users: users };

}

async function createOne(context) {

    const body = context.req.body;
    const user = await User.create(body);
    context.res.status = 201;
    // return new object
    context.res.body = user;
}

async function updateOne(context) {
    // Grab the id from the URL (stored in bindingData)
    try {
        const mail = context.req.body.mail;
        // Get the categorie from the body
        const user = context.req.body;
        // Update the item in the database
        await User.findOneAndUpdate({ mail: mail }, user);
        context.res.status = 204;
    }
    catch (error) {
        context.res.status = 404;
    }


}

async function deleteOne(context) {
    const mail = context.req.body.mail;
    const user = context.req.body;
    await User.deleteOne({ mail: mail, user });
    context.res.status = 204;
}