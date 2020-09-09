const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
            age: Number,
        });
        const user = mongoose.model('customers', userSchema);

        const data1 = await user.findOne({ name: 'John' });

        console.log(data1); // age 36

        const query = user.updateOne({ name: 'John' }, { $inc: { age: 1 } });

        query.then(() => {
            // increments age by 1
            console.log('Update 1');
        });

        query.then(() => {
            // increments age by 1
            console.log('Update 2');
        });

        query.then(() => {
            // increments age by 1
            console.log('Update 3');
        });

        const data2 = await user.findOne({ name: 'John' });

        console.log(data2); // age 39
    })
    .catch(error => {
        console.error('Error:', error);
    });
