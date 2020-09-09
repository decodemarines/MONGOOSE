const mongoose = require('mongoose');
const randomPlugin = require('./random');
const { connection } = require('../../common');

// globally add plugin
mongoose.plugin(randomPlugin);

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
        });

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
            });

            const data = await user
                .findRandom()
                .select('-_id -__v')
                .lean();

            console.log(data);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
