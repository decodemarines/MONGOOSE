const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            socials: Map // or mongoose.ShemaTypes.Map
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                socials: {
                    github: 'jdoe',
                    skype: 'j.doe'
                }
            });

            console.log(data);
            console.log(data.socials instanceof Map); // true
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
