const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: {
                    type: String,
                    validate: function(v) {
                        return v !== null;
                    },
                },
            },
            {
                // Default: true
                validateBeforeSave: false,
            },
        );

        const user = mongoose.model('customers', userSchema);

        // new user({
        //     name: null,
        // }).validate(error => {
        //     console.log(error);
        // });

        const doc = await user.create({
            name: null,
        });

        console.log(doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
