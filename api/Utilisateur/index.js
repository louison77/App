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