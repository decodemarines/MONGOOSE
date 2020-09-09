const mongoose = require('mongoose');
const hashPlugin = require('./addHash');
const { connection } = require('../../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String,
        });

        userSchema.plugin(hashPlugin, { version: 'v1' });

        const user = mongoose.model('customers', userSchema);

        try {
            await user.create({
                name: 'John',
            });

            const data = await user.findOne({}).lean();

            console.log(data);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
