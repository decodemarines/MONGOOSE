const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: {
                    type: String,
                    required: true,
                },
            },
        });
        const user = mongoose.model('customers', userSchema);

        const doc = await user.findOneAndUpdate(
            { 'name.first': 'Chuck' },
            { 'name.first': 'Andrey' },
            { new: true, upsert: true },
        );

        console.log(doc);
    })
    .catch(error => {
        console.error('Error:', error);
    });
