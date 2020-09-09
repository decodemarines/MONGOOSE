const mongoose = require('mongoose');
const { connection } = require('../common');

// const schema = new Schema({..}, { read: 'primary' });            // also aliased as 'p'
// const schema = new Schema({..}, { read: 'primaryPreferred' });   // aliased as 'pp'
// const schema = new Schema({..}, { read: 'secondary' });          // aliased as 's'
// const schema = new Schema({..}, { read: 'secondaryPreferred' }); // aliased as 'sp'
// const schema = new Schema({..}, { read: 'nearest' });            // aliased as 'n'

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: String,
                socials: {
                    skype: String,
                    fb: String,
                    viber: String
                }
            },
            { read: 'nearest' } // read from nearest replica set
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
            socials: {}
        });
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
