const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ name: String });
        const user = mongoose.model('customers', userSchema);
        const users = [];

        for (let i = 0; i < 50; i++) {
            users.push({ name: `John${i}` });
        }

        try {
            const data = await user.create(users);

            console.log(`Num users inserted: ${data.length}`);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
