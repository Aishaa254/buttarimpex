require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const Contact = mongoose.model('Contact', new mongoose.Schema({}, { strict: false, timestamps: true }));

app.post('/contact', async (req, res) => {
    try {
        await Contact.create(req.body);
        res.send('Thank you! Your message has been sent.');
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));