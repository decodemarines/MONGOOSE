const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const phonesSchema = new mongoose.Schema(
            {
                phone: String,
                primary: Boolean
            },
            // can be used on sub documents level
            { _id: false }
        );

        const userSchema = new mongoose.Schema({
            name: String,
            phones: [phonesSchema]
        });

        const user = mongoose.model('customers', userSchema);
        const source = await user.create({
            name: 'John',
            phones: [{ phone: '380975556677', primary: true }]
        });

        // console.log(source);

        /////////////////////////////////////////////////////
        const { _id: subDocId } = source.phones[0];
        
        console.log('subDocId', subDocId);

        const data = await user.findOne({ name: 'John' });
        console.log('data.phones', data.phones);
        const phone = data.phones.id(source._id);

        console.log(phone); // null
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
