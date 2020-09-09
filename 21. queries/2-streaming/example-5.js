const mongoose = require('mongoose');
const fs = require('fs');
const { connection } = require('../common');

connection
    .then(async () => {
        const ws = fs.createWriteStream('users.csv');

        // Записываем заголовок таблички
        ws.write('Name,Age\n');

        const userSchema = new mongoose.Schema({
            name: String,
            age: Number,
        });

        const user = mongoose.model('customers', userSchema);
        const cursor = await user.find({}).cursor();

        cursor.on('data', doc => {
            // Пишем данные таблички
            ws.write(`${doc.name},${doc.age}\n`);
        });

        cursor.on('close', () => {
            // Завершаем запись в файл
            ws.end();
            console.log('Finished!');
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
