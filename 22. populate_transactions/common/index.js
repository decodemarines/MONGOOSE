const mongoose = require('mongoose');

const mongooseOptions = {
    promiseLibrary: global.Promise,
    poolSize: 50,
    keepAlive: 30000,
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

const connection = mongoose.connect(
    // Without replset
     'mongodb://localhost:27017/populate',
    // 'mongodb://localhost:27017/aprisniak',
    // With replset
    // 'mongodb+srv://test:1qazxsw2@laboratory-dgvug.mongodb.net/aprisniak?retryWrites=true&w=majority',
    mongooseOptions,
);

// Uncomment this code to drop DB for every example
connection.then((conn) => {
    conn.connection.db.dropDatabase();
});

module.exports = { connection, mongooseOptions };
