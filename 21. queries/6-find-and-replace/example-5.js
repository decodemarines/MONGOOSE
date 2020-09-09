const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String,
            },
        });
        const user = mongoose.model('customers', userSchema);

        const { _id } = await user.create({
            name: { first: 'Chuck', last: 'Norris' },
        });

        console.log(_id);

        const doc = await user.replaceOne(
            { 'name.first': 'Chuck' },
            { 'name.first': 'Andrey' },
        );

        console.log(doc);

        const { _id: _id1 } = await user.findOne({ 'name.first': 'Andrey' });

        console.log(_id1);

        const doc1 = await user.findOne({ 'name.first': 'Andrey' });

        console.log(doc1);
    })
    .catch(error => {
        console.error('Error:', error);
    });
