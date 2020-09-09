const mongoose = require('mongoose');
const { connection, delay } = require('../common');

connection
    .then(async () => {
        const hobbiesSchema = mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true,
                },
                date: Date,
            },
            { storeSubdocValidationError: false },
        );

        const usersSchema = new mongoose.Schema({
            fName: String,
            lName: String,
            hobby: hobbiesSchema,
        });

        const user = mongoose.model('users', usersSchema);

        let doc = await user.create({
            fName: 'John',
            lName: 'Doe',
            hobby: {},
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
