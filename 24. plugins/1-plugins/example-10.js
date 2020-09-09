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

            const data0 = await user
                .findById(userData._id, { _id: false, __v: false })
                .lean({ virtuals: true });

            const data1 = await user
                .find({ 'name.first': 'John' }, { _id: false, __v: false })
                .lean({ virtuals: true });

            const data2 = await user
                .findOne({ 'name.first': 'John' }, { _id: false, __v: false })
                .lean({ virtuals: true });

            const data3 = await user
                .findOneAndUpdate(
                    { 'name.first': 'John' },
                    { 'name.first': 'Chuck' },
                    {
                        select: { _id: false, __v: false },
                        new: true,
                    },
                )
                .lean({ virtuals: true });

            console.log(data0);
            console.log('=============================================');
            console.log(data1);
            console.log('=============================================');
            console.log(data2);
            console.log('=============================================');
            console.log(data3);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
