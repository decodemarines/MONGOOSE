module.exports = (schema, options) => {
    const { findOneAndUpdate, updateOne, updateMany } = options;

    const increment = async doc => {
        console.log('doc', doc);

        doc.increment();
        await doc.save();
    };

    if (findOneAndUpdate) {
        schema.post('findOneAndUpdate', increment);
    }

    if (updateOne) {
        schema.post('updateOne', increment);
    }

    if (updateMany) {
        schema.post('updateMany', increment);
    }
};
