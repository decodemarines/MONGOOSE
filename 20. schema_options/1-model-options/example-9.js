const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const phonesSchema = new mongoose.Schema(
            {
                phone: String,
                primary: Boolean
            }
            // NOT throw an error
            // { _id: false }
        );

        const userSchema = new mongoose.Schema(
            {
                name: String,
                phones: [phonesSchema]
            },
            // throw an error: Connection error document must have an _id before saving
            { _id: false }
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            _id: mongoose.Types.ObjectId(),
            name: 'John',
            phones: [{ phone: '380975556677', primary: true }]
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
