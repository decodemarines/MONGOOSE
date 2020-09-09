const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            score: Number,
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
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
