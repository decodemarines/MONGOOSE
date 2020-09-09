const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                type: String
            },
            created: {
                type: Date,
                index: {
                    expireAfterSeconds: 600
                }
            }
        });
        const user = mongoose.model('customers', userSchema);

        try {
            await user.create({
                name: 'John',
                created: new Date()
            });
            const data = await user.create({
                name: 'John',
                created: new Date()
            });

            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
