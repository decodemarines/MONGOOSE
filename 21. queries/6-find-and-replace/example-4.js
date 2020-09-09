const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String
            }
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.create({
            name: { first: 'Chuck', last: 'Norris' }
        });

        const doc1 = await user.findOneAndRemove({ 'name.first': 'Chuck' });

        console.log(doc1);

        const doc2 = await user.findOne({ 'name.first': 'Chuck' });

        console.log(doc2); // null
    })
    .catch(error => {
        console.error('Error:', error);
    });
