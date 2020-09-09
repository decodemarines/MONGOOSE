const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const citiesSchema = new mongoose.Schema(
            {
                v: String,
            },
            { collation: { locale: 'en_US' } },
        );

        const cities = mongoose.model('cities', citiesSchema);

        await cities.create([
            { v: 'Alpha' },
            { v: 'Zeta' },
            { v: '_' },
            { v: 'alpha' },
            { v: 'zeta' },
        ]);

        const docs = await cities.find({}).sort({ v: 1 });

        console.log(docs);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
