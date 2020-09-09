const mongoose = require('mongoose');

const mongooseOptions = {
    promiseLibrary: global.Promise, // bluebird as an alternative
    poolSize: 50,
    keepAlive: 30000,
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_SAFE_INTEGER,
    reconnectInterval: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

// mongoose.createConnection()

// protocol://username:password@dns_or_ip:port/db_name

// protocols:
// mongodb
// mongo+srv
const connection = mongoose.connect(
    'mongodb://localhost:27017/aprisniak',
    mongooseOptions,
);

// Uncomment this code to drop DB for every example
connection.then(conn => {
    // Achtung!!!
    // Warning
    conn.connection.db.dropDatabase();
});

module.exports = { connection };
