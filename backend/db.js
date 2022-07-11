const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/inotebook';

const connectToMongo = () => {
    mongoose.connect(dbUrl, () => {
        console.log("Database Connected !!");
    })
}

module.exports = connectToMongo;