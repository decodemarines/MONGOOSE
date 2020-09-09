const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
            age: mongoose.SchemaTypes.Mixed,
        });
        const User = mongoose.model('customers', userSchema);

        const user = new User({ name: 'John', age: null });

        user.save()
            .then(data => {
                console.log(data); // saved to DB
            })
            .catch(error => {
                console.error(error);
            });
    })
    .catch(error => {
        console.error('Connection error', error);
    });
