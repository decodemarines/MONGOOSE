module.exports = (schema, options) => {
    schema.post('findOneAndUpdate', async doc => {
        doc.increment();
        await doc.save();
    });
};
