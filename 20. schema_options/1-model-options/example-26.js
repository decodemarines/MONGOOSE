const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const citiesSchema = new mongoose.Schema(
            {
                name: String
            },
            { collation: { locale: 'en_US', strength: 1 } }
        );

        const cities = mongoose.model('cities', citiesSchema);

        await cities.create([{ name: 'San Jose' }, { name: 'San José' }]);

        const docs = await cities.find({ name: 'San Jose' });

        console.log(docs);
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
