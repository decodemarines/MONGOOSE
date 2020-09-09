const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String
        });
        const user = mongoose.model('customers', userSchema);

        const query = user.findOne(
            { name: 'John1' },
            'name age -_id',
            (error, doc) => {
                console.log(doc); // { name: 'John1' }
            }
        );
    })
    .catch(error => {
        console.error('Error:', error);
    });
