const mongoose = require('mongoose');
const { connection } = require('../common');

// options.getters=false «Boolean» if true, apply all getters, including virtuals
// options.virtuals=false «Boolean» if true, apply virtuals. Use { getters: true, virtuals: false } to just apply getters, not virtuals
// options.minimize=true «Boolean» if true, omit any empty objects from the output
// options.transform=null «Function|null» if set, mongoose will call this function to allow you to transform the returned object
// options.depopulate=false «Boolean» if true, replace any conventionally populated paths with the original id in the output. Has no affect on virtual populated paths.
// options.versionKey=true «Boolean» if false, exclude the version key (__v by default) from the output
// options.flattenMaps=false «Boolean» if true, convert Maps to POJOs. Useful if you want to JSON.stringify() the result of toObject().

connection
    .then(async () => {
        const userSchema = new mongoose.Schema(
            {
                name: {
                    type: String,
                    get: function(v) {
                        return v + ' is my name!';
                    },
                },
            },
            { toObject: { getters: true, virtuals: true } },
        );

        const user = mongoose.model('customers', userSchema);

        await user.create({
            name: 'John',
        });

        // Mongoose document
        const doc = await user.findOne({});

        // Plain Old JavaScript Object
        console.log(doc); // ← toObject
        console.log(doc.toObject());

        console.log(doc.toJSON());
    })
    .catch(({ message }) => {
        console.error('Error:', message);
    });
