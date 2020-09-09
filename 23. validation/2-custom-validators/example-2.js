const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            phone: {
                type: String,
                validate: {
                    validator(value) {
                        if (/^\d{3}-\d{3}-\d{4}$/.test(value)) {
                            return true;
                        }

                        return false;
                    },
                    message(props) {
                        console.log(props);
                        // { validator: [Function: validator],
                        //     message: [Function: message],
                        //     type: 'user defined',
                        //     path: 'phone',
                        //     value: '097-5556777' }

                        const { path, value } = props;
                        return `Value: '${value}' are not valid for '${path}' field`;
                    },
                },
            },
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                phone: '097-5556777',
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
