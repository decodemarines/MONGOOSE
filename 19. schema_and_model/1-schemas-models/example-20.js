const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                unique: true
            }
        });
        const user = mongoose.model('customers', userSchema);

        try {
            await user.create({
                name: 'John'
            });
            const data = await user.create({
                name: 'John'
            });

            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
