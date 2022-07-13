const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/inotebook';

const connectToMongo = () => {
    mongoose.connect(dbUrl, () => {
        console.log("Database Connected !!");
    })
}

module.exports = connectToMongo;