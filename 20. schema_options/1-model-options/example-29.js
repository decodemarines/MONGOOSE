const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const hobbiesSchema = new mongoose.Schema({
            title: String,
            started: Date,
        });
        const usersSchema = new mongoose.Schema(
            {
                name: String,
                hobbies: [hobbiesSchema],
            },
            { skipVersioning: { hobbies: true } },
        );

        const User = mongoose.model('users', usersSchema);

        const doc = new User({
            name: 'John',
        });

        await doc.save();
        console.log('Before:', doc);

        doc.hobbies.push({ title: 'traveling', started: new Date() });

        await doc.save();

        console.log('After:', doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
