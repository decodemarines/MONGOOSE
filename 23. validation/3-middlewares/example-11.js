const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                unique: true,
            },
        });

        userSchema.post('save', function(error, doc, next) {
            if (error.name === 'MongoError' && error.code === 11000) {
                next(
                    new Error(
                        'Middleware block: There was a duplicate key error',
                    ),
                );
            } else {
                next();
            }
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create([
                { name: 'John Doe' },
                { name: 'John Doe' },
            ]);

            await user.find();
        } catch ({ name, message }) {
            console.error(`Catch block: ${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
