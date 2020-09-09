const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String
            },
            dateOfBirth: Date
        });

        userSchema
            .virtual('fullName')
            .get(function() {
                return `${this.name.first} ${this.name.last}`;
            })
            .set(function(value) {
                const [first, last] = value.split(' ');

                this.name.first = first;
                this.name.last = last;
            });

        const user = mongoose.model('customers', userSchema);

        const data = await user.create({
            fullName: 'Andrey Prisniak'
        });

        const doc = await user.findOne({
            'name.first': 'Andrey'
        });

        // Doesn't work!
        // const doc = await user.findOne({
        //     fullName: 'Andrey Prisniak'
        // });

        console.log(doc); // My full name is: Andrey Prisniak
    })
    .catch(error => {
        console.error('Error:', error);
    });
