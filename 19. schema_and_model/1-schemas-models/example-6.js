const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const userSchema = new mongoose.Schema({ name: String });
        const User = mongoose.model('customers', userSchema);

        const user = new User();
        // на уровне монгуса уже создан документ с {_id:35353}

        try {
            user.set('name', 'Johns');
            // { _id:35353, name:'John' }
            const data = await user.save();
            // { _id:35353, name:'John', __v:0 }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => {
        console.error('Connection error', error);
    });
