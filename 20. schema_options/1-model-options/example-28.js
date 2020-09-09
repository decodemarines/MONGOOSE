const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const citiesSchema = new mongoose.Schema(
            {
                title: String,
            },
            { collation: { locale: 'en_US', numericOrdering: true } },
        );

        const cities = mongoose.model('cities', citiesSchema);

        await cities.create([
            { title: 'invoice_1' },
            { title: 'invoice_2' },
            { title: 'invoice_20' },
            { title: 'invoice_200' },
            { title: 'invoice_10' },
            { title: 'invoice_100' },
        ]);

        const docs = await cities.find({}).sort({ title: 1 });

        console.log(docs);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
