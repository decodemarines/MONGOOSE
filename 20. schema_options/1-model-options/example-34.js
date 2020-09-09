const mongoose = require('mongoose');
const { connection, delay } = require('../common');

connection
    .then(async () => {
        const hobbiesSchema = mongoose.Schema({
            title: String,
        });
        const hobbies = mongoose.model('hobbies', hobbiesSchema);

        const usersSchema = new mongoose.Schema({
            fName: String,
            lName: String,
            hobbies: [
                {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: hobbies,
                },
            ],
        });

        const hobbiesDocs = await hobbies.create([
            { title: 'soccer' },
            { title: 'traveling' },
        ]);

        // console.log(hobbiesDocs);

        const user = mongoose.model('users', usersSchema);

        let doc = await user.create({
            fName: 'John',
            lName: 'Doe',
            hobbies: hobbiesDocs.map(item => item._id),
        });

        // console.log('User:', doc);

        const userWithHobbies = await user
            .find()
            .select('fName')
            .populate('hobbies');

        console.log(JSON.stringify(userWithHobbies, null, 4));
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
