const mongoose = require('mongoose');
const fs = require('fs');
const { connection } = require('../common');

connection
    .then(async () => {
        let csv = 'Name,Age\n';

        const userSchema = new mongoose.Schema({
            name: String,
            age: Number,
        });

        const user = mongoose.model('customers', userSchema);
        const cursor = await user.find({}).cursor();

        cursor.on('data', doc => {
            csv += `${doc.name},${doc.age}\n`;
        });

        cursor.on('close', () => {
            fs.writeFile('users.csv', csv, error => {
                if (error) {
                    console.error('Error', error.message);
                }
                console.log('Finished!');
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
