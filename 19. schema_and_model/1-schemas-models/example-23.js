const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String
            },
            dob: {
                type: Date,
                alias: 'dateOfBirth'
            }
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                name: 'John',
                dob: new Date()
            });

            console.log(`Users date of birth: ${data.dateOfBirth}`);
            console.log(`Users date of birth: ${data.dob}`);
        } catch (error) {
            console.error(error.message);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
