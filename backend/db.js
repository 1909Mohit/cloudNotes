if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL 

const connectToMongo = () => {
    mongoose.connect(dbUrl);
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
}

module.exports = connectToMongo;