const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const addressSchema = new mongoose.Schema({
            city: String,
            street: String,
            b: String,
            apt: String
        });
        const userSchema = new mongoose.Schema({
            name: String,
            addresses: [addressSchema]
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                name: 'John',
                addresses: [
                    {
                        city: 'Kyiv',
                        apt: '123'
                    },
                    {
                        country: 'Ukraine',
                        city: 'Lviv',
                        apt: '34'
                    }
                ]
            });

            console.log(data);
        } catch ({ message }) {
            console.error(`Catch block message: ${message}`);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
