const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String
        });
        const user = mongoose.model('customers', userSchema);

        const cursor = await user.find({}).cursor();

        cursor.on('data', doc => {
            console.log(doc);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
