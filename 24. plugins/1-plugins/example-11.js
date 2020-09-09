const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            score: Int32,
            discount: Number,
        });

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create([
                {
                    name: 'John',
                    score: 20.6, // Math.round
                    discount: 10, // Int32
                },
                {
                    name: 'John',
                    score: 20.4, // Math.round
                    discount: 10.5, // Double
                },
            ]);

            const data = await user.findOne({}, { _id: false, __v: false });

            console.log(data);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
