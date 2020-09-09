const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const usersSchema = new mongoose.Schema(
            {
                name: String
            },
            { timestamps: true }
        );

        const user = mongoose.model('users', usersSchema);

        const doc = new user({
            name: 'John'
        });

        await doc.save();

        console.log(doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
