const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.findOne({ name: /John/ }).skip(1);

        console.log(data); // { _id: 5ca1e8d838e641a3e498b210, name: 'John', age: 35 }
    })
    .catch(error => {
        console.error('Error:', error);
    });
