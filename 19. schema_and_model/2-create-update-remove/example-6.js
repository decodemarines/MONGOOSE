const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            fName: String,
            lName: String
        });
        const user = mongoose.model('customers', userSchema);

        try {
            userSchema.index({ fName: 1, lName: -1 }, { name: 'flName' });
            await user.createIndexes();

            await user.create({
                fName: 'John',
                lName: 'Doe'
            });
        } catch (error) {
            console.error(error.message);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
