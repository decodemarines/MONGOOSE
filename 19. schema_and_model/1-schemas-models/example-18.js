const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            created: Date,
            modified: Date,
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                created: '2019-03-25 12:04',
                modified: new Date(),
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
