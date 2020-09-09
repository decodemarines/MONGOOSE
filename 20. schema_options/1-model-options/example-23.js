const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                product: {
                    type: String,
                    name: {
                        $type: String,
                        index: true
                    }
                }
            },
            {
                typeKey: '$type'
            }
        );

        const user = mongoose.model('customers', userSchema);

        const doc = await user.create({
            product: {
                type: 'vegetables',
                name: 'potato'
            }
        });

        console.log(doc);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
