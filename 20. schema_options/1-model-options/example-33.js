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

        const user = mongoose.model('users', usersSchema);

        let doc = await user.create({ name: 'John' });

        console.log('Before:', doc);
        await delay(3200);

        doc = await user.findOneAndUpdate(
            { name: 'John' },
            { age: 35 },
            { new: true }
        );

        console.log('After:', doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
