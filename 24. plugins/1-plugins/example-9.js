const mongoose = require('mongoose');
const leanVirtuals = require('mongoose-lean-virtuals');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: {
                    first: String,
                    last: String,
                },
                prefix: String,
            },
            { toObject: { virtuals: true }, id: false },
        );

        userSchema.virtual('fullName').get(function() {
            const {
                name: { first, last },
            } = this;
            return `${first} ${last}`;
        });

        userSchema.virtual('withPrefix').get(function() {
            const {
                prefix,
                name: { first, last },
            } = this;
            return `${prefix} ${first} ${last}`;
        });

        userSchema.plugin(leanVirtuals);

        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: {
                    first: 'John',
                    last: 'Doe',
                },
                prefix: 'Mr.',
            });

            // для определённого виртуального поля
            const data = await user
                .findOne({ 'name.first': 'John' }, { _id: false, __v: false })
                .lean({ virtuals: ['withPrefix'] });

            // для всех виртуальных полей
            const data1 = await user
                .findOne({ 'name.first': 'John' }, { _id: false, __v: false })
                .lean({ virtuals: true });

            console.log('toObject' in data);
            console.log(data);
            console.log('=================================');
            console.log(data1);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
