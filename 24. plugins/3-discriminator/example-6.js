const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const eventSchema = new mongoose.Schema(
            { message: String },
            { discriminatorKey: '_t', _id: false },
        );

        const batchSchema = new mongoose.Schema({ events: [eventSchema] });

        const docArray = batchSchema.path('events');

        const Clicked = docArray.discriminator(
            'clicked',
            new mongoose.Schema(
                {
                    element: {
                        type: String,
                        required: true,
                    },
                },
                { _id: false },
            ),
        );

        const Purchased = docArray.discriminator(
            'purchased',
            new mongoose.Schema(
                {
                    product: {
                        type: String,
                        required: true,
                    },
                },
                { _id: false },
            ),
        );

        const Batch = mongoose.model('EventBatch', batchSchema);

        const batch = {
            events: [
                { _t: 'clicked', element: '#hero', message: 'hello' },
                {
                    _t: 'purchased',
                    product: 'action-figure-1',
                    message: 'world',
                },
            ],
        };

        const data = await Batch.create(batch);

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
