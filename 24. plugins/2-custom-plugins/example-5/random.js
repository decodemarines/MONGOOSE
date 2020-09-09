module.exports = random = (schema, options) => {
    options = options || {};

    // Can specify a random function other than Math.random
    const randFn = options.fn || Math.random;
    const randCoords = () => [randFn(), randFn()];

    // Create a path 'random' that's a GeoJSON point
    const path = options.path || 'random';
    const field = {};
    field[path] = {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: randCoords },
    };
    const index = {};
    index[path] = '2dsphere';

    // Add the 'random' field and a 2dsphere index on it
    schema.add(field);
    schema.index(index);

    /**
     *  Attach a `findRandom()` helper to the schema for
     *  syntactic sugar
     */
    schema.statics.findRandom = function(
        conditions,
        fields,
        options,
        callback,
    ) {
        if (!conditions || typeof conditions === 'function') {
            conditions = {};
        }

        conditions[path] = conditions[path] || {
            $near: {
                $geometry: { type: 'Point', coordinates: randCoords() },
            },
        };

        return this.findOne(conditions, fields, options, callback);
    };
};
