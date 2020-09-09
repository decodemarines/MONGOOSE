const mongoose = require('mongoose');
const { connection } = require('../common');

// {
//     name: 'John1',
//     friends: [
//         {
//             name: 'John2',
//             friends: [
//                 {
//                     name: 'John3',
//                     friends: [
//                         {
//                             name: 'John4',
//                             friends: [
                
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }

connection
    .then(async () => {
        // User schema
        const userSchema = new mongoose.Schema({
            name: String,
            friends: [
                {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'users',
                },
            ],
        });

        // User model
        const user = mongoose.model('users', userSchema);

        // Create DATA start
        const userData1 = await user.create({
            name: 'John Doe',
        });
        const userData2 = await user.create({
            name: 'Chuck Norris',
        });
        const userData3 = await user.create({
            name: 'Bruce Lee',
        });

        userData1.friends.push(userData2._id, userData3._id);
        userData2.friends.push(userData3._id);
        await userData1.save();
        await userData2.save();

        const usersSource = await user
            .findOne()
            .populate({
                path: 'friends',
                populate: { path: 'friends', select: '-_id -__v' },
                select: '-_id -__v',
            })
            .select('-__v -_id')
            .lean();

        // console.log(usersSource);
        console.log(JSON.stringify(usersSource, null, 4));

        const friendsOfFriends = [];
        const mutual = [];

        usersSource.friends.forEach(({ friends }) => {
            friendsOfFriends.push(...friends);
        });

        usersSource.friends.forEach(({ name }) => {
            friendsOfFriends.forEach(({ name: subName }) => {
                if (subName === name) {
                    mutual.push(name);
                }
            });
        });

        if (mutual.length) {
            const count = mutual.length;
            const friends = mutual.join(', ');
            console.log(`John Doe have ${count} mutual friends: ${friends}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
