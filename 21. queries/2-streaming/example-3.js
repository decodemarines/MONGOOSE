const { Writable, Transform } = require('stream');
const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            name: String
        });
        const user = mongoose.model('customers', userSchema);

        const cursor = await user.find({}).cursor();

        cursor.pipe(
            new Writable({
                objectMode: true,
                write: (doc, encoding, done) => {
                    // doc → mongoose document
                    console.log(`I'm on a writable stream ${doc.name}`);
                    done();
                }
            })
        );
    })
    .catch(error => {
        console.error('Error:', error);
    });
