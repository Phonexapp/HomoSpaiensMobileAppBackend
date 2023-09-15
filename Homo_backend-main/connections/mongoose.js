const { default: mongoose } = require("mongoose");

function connectMongo() {
    mongoose.connect("mongodb://0.0.0.0:27017/HOMOSPAINES")
        .then((res) => {
            console.log("Database Connected");
        }).catch(e => console.log(e))
}

module.exports = connectMongo