const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            age: Number,
        });
        const user = mongoose.model('customers', userSchema);
        const users = [];

        for (let i = 0; i < 3; i++) {
            users.push({
                insertOne: {
                    document: {
                        name: `John${i}`,
                        age: 18 + i,
                    },
                },
            });
        }

        users.push({
            updateOne: {
                filter: { name: 'John1' },
                update: { age: 35 },
            },
        });

        try {
            const data = await user.bulkWrite(users);

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
