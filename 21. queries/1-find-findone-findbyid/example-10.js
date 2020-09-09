const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(() => {
        const userSchema = new mongoose.Schema({
            name: String,
            socials: {
                fb: {
                    en: String,
                    uk: String
                },
                skype: String
            }
        });
        const user = mongoose.model('customers', userSchema);

        const query = user.findOne({ name: 'John' });

        query
            .where('age')
            .gt(20)
            .lt(45);

        query.where('socials.fb.en').equals('aprisniak');

        query.exec((error, doc) => {
            console.log(doc); // { _id: 5ca1e8d838e641a3e498b210, name: 'John' }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
