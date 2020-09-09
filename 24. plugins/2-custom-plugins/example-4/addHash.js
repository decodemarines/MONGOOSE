const v4 = require('uuid/v4');

module.exports = (schema, options) => {
    schema.add({
        hash: String,
    });

    schema.pre('save', function(next) {
        this.hash = v4();
        next();
    });

    if (options && options.index) {
        schema.path('hash').index(true);
    }
};
