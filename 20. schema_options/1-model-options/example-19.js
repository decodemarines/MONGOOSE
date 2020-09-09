const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
            },
            // strictQuery: true ← will ignore fields in find and update if
            { strict: false, strictQuery: false },
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
            age: 35,
        });

        await user.create({
            name: 'John',
            age: 34,
        });
        await user.create({
            name: 'John',
        });

        // console.log(user); // no age field without strict false
        const doc = await user.find({ age: 35 });

        console.log(doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
