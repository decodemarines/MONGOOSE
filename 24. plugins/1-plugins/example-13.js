const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            score: Int32,
        });

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                // -2147483647 ... 2147483647
                score: 2147483647 + 1,
            });

            const data = await user.findOne({}, { _id: false, __v: false });

            console.log(data);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
