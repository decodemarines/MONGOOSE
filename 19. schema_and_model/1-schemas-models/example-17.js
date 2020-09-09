const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({
            score: Number,
            balance: mongoose.Schema.Types.Decimal128
        });
        const user = mongoose.model('customers', userSchema);

        try {
            const data = await user.create({
                score: 0.1,
                balance: 0.1
            });

            console.log('data ==>', data);

            const updatedData = await user.findOneAndUpdate(
                {},
                { $inc: { score: 0.2, balance: 0.2 } },
                { new: true }
            );

            console.log('updatedData ==>', updatedData);

            console.log(updatedData.score);
            console.log(updatedData.balance);

            console.log(updatedData.score.toString() === '0.3'); // false
            console.log(updatedData.balance.toString() === '0.3'); // true
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
