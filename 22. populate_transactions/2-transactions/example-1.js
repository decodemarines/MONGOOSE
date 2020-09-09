// new in MongoDB 4.0+ and Mongoose 5.2.0+
const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async conn => {
        // await conn.connection.db.dropDatabase();
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
        });
        // Account schema
        const accountSchema = new mongoose.Schema({
            uid: { type: mongoose.SchemaTypes.ObjectId, ref: 'customers' },
            balance: Number,
        });

        // User model
        const user = mongoose.model('customers', userSchema);
        // Order model
        const account = mongoose.model('accounts', accountSchema);
        await user.createCollection();
        await account.createCollection();

        const docs = [];

        try {
            const userData = await user.create([
                {
                    name: 'John Doe',
                },
            ]);

            docs.push(...userData);

            throw new Error('interrupt'); // interrupt

            const accountData = await account.create([
                { balance: 100, uid: userData[0]._id },
            ]);

            docs.push(...accountData);
        } catch ({ message }) {
            console.log(message);

            // Rolled back all saved documents
            docs.forEach(doc => {
                doc.remove();
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
