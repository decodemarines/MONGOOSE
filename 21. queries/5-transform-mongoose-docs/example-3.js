const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String
            },
            created: Date
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.create({
            name: { first: 'Chuck', last: 'Norris' },
            created: new Date()
        });

        const doc = await user.findOne({
            'name.first': 'Chuck'
        });

        console.log(doc.toJSON());
        // almost the same the same as
        console.log(JSON.parse(JSON.stringify(doc)));
    })
    .catch(error => {
        console.error('Error:', error);
    });
