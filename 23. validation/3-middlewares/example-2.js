const mongoose = require('mongoose');
const { connection } = require('../common');

const bcrypt = password =>
    new Promise(resolve => {
        const hashedPassword = Buffer.from(password).toString('base64');

        resolve(hashedPassword);
    });

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            password: String,
        });

        userSchema.pre('save', async function() {
            this.password = await bcrypt(this.password);
        });

        // User model
        const user = mongoose.model('customers', userSchema);

        try {
            const userData = await user.create({
                name: 'John',
                password: 123456,
            });

            console.log(userData);
        } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
