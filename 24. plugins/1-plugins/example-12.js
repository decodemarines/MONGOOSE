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
                score: NaN, //  Cast to Int32 failed for value "Infinity" at path "score"
                // score: Infinity, //  Cast to Int32 failed for value "Infinity" at path "score"
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
