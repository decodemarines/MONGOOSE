const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ name: String });
        const user = mongoose.model('customers', userSchema);

        const users = [];

        for (let i = 0; i < 10; i++) {
            users.push({ name: `John${i}` });
        }

        try {
            await user.create(users);
            // Delete Many documents
            const result = await user.deleteMany({ name: /^John/ });

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
