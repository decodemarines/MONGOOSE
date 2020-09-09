const mongoose = require('mongoose');
const { connection } = require('../common');

const randomNumber = (from, to) =>
    Math.floor(Math.random() * (to - from + 1)) + from;

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ url: String, clicks: Number });
        const user = mongoose.model('customers', userSchema);

        const users = [];

        for (let i = 0; i < 10; i++) {
            for (let i = 0; i < 30; i++) {
                users.push({
                    url: `http://example.com/posts/${i}`,
                    clicks: randomNumber(0, 1000)
                });
            }
        }

        try {
            await user.create(users);

            const result = await user.distinct('url', { clicks: { $gt: 100 } });

            console.log(result);

            console.log(
                `Unique urls with more than 100 clicks — ${result.length}`
            );
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
