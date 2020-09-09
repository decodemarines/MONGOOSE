const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        // const data = await user.find({
        //     $and: [{ name: 'John0' }, { age: 43 }]
        // });

        const $or = [{ name: 'John0', age: 35 }];

        if (true) {
            $or.push({ age: 43 });
        }

        const data = await user.find({
            $or,
        });

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
