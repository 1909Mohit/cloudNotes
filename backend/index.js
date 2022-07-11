const express = require('express');
const connectToMongo = require('./db');
const UserRoutes = require('./routes/auth');
const NotesRoutes = require('./routes/note');

const app = express();
connectToMongo();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('OH boy its working!!')
})

//
app.use('/auth', UserRoutes);
app.use('/note', NotesRoutes);


const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})