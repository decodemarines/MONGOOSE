const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const options = { discriminatorKey: '_t' };
        const userSchema = new mongoose.Schema({ name: String }, options);
        const staffSchema = new mongoose.Schema({ role: String }, options);

        let staffSchemaCalls = 0;
        let userSchemaCalls = 0;

        staffSchema.pre('validate', () => {
            ++staffSchemaCalls;
            console.log('Inside child schema');
            next();
        });
        userSchema.pre('validate', () => {
            ++userSchemaCalls;
            console.log('Inside parent schema');
            next();
        });

        // Parent model
        const User = mongoose.model('users', userSchema);

        // Staff model
        const Staff = User.discriminator('staff', staffSchema);

        try {
            const staff = new Staff();

            staff.validate(() => {
                console.log(staffSchemaCalls, staffSchemaCalls === 1);
                console.log(userSchemaCalls, userSchemaCalls === 1);
                console.log(
                    '=====================================================',
                );

                const generic = new User();
                generic.validate(() => {
                    console.log(staffSchemaCalls, staffSchemaCalls === 1);
                    console.log(userSchemaCalls, userSchemaCalls === 2);
                });
            });
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
