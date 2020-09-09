const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String
            },
            fullName: {
                type: String,
                virtual: true,
                get() {
                    return `${this.name.first} ${this.name.last}`;
                }
            },
            dateOfBirth: Date
        });
        const user = mongoose.model('customers', userSchema);

        const data = await user.create({
            name: { first: 'Chuck', last: 'Norris' }
        });

        const { fullName } = await user.findOne({
            'name.first': 'Chuck'
        });

        console.log(`My full name is: ${fullName}`); // My full name is: Chuck Norris
    })
    .catch(error => {
        console.error('Error:', error);
    });
