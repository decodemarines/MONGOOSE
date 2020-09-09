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

        const doc = await user.findOne({
            'name.first': 'Chuck'
        });

        console.log(doc);
        // the same as
        console.log(doc.toObject());
    })
    .catch(error => {
        console.error('Error:', error);
    });
