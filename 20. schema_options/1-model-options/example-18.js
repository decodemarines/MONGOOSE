const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String
        }); // strict: true

        const User = mongoose.model('customers', userSchema);

        const user = new User(
            {
                name: 'John'
            },
            false // strict: false for schema
        );        
        
        const user1 = new User(
            {
                name: 'John'
            },
        );

        user.set('age', 35);
        user1.set('age', 35);

        console.log(user); // no age field without strict false
        console.log(user1); // no age field without strict false

        user.save();
        user1.save();
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
