const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        const query = user.findOne({ name: 'John0' });

        query.exec((error, doc) => {
            console.log(doc); // { _id: 5ca1e8d838e641a3e498b210, name: 'John0', age: 18 }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
