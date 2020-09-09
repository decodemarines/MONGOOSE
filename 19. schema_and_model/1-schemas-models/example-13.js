const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            avatar: Buffer // сохранит как Binary('') 
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                avatar: Buffer.from('some image stored as binary data')
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
