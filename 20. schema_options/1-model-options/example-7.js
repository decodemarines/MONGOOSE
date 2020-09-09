const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const phonesSchema = new mongoose.Schema({
            phone: String,
            primary: Boolean
        });

        const userSchema = new mongoose.Schema({
            name: String,
            phones: [phonesSchema]
        });
        const user = mongoose.model('customers', userSchema);
        // Create user
        const source = await user.create({
            name: 'John',
            phones: [{ phone: '380975556677', primary: true }]
        });

        console.log('User:', source);

        const { _id: subDocId } = source.phones[0];
        const data = await user.findOne({ name: 'John' });

        console.log('data.phones', data.phones);

        const phone = data.phones.id(subDocId);

        console.log('Phone', phone);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
