require('dotenv').config(); 

const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToMongo;
