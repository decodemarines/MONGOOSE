const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: {
                first: String,
                last: String
            },
            dateOfBirth: Date,
            age: {
                type: Number,
                virtual: true,
                get() {
                    const ageDifMs = Date.now() - this.dateOfBirth.getTime();
                    const ageDate = new Date(ageDifMs);
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                },
                set() {
                    throw Error('can not set age, please specify birth date');
                }
            }
        });

        const user = mongoose.model('customers', userSchema);

        const data = await user.create({
            name: { first: 'Andrey', last: 'Prisniak' },
            age: 35
        });

        const doc = await user.findOne({
            'name.first': 'Andrey'
        });

        console.log(doc.toObject({ getters: true, virtuals: true }));
    })
    .catch(error => {
        console.error('Error:', error);
    });
