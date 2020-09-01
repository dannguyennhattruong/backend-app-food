const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const database = (url) => {
    mongoose
        .connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch(err => {
            console.log("Could not connect to the database. Exiting now...", err);
            process.exit();
        });
    mongoose.set("useFindAndModify", false);
}



module.exports = database;