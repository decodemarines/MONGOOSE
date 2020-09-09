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
            // Delete One documents
            const result = await user.deleteOne({ name: /^John/ });

            console.log(result);
            console.log(`Documents left: ${await user.countDocuments()}`);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
