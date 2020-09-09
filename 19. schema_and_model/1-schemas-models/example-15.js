const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            description: mongoose.Schema.Types.Mixed

            // Mixed is dangerous
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data1 = await user.create({
                description: ['Hello', 'John']
            });

            const data2 = await user.create({
                description: 'Hello, John'
            });

            console.log(data1);
            console.log(data2);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
