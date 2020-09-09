const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            address: mongoose.Schema.Types.ObjectId,
            address1: String,
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                address: mongoose.Types.ObjectId(),
                address1: mongoose.Types.ObjectId(),
            });

            // await user.create({
            //     // address: 'hello', // will cause an error
            //     // address1: 'hello',
            // });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
