const mongoose = require('mongoose');
console.log(mongoose)
// Connect to the database
mongoose.connect(
    process.env.CONNECTION_STRING, { // boiler plate values
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

const UserSchema = new mongoose.Schema({
    mail: String,
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
        /*case 'DELETE':
            await deleteOne(context);
            break;*/
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
    const mail = context.req.body.mail;
    // Get the categorie from the body
    const user = context.req.body;
    // Update the item in the database
    const result = await User.findOneAndUpdate({ mail: mail }, user);
    // Check to ensure an item was modified
    if (result.nModified === 1) {
        // Updated an item, status 204 (empty update)
        context.res.status = 204;
    } else {
        // Item not found, status 404
        context.res.status = 404;
    }
}

async function deleteOne(context) {
    const mail = context.req.body.mail;
    const result = await User.deleteOne({ mail: mail });
    context.res.status = 204;
}