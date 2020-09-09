const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            score: Double,
        });

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create([
                {
                    name: 'John',
                    score: 20.3,
                },
                {
                    name: 'Joe',
                    score: 20,
                },
            ]);

            const data = await user.find({}, { _id: false, __v: false });

            console.log(data);
            console.log(JSON.stringify(data, null, 4));
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
