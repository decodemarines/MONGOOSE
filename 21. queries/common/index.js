const mongoose = require('mongoose');

const mongooseOptions = {
    promiseLibrary: global.Promise,
    poolSize: 50,
    keepAlive: 30000,
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_SAFE_INTEGER,
    reconnectInterval: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

const connection = mongoose.connect(
    'mongodb://localhost:27017/users',
    mongooseOptions,
);

// Uncomment this code to drop DB for every example
connection.then(conn => {
    conn.connection.db.dropDatabase();
});

const delay = timeout =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });

module.exports = { connection, delay };
