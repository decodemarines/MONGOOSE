const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
            },
            {
                versionKey: 'rev',
            },
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
        });

        const doc = await user.findOne({ name: 'John' });

        console.log('Before:', doc);

        doc.set('name', 'Joe');

        doc.increment();
        await doc.save();

        doc.increment();
        await doc.save();

        console.log('After:', doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
