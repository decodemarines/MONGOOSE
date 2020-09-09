const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.findOne({ name: 'John1' });

        // findOne
        if (!data) {
            // handle user not found
            console.log('User not found!');
        }

        // find
        // if (!data.length) {
        //     // handle users not found
        //     console.log('Users not found!');
        // }

        console.log(data); // { _id: 5ca1fd8138e641a3e498b277, name: 'John1', age: 36 }
    })
    .catch(error => {
        console.error('Error:', error);
    });
