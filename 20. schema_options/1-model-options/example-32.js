const mongoose = require('mongoose');
const { connection, delay } = require('../common');

connection
    .then(async () => {
        const usersSchema = new mongoose.Schema(
            {
                name: String,
                age: Number
            },
            { timestamps: { createdAt: 'created', updatedAt: 'modified' } }
        );

        const User = mongoose.model('users', usersSchema);

        const doc = new User({ name: 'John' });
        await doc.save();

        console.log('Before:', doc);
        await delay(3200);
        doc.set('age', 35);
        await doc.save();

        console.log('After:', doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
