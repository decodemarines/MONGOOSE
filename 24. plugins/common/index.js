const mongoose = require('mongoose');

const mongooseOptions = {
    promiseLibrary: global.Promise,
    poolSize: 10,
    keepAlive: 30000,
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
};

const connection = mongoose.connect(
    'mongodb://localhost:27017/users',
    mongooseOptions,
);

// Uncomment this code to drop DB for every example
connection.then(conn => {
    conn.connection.db.dropDatabase();
});

module.exports = { connection, mongooseOptions };
